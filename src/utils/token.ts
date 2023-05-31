import { SESSIONTYPE } from "@/types/session";
import jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";
import { tokenFetch } from "./api/token";
import { tokenDelete } from "./varible";

const generateAccessToken = async (
  id: string,
  email: string,
  nickname: string,
  image: string | null
) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      {
        id,
        email,
        nickname,
        image,
        type: "local",
        role: "USER",
      },
      process.env.NEXT_PUBLIC_TOKEN_SECRET as string,
      {
        expiresIn: 60 * 60 * 60,
        issuer: "YAKJUNG",
        algorithm: "HS512",
      },
      (err: any, token: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      }
    );
  });
};

const generateRefreshToken = async (id: string, type: string) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      {
        id: id,
        type: type,
      },
      process.env.NEXT_PUBLIC_TOKEN_SECRET as string,
      {
        expiresIn: 60 * 60 * 60 * 1000,
        issuer: "YAKJUNG",
        algorithm: "HS512",
      },
      (err: any, token: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      }
    );
  });
};

const generateAccessOauthToken = (
  id: string,
  nickname: string,
  image: string | null,
  email?: string | null
) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      {
        id,
        nickname,
        email,
        image,
        type: "oauth",
        role: "USER",
      },
      process.env.NEXT_PUBLIC_TOKEN_SECRET as string,
      {
        expiresIn: 60 * 60 * 60,
        issuer: "YAKJUNG",
        algorithm: "HS512",
      },
      (err: any, token: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      }
    );
  });
};

const tokenVerify = (token: any) => {
  try {
    return jwt.verify(token, process.env.NEXT_PUBLIC_TOKEN_SECRET as string);
  } catch (e: any) {
    return false;
  }
};

const serverTokenVerify = async (accessToken: string, refreshToken: string) => {
  const { session, type, access_token } = await tokenFetch(
    accessToken,
    refreshToken
  );
  if (type) {
    if (type === "verify") {
      return session;
    } else if (type === "reissue") {
      localStorage.setItem("access_token", access_token);
      window.location.reload();
      return false;
    } else {
      tokenDelete();
      return false;
    }
  } else {
    return false;
  }
};

const localTokenVerify = (token: string) => {
  return jwt_decode(token) as SESSIONTYPE;
};

const getValidTokenFromOauth = async (url: string) => {
  // get new token from server with refresh token
  try {
    const request = await fetch(`${url}`, {
      method: "POST",
      // headers: {
      //   "Content-Type": "application/json",
      // },
    });
    const resultToken = await request.json();
    console.info(resultToken);
    // if (resultToken) {
    //   localStorage.setItem("access_token", resultToken.access_token);
    //   window.location.href = "/";
    // }
  } catch (error) {
    throw new Error("Issue getting new token");
  }
};

export {
  tokenVerify,
  localTokenVerify,
  generateAccessToken,
  getValidTokenFromOauth,
  generateAccessOauthToken,
  generateRefreshToken,
  serverTokenVerify,
};

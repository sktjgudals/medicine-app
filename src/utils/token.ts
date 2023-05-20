import jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";

const generateAccessToken = async (
  id: string,
  email: string,
  nickname: string
) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      {
        id,
        email,
        nickname,
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

const generateRefreshToken = async (token: string, type: string) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      {
        access_token: token,
        type: type,
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

const generateAccessOauthToken = (
  id: string,
  nickname: string,
  email?: string | null
) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      {
        id,
        nickname,
        email,
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
  } catch (e) {
    console.info(e);
    return false;
  }
};

const localTokenVerify = (token: string) => {
  return jwt_decode(token);
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
};

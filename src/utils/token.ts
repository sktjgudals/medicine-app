import jwt from "jsonwebtoken";

import jwt_decode from "jwt-decode";
const generateUserToken = async (
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
      },
      process.env.NEXT_PUBLIC_TOKEN_SECRET as string,
      {
        expiresIn: 60 * 10 * 10,
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
  } catch (err) {
    return false;
  }
};

const localTokenVerify = (token: string) => {
  return jwt_decode(token);
};

export { tokenVerify, generateUserToken, localTokenVerify };

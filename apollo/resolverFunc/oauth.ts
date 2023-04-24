import prisma from "prisma/prisma";

import jwt_decode from "jwt-decode";

import { getKakaoAccessToken } from "@/utils/func/oauth";
import { generateAccessOauthToken, generateRefreshToken } from "@/utils/token";

const oauthKakaoUserLinkFunc = () => {
  return {
    url: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_KAKAO}&state=login`,
  };
};

const oauthKakaoUserCodeFunc = async (code: string) => {
  const token = await getKakaoAccessToken(code);
  if (token) {
    const decodeToken = jwt_decode(token["id_token"]) as any;
    if (decodeToken) {
      const res = await prisma.account.findFirst({
        where: { providerAccountId: decodeToken["aud"] },
      });
      if (res) {
        const user = (await prisma.user.findFirst({
          where: { id: res["userId"] },
        })) as any;
        const access_token = (await generateAccessOauthToken(
          user["id"],
          user["nickname"],
          user["email"]
        )) as string;
        const refresh_token = await generateRefreshToken(access_token);
        return { access_token, refresh_token };
      } else {
        delete token["expires_in"];
        delete token["refresh_token_expires_in"];
        const user = await prisma.user.create({ data: { nickname: `kakao` } });
        prisma.account.create({
          data: {
            userId: user["id"],
            type: token["token_type"],
            provider: "kakao",
            providerAccountId: decodeToken["aud"],
          },
        });
        const access_token = (await generateAccessOauthToken(
          user["id"],
          user["nickname"]
        )) as string;
        const refresh_token = await generateRefreshToken(access_token);
        return { access_token, refresh_token };
      }
    } else {
      return null;
    }
  }
  return null;
};

export { oauthKakaoUserLinkFunc, oauthKakaoUserCodeFunc };

import {
  generateAccessOauthToken,
  generateRefreshToken,
  localTokenVerify,
} from "../token";
import prisma from "prisma/prisma";

const getKakaoAccessToken = async (code: string) => {
  const url = `grant_type=authorization_code&client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_KAKAO}&code=${code}`;
  try {
    const res = await fetch(`https://kauth.kakao.com/oauth/token?${url}`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    const result = await res.json();
    if (result["error"] === undefined) {
      return result;
    } else {
      return null;
    }
  } catch (e) {
    if (e) {
      console.info(e);
      return null;
    }
  }
};

const getNaverAccessToken = async (code: string, state: string) => {
  const url = `grant_type=authorization_code&client_id=${process.env.NEXT_PUBLIC_NAVER_ID}&client_secret=${process.env.NEXT_PUBLIC_NAVER_KEY}&code=${code}&state=${state}`;
  try {
    const res = await fetch(`https://nid.naver.com/oauth2.0/token?${url}`, {
      method: "POST",
    });
    const result = await res.json();
    if (result["access_token"]) {
      const naverToken = await fetch("https://openapi.naver.com/v1/nid/me", {
        headers: {
          Authorization: `Bearer ${result["access_token"]}`,
        },
      });
      const { response, message } = await naverToken.json();
      if (message === "success") {
        return response["id"];
      }
    } else {
      return null;
    }
  } catch (e) {
    console.info(e);
    return null;
  }
};

const oauthKakaoUserCode = async (code: string) => {
  const token = await getKakaoAccessToken(code);
  if (token) {
    try {
      const decodeToken = localTokenVerify(token["id_token"]) as any;
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
            user["image"],
            user["email"]
          )) as string;
          const refresh_token = await generateRefreshToken(res["id"], "kakao");
          return { access_token, refresh_token };
        } else {
          let date = String(Date.now()).slice(4, 13);
          const nickNameFind = await prisma.user.findFirst({
            where: { nickname: `k${date}` },
            select: { id: true },
          });
          if (nickNameFind) {
            date + 1;
          }
          const user = await prisma.user.create({
            data: {
              nickname: `k${date}`,
              type: "kakao",
              account: {
                create: {
                  type: token["token_type"],
                  provider: "kakao",
                  providerAccountId: decodeToken["aud"],
                },
              },
            },
          });
          const access_token = (await generateAccessOauthToken(
            user["id"],
            user["nickname"],
            user["image"],
            user["email"]
          )) as string;
          const refresh_token = await generateRefreshToken(user["id"], "kakao");
          return { access_token, refresh_token };
        }
      } else {
        return null;
      }
    } catch (e) {
      console.info(e);
      return null;
    }
  }
  return null;
};

const oauthNaverUserCode = async (code: string, state: string) => {
  const naverId = await getNaverAccessToken(code, state);
  if (naverId) {
    const account = await prisma.account.findFirst({
      where: { providerAccountId: naverId },
    });
    if (account) {
      const findedUser = await prisma.user.findFirst({
        where: { id: account.userId },
      });
      if (findedUser) {
        const access_token = (await generateAccessOauthToken(
          findedUser["id"],
          findedUser["nickname"],
          findedUser["image"],
          findedUser["email"] ? findedUser["email"] : null
        )) as string;
        const refresh_token = await generateRefreshToken(
          findedUser["id"],
          "naver"
        );
        return { access_token, refresh_token };
      }
    } else {
      let date = String(Date.now()).slice(4, 13);
      const nickNameFind = await prisma.user.findFirst({
        where: { nickname: `n${date}` },
        select: { id: true },
      });
      if (nickNameFind) {
        date + 1;
      }
      const userCreated = await prisma.user.create({
        data: {
          nickname: `n${date}`,
          type: "naver",
          account: {
            create: {
              type: "bearer",
              provider: "naver",
              providerAccountId: naverId,
            },
          },
        },
      });
      const access_token = (await generateAccessOauthToken(
        userCreated["id"],
        userCreated["nickname"],
        userCreated["image"],
        userCreated["email"]
      )) as string;
      const refresh_token = await generateRefreshToken(
        userCreated["id"],
        "naver"
      );
      return { access_token, refresh_token };
    }
  } else {
    return null;
  }
};

export { getKakaoAccessToken, oauthKakaoUserCode, oauthNaverUserCode };

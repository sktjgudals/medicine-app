import {
  generateAccessOauthToken,
  generateAccessToken,
  generateRefreshToken,
} from "@/utils/token";
import prisma from "prisma/prisma";

const getUserDataFunc = async (userId: string) => {
  try {
    return await prisma.user.findFirst({ where: { id: userId } });
  } catch (e) {
    return null;
  }
};

const changeProfileImageFunc = async (image: string, userId: string) => {
  try {
    const res = await prisma.user.update({
      where: { id: userId },
      data: { image: image },
      select: {
        image: true,
        id: true,
        nickname: true,
        email: true,
        type: true,
      },
    });
    if (res) {
      if (res["type"] === "local") {
        if (res["email"]) {
          const access_token = (await generateAccessToken(
            res["id"],
            res["email"],
            res["nickname"],
            res["image"]
          )) as any;
          const refresh_token = await generateRefreshToken(
            access_token,
            "local"
          );
          return { access_token, refresh_token };
        }
      } else {
        const access_token = (await generateAccessOauthToken(
          res["id"],
          res["nickname"],
          res["image"],
          res["email"]
        )) as any;
        const refresh_token = await generateRefreshToken(
          access_token,
          res["type"]
        );
        return { access_token, refresh_token };
      }
    } else {
      return null;
    }
  } catch (e) {
    return null;
  }
};

export { getUserDataFunc, changeProfileImageFunc };

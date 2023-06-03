import prisma from "prisma/prisma";
import { bcryptGenSalt, bcryptHash } from "@/utils/secure";
import { generateAccessToken, generateRefreshToken } from "@/utils/token";

const findUserEmailFunc = async (email: string) => {
  try {
    const res = await prisma.user.findFirst({
      where: { email: email.toLocaleLowerCase() },
    });
    if (!res) {
      return null;
    }
    return res;
  } catch (e) {
    throw new Error("이메일 조회에 실패했습니다.");
  }
};

const findUserNicknameFunc = async (nickname: string) => {
  try {
    const res = await prisma.user.findFirst({
      where: { nickname },
    });
    if (!res) {
      return null;
    }
    return res;
  } catch (e) {
    throw new Error("닉네임 조회에 실패했습니다.");
  }
};

const createLocalUserFunc = async (
  email: string,
  nickname: string,
  password: string
) => {
  let res = { id: null, token: "" } as any;
  try {
    const findUser = await prisma.user.findFirst({
      where: {
        OR: [
          {
            email: email.toLowerCase(),
          },
        ],
      },
    });
    if (!findUser) {
      const salt = await bcryptGenSalt();
      const hashedPassword = await bcryptHash(password, salt);
      const createdUser = await prisma.user.create({
        data: {
          type: "local",
          email: email.toLowerCase(),
          nickname,
          password: hashedPassword,
        },
      });
      if (createdUser) {
        const access_token = (await generateAccessToken(
          createdUser["id"],
          nickname,
          email,
          createdUser.image
        )) as string;
        const refresh_token = await generateRefreshToken(
          createdUser["id"],
          "local"
        );
        res["access_token"] = access_token;
        res["refresh_token"] = refresh_token;
        res["id"] = createdUser["id"];
        return res;
      } else {
        throw new Error("아이디 생성에 실패했습니다.");
      }
    } else {
      throw new Error("아이디 중복입니다.");
    }
  } catch (e) {
    console.error(e);
    throw new Error("error 발생");
  }
};

export { createLocalUserFunc, findUserEmailFunc, findUserNicknameFunc };

import { settingTokenGenerateFunc } from "@/utils/func/setting";
import { bcryptGenSalt, bcryptHash } from "@/utils/secure";

import prisma from "prisma/prisma";

const getUserDataFunc = async (userId: string) => {
  try {
    return await prisma.user.findFirst({ where: { id: userId } });
  } catch (e) {
    return null;
  }
};

const changeProfileNicknameFunc = async (nickname: string, userId: string) => {
  try {
    const res = await prisma.user.update({
      where: { id: userId },
      data: { nickname },
      select: {
        image: true,
        id: true,
        nickname: true,
        email: true,
        type: true,
      },
    });
    if (res) {
      return settingTokenGenerateFunc(res);
    } else {
      return null;
    }
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
      return settingTokenGenerateFunc(res);
    } else {
      return null;
    }
  } catch (e) {
    return null;
  }
};

const changeProfileInfoFunc = async (
  info: string,
  userId: string,
  type: string
) => {
  if (type === "DELETE") {
    const res = await prisma.user.update({
      where: { id: userId },
      data: { introduction: null },
      select: {
        image: true,
        id: true,
        nickname: true,
        email: true,
        type: true,
      },
    });
    if (res) {
      return res;
    } else {
      return null;
    }
  } else if (type === "UPDATE") {
    const res = await prisma.user.update({
      where: { id: userId },
      data: { introduction: info },
      select: {
        image: true,
        id: true,
        nickname: true,
        email: true,
        type: true,
      },
    });
    if (res) {
      return res;
    } else {
      return null;
    }
  } else {
    console.info("type error");
    return null;
  }
};

const changePasswordFunc = async (userId: string, password: string) => {
  try {
    const salt = await bcryptGenSalt();
    const hashedPassword = await bcryptHash(password, salt);
    const res = await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });
    return res;
  } catch (e) {
    return null;
  }
};

const deleteUserFunc = async (userId: string) => {
  try {
    await prisma.user.delete({ where: { id: userId } });
    return "회원 삭제에 성공하였습니다.";
  } catch (e) {
    return null;
  }
};

export {
  getUserDataFunc,
  changeProfileImageFunc,
  changeProfileNicknameFunc,
  changeProfileInfoFunc,
  changePasswordFunc,
  deleteUserFunc,
};

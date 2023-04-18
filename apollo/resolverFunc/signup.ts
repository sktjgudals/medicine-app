import { bcryptGenSalt, bcryptHash } from "@/utils/secure";
import prisma from "prisma/prisma";

const createLocalUserFunc = async (
  email: string,
  nickname: string,
  password: string
) => {
  let res = { error: false };

  try {
    const findUser = await prisma.user.findFirst({
      where: { email, nickname },
    });

    if (!findUser) {
      const salt = await bcryptGenSalt();
      const hashedPassword = await bcryptHash(password, salt);
      const createdUser = await prisma.user.create({
        data: { email, nickname, password: hashedPassword },
      });
      console.info(createdUser);
      return res;
    } else {
      res["error"] = true;
      return res;
    }
  } catch (e) {
    console.error(e);
    res["error"] = true;
    return res;
  }
};

export { createLocalUserFunc };

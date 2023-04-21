import { bcryptCheck } from "@/utils/secure";
import { generateUserToken } from "@/utils/token";
import prisma from "prisma/prisma";

const signinLocalUserFunc = async (email: string, password: string) => {
  try {
    const res = await prisma.user.findFirst({
      where: { email: email.toLocaleLowerCase() },
    });
    if (res) {
      const loginResult = await bcryptCheck(password, res.password as string);
      if (loginResult) {
        const token = await generateUserToken(
          res.id,
          res.email as string,
          res.nickname
        );
        return { token };
      }
    } else {
      return null;
    }
  } catch (e) {
    return null;
  }
};

export { signinLocalUserFunc };

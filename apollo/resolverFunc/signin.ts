import prisma from "prisma/prisma";
import { bcryptCheck } from "@/utils/secure";
import { generateAccessToken, generateRefreshToken } from "@/utils/token";

const signinLocalUserFunc = async (email: string, password: string) => {
  try {
    const res = await prisma.user.findFirst({
      where: { email: email.toLocaleLowerCase() },
    });
    if (res) {
      const loginResult = await bcryptCheck(password, res.password as string);
      if (loginResult) {
        const access_token = (await generateAccessToken(
          res.id,
          res.email as string,
          res.nickname
        )) as string;
        const refresh_token = await generateRefreshToken(access_token);
        return { access_token, refresh_token };
      }
    } else {
      return null;
    }
  } catch (e) {
    return { error: true };
  }
};

export { signinLocalUserFunc };

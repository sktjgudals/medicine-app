import { PrismaClient } from "@prisma/client";
export const test = async <T>(prisma: PrismaClient) => {
  try {
    const res = await prisma.user.create({ data: { name: "test2" } });
    console.log(res);
    return "test HI";
  } catch (e) {
    console.info(e);
    throw Error("user create failed");
  }
};

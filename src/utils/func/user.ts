import { Prisma } from "@prisma/client";
import prisma from "prisma/prisma";

const userResponse = async (
  query: Prisma.UserFindManyArgs,
  cursor: string | null,
  userId: string | null
) => {
  try {
    if (cursor) {
      query.cursor = {
        id: cursor,
      };
      query.skip = 1;
    }

    // if (userId) {
    // }

    // if (!userId) {
    // }

    return await prisma.user.findMany({
      ...query,
    });
  } catch (e) {
    return [];
  }
};

export { userResponse };

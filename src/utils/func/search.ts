import prisma from "prisma/prisma";
import { Prisma } from "@prisma/client";
import { postResponse } from "./post";

const postSearchListFunc = async (
  cursor: string | null,
  keyword: string,
  limit: number,
  userId: string | null
) => {
  const query: Prisma.PostFindManyArgs = {
    where: {
      AND: [
        {
          OR: [
            {
              title: {
                contains: keyword,
              },
            },
            {
              body: {
                contains: keyword,
              },
            },
          ],
        },
      ],
    },
    orderBy: [{ createdAt: "desc" }, { id: "asc" }],
    take: limit,
  };

  return postResponse(query, cursor, userId);
};

export { postSearchListFunc };

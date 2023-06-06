import prisma from "prisma/prisma";
import { Prisma } from "@prisma/client";
import { postResponse } from "./post";
import { userResponse } from "./user";

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

const tagSearchListFunc = async (
  cursor: string | null,
  keyword: string,
  limit: number,
  userId: string | null
) => {
  const tagId = await prisma.tag.findFirst({
    where: { name: keyword },
    select: { id: true },
  });

  if (tagId) {
    const query: Prisma.PostFindManyArgs = {
      where: { tagId: { has: tagId.id } },
      orderBy: [{ createdAt: "desc" }, { id: "asc" }],
      take: limit,
    };

    return postResponse(query, cursor, userId);
  }
  return [];
};

const userSearchListFunc = async (
  cursor: string | null,
  keyword: string,
  limit: number,
  userId: string | null
) => {
  try {
    const query: Prisma.UserFindManyArgs = {
      where: { nickname: { startsWith: keyword } },
      orderBy: [{ createdAt: "desc" }, { id: "asc" }],
      take: limit,
      select: { id: true, nickname: true, image: true },
    };
    return await userResponse(query, cursor, userId);
  } catch (e) {
    return [];
  }
};

export { postSearchListFunc, tagSearchListFunc, userSearchListFunc };

import { Prisma } from "@prisma/client";
import prisma from "prisma/prisma";

const uploadCommentFunc = async (
  postId: string,
  value: string,
  user: any,
  length: number
) => {
  try {
    const comment = await prisma.comment.create({
      data: { postId: postId, body: value, userId: user.id, length: length },
    });
    return { ...comment, user };
  } catch (e) {
    return null;
  }
};

const updateCommentFunc = async (
  commentId: string,
  value: string,
  user: any,
  length: number
) => {
  try {
    const comment = await prisma.comment.update({
      where: { id: commentId },
      data: { body: value, length: length },
    });
    return { ...comment, user };
  } catch (e) {
    return null;
  }
};

const getCommentsFunc = async (
  postId: string,
  userId: string,
  cursor: string,
  limit: number,
  sort: string
) => {
  try {
    const pageInfo = {
      cursor: cursor,
      hasNextPage: false,
    };

    const query: Prisma.CommentFindManyArgs = {
      where: { postId: postId },
      orderBy: [{ createdAt: "desc" }, { id: "asc" }],
      take: limit,
      include: {
        user: { select: { id: true, image: true, nickname: true } },
      },
    };

    if (sort === "new") {
      if (cursor) {
        query.cursor = {
          id: cursor,
        };
        query.skip = 1;
      }

      const comment = await prisma.comment.findMany({
        ...query,
      });

      if (comment.length > limit - 1) {
        pageInfo["hasNextPage"] = true;
      }

      return { comments: comment, pageInfo };
    } else {
      return null;
    }
  } catch (e) {
    return null;
  }
};

const commentDeleteFunc = async (commentId: string, userId: string) => {
  try {
    return await prisma.comment.delete({
      where: { id: commentId },
      select: { id: true },
    });
  } catch (e) {
    return null;
  }
};

export {
  uploadCommentFunc,
  getCommentsFunc,
  commentDeleteFunc,
  updateCommentFunc,
};

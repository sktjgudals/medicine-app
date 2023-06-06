import { Prisma } from "@prisma/client";
import prisma from "prisma/prisma";

const likeCountFunc = async (postId: string, likeCount: number) => {
  try {
    return await prisma.post.update({
      where: { id: postId },
      data: { likeCount: likeCount },
    });
  } catch (e) {
    return null;
  }
};

const postLikeDBFunc = async (
  postId: string,
  userId: string,
  type: "del" | "cre"
) => {
  try {
    if (type === "del") {
      return await prisma.postLikes.deleteMany({
        where: { AND: { userId: userId, postId: postId } },
      });
    } else {
      return await prisma.postLikes.create({
        data: { userId: userId, postId: postId },
      });
    }
  } catch (e) {
    return null;
  }
};

const postLikeCheck = (posts: any[], userId: string | null) => {
  const newPost = [];
  if (userId) {
    for (let i = 0; i < posts.length; i++) {
      let isLike = false;
      for (let j = 0; j < posts[i].like.length; j++) {
        if (userId === posts[i].like[j].userId) {
          isLike = true;
        }
      }
      newPost.push({ ...posts[i], isLike });
    }
    return newPost;
  } else {
    for (let i = 0; i < posts.length; i++) {
      let isLike = false;
      newPost.push({ ...posts[i], isLike });
    }
    return newPost;
  }
};

const postsNotLike = (posts: any[]) => {
  const newPost = [];
  for (let i = 0; i < posts.length; i++) {
    let isLike = false;
    newPost.push({ ...posts[i], isLike });
  }
  return newPost;
};

const postResponse = async (
  query: Prisma.PostFindManyArgs,
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

    if (userId) {
      query.include = {
        like: { select: { userId: true } },
        user: { select: { id: true, nickname: true, image: true } },
      };
    }

    if (!userId) {
      query.include = {
        user: { select: { id: true, nickname: true, image: true } },
      };
    }

    return await prisma.post.findMany({
      ...query,
    });
  } catch (e) {
    return [];
  }
};

export {
  likeCountFunc,
  postLikeDBFunc,
  postLikeCheck,
  postsNotLike,
  postResponse,
};

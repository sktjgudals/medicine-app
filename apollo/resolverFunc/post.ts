import prisma from "prisma/prisma";
import { tokenVerify } from "@/utils/token";
import { tagDBFunc } from "@/utils/func/tag";
import { likeCountFunc, postLikeDBFunc } from "@/utils/func/post";
import { deleteImageS3 } from "@/utils/api/image";

const postDataCreateFunc = async (data: JSON, token: string) => {
  try {
    const verifyToken = (await tokenVerify(token)) as any;
    if (verifyToken) {
      const { title, tag, thumbnail, body } = JSON.parse(data as any);
      const postCounted = await prisma.post.findFirst({
        orderBy: { createdAt: "desc" },
        take: 1,
      });
      const postCreate = await prisma.post.create({
        data: {
          userId: verifyToken["id"],
          body: body,
          title: title,
          thumbnail: thumbnail,
          num: postCounted ? postCounted.num + 1 : 1,
        },
      });
      if (tag.length === 0) {
        return { ...postCreate };
      } else {
        tagDBFunc(tag, postCreate["id"]);
        return { ...postCreate };
      }
    } else {
      return null;
    }
  } catch (e) {
    console.info(e);
    return null;
  }
};

const postGetDataFunc = async (userId: string, num: number) => {
  let isLike = false;
  const post = await prisma.post.findFirst({
    where: { num: num },
    include: {
      like: true,
      user: { select: { nickname: true, id: true, image: true } },
      tag: { select: { name: true, id: true } },
    },
  });

  if (post) {
    if (userId) {
      for (let i = 0; i < post.like.length; i++) {
        if (post.like[i].userId === userId) {
          isLike = true;
        }
      }
    }

    return { post: { ...post, isLike } };
  }
  return { error: "post Not Found" };
};

const postTagCreateFunc = async (postTag: string) => {
  try {
    const findTag = await prisma.tag.findFirst({ where: { name: postTag } });
    if (findTag) {
      return findTag;
    } else {
      return await prisma.tag.create({ data: { name: postTag } });
    }
  } catch (e) {
    return null;
  }
};

const postViewUpsertFunc = async (postId: string, views: number) => {
  try {
    return await prisma.post.update({
      where: { id: postId },
      data: { views: views + 1 },
    });
  } catch (e) {
    return null;
  }
};

const postLikeFunc = async (
  postId: string,
  userId: string,
  likeCount: number,
  isLike: boolean
) => {
  try {
    if (isLike) {
      const res = await Promise.all([
        likeCountFunc(postId, likeCount - 1),
        postLikeDBFunc(postId, userId, "del"),
      ]);
      if (res[0] === null || res[1] === null) {
        return null;
      }

      let post = {
        isLike: !isLike,
        ...res[0],
      };
      return post;
    } else {
      const res = await Promise.all([
        likeCountFunc(postId, likeCount + 1),
        postLikeDBFunc(postId, userId, "cre"),
      ]);

      if (res[0] === null || res[1] === null) {
        return null;
      }

      let post = {
        isLike: !isLike,
        ...res[0],
      };
      return post;
    }
  } catch (e) {
    return null;
  }
};

const postDeleteFunc = async (postId: string, thumbnail: string | null) => {
  try {
    if (thumbnail) {
      deleteImageS3(thumbnail);
    }
    await prisma.post.delete({ where: { id: postId } });
    return { id: postId };
  } catch (e) {
    return null;
  }
};

export {
  postDataCreateFunc,
  postGetDataFunc,
  postTagCreateFunc,
  postViewUpsertFunc,
  postLikeFunc,
  postDeleteFunc,
};

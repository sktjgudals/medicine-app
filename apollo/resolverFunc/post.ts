import prisma from "prisma/prisma";
import { tokenVerify } from "@/utils/token";
import {
  likeCountFunc,
  postLikeCheck,
  postLikeDBFunc,
  postsNotLike,
} from "@/utils/func/post";
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
          tagId: tag,
        },
      });
      return postCreate;
    } else {
      return null;
    }
  } catch (e) {
    return null;
  }
};

const postUpdateFunc = async (postId: string, postData: any) => {
  try {
    const { title, tag, thumbnail, body } = JSON.parse(postData);

    return await prisma.post.update({
      where: { id: postId },
      data: { title, body: body, tagId: tag, thumbnail: thumbnail },
      include: { tag: { select: { id: true, name: true } } },
    });
  } catch (e) {
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

const postGetListFunc = async (
  userId: string,
  cursor: string,
  limit: number,
  sort: string
) => {
  try {
    const pageInfo = {
      hasNextPage: false,
      cursor,
    };
    if (userId) {
      if (cursor) {
        const posts = await prisma.post.findMany({
          orderBy: { createdAt: "desc" },
          skip: 1,
          take: limit,
          cursor: { id: cursor },
          include: {
            like: { select: { userId: true } },
            user: { select: { id: true, nickname: true, image: true } },
          },
        });
        const newPosts = postLikeCheck(posts, userId);
        if (posts.length > limit - 1) {
          pageInfo["hasNextPage"] = true;
        }
        return { posts: newPosts, pageInfo };
      } else {
        const posts = await prisma.post.findMany({
          orderBy: { createdAt: "desc" },
          take: limit,
          include: {
            like: { select: { userId: true } },
            user: { select: { id: true, nickname: true, image: true } },
          },
        });
        const newPosts = postLikeCheck(posts, userId);
        if (posts.length > limit - 1) {
          pageInfo["hasNextPage"] = true;
        }
        return { posts: newPosts, pageInfo };
      }
    } else {
      // postsNotLike;
      if (cursor) {
        const posts = await prisma.post.findMany({
          orderBy: { createdAt: "desc" },
          skip: 1,
          take: limit,
          cursor: { id: cursor },
          include: {
            user: { select: { id: true, nickname: true, image: true } },
          },
        });
        const newPosts = postsNotLike(posts);
        if (posts.length > limit - 1) {
          pageInfo["hasNextPage"] = true;
        }
        return { posts: newPosts, pageInfo };
      } else {
        const posts = await prisma.post.findMany({
          orderBy: { createdAt: "desc" },
          take: limit,
          include: {
            user: { select: { id: true, nickname: true, image: true } },
          },
        });
        const newPosts = postsNotLike(posts);
        if (posts.length > limit - 1) {
          pageInfo["hasNextPage"] = true;
        }
        return { posts: newPosts, pageInfo };
      }
    }
  } catch (e) {
    return null;
  }
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
  postGetListFunc,
  postTagCreateFunc,
  postViewUpsertFunc,
  postLikeFunc,
  postDeleteFunc,
  postUpdateFunc,
};

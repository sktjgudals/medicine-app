import prisma from "prisma/prisma";
import { tokenVerify } from "@/utils/token";
import { tagDBFunc } from "@/utils/func/tag";

const postDataCreateFunc = async (data: JSON, token: string) => {
  try {
    const verifyToken = (await tokenVerify(token)) as any;
    if (verifyToken) {
      const { title, tag, thumbnail, body } = JSON.parse(data as any);
      const postCounted = await prisma.post.findFirst({
        orderBy: { createdAt: "desc" },
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
        return { post: postCreate, token };
      } else {
        tagDBFunc(tag, postCreate["id"]);
        return { post: postCreate, token };
      }
    } else {
      return { post: null, token: null };
    }
  } catch (e) {
    console.info(e);
    return { post: null, token: token };
  }
};

const postGetDataFunc = async (userId: string, num: number) => {
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
    }

    return { post: post };
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

export {
  postDataCreateFunc,
  postGetDataFunc,
  postTagCreateFunc,
  postViewUpsertFunc,
};

import prisma from "prisma/prisma";
import { tokenVerify } from "@/utils/token";
import { tagDBFunc } from "@/utils/func/tag";

const postDataCreateFunc = async (data: JSON, token: string) => {
  try {
    const verifyToken = (await tokenVerify(token)) as any;
    if (verifyToken) {
      const { title, tag, thumbnail, body } = JSON.parse(data as any);
      const countPost = (await prisma.post.count()) + 1;
      const postCreate = await prisma.post.create({
        data: {
          userId: verifyToken["id"],
          body: body,
          title: title,
          number: countPost,
          thumbnail: thumbnail,
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
  const post = await prisma.post.findFirst({ where: { number: num } });
  console.info(post);
  if (post) {
    return { post };
  }
  return { error: "post Not Found" };
};

export { postDataCreateFunc, postGetDataFunc };

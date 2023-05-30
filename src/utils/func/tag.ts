import { arrCompare } from "./common";
import prisma from "prisma/prisma";

const tagPush = async (tagId: string, postId: string) => {
  try {
    return await prisma.$runCommandRaw({
      update: "Tag",
      updates: [
        {
          q: {
            _id: { $oid: tagId },
          },
          u: {
            $push: {
              postId: { $oid: postId },
            },
          },
          multi: false,
        },
      ],
    });
  } catch (e) {
    return false;
  }
};

const postPush = async (tagId: string, postId: string) => {
  try {
    return await prisma.$runCommandRaw({
      update: "Post",
      updates: [
        {
          q: {
            _id: { $oid: postId },
          },
          u: {
            $push: {
              tagId: { $oid: tagId },
            },
          },
          multi: false,
        },
      ],
    });
  } catch (e) {
    return false;
  }
};

const tagDBFunc = async (tag: any, postId: string) => {
  for (let i = 0; i < tag.length; i++) {
    const res = await Promise.all([
      postPush(tag[i].id, postId),
      tagPush(tag[i].id, postId),
    ]);
  }
};

export { tagDBFunc };

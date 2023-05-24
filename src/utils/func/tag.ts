import { arrCompare } from "./common";
import prisma from "prisma/prisma";

const tagDBFunc = async (tag: any, postId: string) => {
  for (let i = 0; i < tag.length; i++) {
    await prisma.$runCommandRaw({
      update: "Tag",
      updates: [
        {
          q: {
            _id: { $oid: tag[i].id },
          },
          u: {
            $push: {
              postId: { $oid: postId },
            },
          },
          multi: true,
        },
      ],
    });
  }
};

export { tagDBFunc };

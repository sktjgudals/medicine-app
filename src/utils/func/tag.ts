import { arrCompare } from "./common";
import prisma from "prisma/prisma";

const tagDBFunc = async (tag: any, postId: string) => {
  let tagList = [] as string[];

  for (let i = 0; i < tag.length; i++) {
    tagList.push(tag[i].name);
  }

  const dbTagList = await prisma.tag.findMany({
    where: { name: { in: tagList } },
  });

  if (dbTagList.length > 0) {
    const comparedArr = (await arrCompare(tag, dbTagList, "name")) as any;
    if (comparedArr[0].length !== 0) {
      for (let j = 0; j < comparedArr[0].length; j++) {
        await prisma.tag.create({
          data: {
            postId: [postId],
            name: comparedArr[0][j].name,
          },
        });
      }
    }
    if (comparedArr[1].length !== 0) {
      for (let i = 0; i < dbTagList.length; i++) {
        for (let j = 0; j < comparedArr[1].length; j++) {
          if (comparedArr[1][j].name === dbTagList[i].name) {
            await prisma.$runCommandRaw({
              update: "Tag",
              updates: [
                {
                  q: {
                    _id: { $oid: dbTagList[i].id },
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
          }
        }
      }
    }
  } else {
    await prisma.tag.createMany({
      data: tag,
    });
  }
};

export { tagDBFunc };

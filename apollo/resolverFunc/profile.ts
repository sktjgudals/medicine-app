import prisma from "prisma/prisma";

const getProfileDataFunc = async (
  nickname: string,
  cursor: string,
  limit: number
) => {
  try {
    console.info(cursor);
    const pageInfo = {
      cursor: cursor,
      hasNextPage: false,
    };
    if (cursor) {
      const res = await prisma.post.findMany({
        skip: 1,
        take: limit,
        orderBy: { createdAt: "desc" },
        where: { id: cursor },
      });
      console.info(res);
      // skip: 1,
      // take: limit,
    }

    const res = await prisma.user.findFirst({
      where: { nickname },
      include: {
        posts: {
          take: limit,
          orderBy: { createdAt: "desc" },
          include: { tag: true },
        },
      },
    });

    if (res) {
      if (res.posts.length === 5) {
        pageInfo["hasNextPage"] = true;
      }

      return { user: res, posts: res.posts, pageInfo };
    }
    return { user: null, posts: null };
  } catch (e) {
    return null;
  }
};

export { getProfileDataFunc };

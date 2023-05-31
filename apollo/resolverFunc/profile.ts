import prisma from "prisma/prisma";

const getProfileDataFunc = async (
  nickname: string,
  cursor: string,
  limit: number
) => {
  try {
    const pageInfo = {
      cursor: cursor,
      hasNextPage: false,
    };
    if (cursor) {
      const res = await prisma.post.findMany({
        skip: 1,
        take: limit,
        orderBy: { createdAt: "desc" },
        cursor: { id: cursor },
      });
      if (res.length > limit - 1) {
        pageInfo["hasNextPage"] = true;
      }
      return { posts: res, pageInfo };
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
      if (res.posts.length > limit - 1) {
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

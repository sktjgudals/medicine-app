import prisma from "prisma/prisma";

const getProfileDataFunc = async (
  nickname: string,
  cursor: string,
  limit: number,
  postUserId: string | null
) => {
  try {
    const pageInfo = {
      cursor: cursor,
      hasNextPage: false,
    };

    if (cursor && postUserId) {
      const res = await prisma.post.findMany({
        skip: 1,
        take: limit,
        orderBy: { createdAt: "desc" },
        cursor: { id: cursor },
        where: { userId: postUserId },
      });
      if (res.length > limit - 1) {
        pageInfo["hasNextPage"] = true;
      }
      return { posts: res, pageInfo };
    }

    const res = await prisma.user.findFirst({
      where: { nickname: nickname },
      include: {
        posts: {
          take: limit,
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (res) {
      if (res.posts.length > limit - 1) {
        pageInfo["hasNextPage"] = true;
      }
      return { user: res, posts: res.posts, pageInfo };
    } else {
      return null;
    }
  } catch (e) {
    return null;
  }
};

export { getProfileDataFunc };

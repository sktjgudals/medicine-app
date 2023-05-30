import prisma from "prisma/prisma";

const getProfileDataFunc = async (nickname: string) => {
  try {
    const res = await prisma.user.findFirst({
      where: { nickname },
      include: {
        posts: {
          take: 5,
          orderBy: { createdAt: "desc" },
          include: { tag: true },
        },
      },
    });
    if (res) {
      return { user: res, posts: res.posts };
    }
    return { user: null, posts: null };
  } catch (e) {
    return null;
  }
};

export { getProfileDataFunc };

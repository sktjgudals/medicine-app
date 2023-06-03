import prisma from "prisma/prisma";

const likeCountFunc = async (postId: string, likeCount: number) => {
  try {
    return await prisma.post.update({
      where: { id: postId },
      data: { likeCount: likeCount },
    });
  } catch (e) {
    return null;
  }
};

const postLikeDBFunc = async (
  postId: string,
  userId: string,
  type: "del" | "cre"
) => {
  try {
    if (type === "del") {
      return await prisma.postLikes.deleteMany({
        where: { AND: { userId: userId, postId: postId } },
      });
    } else {
      return await prisma.postLikes.create({
        data: { userId: userId, postId: postId },
      });
    }
  } catch (e) {
    return null;
  }
};

export { likeCountFunc, postLikeDBFunc };

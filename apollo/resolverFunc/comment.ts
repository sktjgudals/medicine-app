import prisma from "prisma/prisma";
const uploadCommentFunc = async (
  postId: string,
  value: string,
  user: any,
  length: number
) => {
  try {
    let isLike = false;

    const comment = await prisma.comment.create({
      data: { postId: postId, body: value, userId: user.id, length: length },
    });
    return { ...comment, isLike, user };
  } catch (e) {
    return null;
  }
};

export { uploadCommentFunc };

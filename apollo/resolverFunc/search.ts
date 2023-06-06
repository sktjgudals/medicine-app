import { postLikeCheck, postsNotLike } from "@/utils/func/post";
import { postSearchListFunc } from "@/utils/func/search";
import prisma from "prisma/prisma";

const getSearchPostFunc = async (
  keyword: string,
  userId: string,
  cursor: string,
  limit: number,
  sort: string
) => {
  try {
    const pageInfo = {
      hasNextPage: false,
      cursor,
    };
    //  const count: any = await prisma.post.aggregateRaw({
    //    pipeline: [
    //      {
    //        $search: {
    //          index: "postSearch",
    //          text: {
    //            query: word,
    //            path: "titleAndBody",
    //          },
    //        },
    //      },
    //      {
    //        $match: {
    //          communityId: { $oid: komyuId },
    //          blind: false,
    //          userId: { $nin: banList },
    //        },
    //      },
    //      {
    //        $count: "num",
    //      },
    //    ],
    //  });
    //  const totalPageNumber = Math.ceil(count[0].num / limit);
    if (userId) {
      if (cursor) {
        const postIdList = await postSearchListFunc(cursor, keyword, limit);
        const posts = await prisma.post.findMany({
          where: { id: { in: postIdList } },
          orderBy: [{ createdAt: "desc" }, { id: "asc" }],
          take: limit,
          include: {
            like: { select: { userId: true } },
            user: { select: { id: true, nickname: true, image: true } },
          },
        });
        const newPosts = postLikeCheck(posts, userId);
        if (newPosts.length > limit - 1) {
          pageInfo["hasNextPage"] = true;
        }
        console.info(newPosts.length === limit);
        console.info(pageInfo);
        return { posts: newPosts, pageInfo };
      } else {
        const postIdList = await postSearchListFunc(cursor, keyword, limit);
        const posts = await prisma.post.findMany({
          where: { id: { in: postIdList } },
          orderBy: [{ createdAt: "desc" }, { id: "asc" }],
          take: limit,
          include: {
            like: { select: { userId: true } },
            user: { select: { id: true, nickname: true, image: true } },
          },
        });
        const newPosts = postLikeCheck(posts, userId);
        if (posts.length > limit - 1) {
          pageInfo["hasNextPage"] = true;
        }
        // console.info(newPosts);
        return { posts: newPosts, pageInfo };
      }
    } else {
      if (cursor) {
        const postIdList = await postSearchListFunc(cursor, keyword, limit);
        const posts = await prisma.post.findMany({
          where: { id: { in: postIdList } },
          orderBy: [{ createdAt: "desc" }, { id: "asc" }],
          take: limit,
          include: {
            user: { select: { id: true, nickname: true, image: true } },
          },
        });
        const newPosts = postsNotLike(posts);
        if (posts.length > limit - 1) {
          pageInfo["hasNextPage"] = true;
        }
        return { posts: newPosts, pageInfo };
      } else {
        // const a = await prisma.post.findMany({
        //   where: {
        //     body: {
        //       search: keyword,
        //     },
        //   },
        // });
        // console.info(a + "asd");
        const postIdList = await postSearchListFunc(cursor, keyword, limit);
        const posts = await prisma.post.findMany({
          where: { id: { in: postIdList } },
          orderBy: [{ createdAt: "desc" }, { id: "asc" }],
          take: limit,
          include: {
            user: { select: { id: true, nickname: true, image: true } },
          },
        });
        const newPosts = postsNotLike(posts);
        if (posts.length > limit - 1) {
          pageInfo["hasNextPage"] = true;
        }
        return { posts: newPosts, pageInfo };
      }
    }
  } catch (e) {
    console.info(e);
    return null;
  }
};

const getSearchTagFunc = async (
  keyword: string,
  userId: string,
  cursor: string,
  limit: number,
  sort: string
) => {
  try {
  } catch (e) {
    return null;
  }
};

const getSearchUserFunc = async (
  keyword: string,
  userId: string,
  cursor: string,
  limit: number,
  sort: string
) => {
  try {
  } catch (e) {
    return null;
  }
};

export { getSearchPostFunc, getSearchTagFunc, getSearchUserFunc };

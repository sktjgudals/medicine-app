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
    if (userId) {
      if (cursor) {
        const postList = await postSearchListFunc(
          cursor,
          keyword,
          limit,
          userId
        );

        const newPosts = postLikeCheck(postList, userId);
        if (newPosts.length > limit - 1) {
          pageInfo["hasNextPage"] = true;
        }

        return { posts: newPosts, pageInfo };
      } else {
        const postList = await postSearchListFunc(
          cursor,
          keyword,
          limit,
          userId
        );
        const newPosts = postLikeCheck(postList, userId);
        if (postList.length > limit - 1) {
          pageInfo["hasNextPage"] = true;
        }
        return { posts: newPosts, pageInfo };
      }
    } else {
      if (cursor) {
        const postList = await postSearchListFunc(
          cursor,
          keyword,
          limit,
          userId
        );
        const newPosts = postsNotLike(postList);
        if (postList.length > limit - 1) {
          pageInfo["hasNextPage"] = true;
        }
        return { posts: newPosts, pageInfo };
      } else {
        const postList = await postSearchListFunc(
          cursor,
          keyword,
          limit,
          userId
        );

        const newPosts = postsNotLike(postList);
        if (postList.length > limit - 1) {
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

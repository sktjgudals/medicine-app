import { postLikeCheck } from "@/utils/func/post";
import {
  postSearchListFunc,
  tagSearchListFunc,
  userSearchListFunc,
} from "@/utils/func/search";

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
    const postList = await postSearchListFunc(cursor, keyword, limit, userId);
    const newPosts = postLikeCheck(postList, userId);
    if (postList.length > limit - 1) {
      pageInfo["hasNextPage"] = true;
    }
    return { posts: newPosts, pageInfo };
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
    const pageInfo = {
      hasNextPage: false,
      cursor,
    };
    const postList = await tagSearchListFunc(cursor, keyword, limit, userId);
    const newPosts = postLikeCheck(postList, userId);
    if (postList.length > limit - 1) {
      pageInfo["hasNextPage"] = true;
    }
    return { posts: newPosts, pageInfo };
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
    const pageInfo = {
      hasNextPage: false,
      cursor,
    };
    const userList = await userSearchListFunc(cursor, keyword, limit, userId);

    if (userList.length > limit - 1) {
      pageInfo["hasNextPage"] = true;
    }
    return { users: userList, pageInfo };
  } catch (e) {
    return null;
  }
};

export { getSearchPostFunc, getSearchTagFunc, getSearchUserFunc };

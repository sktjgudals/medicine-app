import GraphQLJSON from "graphql-type-json";
import { GraphQLScalarType, Kind } from "graphql";

import {
  createLocalUserFunc,
  findUserEmailFunc,
  findUserNicknameFunc,
} from "./resolverFunc/signup";
import { signinLocalUserFunc } from "./resolverFunc/signin";
import {
  oauthKakaoUserLinkFunc,
  oauthNaverLinkFunc,
} from "./resolverFunc/oauth";
import {
  postDataCreateFunc,
  postDeleteFunc,
  postGetDataFunc,
  postLikeFunc,
  postTagCreateFunc,
  postViewUpsertFunc,
} from "./resolverFunc/post";
import {
  changePasswordFunc,
  changeProfileImageFunc,
  changeProfileInfoFunc,
  changeProfileNicknameFunc,
  deleteUserFunc,
  getUserDataFunc,
} from "./resolverFunc/setting";
import { getProfileDataFunc } from "./resolverFunc/profile";
import {
  commentDeleteFunc,
  getCommentsFunc,
  updateCommentFunc,
  uploadCommentFunc,
} from "./resolverFunc/comment";

const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  serialize(value: any) {
    return value.getTime();
  },
  parseValue(value: any) {
    return new Date(value);
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10));
    }
    return null;
  },
});

export const resolvers = {
  JSON: GraphQLJSON,
  Date: dateScalar,
  Query: {
    findUserEmail: async (_: any, { email }: { email: string }) =>
      findUserEmailFunc(email),
    findUserNickname: async (_: any, { nickname }: { nickname: string }) =>
      findUserNicknameFunc(nickname),
    postGetData: async (
      _: any,
      { userId, num }: { userId: string; num: number }
    ) => postGetDataFunc(userId, num),
    getUserData: async (_: any, { userId }: { userId: string }) =>
      getUserDataFunc(userId),
    getProfileData: async (
      _: any,
      {
        nickname,
        cursor,
        limit,
        postUserId,
      }: {
        nickname: string;
        cursor: string;
        limit: number;
        postUserId: string | null;
      }
    ) => getProfileDataFunc(nickname, cursor, limit, postUserId),
    getComments: (
      _: any,
      {
        postId,
        userId,
        cursor,
        limit,
        sort,
      }: {
        postId: string;
        userId: string;
        cursor: string;
        limit: number;
        sort: string;
      }
    ) => getCommentsFunc(postId, userId, cursor, limit, sort),
  },
  Mutation: {
    createLocalUser: (
      _: any,
      {
        email,
        nickname,
        password,
      }: { email: string; nickname: string; password: string }
    ) => createLocalUserFunc(email, nickname, password),
    signinLocalUser: (
      _: any,
      { email, password }: { email: string; password: string }
    ) => signinLocalUserFunc(email, password),
    oauthKakaoUserLink: () => oauthKakaoUserLinkFunc(),
    oauthNaverLink: () => oauthNaverLinkFunc(),
    postDataCreate: (
      _: any,
      { postData, token }: { postData: JSON; token: string }
    ) => postDataCreateFunc(postData, token),
    postTagCreate: (_: any, { postTag }: { postTag: string }) =>
      postTagCreateFunc(postTag),
    changeProfileImage: (
      _: any,
      { image, userId }: { image: string; userId: string }
    ) => changeProfileImageFunc(image, userId),
    changeProfileNickname: (
      _: any,
      { nickname, userId }: { nickname: string; userId: string }
    ) => changeProfileNicknameFunc(nickname, userId),
    changeProfileInfo: (
      _: any,
      { info, userId, type }: { info: string; userId: string; type: string }
    ) => changeProfileInfoFunc(info, userId, type),
    changePassword: (
      _: any,
      { userId, password }: { userId: string; password: string }
    ) => changePasswordFunc(userId, password),
    deleteUser: (_: any, { userId }: { userId: string }) =>
      deleteUserFunc(userId),
    postViewUpsert: (
      _: any,
      { postId, views }: { postId: string; views: number }
    ) => postViewUpsertFunc(postId, views),
    postLike: (
      _: any,
      {
        postId,
        userId,
        likeCount,
        isLike,
      }: { postId: string; userId: string; likeCount: number; isLike: boolean }
    ) => postLikeFunc(postId, userId, likeCount, isLike),
    postDelete: (
      _: any,
      { postId, thumbnail }: { postId: string; thumbnail: string | null }
    ) => postDeleteFunc(postId, thumbnail),
    uploadComment: (
      _: any,
      {
        postId,
        value,
        user,
        length,
      }: { postId: string; value: string; user: JSON; length: number }
    ) => uploadCommentFunc(postId, value, user, length),
    updateComment: (
      _: any,
      {
        commentId,
        value,
        user,
        length,
      }: { commentId: string; value: string; user: JSON; length: number }
    ) => updateCommentFunc(commentId, value, user, length),
    commentDelete: (
      _: any,
      { commentId, userId }: { commentId: string; userId: string }
    ) => commentDeleteFunc(commentId, userId),
  },
};

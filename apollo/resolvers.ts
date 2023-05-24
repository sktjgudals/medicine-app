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
  postGetDataFunc,
  postTagCreateFunc,
} from "./resolverFunc/post";
import {
  changeProfileImageFunc,
  getUserDataFunc,
} from "./resolverFunc/setting";

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
  },
};

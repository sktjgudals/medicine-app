import GraphQLJSON from "graphql-type-json";

import {
  createLocalUserFunc,
  findUserEmailFunc,
  findUserNicknameFunc,
} from "./resolverFunc/signup";
import { signinLocalUserFunc } from "./resolverFunc/signin";

export const resolvers = {
  JSON: GraphQLJSON,
  Query: {
    a: () => "aaaa",
    findUserEmail: async (_: any, { email }: { email: string }) =>
      findUserEmailFunc(email),

    findUserNickname: async (_: any, { nickname }: { nickname: string }) =>
      findUserNicknameFunc(nickname),
  },
  Mutation: {
    createLocalUser: async (
      _: any,
      {
        email,
        nickname,
        password,
      }: { email: string; nickname: string; password: string }
    ) => createLocalUserFunc(email, nickname, password),
    signinLocalUser: async (
      _: any,
      { email, password }: { email: string; password: string }
    ) => signinLocalUserFunc(email, password),
  },
};

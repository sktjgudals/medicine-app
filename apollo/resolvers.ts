import prisma from "prisma/prisma";
import GraphQLJSON from "graphql-type-json";

import { test } from "./resolverFunc/test";
import {
  createLocalUserFunc,
  findUserEmailFunc,
  findUserNicknameFunc,
} from "./resolverFunc/signup";

export const resolvers = {
  JSON: GraphQLJSON,
  Query: {
    test: () => test<string>(prisma),
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
  },
};

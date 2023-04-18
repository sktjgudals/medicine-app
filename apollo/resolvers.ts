import prisma from "prisma/prisma";
import GraphQLJSON from "graphql-type-json";

import { test } from "./resolverFunc/test";
import { createLocalUserFunc } from "./resolverFunc/signup";

export const resolvers = {
  JSON: GraphQLJSON,
  Query: {
    test: () => test<string>(prisma),
    a: () => "aaaa",
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

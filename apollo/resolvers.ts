// import prisma from "prisma/prisma";
import { test } from "./resolverFunc/test";

export const resolvers = {
  Query: {
    hello: () => hello(),
    test: () => test<string>(""),
    a: () => "aaaa",
  },
};

function hello() {
  // 디비 호출 해서
  // orm으로 꺼내줘서 디비
  //   return "hello test";
}

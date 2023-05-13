import GraphQLJSON from "graphql-type-json";

console.info();
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
import { medicinePostFunc } from "./resolverFunc/post";

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
    medicinePost: (_: any, { data }: { data: JSON }) => medicinePostFunc(data),
  },
};

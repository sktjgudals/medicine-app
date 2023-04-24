import { gql } from "graphql-tag";
import { makeExecutableSchema } from "@graphql-tools/schema";
export const typeDefs = gql`
  scalar JSON

  type User {
    id: String
    email: String
    nickname: String
    image: String
  }

  type UserResponse {
    id: String
    token: JSON
    error: Boolean
  }

  type Query {
    test: String
    a: String
    findUserEmail(email: String): User
    findUserNickname(nickname: String): User
  }

  type Mutation {
    createLocalUser(
      email: String!
      nickname: String!
      password: String!
    ): UserResponse
    signinLocalUser(email: String!, password: String!): UserResponse
  }
`;

export const schema = makeExecutableSchema({ typeDefs });

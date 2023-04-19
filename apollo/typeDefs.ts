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

  type CreateUserResponse {
    id: String
    token: JSON
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
    ): CreateUserResponse
  }
`;

export const schema = makeExecutableSchema({ typeDefs });

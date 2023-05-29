import { gql } from "graphql-tag";
import { makeExecutableSchema } from "@graphql-tools/schema";

export const typeDefs = gql`
  scalar JSON
  scalar Date

  type User {
    id: String
    email: String
    name: String
    nickname: String
    image: String
    createdAt: Date
    type: String
    introduction: String
  }

  type UserResponse {
    id: String
    access_token: JSON
    refresh_token: JSON
    error: Boolean
    code: String
    url: String
  }

  type PostTag {
    id: String
    name: String
  }

  type Post {
    _id: String
    id: String
    title: String
    body: String
    views: Int
    likeCount: Int
    userId: String
    isLike: Boolean
    like: [PostLike]
    user: User
    thumbnail: String
    comments: [Comment]
    tag: [PostTag]
    updatedAt: Date
    createdAt: Date
    deletedAt: Date
  }

  type PostLike {
    id: String
    user: User
    userId: String
    post: Post
    postId: String
  }

  type Comment {
    _id: String
    id: String
    post: Post
    postId: String
    user: User
    isLike: Boolean
    likeCount: Int
    isReply: Boolean
    update: Boolean
    replyCount: Int
    userId: String
    body: String
    length: Int
    like: [CommentLike]
    subComments: [SubComment]
    updatedAt: Date
    createdAt: Date
  }

  type CommentLike {
    _id: String
    id: String
    user: User
    userId: String
    comment: Comment
    commentId: String
  }

  type SubComment {
    _id: String
    id: String
    comment: Comment
    commentId: String
    user: User
    length: Int
    update: Boolean
    isLike: Boolean
    likeCount: Int
    userId: String
    body: String
    like: [SubCommentLike]
    updatedAt: Date
    createdAt: Date
  }

  type SubCommentLike {
    _id: String
    id: String
    user: User
    userId: String
    subComment: SubComment
    subCommentId: String
  }

  type PostCreateResoponse {
    post: Post
    token: String
  }

  type PostResoponse {
    post: Post
    error: String
  }

  type ProfileDataResponse {
    user: User
    posts: [Post]
  }

  type Query {
    findUserEmail(email: String): User
    findUserNickname(nickname: String): User
    getUserData(userId: String!): User
    postGetData(userId: String, postId: String!): PostResoponse
    getProfileData(nickname: String!): ProfileDataResponse
  }

  type Mutation {
    createLocalUser(
      email: String!
      nickname: String!
      password: String!
    ): UserResponse
    changeProfileImage(image: String!, userId: String!): UserResponse
    changeProfileNickname(nickname: String!, userId: String!): UserResponse
    changeProfileInfo(info: String!, userId: String!, type: String!): User
    changePassword(password: String!, userId: String!): User
    deleteUser(userId: String!): String
    signinLocalUser(email: String!, password: String!): UserResponse
    oauthKakaoUserLink: UserResponse
    oauthNaverLink: UserResponse
    postTagCreate(postTag: String!): PostTag
    postDataCreate(postData: JSON!, token: String!): PostCreateResoponse
  }
`;

export const schema = makeExecutableSchema({ typeDefs });

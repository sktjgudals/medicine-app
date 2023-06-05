import { gql } from "@apollo/client";

const GetSearchPost = gql`
  query data(
    $keyword: String!
    $userId: String
    $cursor: String
    $limit: Int!
    $sort: String!
  ) {
    getSearchPost(
      keyword: $keyword
      userId: $userId
      cursor: $cursor
      limit: $limit
      sort: $sort
    ) {
      posts {
        id
        title
        num
        thumbnail
        body
        views
        createdAt
        isLike
        likeCount
        user {
          id
          nickname
          image
        }
      }
      pageInfo {
        hasNextPage
        cursor
      }
    }
  }
`;

const GetSearchTag = gql`
  query data(
    $keyword: String!
    $userId: String
    $cursor: String
    $limit: Int!
    $sort: String!
  ) {
    getSearchTag(
      keyword: $keyword
      userId: $userId
      cursor: $cursor
      limit: $limit
      sort: $sort
    ) {
      posts {
        id
        title
        num
        thumbnail
        body
        views
        createdAt
        isLike
        likeCount
        user {
          id
          nickname
          image
        }
      }
      pageInfo {
        hasNextPage
        cursor
      }
    }
  }
`;

const GetSearchUser = gql`
  query data(
    $keyword: String!
    $userId: String
    $cursor: String
    $limit: Int!
    $sort: String!
  ) {
    getSearchUser(
      keyword: $keyword
      userId: $userId
      cursor: $cursor
      limit: $limit
      sort: $sort
    ) {
      users {
        id
        nickname
        image
      }
      pageInfo {
        hasNextPage
        cursor
      }
    }
  }
`;

export { GetSearchPost, GetSearchTag, GetSearchUser };

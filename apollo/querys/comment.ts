import { gql } from "@apollo/client";

const CommentMutation = gql`
  mutation data(
    $postId: String!
    $value: String!
    $user: JSON!
    $length: Int!
  ) {
    uploadComment(
      postId: $postId
      value: $value
      user: $user
      length: $length
    ) {
      id
      postId
      body
      length
      isLike
      likeCount
      createdAt
      user {
        id
        nickname
        image
      }
    }
  }
`;

const CommentsQuery = gql`
  query data(
    $postId: String!
    $userId: String
    $cursor: String
    $limit: Int!
    $sort: String!
  ) {
    getComments(
      postId: $postId
      userId: $userId
      cursor: $cursor
      limit: $limit
      sort: $sort
    ) {
      comments {
        id
        body
        length
        postId
        isLike
        likeCount
        createdAt
        user {
          id
          nickname
          image
        }
      }
      pageInfo {
        cursor
        hasNextPage
      }
    }
  }
`;

export { CommentMutation, CommentsQuery };

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

const CommentReMutation = gql`
  mutation data(
    $commentId: String!
    $value: String!
    $user: JSON!
    $length: Int!
  ) {
    updateComment(
      commentId: $commentId
      value: $value
      user: $user
      length: $length
    ) {
      id
      body
      length
      createdAt
    }
  }
`;

const CommentDelMutation = gql`
  mutation data($commentId: String!, $userId: String!) {
    commentDelete(commentId: $commentId, userId: $userId) {
      id
    }
  }
`;

const CommentLikeMutation = gql`
  mutation data(
    $commentId: String!
    $userId: String!
    $likeCount: Int!
    $isLike: Boolean!
  ) {
    commentLike(
      commentId: $commentId
      userId: $userId
      likeCount: $likeCount
      isLike: $isLike
    ) {
      id
      isLike
      likeCount
      createdAt
    }
  }
`;
export {
  CommentMutation,
  CommentsQuery,
  CommentDelMutation,
  CommentLikeMutation,
  CommentReMutation,
};

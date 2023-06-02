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

export { CommentMutation };

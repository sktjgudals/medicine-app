import { gql } from "@apollo/client";

const PostDataMutation = gql`
  mutation data($postData: JSON!, $token: String!) {
    postDataCreate(postData: $postData, token: $token) {
      post {
        id
        title
        views
        createdAt
      }
      token
    }
  }
`;

const PostTagMutation = gql`
  mutation data($postTag: String!) {
    postTagCreate(postTag: $postTag) {
      id
      name
    }
  }
`;

const PostGetData = gql`
  query data($userId: String, $postId: String!) {
    postGetData(userId: $userId, postId: $postId) {
      post {
        id
        title
        thumbnail
        body
        views
        createdAt
        updatedAt
        isLike
        postTag {
          id
          name
        }
        user {
          id
          nickname
          image
        }
      }
      error
    }
  }
`;

export { PostDataMutation, PostGetData, PostTagMutation };

import { gql } from "@apollo/client";

const PostDataMutation = gql`
  mutation data($postData: JSON!, $token: String!) {
    postDataCreate(postData: $postData, token: $token) {
      post {
        id
        title
        number
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
  query data($userId: String, $num: Int!) {
    postGetData(userId: $userId, num: $num) {
      post {
        id
        title
        number
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

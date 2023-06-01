import { gql } from "@apollo/client";

const PostDataMutation = gql`
  mutation data($postData: JSON!, $token: String!) {
    postDataCreate(postData: $postData, token: $token) {
      post {
        id
        title
        views
        createdAt
        num
      }
      token
    }
  }
`;

const PostViewMutation = gql`
  mutation data($postId: String!, $views: Int!) {
    postViewUpsert(postId: $postId, views: $views) {
      id
      title
      views
      createdAt
      num
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
        num
        thumbnail
        body
        views
        createdAt
        updatedAt
        isLike
        tag {
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

export { PostDataMutation, PostGetData, PostTagMutation, PostViewMutation };

import { gql } from "@apollo/client";

const PostDataMutation = gql`
  mutation data($postData: JSON!, $token: String!) {
    postDataCreate(postData: $postData, token: $token) {
      id
      title
      num
      thumbnail
      body
      views
      createdAt
      updatedAt
      isLike
      likeCount
    }
  }
`;

const PostViewMutation = gql`
  mutation data($postId: String!, $views: Int!) {
    postViewUpsert(postId: $postId, views: $views) {
      id
      title
      views
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
        likeCount
        tag {
          id
          name
        }
        user {
          id
          nickname
          image
        }
        like {
          id
          userId
          postId
        }
      }
      error
    }
  }
`;

const PostLikeMutation = gql`
  mutation data(
    $postId: String!
    $userId: String!
    $likeCount: Int!
    $isLike: Boolean!
  ) {
    postLike(
      postId: $postId
      userId: $userId
      likeCount: $likeCount
      isLike: $isLike
    ) {
      id
      title
      views
      isLike
      likeCount
      createdAt
      num
    }
  }
`;

const PostDeleteMutation = gql`
  mutation data($postId: String!, $thumbnail: String) {
    postDelete(postId: $postId, thumbnail: $thumbnail) {
      id
    }
  }
`;

export {
  PostDataMutation,
  PostGetData,
  PostTagMutation,
  PostViewMutation,
  PostLikeMutation,
  PostDeleteMutation,
};

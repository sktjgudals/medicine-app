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
      isLike
      likeCount
    }
  }
`;

const PostUpdateMutation = gql`
  mutation data($postId: String!, $postData: JSON!) {
    postUpdate(postId: $postId, postData: $postData) {
      id
      title
      num
      thumbnail
      body
      views
      createdAt
      isLike
      likeCount
      tag {
        id
        name
      }
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
        isLike
        likeCount
        user {
          id
          nickname
          image
        }
        tag {
          id
          name
        }
      }
      error
    }
  }
`;

const PostGetList = gql`
  query data($userId: String, $cursor: String, $limit: Int!, $sort: String!) {
    postGetList(userId: $userId, cursor: $cursor, limit: $limit, sort: $sort) {
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
  PostUpdateMutation,
  PostGetList,
};

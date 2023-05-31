import { gql } from "@apollo/client";

const GetProfileData = gql`
  query data($nickname: String!, $cursor: String, $limit: Int!) {
    getProfileData(nickname: $nickname, cursor: $cursor, limit: $limit) {
      user {
        id
        nickname
        image
        introduction
        createdAt
        type
      }
      posts {
        id
        title
        thumbnail
        body
        views
        num
        createdAt
        updatedAt
        isLike
        tag {
          id
          name
        }
      }
      pageInfo {
        cursor
        hasNextPage
      }
    }
  }
`;

export { GetProfileData };

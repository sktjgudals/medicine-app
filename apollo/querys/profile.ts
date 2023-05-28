import { gql } from "@apollo/client";

const GetProfileData = gql`
  query data($nickname: String!) {
    getProfileData(nickname: $nickname) {
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
        createdAt
        updatedAt
        isLike
        postTag {
          id
          name
        }
      }
    }
  }
`;

export { GetProfileData };

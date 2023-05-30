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
        num
        createdAt
        updatedAt
        isLike
        tag {
          id
          name
        }
      }
    }
  }
`;

export { GetProfileData };

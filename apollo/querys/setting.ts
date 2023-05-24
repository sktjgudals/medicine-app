import { gql } from "@apollo/client";

const GetUserData = gql`
  query data($userId: String!) {
    getUserData(userId: $userId) {
      id
      nickname
      image
      introduction
      createdAt
    }
  }
`;

const ChangeProfileImage = gql`
  mutation data($image: String!, $userId: String!) {
    changeProfileImage(image: $image, userId: $userId) {
      access_token
      refresh_token
      error
    }
  }
`;

export { GetUserData, ChangeProfileImage };

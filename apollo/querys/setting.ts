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

const ChangeProfileNickname = gql`
  mutation data($nickname: String!, $userId: String!) {
    changeProfileNickname(nickname: $nickname, userId: $userId) {
      access_token
      refresh_token
      error
    }
  }
`;

const ChangeProfileInfo = gql`
  mutation data($info: String!, $userId: String!, $type: String!) {
    changeProfileInfo(info: $info, userId: $userId, type: $type) {
      id
    }
  }
`;

export {
  GetUserData,
  ChangeProfileImage,
  ChangeProfileNickname,
  ChangeProfileInfo,
};

import { gql } from "@apollo/client";

const GetUserData = gql`
  query data($userId: String!) {
    getUserData(userId: $userId) {
      id
      nickname
      image
      introduction
      createdAt
      type
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

const ChangePassword = gql`
  mutation data($password: String!, $userId: String!) {
    changePassword(password: $password, userId: $userId) {
      id
    }
  }
`;

export {
  GetUserData,
  ChangeProfileImage,
  ChangeProfileNickname,
  ChangeProfileInfo,
  ChangePassword,
};

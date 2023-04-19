import { gql } from "@apollo/client";
import { initializeApollo } from "../client";

const CREATE_LOCAL_USER = gql`
  mutation CreateLocalUser(
    $email: String!
    $nickname: String!
    $password: String!
  ) {
    createLocalUser(email: $email, nickname: $nickname, password: $password) {
      id
      token
    }
  }
`;

const findUserEmail = (email: string) => {
  const reg = /[`~!#$%^&*()_|+\-=?;:'",<>\{\}\[\]\\\/]/gim;
  const newEmail = email.replace(reg, "");

  const data = gql`
    query data{
        findUserEmail(email:"${newEmail}"){
        id
        }
}`;
  return initializeApollo().query({
    query: data,
    // fetchPolicy: "network-only",
  });
};

const findUserName = (nickname: string) => {
  const reg = /[`~!#$%^&*()_|+\-=?;:'",<>\{\}\[\]\\\/]/gim;
  const newNickname = nickname.replace(reg, "");

  const data = gql`
    query data{
        findUserNickname(nickname:"${newNickname}"){
          id
        }
}`;
  const apolloClient = initializeApollo();
  return apolloClient.query({
    query: data,
    // fetchPolicy: "network-only"
  });
};

export { CREATE_LOCAL_USER, findUserEmail, findUserName };

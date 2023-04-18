import { gql } from "@apollo/client";

const CREATE_LOCAL_USER = gql`
  mutation CreateLocalUser(
    $email: String!
    $nickname: String!
    $password: String!
  ) {
    createLocalUser(email: $email, nickname: $nickname, password: $password) {
      #   token
      error
    }
  }
`;

export { CREATE_LOCAL_USER };

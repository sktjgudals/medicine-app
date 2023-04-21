import { gql } from "@apollo/client";

const SIGNIN_LOCAL_USER = gql`
  mutation SigninLocalUser($email: String!, $password: String!) {
    signinLocalUser(email: $email, password: $password) {
      token
    }
  }
`;

export { SIGNIN_LOCAL_USER };

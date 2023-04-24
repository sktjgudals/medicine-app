import { gql } from "@apollo/client";

const OAUTH_KAKAO_USER_LINK = gql`
  mutation OauthKakaoUserLink {
    oauthKakaoUserLink {
      url
    }
  }
`;

const OAUTH_KAKAO_USER_CODE = gql`
  mutation OauthKakaoUserCode($code: String!) {
    oauthKakaoUserCode(code: $code) {
      access_token
      refresh_token
    }
  }
`;

export { OAUTH_KAKAO_USER_LINK, OAUTH_KAKAO_USER_CODE };

import { gql } from "@apollo/client";

const OAUTH_KAKAO_USER_LINK = gql`
  mutation OauthKakaoUserLink {
    oauthKakaoUserLink {
      url
    }
  }
`;

const OAUTH_NAVER_LINK = gql`
  mutation OauthNaverLink {
    oauthNaverLink {
      url
    }
  }
`;

export { OAUTH_KAKAO_USER_LINK, OAUTH_NAVER_LINK };

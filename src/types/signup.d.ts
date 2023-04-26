interface CHECK_PROPS {
  email: boolean;
  password: boolean;
  nickName: boolean;
}

interface ERROR_PROPS {
  email: string;
  password: string;
  nickName: string;
}
type OAUTH_TYPE = "naver" | "kakao";

export { ERROR_PROPS, CHECK_PROPS, OAUTH_TYPE };

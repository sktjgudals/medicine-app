const oauthKakaoUserLinkFunc = () => {
  return {
    url: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_KAKAO}&state=login`,
  };
};

const oauthNaverLinkFunc = () => {
  return {
    url: `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_NAVER_ID}&state=${process.env.NEXT_PUBLIC_NAVER_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_NAVER}`,
  };
};

export { oauthKakaoUserLinkFunc, oauthNaverLinkFunc };

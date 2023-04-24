const getKakaoAccessToken = async (code: string) => {
  const formData = `grant_type=authorization_code&client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_KAKAO}&code=${code}`;
  try {
    const res = await fetch(`https://kauth.kakao.com/oauth/token?${formData}`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    const result = await res.json();
    if (result["error"] === undefined) {
      return result;
    } else {
      return null;
    }
  } catch (e) {
    if (e) {
      console.info(e);
      return null;
    }
  }
};

export { getKakaoAccessToken };

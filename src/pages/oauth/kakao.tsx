import { FC, useEffect } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";

import Title from "@/components/atoms/Title";
import { OAUTH_KAKAO_USER_CODE } from "apollo/querys/oauth";
import { signInSetToken } from "@/utils/func/signin";

const Kakao: FC = () => {
  const [oauthKakao, { data, loading, error }] = useMutation(
    OAUTH_KAKAO_USER_CODE
  );
  const router = useRouter();
  const code = router.query.code as string;
  useEffect(() => {
    if (code) {
      oauthKakao({ variables: { code } }).then(({ data }) => {
        if (data["oauthKakaoUserCode"]) {
          signInSetToken(
            data["oauthKakaoUserCode"]["access_token"],
            data["oauthKakaoUserCode"]["refresh_token"]
          );
        }
        router.back();
      });
    }
  }, [code]);

  return (
    <>
      <Title title={"카카오 로그인 - 약정"} content={"약을 찾아주는 요정"} />
    </>
  );
};

export default Kakao;

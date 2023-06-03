const emailVerify = (email: string) => {
  //이메일 인증 정규표현식
  const regExp =
    /^[a-zA-Z0-9!#$%&'*+/=?^._`{|}~"(),:;<>[\]-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return regExp.test(email);
};

const passwordVerify = (password: string) => {
  // 최소 8 자, 숫자와 문자 포함
  const regExp =
    /^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&*()_+=]+)|(?:[0-9]+))$)[A-Za-z\d~!@#$%^&*()_+=]{8,}$/;
  return regExp.test(password);
};

export { emailVerify, passwordVerify };

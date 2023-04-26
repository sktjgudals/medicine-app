import { Dispatch, SetStateAction } from "react";
import { emailVerify, passwordVerify } from "../refexp";
import { CHECK_PROPS, ERROR_PROPS } from "@/types/signup";

const nicknameCheckFunc = (
  cb: Dispatch<SetStateAction<CHECK_PROPS>>,
  nickName: string,
  check: CHECK_PROPS,
  setMessage: Dispatch<SetStateAction<ERROR_PROPS>>
) => {
  if (nickName) {
    if (nickName.length > 2) {
      cb({ ...check, nickName: true });
      return setMessage((prev) => {
        return {
          ...prev,
          nickName: "",
        };
      });
    } else {
      cb({ ...check, nickName: false });
      return setMessage((prev) => {
        return {
          ...prev,
          nickName: "세 글자 이상으로 정해주세요.",
        };
      });
    }
  }
};

const passwordCheckFunc = async (
  cb: Dispatch<SetStateAction<CHECK_PROPS>>,
  password: string,
  check: CHECK_PROPS,
  setMessage: Dispatch<SetStateAction<ERROR_PROPS>>
) => {
  if (password.length === 0) {
    return cb({ ...check, password: false });
  }
  if (password.length > 0) {
    const passwordOk = await passwordVerify(password);
    if (passwordOk) {
      if (check["password"] === false) {
        setMessage((prev) => {
          return {
            ...prev,
            password: "",
          };
        });
        return cb({ ...check, password: true });
      }
    } else {
      setMessage((prev) => {
        return {
          ...prev,
          password: "최소8자,최소 하나의 문자 및 하나의 숫자를 포함해주세요.",
        };
      });
      if (check["password"]) {
        return cb({ ...check, password: false });
      }
    }
  }
};

const emailCheckFunc = async (
  cb: Dispatch<SetStateAction<CHECK_PROPS>>,
  email: string,
  check: CHECK_PROPS,
  setMessage: Dispatch<SetStateAction<ERROR_PROPS>>
) => {
  if (email.length === 0) {
    return cb({ ...check, email: false });
  }

  if (email.length > 0) {
    const emailOk = await emailVerify(email);
    if (emailOk) {
      if (check["email"] === false) {
        setMessage((prev) => {
          return {
            ...prev,
            email: "",
          };
        });
        return cb({ ...check, email: true });
      }
    } else {
      setMessage((prev) => {
        return {
          ...prev,
          email: "이메일 형식을 확인하세요.",
        };
      });
      if (check["email"]) {
        return cb({ ...check, email: false });
      }
    }
  }
};

export { nicknameCheckFunc, passwordCheckFunc, emailCheckFunc };

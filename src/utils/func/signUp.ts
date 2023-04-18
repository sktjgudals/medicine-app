import { Dispatch, SetStateAction } from "react";
import { emailVerify, passwordVerify } from "../refexp";

interface CHECK_PROPS {
  email: boolean;
  password: boolean;
  nickName: boolean;
}

const nicknameCheckFunc = (
  cb: Dispatch<SetStateAction<CHECK_PROPS>>,
  nickName: string,
  check: CHECK_PROPS
) => {
  if (nickName) {
    if (nickName.length > 2) cb({ ...check, nickName: true });
    else cb({ ...check, nickName: false });
  }
};

const passwordCheckFunc = async (
  cb: Dispatch<SetStateAction<CHECK_PROPS>>,
  password: string,
  check: CHECK_PROPS
) => {
  if (password.length === 0) cb({ ...check, password: false });
  if (password.length > 0) {
    const passwordOk = await passwordVerify(password);
    if (passwordOk) {
      if (check["password"] === false) {
        cb({ ...check, password: true });
      }
    } else {
      if (check["password"]) {
        cb({ ...check, password: false });
      }
    }
  }
};

const emailCheckFunc = async (
  cb: Dispatch<SetStateAction<CHECK_PROPS>>,
  email: string,
  check: CHECK_PROPS
) => {
  if (email.length === 0) cb({ ...check, email: false });

  if (email.length > 0) {
    const emailOk = await emailVerify(email);
    if (emailOk) {
      if (check["email"] === false) cb({ ...check, email: true });
    } else {
      if (check["email"]) cb({ ...check, email: false });
    }
  }
};

export { nicknameCheckFunc, passwordCheckFunc, emailCheckFunc };

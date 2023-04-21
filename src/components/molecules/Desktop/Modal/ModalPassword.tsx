import { FC, useState } from "react";
import styled from "styled-components";

import { Input } from "@/components/atoms/Input";
import EyeIcon from "@/components/atoms/icons/EyeIcon";
import { Button } from "@/components/atoms/Button";
import EyeSlashIcon from "@/components/atoms/icons/EyeSlashIcon";
import DuplicatedValue from "./DuplicatedValue";

interface Props {
  value: string;
  onChangeValue: () => void;
  cb: (e: any) => void;
  pwdCheck?: boolean;
}

const ModalPassword: FC<Props> = ({ value, onChangeValue, cb, pwdCheck }) => {
  const [isShow, setIsShow] = useState<boolean>(true);

  const handleShow = () => {
    setIsShow((prev) => !prev);
  };

  return (
    <PasswordContainer>
      <PasswordLabelContainer>
        <PasswordLabel htmlFor="password_input">패스워드</PasswordLabel>
        {value.length > 0 && pwdCheck !== undefined && (
          <DuplicatedValue loading={false} check={pwdCheck} />
        )}
      </PasswordLabelContainer>
      <PasswordInputContainer>
        <PasswordInput
          value={value}
          onChange={onChangeValue}
          id="password_input"
          type="password"
          autoComplete="new-password"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck="false"
          onKeyDown={cb}
          style={{ display: isShow ? "block" : "none" }}
        />
        <PasswordInput
          style={{ display: isShow ? "none" : "block" }}
          value={value}
          onChange={onChangeValue}
          type="text"
          autoComplete="new-password"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck="false"
          onKeyDown={cb}
        />
        <PasswordEyeContainer>
          <EyeButton width={30} height={10} type="button" onClick={handleShow}>
            <EyeIcon width={20} height={10} visible={isShow} />
            <EyeSlashIcon width={20} height={10} visible={!isShow} />
          </EyeButton>
        </PasswordEyeContainer>
      </PasswordInputContainer>
    </PasswordContainer>
  );
};

export default ModalPassword;

const PasswordContainer = styled.div`
  margin-top: 1.5rem !important;
`;

const PasswordLabelContainer = styled.div`
  margin-bottom: 0.5rem !important;
  display: flex !important;
  -webkit-box-align: center !important;
  align-items: center !important;
`;

const PasswordLabel = styled.label`
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  color: var(--color-text-label);
  font-weight: var(--font-weight-bold);
`;

const PasswordInputContainer = styled.div`
  display: flex;
  position: relative !important;
`;

const PasswordInput = styled(Input)`
  width: 100%;
  height: var(--input-size-xsmall);
  font-size: var(--input-text-default);
  border-radius: 0.4rem !important;
  border-style: solid;
  font-family: inherit;
  border-width: var(--border-width-input);
  border-color: var(--color-border-input);
  padding-left: 10px;
  color: var(--color-text-input);
  background-color: var(--color-background-input);
  &:hover {
    border-color: var(--color-border-input-focus);
    background-color: var(--color-background-input-focus);
  }
`;

const PasswordEyeContainer = styled.div`
  position: absolute !important;
  display: flex !important;
  -webkit-box-align: center !important;
  align-items: center !important;
  color: var(--color-text-overlay-alt) !important;
  right: 0px !important;
  top: 0px !important;
  bottom: 0px !important;
`;

const EyeButton = styled(Button)`
  display: flex !important;
  align-items: center !important;
  justify-content: center;
  vertical-align: middle;
  background-color: transparent;
`;

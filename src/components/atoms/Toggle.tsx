import styled from "styled-components";

const ThemeToggle = ({ toggle, mode }: { toggle: any; mode: any }) => {
  return (
    <ToggleWrapper onClick={toggle} theme>
      {mode === "dark" ? "🌚" : "🌝"}
    </ToggleWrapper>
  );
};

export default ThemeToggle;

const ToggleWrapper = styled.button`
  background-color: ${({ theme }) => theme.bgColor};
  border: ${({ theme }) => theme.borderColor};
  font-size: 20px;
  align-items: center;
  width: 96px;
  height: 48px;
  border-radius: 30px;
`;

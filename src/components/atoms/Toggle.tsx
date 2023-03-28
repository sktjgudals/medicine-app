import { useEffect, useState } from "react";
import styled from "styled-components";

const ThemeToggle = ({ toggle, mode }: { toggle: any; mode: any }) => {
  const [themeMode, setThemeMode] = useState<any>();
  useEffect(() => {
    if (mode === "dark") setThemeMode("🌚");
    else setThemeMode("🌝");
  }, []);

  return (
    <ToggleWrapper onClick={toggle} theme>
      {themeMode}
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

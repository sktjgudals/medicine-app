import { createGlobalStyle } from "styled-components"; // 글로벌 스타일 적용을 도와주는 styled-components내장 메서드
import { reset } from "./reset";

interface theme {
  bgColor: string;
  textColor: string;
  borderColor: string;
}

interface Props {
  theme: theme;
}

export const GlobalStyle = createGlobalStyle<Props>`
	${reset}
	body{
		background: ${({ theme }) => theme.bgColor};
        color:${({ theme }) => theme.textColor};
        display:block;
        width:100%;
        height:100%;
        -webkit-font-smoothing:antialiased;
	}
`;

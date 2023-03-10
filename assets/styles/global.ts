import { createGlobalStyle } from "styled-components";
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
		background-color: ${({ theme }) => theme.bgColor};
        color:${({ theme }) => theme.textColor};
        width:100%;
        height:100%;
        -webkit-font-smoothing:antialiased;
	}
`;

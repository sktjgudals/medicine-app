import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "apollo/client";
import { Inter } from "@next/font/google";

import { ThemeProvider } from "@/context/ThemeProvider";
import Header from "@/components/organisms/Header";

import { GlobalStyle } from "#/styles/global";
import "#/styles/common.scss";

const inter = Inter({ subsets: ["latin"] });

const App = ({ Component, pageProps }: AppProps) => {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider>
        <GlobalStyle />
        <main className={inter.className}>
          <Header />
          <Component {...pageProps} />
        </main>
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;

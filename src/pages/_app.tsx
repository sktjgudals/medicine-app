import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "apollo/client";
import { Inter } from "@next/font/google";
import { ToastContainer } from "react-toastify";

import { ThemeProvider } from "@/context/ThemeProvider";
import Header from "@/components/organisms/Header";

import { SessionProvider } from "@/hooks/useSession";
import { GlobalStyle } from "#/styles/global";
import "react-toastify/dist/ReactToastify.css";
import "#/styles/common.scss";

const inter = Inter({ subsets: ["latin"] });

const App = ({ Component, pageProps }: AppProps) => {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <SessionProvider>
        <ThemeProvider>
          <GlobalStyle />
          <ToastContainer />
          <main className={inter.className}>
            <Header />
            <Component {...pageProps} />
          </main>
        </ThemeProvider>
      </SessionProvider>
    </ApolloProvider>
  );
};

export default App;

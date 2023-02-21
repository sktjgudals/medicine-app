import "assets/styles/globals.scss"; // 이곳에 공통 scss 선언
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "apollo/client";
import type { AppProps } from "next/app";

const App = ({ Component, pageProps }: AppProps) => {
  const apolloClient = useApollo(pageProps.initialApolloState);
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default App;

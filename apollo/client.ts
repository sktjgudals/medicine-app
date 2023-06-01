import { useMemo } from "react";
import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { schema } from "./typeDefs";
import { SchemaLink } from "@apollo/client/link/schema";
import { HttpLink } from "@apollo/client/link/http";

let apolloClient: ApolloClient<NormalizedCacheObject>;

const createIsomorphLink = () => {
  if (typeof window === "undefined") {
    return new SchemaLink({ schema });
  } else {
    const httplink = new HttpLink({
      uri: "/api/graphql",
      credentials: "same-origin",
    });
    return httplink;
  }
};

const createApolloClient = () => {
  return new ApolloClient({
    connectToDevTools: true,
    ssrMode: typeof window === "undefined",
    link: createIsomorphLink(),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            getProfileData: {
              keyArgs: ["nickname", "user"],
              merge(existing = { posts: [] }, incoming) {
                if (!incoming) return null;
                return {
                  __typename: "ProfileDataResponse",
                  user: existing.user ? existing.user : incoming.user,
                  posts: [...existing.posts, ...incoming.posts],
                  pageInfo: {
                    __typename: "PageInfo",
                    cursor: incoming.pageInfo.cursor,
                    hasNextPage: incoming.pageInfo.hasNextPage,
                  },
                };
              },
            },
          },
        },
      },
    }),
  });
};

export const initializeApollo = (initialState = null) => {
  const _apolloClient = apolloClient ?? createApolloClient();
  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
};

export const useApollo = (initialState: any) => {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
};

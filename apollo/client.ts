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
            getPopularPost: {
              keyArgs: ["sort", "option", "random"],
              merge(existing = { posts: [] }, incoming) {
                const arr = Array.from(
                  new Set(existing.posts.map(JSON.stringify))
                ).map(JSON.parse as any);
                return {
                  __typename: "GetTrendPost",
                  posts: [...arr, ...incoming.posts],
                  pageInfo: {
                    __typename: "PageInfo",
                    cursor: incoming.pageInfo.cursor,
                    hasNextPage: incoming.pageInfo.hasNextPage,
                  },
                };
              },
            },
            getHomePost: {
              keyArgs: ["sort", "option", "random"],
              merge(existing = { posts: [] }, incoming) {
                const arr = Array.from(
                  new Set(existing.posts.map(JSON.stringify))
                ).map(JSON.parse as any);
                return {
                  __typename: "GetHomePost",
                  posts: [...arr, ...incoming.posts],
                  pageInfo: {
                    __typename: "PageInfo",
                    cursor: incoming.pageInfo.cursor,
                    hasNextPage: incoming.pageInfo.hasNextPage,
                  },
                };
              },
            },
            getCategoryPost: {
              keyArgs: ["sort", "option", "category"],
              merge(existing = { posts: [] }, incoming) {
                const arr = Array.from(
                  new Set(existing.posts.map(JSON.stringify))
                ).map(JSON.parse as any);
                return {
                  __typename: "GetCategoryPost",
                  posts: [...arr, ...incoming.posts],
                  pageInfo: {
                    __typename: "PageInfo",
                    cursor: incoming.pageInfo.cursor,
                    hasNextPage: incoming.pageInfo.hasNextPage,
                  },
                };
              },
            },
            getComments: {
              keyArgs: ["postId", "sort"],
              merge(existing = { comments: [] }, incoming) {
                const arr = Array.from(
                  new Set(existing.comments.map(JSON.stringify))
                ).map(JSON.parse as any);
                return {
                  __typename: "GetComment",
                  comments: [...arr, ...incoming.comments],
                  pageInfo: {
                    __typename: "PageInfo",
                    cursor: incoming.pageInfo.cursor,
                    hasNextPage: incoming.pageInfo.hasNextPage,
                  },
                };
              },
            },
            getSubComments: {
              keyArgs: ["commentId"],
              merge(existing = { subComments: [] }, incoming) {
                const arr = Array.from(
                  new Set(existing.subComments.map(JSON.stringify))
                ).map(JSON.parse as any);
                return {
                  __typename: "GetSubComment",
                  subComments: [...arr, ...incoming.subComments],
                  pageInfo: {
                    __typename: "PageInfo",
                    cursor: incoming.pageInfo.cursor,
                    hasNextPage: incoming.pageInfo.hasNextPage,
                  },
                };
              },
            },
            getPostList: {
              keyArgs: [
                "komyuId",
                "sort",
                "postId",
                "base",
                "option",
                "searchScope",
                "searchKeyword",
                "bookMarkName",
                "category",
              ],
              merge(existing = { posts: [] }, incoming) {
                const arr = Array.from(
                  new Set(existing.posts.map(JSON.stringify))
                ).map(JSON.parse as any);
                return {
                  __typename: "GetPostList",
                  posts: [...arr, ...incoming.posts],
                  pageInfo: {
                    __typename: "PageInfo",
                    cursor: incoming.pageInfo.cursor,
                    hasNextPage: incoming.pageInfo.hasNextPage,
                  },
                };
              },
            },
            komyuBanList: {
              keyArgs: ["komyuId"],
              merge: false,
              read(existing, {}) {
                return existing;
              },
            },
            getUserProfileKomyu: {
              keyArgs: ["targetId"],
              merge(existing = { komyu: [] }, incoming) {
                return {
                  __typename: "UserProfileKomyu",
                  komyu: [...existing.komyu, ...incoming.komyu],
                  pageInfo: {
                    __typename: "PageInfo",
                    cursor: incoming.pageInfo.cursor,
                    hasNextPage: incoming.pageInfo.hasNextPage,
                  },
                };
              },
            },
            getUserProfileFollow: {
              keyArgs: ["targetId"],
              merge(existing = { user: [] }, incoming) {
                return {
                  __typename: "UserProfileFollow",
                  user: [...existing.user, ...incoming.user],
                  pageInfo: {
                    __typename: "PageInfo",
                    cursor: incoming.pageInfo.cursor,
                    hasNextPage: incoming.pageInfo.hasNextPage,
                  },
                };
              },
            },
            getSearchUser: {
              keyArgs: ["word"],
              merge(existing = { user: [] }, incoming) {
                return {
                  __typename: "SearchUser",
                  user: [...existing.user, ...incoming.user],
                  pageInfo: {
                    __typename: "PageInfo",
                    cursor: incoming.pageInfo.cursor,
                    hasNextPage: incoming.pageInfo.hasNextPage,
                  },
                };
              },
            },
            getSearchKomyu: {
              keyArgs: ["word"],
              merge(existing = { komyu: [] }, incoming) {
                return {
                  __typename: "SearchKomyu",
                  komyu: [...existing.komyu, ...incoming.komyu],
                  pageInfo: {
                    __typename: "PageInfo",
                    cursor: incoming.pageInfo.cursor,
                    hasNextPage: incoming.pageInfo.hasNextPage,
                  },
                };
              },
            },
            getMainUserKomyu: {
              keyArgs: ["userId"],
              merge(existing = { komyu: [] }, incoming) {
                return {
                  __typename: "MainUserKomyu",
                  komyu: [...existing.komyu, ...incoming.komyu],
                  pageInfo: {
                    __typename: "PageInfo",
                    cursor: incoming.pageInfo.cursor,
                    hasNextPage: incoming.pageInfo.hasNextPage,
                  },
                };
              },
            },
            getMainUserFollow: {
              keyArgs: ["userId"],
              merge(existing = { user: [] }, incoming) {
                return {
                  __typename: "MainUserFollow",
                  user: [...existing.user, ...incoming.user],
                  pageInfo: {
                    __typename: "PageInfo",
                    cursor: incoming.pageInfo.cursor,
                    hasNextPage: incoming.pageInfo.hasNextPage,
                  },
                };
              },
            },
            getKomyuList: {
              keyArgs: false,
              merge(existing = { komyu: [] }, incoming) {
                const arr = Array.from(
                  new Set(existing.komyu.map(JSON.stringify))
                ).map(JSON.parse as any);
                return {
                  __typename: "GetKomyuList",
                  komyu: [...arr, ...incoming.komyu],
                  pageInfo: {
                    __typename: "PageInfo",
                    cursor: incoming.pageInfo.cursor,
                    hasNextPage: incoming.pageInfo.hasNextPage,
                  },
                };
              },
            },
            getPostBottom: {
              keyArgs: ["postId"],
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

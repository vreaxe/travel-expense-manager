import withApollo from "next-with-apollo";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import { parseCookies, destroyCookie } from "nookies";

export default withApollo(({ ctx, headers, initialState }) => {
  const client = new ApolloClient({
    uri: process.browser
      ? process.env.GRAPHQL_URL_FOR_CLIENT
      : process.env.GRAPHQL_URL_FOR_BACKEND,
    fetchOptions: {
      credentials: "include"
    },
    request: operation => {
      const cookies = parseCookies(ctx);
      operation.setContext({
        headers: {
          Authorization:
            typeof cookies.token !== "undefined" ? `JWT ${cookies.token}` : null
        }
      });
    },
    onError: error => {
      if (error.graphQLErrors[0].type == "JSONWebTokenError") {
        destroyCookie(ctx, "token");
      }

      // FIX: When token expires, it throws an error and can't continue
      // TODO: Refresh token automatically
      if (error.graphQLErrors[0].type == "JSONWebTokenExpired") {
        destroyCookie(ctx, "token");
      }
    },
    cache: new InMemoryCache().restore(initialState || {})
  });

  return client;
});

import withApollo from "next-with-apollo";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import { parseCookies } from "nookies";

export default withApollo(({ ctx, headers, initialState }) => {
  const client = new ApolloClient({
    uri: process.env.GRAPHQL_URL,
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
    onError: ({ networkError }) => {
      if (networkError) {
        console.log("Network Error", networkError);
      }
    },
    cache: new InMemoryCache().restore(initialState || {})
  });

  return client;
});

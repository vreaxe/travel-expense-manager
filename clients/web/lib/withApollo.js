import withApollo from "next-with-apollo";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink, Observable } from "apollo-link";
import { parseCookies, destroyCookie } from "nookies";

export default withApollo(({ ctx, headers, initialState }) => {
  const ssrMode = !process.browser;

  const cache = new InMemoryCache().restore(initialState || {});

  const request = async operation => {
    const cookies = parseCookies(ctx);
    operation.setContext({
      headers: {
        Authorization:
          typeof cookies.token !== "undefined" ? `JWT ${cookies.token}` : null
      }
    });
  };

  const requestLink = new ApolloLink(
    (operation, forward) =>
      new Observable(observer => {
        let handle;
        Promise.resolve(operation)
          .then(oper => request(oper))
          .then(() => {
            handle = forward(operation).subscribe({
              next: observer.next.bind(observer),
              error: observer.error.bind(observer),
              complete: observer.complete.bind(observer)
            });
          })
          .catch(observer.error.bind(observer));

        return () => {
          if (handle) handle.unsubscribe();
        };
      })
  );

  const client = new ApolloClient({
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors && graphQLErrors[0].type == "JSONWebTokenError") {
          destroyCookie(ctx, "token");
        }

        // TODO: Refresh token automatically
        if (graphQLErrors && graphQLErrors[0].type == "JSONWebTokenExpired") {
          destroyCookie(ctx, "token");
        }
      }),
      requestLink,
      new createHttpLink({
        uri: process.browser
          ? process.env.GRAPHQL_URL_FOR_CLIENT
          : process.env.GRAPHQL_URL_FOR_BACKEND,
        fetchOptions: {
          credentials: "same-origin"
        }
      })
    ]),
    cache,
    ssrMode
  });

  return client;
});

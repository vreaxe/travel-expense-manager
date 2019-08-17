import App, { Container } from "next/app";

import { ApolloProvider } from "@apollo/react-hooks";
import NProgress from "nprogress";
import Page from "../components/layouts/Page";
import Router from "next/router";
import withApollo from "../lib/withApollo";

NProgress.configure({ showSpinner: true });
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

class MyApp extends App {
  render() {
    const { Component, pageProps, apollo } = this.props;
    return (
      <Container>
        <ApolloProvider client={apollo}>
          <Page>
            <Component {...pageProps} apollo={apollo} />
          </Page>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApollo(MyApp);

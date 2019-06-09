import React from "react";
import { Query } from "react-apollo";
import { checkIfLoggedIn, redirect } from "./utils";
import AuthWrapper from "../components/AuthWrapper";
import { ME_QUERY } from "../graphql/queries";

export default function withAuth(WrappedComponent, to = "/login") {
  return class Authenticated extends React.Component {
    static async getInitialProps(ctx) {
      let componentProps = {};
      if (WrappedComponent.getInitialProps) {
        componentProps = await WrappedComponent.getInitialProps(ctx);
      }

      const loggedUser = await ctx.apolloClient
        .query({
          query: ME_QUERY
        })
        .then(response => response.data.me)
        .catch(error => null);

      if (!loggedUser) {
        redirect(ctx, to);
      }

      return { loggedUser, ...componentProps };
    }

    render() {
      return (
        <AuthWrapper {...this.props}>
          <WrappedComponent {...this.props} />
        </AuthWrapper>
      );
    }
  };
}

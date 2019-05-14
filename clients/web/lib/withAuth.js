import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import { checkIfLoggedIn, redirect } from "./utils";

const ME_QUERY = gql`
  query {
    me {
      id
      email
    }
  }
`;

export default function withAuth(WrappedComponent, to = "/login") {
  return class Authenticated extends React.Component {
    static async getInitialProps(context) {
      const loggedUser = await context.apolloClient
        .query({
          query: ME_QUERY
        })
        .then(response => response.data.me)
        .catch(error => null);

      if (!loggedUser) {
        redirect(context, to);
      }

      return { loggedUser };
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}

import { Link } from "../routes";
import React from "react";
import { redirectIfLoggedIn } from "../lib/utils";
import withAuth from "../lib/withAuth";

class Index extends React.Component {
  static async getInitialProps(ctx) {
    redirectIfLoggedIn(ctx);
  }
  render() {
    return <div />;
  }
}

export default withAuth(Index);

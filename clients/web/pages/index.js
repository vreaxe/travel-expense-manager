import React from "react";
import { Link } from "../routes";
import withAuth from "../lib/withAuth";
import { redirectIfLoggedIn } from "../lib/utils";

class Index extends React.Component {
  static async getInitialProps(ctx) {
    redirectIfLoggedIn(ctx);
  }
  render() {
    return <div />;
  }
}

export default withAuth(Index);

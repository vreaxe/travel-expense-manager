import React from "react";
import { Link } from "../routes";
import withAuth from "../lib/withAuth";
import { redirect } from "../lib/utils";

class Index extends React.Component {
  static async getInitialProps(ctx) {
    redirect(ctx, "/dashboard");
  }
  render() {
    return <div />;
  }
}

export default withAuth(Index);

import React from "react";
import { redirectIfLoggedIn } from "../lib/utils";
import withAuth from "../lib/withAuth";

const Index = () => {
  return <div />;
};

Index.getInitialProps = ctx => {
  redirectIfLoggedIn(ctx);
};

export default withAuth(Index);

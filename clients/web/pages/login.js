import { checkIfLoggedIn, redirectIfLoggedIn } from "../lib/utils";

import LoginForm from "../components/forms/LoginForm";
import Meta from "../components/layouts/Meta";
import React from "react";

const Login = () => {
  return (
    <>
      <Meta title="Login" />
      <LoginForm />
    </>
  );
};

Login.getInitialProps = ctx => {
  if (checkIfLoggedIn(ctx)) {
    redirectIfLoggedIn(ctx);
  }
  return {};
};

export default Login;

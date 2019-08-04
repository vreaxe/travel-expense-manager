import { checkIfLoggedIn, redirectIfLoggedIn } from "../lib/utils";

import LoginForm from "../components/forms/LoginForm";
import Meta from "../components/layouts/Meta";
import React from "react";

class Login extends React.Component {
  static async getInitialProps(ctx) {
    if (checkIfLoggedIn(ctx)) {
      redirectIfLoggedIn(ctx);
    }
    return {};
  }

  render() {
    return (
      <>
        <Meta title="Login" />
        <LoginForm />
      </>
    );
  }
}

export default Login;

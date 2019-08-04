import React from "react";
import Meta from "../components/layouts/Meta";
import LoginForm from "../components/forms/LoginForm";
import { checkIfLoggedIn, redirectIfLoggedIn } from "../lib/utils";

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

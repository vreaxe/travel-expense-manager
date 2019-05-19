import React from "react";
import Meta from "../components/layouts/Meta";
import LoginForm from "../components/forms/LoginForm";
import { checkIfLoggedIn, redirect } from "../lib/utils";

class Login extends React.Component {
  static async getInitialProps(ctx) {
    if (checkIfLoggedIn(ctx)) {
      return redirect(ctx, "/dashboard");
    }
    return {};
  }

  render() {
    return (
      <React.Fragment>
        <Meta title="Login" />
        <LoginForm />
      </React.Fragment>
    );
  }
}

export default Login;

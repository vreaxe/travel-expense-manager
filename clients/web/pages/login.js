import React from "react";
import classNames from "classnames";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import { setCookie } from "nookies";
import { Link, Router } from "../routes";
import Meta from "../components/Meta";
import { checkIfLoggedIn, redirect } from "../lib/utils";

const TOKEN_AUTH_MUTATION = gql`
  mutation tokenAuth($email: String!, $password: String!) {
    tokenAuth(email: $email, password: $password) {
      token
    }
  }
`;

class Login extends React.Component {
  state = {
    email: "",
    password: ""
  };

  static async getInitialProps(ctx) {
    if (checkIfLoggedIn(ctx)) {
      return redirect(ctx, "/dashboard");
    }
    return {};
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    return (
      <React.Fragment>
        <Meta title="Login" />
        <div className="bg-white rounded-lg mx-auto my-48 xl:w-1/5 md:w-2/5 w-4/5 p-6 shadow">
          <h1 className="font-bold text-2xl mb-4">🚪 Login</h1>
          <Mutation mutation={TOKEN_AUTH_MUTATION} variables={this.state}>
            {(tokenAuth, { loading, error }) => (
              <form
                className=""
                onSubmit={async e => {
                  e.preventDefault();
                  const res = await tokenAuth();
                  setCookie(null, "token", res.data.tokenAuth.token, {
                    maxAge: 30 * 24 * 60 * 60,
                    path: "/"
                  });
                  Router.pushRoute("index");
                }}
              >
                <input
                  type="email"
                  name="email"
                  className="w-full rounded-lg border border-gray-400 p-3"
                  placeholder="Email"
                  required
                  value={this.state.email}
                  onChange={this.handleChange}
                />
                <input
                  type="password"
                  name="password"
                  className="w-full rounded-lg mt-2 border border-gray-400 p-3"
                  placeholder="Password"
                  required
                  value={this.state.password}
                  onChange={this.handleChange}
                />
                <button
                  className={classNames(
                    "rounded-lg bg-green-500 hover:bg-green-600 text-center w-full text-white mt-5 py-2",
                    { spinner: loading }
                  )}
                  type="submit"
                >
                  Login
                </button>
              </form>
            )}
          </Mutation>
        </div>
      </React.Fragment>
    );
  }
}

export default Login;

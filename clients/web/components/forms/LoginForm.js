import React from "react";
import classNames from "classnames";
import { Mutation } from "react-apollo";
import { setCookie } from "nookies";
import { Link, Router } from "../../routes";
import { redirectIfLoggedIn } from "../../lib/utils";
import ErrorMessage from "../errors/ErrorMessage";
import { TOKEN_AUTH_MUTATION } from "../../graphql/mutations";

class LoginForm extends React.Component {
  state = {
    email: "",
    password: ""
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    return (
      <div className="bg-white rounded-lg mx-auto my-48 xl:w-1/5 md:w-2/5 w-4/5 p-6 shadow">
        <h1 className="font-bold text-2xl mb-4">🚪 Login</h1>
        <Mutation mutation={TOKEN_AUTH_MUTATION} variables={this.state}>
          {(tokenAuth, { loading, error }) => (
            <form
              onSubmit={async e => {
                e.preventDefault();
                const res = await tokenAuth();
                setCookie(null, "token", res.data.tokenAuth.token, {
                  maxAge: 30 * 24 * 60 * 60,
                  path: "/"
                });
                redirectIfLoggedIn();
              }}
            >
              <ErrorMessage error={error} />
              <input
                type="email"
                name="email"
                className="w-full rounded-lg border border-gray-400 p-3"
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleChange}
              />
              <input
                type="password"
                name="password"
                className="w-full rounded-lg mt-2 border border-gray-400 p-3"
                placeholder="Password"
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
    );
  }
}

export default LoginForm;

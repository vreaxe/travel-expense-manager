import { Link, Router } from "../../routes";
import React, { useState } from "react";

import Button from "../elements/Button";
import ErrorMessage from "./errors/ErrorMessage";
import { TOKEN_AUTH_MUTATION } from "../../graphql/mutations";
import classNames from "classnames";
import { redirectIfLoggedIn } from "../../lib/utils";
import { setCookie } from "nookies";
import { useMutation } from "@apollo/react-hooks";

const LoginForm = () => {
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const handleChange = event => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    });
  };

  const [tokenAuth, { loading, error }] = useMutation(TOKEN_AUTH_MUTATION, {
    variables: {
      ...user
    }
  });

  return (
    <div className="bg-white rounded-lg mx-auto my-48 xl:w-1/5 md:w-2/5 w-4/5 p-6 shadow">
      <h1 className="font-bold text-2xl mb-4">🚪 Login</h1>
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
        <div>
          <input
            type="email"
            name="email"
            className="w-full rounded-lg border border-gray-400 p-3 hover:border-gray-500 focus:border-green-500 input-color-shadow"
            placeholder="Email"
            value={user.email}
            onChange={handleChange}
          />
        </div>
        <div className="mt-2">
          <input
            type="password"
            name="password"
            className="w-full rounded-lg border border-gray-400 p-3 hover:border-gray-500 focus:border-green-500 input-color-shadow"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
          />
        </div>
        <div className="mt-5">
          <Button loading={loading} type="submit" fullWidth>
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;

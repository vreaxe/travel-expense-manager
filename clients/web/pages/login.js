import React from "react";
import { Link } from "../routes";
import Meta from "../components/Meta";
import { gql } from "apollo-boost";

const TOKEN_AUTH_MUTATION = gql`
  mutation tokenAuth($email: String!, $password: String!) {
    tokenAuth(email: $email, password: $password) {
      token
    }
  }
`;

class Login extends React.Component {
  render() {
    return (
      <div>
        <Meta title="Login" />
        Login
      </div>
    );
  }
}

export default Login;

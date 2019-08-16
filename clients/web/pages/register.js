import { checkIfLoggedIn, redirectIfLoggedIn } from "../lib/utils";

import Meta from "../components/layouts/Meta";
import React from "react";
import RegisterForm from "../components/forms/RegisterForm";

const Register = () => {
  return (
    <>
      <Meta title="Register" />
      <RegisterForm />
    </>
  );
};

Register.getInitialProps = ctx => {
  if (checkIfLoggedIn(ctx)) {
    redirectIfLoggedIn(ctx);
  }
  return {};
};

export default Register;

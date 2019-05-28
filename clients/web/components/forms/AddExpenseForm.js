import React from "react";
import { Mutation } from "react-apollo";
import { Link, Router } from "../../routes";
import { redirect } from "../../lib/utils";
import ErrorMessage from "../errors/ErrorMessage";

class AddExpenseForm extends React.Component {
  state = {};

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    return <div className="">form</div>;
  }
}

export default AddExpenseForm;

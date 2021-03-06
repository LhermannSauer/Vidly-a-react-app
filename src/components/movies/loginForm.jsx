import React from "react";
import { Redirect } from "react-router";
import Form from "../common/form";
import Joi from "joi-browser";
import auth from "../services/authService";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      const { data: jwt } = await auth.login(data.username, data.password);

      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (e) {
      if (e.response && e.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = e.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />;

    return (
      <div className="container">
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit} className="mt-2">
          {this.renderInput("username", "Username", "text")}
          {this.renderInput("password", "Password", "password")}

          {this.renderButton("Submit")}
        </form>
      </div>
    );
  }
}

export default LoginForm;

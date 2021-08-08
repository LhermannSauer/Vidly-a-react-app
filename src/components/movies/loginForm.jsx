import React from "react";
import Form from "../common/form";
import Joi from "joi-browser";
import * as authService from "../services/authService";

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
      const jwt = await authService.login(data.username, data.password);
      console.log(jwt);
      localStorage.setItem("token", jwt);
      this.props.history.push("/");
    } catch (e) {
      if (e.response && e.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = e.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
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

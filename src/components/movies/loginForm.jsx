import React from "react";
import Form from "../common/form";
import Joi from "joi-browser";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = () => {
    //Call the server
    console.log("Submitted");
  };

  render() {
    return (
      <div className="container">
        <h1>Login</h1>
        <form className="mt-2">
          {this.renderInput("username", "Username", "text")}
          {this.renderInput("password", "Password", "password")}

          <div className="form-check">
            <input type="checkbox" className="form-check-input" id="keepLog" />
            <label className="form-check-label" for="keepLog">
              Keep me logged in
            </label>
          </div>
          {this.renderButton("Submit")}
        </form>
      </div>
    );
  }
}

export default LoginForm;

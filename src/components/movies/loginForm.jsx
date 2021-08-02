import React from "react";
import Form from "../common/form";
import Input from "../common/input";
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
    const { data: account } = this.state;

    const inputFields = [
      { name: "username", type: "text", label: "Username" },
      { name: "password", type: "password", label: "Password" },
    ];

    return (
      <form className="mt-2">
        {inputFields.map((field) => {
          return (
            <Input
              name={field.name}
              type={field.type}
              label={field.label}
              id={field.name}
              value={account[field.name]}
              placeholder={`Please enter your ${field.label}`}
              onChange={this.handleChange}
            />
          );
        })}
        <div className="form-check">
          <input type="checkbox" className="form-check-input" id="keepLog" />
          <label className="form-check-label" for="keepLog">
            Keep me logged in
          </label>
        </div>
        <button
          type="submit"
          className="btn btn-primary d-block m-auto w-25 p-3 rounded showDetails"
          disabled={this.validate()}
        >
          Submit
        </button>
      </form>
    );
  }
}

export default LoginForm;

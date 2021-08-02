import React, { Component } from "react";
import Input from "../common/input";
class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
  };

  handleSubmit = (e) => {
    e.preventDefault();

    // call backend and handle information
  };

  handleChange = ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account });
  };

  render() {
    const { account } = this.state;

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
              small={"We will never share your email"}
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
          className="btn btn-primary d-block m-auto w-25 p-3 rounded showDetails
          
          "
        >
          Submit
        </button>
      </form>
    );
  }
}

export default LoginForm;

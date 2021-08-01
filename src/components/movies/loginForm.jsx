import React, { Component } from "react";

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

    return (
      <form className="mt-2">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            value={account.username}
            name="username"
            onChange={this.handleChange}
            type="text"
            className="form-control"
            id="username"
            placeholder="Enter username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            value={account.password}
            name="password"
            onChange={this.handleChange}
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
          />
        </div>
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

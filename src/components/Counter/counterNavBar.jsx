import React, { Component } from "react";

class CounterNavBar extends Component {
  render() {
    const { countersCount } = this.props;
    return (
      <nav className="navbar navbar-light bg-light">
        <p className="navbar-brand" href="#">
          Navbar{" "}
          <span className="badge badge-pill badge-secondary">
            {countersCount}
          </span>
        </p>
      </nav>
    );
  }
}

export default CounterNavBar;

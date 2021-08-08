import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

class NavBar extends Component {
  render() {
    const title = this.props.links[0];

    const links = this.props.links.slice(1);

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to={title.path}>
            {title.title}
          </Link>
          <div className="navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {links.map((l) => (
                <li key={l.title} className="nav-item">
                  <NavLink
                    className="nav-link active"
                    aria-current="page"
                    to={l.path}
                  >
                    {l.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;

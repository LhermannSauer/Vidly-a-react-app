import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./common/navBar";
import Movies from "./movies/movies";
import Customers from "./movies/customers";
import NotFound from "./common/notFound";
import Rentals from "./movies/rentals";
import MovieForm from "./movies/movieForm";
import LoginForm from "./movies/loginForm";

class App extends Component {
  navBarLinks = [
    { title: "Vidly", path: "/" },
    { title: "Movies", path: "/movies" },
    { title: "Customers", path: "/customers" },
    { title: "Rentals", path: "/rentals" },
    { title: "Login", path: "/login" },
  ];

  render() {
    return (
      <div>
        <NavBar links={this.navBarLinks} />
        <div className="content">
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/movies/:id" component={MovieForm} />
            <Route path="/movies" component={Movies} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />

            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" to="/movies" exact />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;

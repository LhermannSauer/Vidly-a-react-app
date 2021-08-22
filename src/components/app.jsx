import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavBar from "./common/navBar";
import Movies from "./movies/movies";
import Customers from "./movies/customers";
import Rentals from "./movies/rentals";
import MovieForm from "./movies/movieForm";
import LoginForm from "./movies/loginForm";
import Logout from "./movies/logout";
import RegisterForm from "./movies/registerForm";
import NotFound from "./common/notFound";
import auth from "./services/authService";
import "react-toastify/dist/ReactToastify.css";
import PortectedRoute from "./common/protectedRoute";

class App extends Component {
  state = {
    user: {},
  };

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <div>
        <ToastContainer />
        <NavBar links={this.navBarLinks} user={this.state.user} />
        <div className="content">
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/register" component={RegisterForm} />
            <PortectedRoute path="/movies/:id" component={MovieForm} />
            <Route
              path="/movies"
              render={(props) => <Movies {...props} user={user} />}
            />
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

import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { getMovies } from "../fakeMovieService";
import NavBar from "./common/navBar";
import Movies from "./movies/movies";
import Customers from "./movies/customers";
import NotFound from "./common/notFound";
import Rentals from "./movies/rentals";
import MovieForm from "./movies/movieForm";
import LoginForm from "./movies/loginForm";
import RegisterForm from "./movies/registerForm";
import { saveMovie } from "./../fakeMovieService";

class App extends Component {
  state = {
    movies: [],
  };

  navBarLinks = [
    { title: "Vidly", path: "/" },
    { title: "Movies", path: "/movies" },
    { title: "Customers", path: "/customers" },
    { title: "Rentals", path: "/rentals" },
    { title: "Login", path: "/login" },
    { title: "Register", path: "/register" },
  ];

  componentDidMount() {
    this.setState({
      movies: getMovies().map((m) => {
        m["isLiked"] = false;
        return m;
      }),
    });
  }

  handleSaveMovie = (movie) => {
    console.log("HANDLE SAVE MOVIE", movie);
    let movies = [...this.state.movies];
    saveMovie(movies, movie);
    this.setState({ movies });
  };

  render() {
    return (
      <div>
        <NavBar links={this.navBarLinks} />
        <div className="content">
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterForm} />
            <Route
              path="/movies/new"
              render={(props) => (
                <MovieForm onSubmit={this.saveMovie} {...props} />
              )}
            />
            <Route
              path="/movies/:id"
              render={(props) => (
                <MovieForm onSubmit={this.saveMovie} {...props} />
              )}
            />
            <Route
              path="/movies"
              render={(props) => (
                <Movies movies={this.state.movies} {...props} />
              )}
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

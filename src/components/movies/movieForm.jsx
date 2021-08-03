import React, { Component } from "react";
import Form from "../common/form";
import Joi from "joi-browser";
import { getGenres } from "../../fakeGenreService";
import { getMovie, saveMovie } from "../../fakeMovieService";
import queryString from "query-string";

// add new movie button to the movies component. path /movies/new
// moviesform with
//    title
//    genre dropdown
//    number in stock | 1 - 100
//    rate | 0- 10

class MovieForm extends Form {
  state = {
    data: {
      _id: "",
      title: "",
      genre: { _id: "", name: "" },
      numberInStock: "",
      dailyRentalRate: "",
    },
    genreOptions: [],
  };

  schema = {
    title: Joi.string().required().label("Title"),
    numberInStock: Joi.number()
      .integer()
      .required()
      .min(1)
      .max(100)
      .label("Number in Stock"),
    dailyRentalRate: Joi.number().min(1).max(10).required().label("Rate"),
    genre: Joi.required(),
  };

  componentDidMount = () => {
    // get options for genres and information about the movie in case it was selected
    const genreOptions = [...getGenres()];
    let data = getMovie(this.props.match.params.id);

    if (data) {
      this.setState({ genreOptions, data });
    } else {
      this.setState({ genreOptions });
    }
  };

  doSubmit = () => {
    // add new movie to the state of movies
    saveMovie(this.state.data);
  };

  render() {
    const { match, history } = this.props;
    return (
      <div>
        <h1>Movie Form: {match.params.id}</h1>
        <form onSubmit={this.handleSubmit} className="mt-2">
          {this.renderInput("title", "Title")}
          {this.renderOption(
            this.state.genreOptions,
            "Genre",
            "genre",
            this.state.data.genre._id
          )}
          {this.renderInput("numberInStock", "Number In Stock")}
          {this.renderInput("dailyRentalRate", "Daily Rental Rate")}

          <button
            className="btn-primary rounded border-0"
            type="submit"
            //disabled={this.validate()}
            onClick={() => history.push("/movies")}
          >
            Save
          </button>
        </form>
      </div>
    );
  }
}

export default MovieForm;

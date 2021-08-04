import React from "react";
import Form from "../common/form";
import Joi from "joi-browser";
import { getGenres } from "../../fakeGenreService";
import { getMovie, saveMovie } from "../../fakeMovieService";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    genres: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    numberInStock: Joi.number()
      .integer()
      .required()
      .min(1)
      .max(100)
      .label("Number in Stock"),
    dailyRentalRate: Joi.number().min(1).max(10).required().label("Rate"),
    genreId: Joi.string().required().label("Genre"),
  };

  componentDidMount = () => {
    // get options for genres and information about the movie in case it was selected
    const genres = getGenres();
    this.setState({ genres });

    const id = this.props.match.params.id;
    if (id === "new") return;

    const movie = getMovie(id);
    if (!movie) return this.props.history.replace("/notFound");

    this.setState({ data: this.mapToViewModel(movie) });
  };

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }
  doSubmit = () => {
    saveMovie(this.state.data);

    this.props.history.push("/movies");
  };

  render() {
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit} className="mt-2">
          {this.renderInput("title", "Title")}
          {this.renderOption("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number In Stock")}
          {this.renderInput("dailyRentalRate", "Daily Rental Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;

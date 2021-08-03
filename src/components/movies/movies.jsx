import React, { Component } from "react";
import { Link } from "react-router-dom";
import { paginate } from "../../utils/paginate";
import { getMovies, saveMovie } from "../../fakeMovieService";
import { getGenres } from "../../fakeGenreService";
import Table from "../common/table";
import Pagination from "../common/pagination";
import ListGroup from "../common/listGroup";
import LikeButton from "../common/like";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    MOVIESPERPAGE: 4,
    currentPage: 1,
    genres: [],
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" },
  };

  columns = [
    {
      keyValue: "title",
      content: (movie) => (
        <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      ),
    },
    { textValue: "Genre", inputValue: "genre.name" },
    { textValue: "Stock", inputValue: "numberInStock" },
    { textValue: "Rate", inputValue: "dailyRentalRate" },
    {
      keyValue: "likes",
      content: (movie) => (
        <LikeButton
          isLiked={movie.isLiked}
          onClick={() => this.handleLike(movie)}
        />
      ),
    },
    {
      keyValue: "control",
      content: (movie) => (
        <div className="m-auto w-75 h-">
          <button
            onClick={() => this.handleIncrease(movie)}
            className="btn p-1 w-50 h-25"
          >
            +
          </button>
          <button
            onClick={() => this.handleDecrement(movie)}
            className="btn p-1 btn-dark w-50 h-25"
            disabled={movie.numberInStock === 0 ? "disabled" : ""}
          >
            -
          </button>
          <button
            onClick={() => this.handleDelete(movie)}
            className="btn btn-block my-1 btn-danger w-100 h-25"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  navBarLinks = [
    { title: "Vidly", path: "/" },
    { title: "Movies", path: "/movies" },
    { title: "Customers", path: "/customers" },
    { title: "Rental", path: "/rental" },
  ];
  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({
      movies: getMovies().map((m) => {
        m["isLiked"] = false;
        return m;
      }),
      genres: genres,
    });
  }

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handleIncrease = (movie) => {
    let movies = [...this.state.movies];
    let index = movies.indexOf(movie);
    movies[index].numberInStock++;
    this.setState({
      movies,
    });
  };

  handleDecrement = (movie) => {
    let movies = [...this.state.movies];
    let index = movies.indexOf(movie);
    movies[index].numberInStock--;
    this.setState({
      movies,
    });
  };

  handleLike = (movie) => {
    let movies = [...this.state.movies];
    let index = movies.indexOf(movie);
    movies[index].isLiked ? (movie.isLiked = false) : (movie.isLiked = true);
    this.setState({
      movies,
    });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleFilter = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getMoviesShown = () => {
    return this.state.moviesShown;
  };

  getGenresNames = () => {
    return this.state.genres.map((genre) => genre.name);
  };

  updateMoviesShown = (pageMovies) => {
    let moviesShown = this.state.moviesShown;
    moviesShown = pageMovies;
    this.setState({ moviesShown });
  };

  render() {
    let { length: count } = this.state.movies;
    let currentPage = this.state.currentPage;
    let MOVIESPERPAGE = this.state.MOVIESPERPAGE;
    let selectedGenre = this.state.selectedGenre;
    let allMovies = this.state.movies;
    let sortColumn = this.state.sortColumn;

    let filteredMovies =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((movie) => movie.genre._id === selectedGenre._id)
        : allMovies;

    filteredMovies = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );

    let table = paginate(filteredMovies, currentPage, MOVIESPERPAGE);

    if (count === 0) return <p>There are no movies in the database!</p>;

    return (
      <div className="row p-2">
        <div className=" col-3">
          <ListGroup
            categories={this.state.genres}
            onSelection={this.handleFilter}
            selectedItem={this.state.selectedGenre}
          />
        </div>
        <div className=" col-7">
          <p>Showing {filteredMovies.length} movies in the database</p>
          <Link to={`/movies/new?`}>
            <button className="btn-primary btn">New Movie</button>
          </Link>
          <Table
            data={table}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onIncrease={this.handleIncrease}
            onDecrement={this.handleDecrement}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
            columns={this.columns}
          />

          <Pagination
            onPageChange={this.handlePageChange}
            itemsCount={filteredMovies.length}
            pageSize={this.state.MOVIESPERPAGE}
            currentPage={this.state.currentPage}
          />
        </div>
      </div>
    );
  }
}

export default Movies;

import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { paginate } from "../../utils/paginate";
import movieService from "../services/movieService";
import { getGenres } from "../services/genreService";
import Table from "../common/table";
import Pagination from "../common/pagination";
import ListGroup from "../common/listGroup";
import LikeButton from "../common/like";
import _ from "lodash";
import SearchBar from "../common/searchBar";

class Movies extends Component {
  state = {
    movies: [],
    MOVIESPERPAGE: 4,
    currentPage: 1,
    searchTerm: "",
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
            className={
              this.props.user && this.props.user.isAdmin
                ? "btn p-1 w-50 h-25"
                : "d-none"
            }
            disabled={movie.numberInStock >= 100 ? "disabled" : ""}
          >
            +
          </button>
          <button
            onClick={() => this.handleDecrement(movie)}
            className={
              this.props.user && this.props.user.isAdmin
                ? "btn p-1 btn-dark w-50 h-25"
                : "d-none"
            }
            disabled={movie.numberInStock === 0 ? "disabled" : ""}
          >
            -
          </button>
          <button
            onClick={() => this.handleDelete(movie)}
            className={
              this.props.user && this.props.user.isAdmin
                ? "btn btn-block my-1 btn-danger w-100 h-25"
                : "d-none"
            }
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  async componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...(await getGenres())];
    let movies = await movieService.getMovies();

    this.setState({
      movies: movies.map((m) => {
        m["isLiked"] = false;
        return m;
      }),
      genres: genres,
    });
  }

  handleDelete = async (movie) => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter((m) => m._id !== movie._id);
    this.setState({ movies });

    try {
      await movieService.deleteMovie(movie);
    } catch (e) {
      if (e.response && e.response.status === 404) {
        toast.error("This movie has already been deleted");
      }
      this.setState({ movies: originalMovies });
    }
  };

  handleIncrease = async (movie) => {
    const originalMovies = this.state.movies;
    const movies = [...originalMovies];
    const movieInDB = movies.find((e) => e._id === movie._id);
    movieInDB.numberInStock++;
    this.setState({ movies });

    try {
      await movieService.increaseStock(movie);
    } catch (e) {
      this.setState({ originalMovies });
    }
  };

  handleDecrement = async (movie) => {
    const originalMovies = this.state.movies;
    const movies = [...originalMovies];
    const movieInDB = movies.find((e) => e._id === movie._id);
    movieInDB.numberInStock--;
    this.setState({ movies });

    try {
      await movieService.decreaseStock(movie);
    } catch (e) {
      this.setState({ originalMovies });
    }
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
    this.setState({ selectedGenre: genre, currentPage: 1, searchTerm: "" });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = (search) => {
    let searchTerm = this.state.searchTerm;
    searchTerm = search;
    let selectedGenre = null;
    this.setState({ searchTerm, selectedGenre });
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
    const {
      currentPage,
      MOVIESPERPAGE,
      selectedGenre,
      movies,
      sortColumn,
      searchTerm,
    } = this.state;
    const { user } = this.props;

    let filteredMovies =
      selectedGenre && selectedGenre._id
        ? movies.filter((movie) => movie.genre._id === selectedGenre._id)
        : movies.filter((movie) =>
            movie.title.toLowerCase().startsWith(searchTerm.toLowerCase())
          );

    count =
      selectedGenre && selectedGenre._id
        ? movies.filter((movie) => movie.genre._id === selectedGenre._id).length
        : movies.length;

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
          {user && (
            <Link className="btn-primary btn mb-3" to={`/movies/new`}>
              New Movie
            </Link>
          )}
          <p>Showing {filteredMovies.length} movies in the database</p>
          <SearchBar onSearch={this.handleSearch} />
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

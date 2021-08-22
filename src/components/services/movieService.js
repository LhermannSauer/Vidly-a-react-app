import http from "./httpService";
import { apiUrl } from "../../utils/config.json";

const endpointURL = apiUrl + "/movies";

function movieUrl(id) {
  return `${endpointURL}/${id}`;
}
const getMovies = async () => {
  const movies = await http.get(endpointURL);

  return movies.data;
};

async function getMovie(id) {
  const movie = await http.get(movieUrl(id));
  return movie.data;
}

async function saveMovie(movie) {
  // get movies, if movie id is in movies, we need to http.put, otherwise, http.post
  if (movie._id) {
    let movieEntry = { ...movie };
    delete movieEntry._id;
    console.log(movieEntry);
    return http.put(movieUrl(movie._id), movieEntry);
  }

  return http.post(endpointURL, movie);
}

async function deleteMovie(movie) {
  await http.delete(movieUrl(movie._id));
}

async function increaseStock(movie) {
  const movieInDB = await getMovie(movie._id);
  movieInDB.numberInStock++;
  movieInDB.genreId = movieInDB.genre._id;
  delete movieInDB._id;
  delete movieInDB.genre;
  console.log(movieInDB);
  await http.put(movieUrl(movie._id), movieInDB);
}

async function decreaseStock(movie) {
  const movieInDB = await getMovie(movie._id);
  movieInDB.numberInStock--;
  movieInDB.genreId = movieInDB.genre._id;
  delete movieInDB._id;
  delete movieInDB.genre;
  console.log(movieInDB);
  await http.put(movieUrl(movie._id), movieInDB);
}
export default {
  getMovies,
  getMovie,
  saveMovie,
  deleteMovie,
  increaseStock,
  decreaseStock,
};

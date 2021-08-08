import http from "./httpService";
import { apiUrl } from "../../utils/config.json";

const genres = async () => {
  const response = await http.get(apiUrl + "/genres");
  return response.data;
};

export async function getGenres() {
  let genreList = await genres();
  return genreList.filter((g) => g);
}

export async function getGenre(id) {
  return await genres().filter((g) => g._id === id)["name"];
}

import http from "./httpService";
import { apiUrl } from "../../utils/config.json";

const endpointURL = apiUrl + "/users";

export function register(user) {
  console.log(user);
  return http.post(endpointURL, {
    email: user.username,
    password: user.password,
    name: user.name,
  });
}

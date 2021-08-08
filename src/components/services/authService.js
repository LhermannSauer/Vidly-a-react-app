import http from "./httpService";
import { apiUrl } from "../../utils/config.json";

const endpointURL = apiUrl + "/auth";

export function login(email, password) {
  http.post(endpointURL, { email, password });
}

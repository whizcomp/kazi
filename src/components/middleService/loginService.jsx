import http from "../services/http";
import { apiEndPoint } from "../services/config.json";
const apiUrl = apiEndPoint + "/hire/login";
export default function logins(email, password) {
  return http.post(apiUrl, { email, password });
}

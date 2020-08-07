import http from "../services/http";
import { apiEndPoint } from "../services/config.json";

export function register(user) {
  return http.post(`${apiEndPoint}/hire/register`, {
    username: user.username,
    email: user.email,
    password: user.password
  });
}

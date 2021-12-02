import axios from "axios";
import AuthService from "./auth.service";

const instance = axios.create({
  baseURL: "http://localhost/api",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = AuthService.getAccessToken();
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const {
      config: { url },
      response,
    } = err;
    const unprotected = ["/login", "/register"];
    if (!unprotected.includes(url) && response) {
      if (response.status === 401 || response.status === 403) {
        AuthService.remove();
      }
    }
    return Promise.reject(err);
  }
);

export default instance;

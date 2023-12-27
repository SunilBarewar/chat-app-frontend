import axios from "axios";
import getUserInfo from "../utils/getAccessToken";

const apiURL = import.meta.env.VITE_API_URL;
const API = axios.create({ baseURL: apiURL });

API.interceptors.request.use(
  (config) => {
    if (config.url && !config.url.startsWith("/user")) {
      config.headers["Authorization"] = getUserInfo().token;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;

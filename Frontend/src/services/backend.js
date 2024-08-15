import axios from "axios";
import { token, setToken } from "../services/token";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

api.interceptors.response.use(
  (r) => r,
  (e) => {
    if (e.response.status == 401) {
        console.log("leaving!!!")
      setToken("");
      window.location.href = "/"
      return
    }
    throw e;
  }
);

export default api;

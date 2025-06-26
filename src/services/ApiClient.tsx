import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// console.log("base url", API_BASE_URL);

const defaultApiOptions = {
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
};
const apiClient = axios.create(defaultApiOptions);

export default apiClient;

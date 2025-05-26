import axios from "axios";
import { getCookiesLogin } from "./cookisLogin";

// const token: string | null = getCookiesLogin();
// console.log(token);
const API_URL = "http://192.168.198.105:8080/v1";

// export const axiosInstance = axios.create({
//   baseURL: API_URL,
//   headers: {
//     Authorization: token ? `Bearer ${token}` : "",
//     "Content-Type": "application/json",
//   },
// });

export const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = getCookiesLogin();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

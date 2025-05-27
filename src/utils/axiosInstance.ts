import axios from "axios";
import { getCookiesLogin } from "./cookisLogin";
// import { composeInitialProps } from "react-i18next";

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
  const token: string | null = getCookiesLogin();
  if (token !== null) {
    console.log(config.headers.Authorization);
    console.log(token);
    config.headers.Authorization = `Bearer ${token}`;
    console.log(config.headers.Authorization);
  } else {
    delete config.headers.Authorization;
  }

  return config;
});

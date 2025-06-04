import axios from "axios";
import { getCookiesLogin } from "./cookisLogin";
import { API_URL } from "./enum/constantes";


export const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token: string | null = getCookiesLogin();
  // console.log(token)
  if (token !== null) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }

  return config;
});

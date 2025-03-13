import Axios, { InternalAxiosRequestConfig } from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;

async function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (config.headers) {
    config.headers.Accept = "application/json";
  }

  // Append appid as a query parameter
  if (API_KEY) {
    const url = new URL(config.url || "", config.baseURL);
    url.searchParams.set("appid", API_KEY);
    config.url = url.toString().replace(config.baseURL || "", "");
  }

  return config;
}

export const axios = Axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
  (response) => response,
  async (error) => Promise.reject(error)
);

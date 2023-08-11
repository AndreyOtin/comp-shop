import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { getToken } from './token';
import { TOKEN_NAME } from 'consts/app';

const REQUEST_TIMEOUT = 10000;

const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: process.env.REACT_APP_API,
    timeout: REQUEST_TIMEOUT
  });

  api.interceptors.request.use((config: AxiosRequestConfig) => {
    const token = getToken(TOKEN_NAME);

    if (token && config.headers) {
      config.headers.authorization = `Bearer ${token}`;
    }

    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<{ message: string[] | string }>) => {
      const data = error.response?.data.message;

      if (Array.isArray(data)) {
        throw data[0].toString();
      } else {
        throw data;
      }
    }
  );

  return api;
};

export default createAPI();

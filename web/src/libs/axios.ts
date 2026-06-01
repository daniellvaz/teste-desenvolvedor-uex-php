import Axios, { AxiosError, type AxiosRequestConfig } from "axios";
import cookies from "js-cookie";

import { TOKEN_COOKIE_NAME } from "@/contexts/auth";
import { env } from "../env";

export const AXIOS_INSTANCE = Axios.create();

const baseURL = env.VITE_API_BASE_URL;

const customInstance = <T>(config: AxiosRequestConfig): Promise<T> => {
  const source = Axios.CancelToken.source();
  const promise = AXIOS_INSTANCE({
    baseURL,
    withCredentials: true,
    ...config,
    cancelToken: source.token,
  }).then(({ data }) => data);

  // @ts-expect-error @ts-ignore
  promise.cancel = () => {
    source.cancel("Query was cancelled by React Query");
  };

  return promise;
};

AXIOS_INSTANCE.interceptors.request.use((config) => {
  const token = cookies.get(TOKEN_COOKIE_NAME);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

AXIOS_INSTANCE.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  },
);

export type ErrorType<Error> = AxiosError<Error>;

export default customInstance;

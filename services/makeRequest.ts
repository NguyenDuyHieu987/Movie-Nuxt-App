import type {
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse
} from 'axios';
import axios from 'axios';

type MakeRequestOptions = {
  noAuthHeaders?: boolean;
  getResponseHeaders?: boolean;
} & AxiosRequestConfig;

export async function makeRequest(
  url: string,
  options: MakeRequestOptions = {
    noAuthHeaders: false,
    getResponseHeaders: false
  }
) {
  const nuxtConfig = useRuntimeConfig();
  const utils = useUtils();
  const headers: AxiosRequestHeaders | any = {};

  const api = axios.create({
    baseURL: nuxtConfig.app.production_mode
      ? // ? nuxtConfig.app.apiGateway
        'http://localhost:5000'
      : 'http://localhost:5000',
    // 'http://127.0.0.1:5000',
    withCredentials: true
  });

  const userToken = utils.localStorage.getWithExpiry(TOKEN.NAME.USER_TOKEN);

  if (userToken && !options?.noAuthHeaders) {
    if (!options.headers?.Authorization) {
      headers.Authorization = `Bearer ${userToken}`;
    }
  }

  return await api(url, {
    ...options,
    headers: { ...headers, ...options?.headers }
  })
    .then((res: AxiosResponse) => {
      const { headers, data } = res;

      if (options?.getResponseHeaders) {
        return { headers, ...data };
      }

      return data;
    })
    .catch((error) =>
      Promise.reject(error?.response?.data?.message ?? 'Error')
    );
}

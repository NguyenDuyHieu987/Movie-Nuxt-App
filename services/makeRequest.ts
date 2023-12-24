import type {
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse
} from 'axios';
import axios from 'axios';

type MakeRequestOptions = {
  noAuthHeaders?: boolean;
  getResponseHeaders?: boolean;
  headers: AxiosRequestHeaders | object;
} & AxiosRequestConfig;

export async function makeRequest(
  url: string,
  options: MakeRequestOptions = {
    noAuthHeaders: false,
    getResponseHeaders: false,
    headers: {}
  }
) {
  const nuxtConfig = useRuntimeConfig();
  const utils = useUtils();

  const api = axios.create({
    baseURL: nuxtConfig.app.production_mode
      ? nuxtConfig.app.apiGateway
      : 'http://localhost:5000',
    // 'http://127.0.0.1:5000',
    withCredentials: true
  });

  if (
    utils.localStorage.getWithExpiry('user_token') &&
    !options?.noAuthHeaders
  ) {
    if (!options.headers?.Authorization) {
      options.headers!.Authorization = `Bearer ${utils.localStorage.getWithExpiry(
        'user_token'
      )}`;
    }
  }

  return await api(url, {
    ...options
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

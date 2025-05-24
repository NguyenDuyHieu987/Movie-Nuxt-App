import type { UseFetchOptions } from '#app';
import type {
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
  ParamsSerializerOptions
} from 'axios';
import axios from 'axios';

type MakeRequestOptions = {
  noAuthHeaders?: boolean;
  getResponseHeaders?: boolean;
} & AxiosRequestConfig;

export async function makeRequest(
  url: string,
  params?: any,
  options: MakeRequestOptions = {
    noAuthHeaders: false,
    getResponseHeaders: false
  }
) {
  const nuxtConfig = useRuntimeConfig();
  const headers: AxiosRequestHeaders | any = {};

  const api = axios.create({
    baseURL: import.meta.env.PROD
      ? nuxtConfig.public.apiGateway
      : nuxtConfig.public.apiGatewayDev,
    // 'http://127.0.0.1:5000',
    withCredentials: true
  });

  // const utils = useUtils();
  // const userToken = utils.localStorage.getWithExpiry(TOKEN.NAME.USER_TOKEN);

  // if (userToken && !options?.noAuthHeaders) {
  //   if (!options.headers?.Authorization) {
  //     headers.Authorization = `Bearer ${userToken}`;
  //   }
  // }

  return await api(url, {
    // proxy: {
    //   protocol: 'http',
    //   host: 'localhost',
    //   port: 5000
    // },
    params: params,
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

export async function makeMediaRequest(
  url: string,
  params?: any,
  options: MakeRequestOptions = {
    noAuthHeaders: false,
    getResponseHeaders: false
  }
) {
  const nuxtConfig = useRuntimeConfig();
  const headers: AxiosRequestHeaders | any = {};

  const api = axios.create({
    baseURL: import.meta.env.PROD
      ? nuxtConfig.public.mediaApiGateway
      : nuxtConfig.public.mediaApiGatewayDev,
    withCredentials: true
  });

  return await api(url, {
    params: params,
    ...options,
    headers: { ...headers, ...options?.headers }
  })
    .then((res) => {
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

type MakeRequestProxyOptions =
  | {
      noAuthHeaders?: boolean;
      getResponseHeaders?: boolean;
    }
  | any;

export async function makeRequestProxy(
  url: string,
  params?: any,
  options: MakeRequestProxyOptions = {
    noAuthHeaders: false,
    getResponseHeaders: false
  }
) {
  let optionsRequest = null;
  return await useFetch(url, {
    baseURL: '/api',
    query: params,
    headers: { ...options?.headers },
    ...options,
    body: options?.data
  })
    .then((res) => {
      const { data } = res;

      return data.value;
    })
    .catch((error) =>
      Promise.reject(error?.response?.data?.message ?? 'Error')
    );
}

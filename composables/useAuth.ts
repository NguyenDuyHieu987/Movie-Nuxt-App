import { defu } from 'defu';
import type { UseFetchOptions } from 'nuxt/app';

export function useApiAuth<T>(url: string, options: UseFetchOptions<T> = {}) {
  const userAuth = useCookie('token');
  const config = useRuntimeConfig();

  const defaults: UseFetchOptions<T> = {
    baseURL: config.app.apiGateway ?? 'http://127.0.0.1:5000',
    // cache request
    key: url,

    // set user token if connected
    headers: userAuth.value ? { Authorization: `Bearer ${userAuth.value}` } : {},

    onResponse(_ctx) {
      // _ctx.response._data = new myBusinessResponse(_ctx.response._data)
    },

    onResponseError(_ctx) {
      // throw new myBusinessError()
    }
  };

  // for nice deep defaults, please use unjs/defu
  const params = defu(options, defaults);

  return useFetch(url, params);
}

import axios, { type AxiosRequestConfig } from 'axios';
import { makeRequest } from './makeRequest';
import { isProduction } from 'std-env';

export const SERVER_VIDEO = 'https://media.phimhay247z.org';
export const DEV_SERVER_VIDEO = 'http://localhost:5002';

const PREFIX_ROUTE = 'videos';

export async function makeVideoRequest(
  url: string,
  options: AxiosRequestConfig = {}
) {
  const nuxtConfig = useRuntimeConfig();

  const api = axios.create({
    baseURL: isProduction ? nuxtConfig.app.serverVideoUrl : DEV_SERVER_VIDEO,
    withCredentials: true
  });

  return await api(url, options)
    .then((res) => {
      return res;
    })
    .catch((error) =>
      Promise.reject(error?.response?.data?.message ?? 'Error')
    );
}

export function getVideo(
  path: string,
  startByte: number = 0,
  endByte: number = 1024 * 1024
) {
  return makeVideoRequest(`/videos/${path}`, {
    headers: {
      Accept: 'video/mp4;charset=UTF-8',
      Range: `bytes=${startByte}-${endByte}`
    },
    responseType: 'arraybuffer'
  });
}

export function getVideos(id: string) {
  return makeRequest(`/${PREFIX_ROUTE}/${id}`);
}

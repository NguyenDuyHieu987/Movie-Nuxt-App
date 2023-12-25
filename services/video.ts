import axios, { type AxiosRequestConfig } from 'axios';
import { makeRequest } from './makeRequest';

export async function makeVideoRequest(
  url: string,
  options: AxiosRequestConfig = {}
) {
  const nuxtConfig = useRuntimeConfig();

  const api = axios.create({
    baseURL: nuxtConfig.app.production_mode
      ? nuxtConfig.app.serverVideoUrl
      : 'http://localhost:5002',
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

export function getVideos(id: string) {
  return makeRequest(`/videos/${id}`);
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

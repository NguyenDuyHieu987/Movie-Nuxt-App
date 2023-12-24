import axios, { type AxiosRequestConfig } from 'axios';
import { isProduction } from 'std-env';
import { makeRequest } from './makeRequest';

// const URL_API_IMAGE = 'https://img.phimhay247.site';
const URL_API_IMAGE = 'https://ik.imagekit.io/8toa5f2rp';
// const URL_API_IMAGE = 'https://res.cloudinary.com/dvbhjlrdf/image/upload';

export async function makeImageRequest(
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

export function getImage(path: string, type: string, crop: string = '') {
  const nuxtConfig = useRuntimeConfig();

  const URL_API_IMAGE1 = nuxtConfig.app.production_mode
    ? nuxtConfig.app.serverImageUrl
    : 'http://localhost:5002/static';

  if (!path) return ' ';

  if (crop.length == 0 || !nuxtConfig.app.production_mode) {
    return `${URL_API_IMAGE1}/images/${type}/${path}`;
  }

  return `${URL_API_IMAGE1}/images/${type}/${path}/tr:${crop}`;

  // const URL_API_IMAGE1 = 'http://localhost:5002/static/';

  // return`${URL_API_IMAGE1}/images/${type}/${path}`;
}

export function getServerImage(path: string, type: string, crop = '') {
  if (!path) return ' ';

  const URL_API_IMAGE1 = isProduction
    ? URL_API_IMAGE
    : 'http://localhost:5002/static';

  if (crop.length == 0 || !isProduction)
    return `${URL_API_IMAGE1}/images/${type}/${path}`;

  return `${URL_API_IMAGE}/images/${type}/${path}/tr:${crop}`;
}

export function getPosterCast(path: string) {
  const nuxtConfig = useRuntimeConfig();
  const TMDB_IMAGE_BASE_URL = nuxtConfig.app.TMDBurl;

  return `${TMDB_IMAGE_BASE_URL}/original${path}`;
}

export function getImages(id: string) {
  return makeRequest(`/images/${id}`);
}

export function getColorImage(path: string) {
  return makeImageRequest(`/image/color/backdrop/${path}`);
}

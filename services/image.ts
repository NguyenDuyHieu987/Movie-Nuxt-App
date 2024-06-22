import { makeRequest, makeMediaRequest } from './makeRequest';
import { isProduction } from 'std-env';

// export const SERVER_IMAGE = 'https://ik.imagekit.io/8toa5f2rp';
// export const DEV_SERVER_IMAGE = 'http://localhost:5002/static';
export const SERVER_IMAGE = 'https://media.phimhay247z.org';
export const DEV_SERVER_IMAGE = 'http://localhost:5002';

const PREFIX_ROUTE = 'images';

export function getImage(
  path: string,
  type: string,
  crop?: { w?: number; h?: number } | string
): string {
  const nuxtConfig = useRuntimeConfig();
  const utils = useUtils();

  const URL_IMAGE = nuxtConfig.app.production_mode
    ? nuxtConfig.app.serverImageUrl
    : nuxtConfig.app.serverImageUrlDev;

  if (utils.isStringEmpty(path)) return URL_IMAGE;

  if (!crop) {
    return `${URL_IMAGE}/images/${type}/${path}`;
  }

  if (isString(crop)) {
    const cropStr = crop as string;
    const w = cropStr.replace('-', '=');
    const h = cropStr.replace('-', '=');
    return `${URL_IMAGE}/images/${type}/${path}?${w}&${h}}`;
  }

  return `${URL_IMAGE}/images/${type}/${path}?${utils.serialize(crop)}}`;
  // return `${URL_IMAGE}/images/${type}/${path}/tr:${crop}`;
}

export function getServerImage(path: string, type: string, crop = ''): string {
  const utils = useUtils();

  const URL_IMAGE = isProduction ? SERVER_IMAGE : DEV_SERVER_IMAGE;
  // const URL_IMAGE = DEV_SERVER_IMAGE;

  if (utils.isStringEmpty(path)) return URL_IMAGE;

  if (crop.length == 0 || !isProduction)
    return `${URL_IMAGE}/images/${type}/${path}`;

  return `${URL_IMAGE}/images/${type}/${path}`;
  // return `${URL_IMAGE}/images/${type}/${path}/tr:${crop}`;
}

export function getPosterCast(path: string): string {
  const nuxtConfig = useRuntimeConfig();
  const TMDB_IMAGE_BASE_URL = nuxtConfig.app.TMDBurl;

  return `${TMDB_IMAGE_BASE_URL}/original${path}`;
}

export function getColorImage(path: string) {
  return makeMediaRequest(`/image/color/backdrop/${path}`);
}

export function getImages(id: string) {
  return makeRequest(`/${PREFIX_ROUTE}/${id}`);
}

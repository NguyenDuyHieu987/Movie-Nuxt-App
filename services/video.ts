import { makeRequest } from './makeRequest';

const PREFIX_ROUTE = 'videos';

export function getVideo(path: string) {
  const nuxtConfig = useRuntimeConfig();

  const URL_VIDEO = nuxtConfig.public.production_mode
    ? nuxtConfig.public.serverVideoUrl
    : nuxtConfig.public.serverVideoUrlDev;

  return `${URL_VIDEO}/videos/${path}`;
}

export function getVideos(id: string) {
  return makeRequest(`/${PREFIX_ROUTE}/${id}`);
}

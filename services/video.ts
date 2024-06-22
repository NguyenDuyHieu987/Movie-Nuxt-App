import { makeRequest } from './makeRequest';

const PREFIX_ROUTE = 'videos';

export function getVideo(path: string) {
  const nuxtConfig = useRuntimeConfig();

  const URL_VIDEO = nuxtConfig.app.production_mode
    ? nuxtConfig.app.serverVideoUrl
    : nuxtConfig.app.serverVideoUrlDev;

  return `${URL_VIDEO}/videos/${path}`;
}

export function getVideos(id: string) {
  return makeRequest(`/${PREFIX_ROUTE}/${id}`);
}

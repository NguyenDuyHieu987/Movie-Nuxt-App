import { makeRequest } from './makeRequest';

const PREFIX_ROUTE = 'episode';

export function getListEpisode(
  movieId: string,
  seasonId: string,
  skip: number = 1,
  limit: number = 40,
  from: number = 1,
  to: number = 40
) {
  return makeRequest(
    `/${PREFIX_ROUTE}/list/${movieId}/${seasonId}?skip=${skip}&limit=${limit}`
  );
}

export function getLatestEpisode(movieId: string, seasonId: string) {
  return makeRequest(`/${PREFIX_ROUTE}/latest/${movieId}/${seasonId}`);
}

export function getEpisode(
  movieId: string,
  seasonId: string,
  episodeNumber: number
) {
  return makeRequest(
    `/${PREFIX_ROUTE}/get/${movieId}/${seasonId}/${episodeNumber}`
  );
}

export function getEpisodeById(
  movieId: string,
  seasonId: string,
  episodeId: string
) {
  return makeRequest(
    `/${PREFIX_ROUTE}/getbyid/${movieId}/${seasonId}/${episodeId}`
  );
}

export function UpdateViewEpisode(episodeId: number | string) {
  return makeRequest(`/${PREFIX_ROUTE}/update-view/${episodeId}`, null, {
    method: 'POST'
  });
}

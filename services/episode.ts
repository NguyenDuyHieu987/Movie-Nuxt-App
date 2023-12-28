import { makeRequest } from './makeRequest';

const PREFIX_ROUTE = 'episode';

export function getListEpisode(movieId: string, seasonId: string) {
  return makeRequest(`/${PREFIX_ROUTE}/list/${movieId}/${seasonId}`);
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

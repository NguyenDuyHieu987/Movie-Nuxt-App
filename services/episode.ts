import { makeRequest } from './makeRequest';

export function getListEpisode(movieId: string, seasonId: string) {
  return makeRequest(`/episode/list/${movieId}/${seasonId}`);
}

export function getEpisode(
  movieId: string,
  seasonId: string,
  episodeNumber: number
) {
  return makeRequest(`/episode/get/${movieId}/${seasonId}/${episodeNumber}`);
}

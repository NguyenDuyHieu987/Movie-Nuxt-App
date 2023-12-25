import { makeRequest } from './makeRequest';

export function getListSeason(seriesId: string) {
  return makeRequest(`/season/list/${seriesId}`);
}

export function getSeason(movieId: string, seasonId: string) {
  return makeRequest(`/season/get/${movieId}/${seasonId}`);
}

import { makeRequest } from './makeRequest';

const PREFIX_ROUTE = 'season';

export function getListSeason(seriesId: string) {
  return makeRequest(`/${PREFIX_ROUTE}/list/${seriesId}`);
}

export function getSeason(movieId: string, seasonId: string) {
  return makeRequest(`/${PREFIX_ROUTE}/get/${movieId}/${seasonId}`);
}

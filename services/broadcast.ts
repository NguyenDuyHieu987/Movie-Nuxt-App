import { makeRequest } from './makeRequest';

const PREFIX_ROUTE = 'broadcast';

export function getAllBroadcast(page: number = 1, limit: number = 20) {
  return makeRequest(`/${PREFIX_ROUTE}/get-all`, {
    page,
    limit
  });
}

export function getAllAiringBroadcast(page: number = 1, limit: number = 20) {
  return makeRequest(`/${PREFIX_ROUTE}/get-allairing`, {
    page,
    limit
  });
}

export function getBroadcastById(movieId: number | string) {
  return makeRequest(`/${PREFIX_ROUTE}/detail/${movieId}`);
}

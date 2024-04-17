import { makeRequest } from './makeRequest';

const PREFIX_ROUTE = 'similar';

export function getSimilar(
  type: string,
  movieId: string,
  page: number = 1,
  limit: number = 20
) {
  return makeRequest(`/${PREFIX_ROUTE}/${type}/${movieId}`, { page, limit });
}

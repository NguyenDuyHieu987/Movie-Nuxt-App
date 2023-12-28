import { makeRequest } from './makeRequest';

const PREFIX_ROUTE = 'sortby';

export function getAllSortBy() {
  return makeRequest(`/${PREFIX_ROUTE}/get-all`);
}

import { makeRequest } from './makeRequest';

const PREFIX_ROUTE = 'year';

export function getAllYear() {
  return makeRequest(`/${PREFIX_ROUTE}/get-all`);
}

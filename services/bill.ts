import { makeRequest } from './makeRequest';

const PREFIX_ROUTE = 'bill';

export function getBills(skip: number = 1, limit: number = 20) {
  return makeRequest(`/${PREFIX_ROUTE}/get-all?skip=${skip}&limit=${limit}`);
}

import { makeRequest } from './makeRequest';

const PREFIX_ROUTE = 'mod';

export function getAllMod() {
  return makeRequest(`/${PREFIX_ROUTE}/get-all`);
}

export function getAllModWithData(
  page: number = 1,
  limit: number = 3,
  listCount: number = 20
) {
  return makeRequest(`/${PREFIX_ROUTE}/get-all-with-data`, {
    page,
    limit,
    list_count: listCount
  });
}

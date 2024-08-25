import { makeRequest } from './makeRequest';

export function getAllMod(
  page: number = 1,
  limit: number = 3,
  listCount: number = 20
) {
  return makeRequest('/mod/get-all',{
    page,
    limit,
    list_count: listCount
  });
}

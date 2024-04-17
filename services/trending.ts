import { makeRequest } from './makeRequest';

const PREFIX_ROUTE = 'trending';

export async function getTrending(page: number = 1, limit: number = 20) {
  return await makeRequest(`/${PREFIX_ROUTE}/all`, {
    page,
    limit
  });
}

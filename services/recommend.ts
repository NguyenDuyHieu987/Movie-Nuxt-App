import { makeRequest } from './makeRequest';

const PREFIX_ROUTE = 'recommend';

export function getMyRecommend(page: number = 1, limit: number = 20) {
  return makeRequest(`/${PREFIX_ROUTE}/get-all`, {
    page,
    limit
  });
}

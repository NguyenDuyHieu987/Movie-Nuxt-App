import { makeRequest } from './makeRequest';

export async function getTrending(page: number = 1, limit: number = 20) {
  return await makeRequest(`/trending/all?page=${page}&limit=${limit}`);
}

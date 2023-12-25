import { makeRequest } from './makeRequest';

export function getCredits(id: string) {
  return makeRequest(`/credits/${id}`);
}

import { makeRequest } from './makeRequest';

const PREFIX_ROUTE = 'credits';

export function getCredits(id: string) {
  return makeRequest(`/${PREFIX_ROUTE}/${id}`);
}

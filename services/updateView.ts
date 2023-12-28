import { makeRequest } from './makeRequest';

const PREFIX_ROUTE = 'update-view';

export function UpdateView(movieId: number | string, type: string) {
  return makeRequest(`/${PREFIX_ROUTE}/${type}/${movieId}`, {
    method: 'POST'
  });
}

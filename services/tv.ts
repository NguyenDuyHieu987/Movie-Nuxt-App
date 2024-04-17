import { makeRequest } from './makeRequest';

const PREFIX_ROUTE = 'tv';

export function getTvById(
  movieId: number | string,
  append_to_response: string = ''
) {
  return makeRequest(`/${PREFIX_ROUTE}/detail/${movieId}`, {
    append_to_response
  });
}

export function UpdateViewTv(movieId: number | string) {
  return makeRequest(`/${PREFIX_ROUTE}/update-view/${movieId}`, null, {
    method: 'POST'
  });
}

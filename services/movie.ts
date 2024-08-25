import { makeRequest } from './makeRequest';

const PREFIX_ROUTE = 'movie';

export function getMovieByType_Id(
  type: string,
  movieId: number | string,
  append_to_response: string = ''
) {
  return makeRequest(`/${PREFIX_ROUTE}/detail/${type}/${movieId}`, {
    append_to_response
  });
}

export function getMovieById(
  movieId: number | string,
  append_to_response: string = ''
) {
  return makeRequest(`/${PREFIX_ROUTE}/detail/${movieId}`, {
    append_to_response
  });
}

export function UpdateViewMovie(movieId: number | string) {
  return makeRequest(`/${PREFIX_ROUTE}/update-view/${movieId}`, null, {
    method: 'POST'
  });
}

import { makeRequest } from './makeRequest';

const PREFIX_ROUTE = 'movie';

export function getMovieById(
  movieId: number | string,
  append_to_response: string = ''
) {
  return makeRequest(
    `/${PREFIX_ROUTE}/detail/${movieId}?append_to_response=${append_to_response}`
  );
}

export function UpdateViewMovie(movieId: number | string) {
  return makeRequest(`/${PREFIX_ROUTE}/updateview/${movieId}`, {
    method: 'POST'
  });
}

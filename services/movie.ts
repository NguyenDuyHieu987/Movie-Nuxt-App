import { makeRequest } from './makeRequest'

export function getMovieById(movieId: number | string, append_to_response: string = '') {
  return makeRequest(`/movie/detail/${movieId}?append_to_response=${append_to_response}`)
}

export function UpdateViewMovie(movieId: number | string) {
  return makeRequest(`/movie/updateview/${movieId}`, {
    method: 'POST'
  })
}

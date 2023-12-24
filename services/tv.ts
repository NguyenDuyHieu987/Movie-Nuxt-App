import { makeRequest } from './makeRequest'

export function getTvById(movieId: number | string, append_to_response: string = '') {
  return makeRequest(`/tv/detail/${movieId}?append_to_response=${append_to_response}`)
}

export function UpdateViewTv(movieId: number | string) {
  return makeRequest(`/tv/updateview/${movieId}`, {
    method: 'POST'
  })
}

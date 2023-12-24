import { makeRequest } from './makeRequest'

export function UpdateView(movieId: number | string, type: string) {
  return makeRequest(`/update-view/${type}/${movieId}`, {
    method: 'POST'
  })
}

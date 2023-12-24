import { makeRequest } from './makeRequest'

export function getRating(moveId: string, type: string) {
  return makeRequest(`/rating/get/${type}/${moveId}`)
}

export function rating(params: { movie_id: string; media_type: string; value: number }) {
  const bodyFormData = new FormData()
  bodyFormData.append('value', params.value.toString())

  return makeRequest(`/rating/${params.media_type}/${params.movie_id}`, {
    method: 'POST',
    data: bodyFormData
  })
}

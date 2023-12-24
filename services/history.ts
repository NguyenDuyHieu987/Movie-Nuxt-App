import { makeRequest } from './makeRequest'

export function getHistory(type: string = 'all', skip: number = 1, limit: number = 20) {
  const store = useStore()

  if (!store.isLogin) return new Promise(() => {})

  return makeRequest(`/history/get-all/${type}?skip=${skip}&limit=${limit}`)
}

export function searchHistory(query: string, type: string = 'all') {
  return makeRequest(`/history/search/${type}?query=${query}`)
}

export function getItemHistory(movieId: string, media_type: string) {
  return makeRequest(`/history/get/${media_type}/${movieId}`)
}

export function add_update_History(params: {
  movie_id: string;
  media_type: string;
  episode?: any;
  duration: number;
  percent: number;
  seconds: number;
}) {
  const bodyFormData = new FormData()
  bodyFormData.append('movie_id', params.movie_id)
  bodyFormData.append('media_type', params.media_type)
  params?.episode && bodyFormData.append('episode', params.episode)
  bodyFormData.append('duration', params.duration.toString())
  bodyFormData.append('percent', params.percent.toFixed(3))
  bodyFormData.append('seconds', params.seconds.toString())

  return makeRequest('/history/add', {
    method: 'POST',
    data: bodyFormData
  })
}

export function removeItemHistory(params: { id?: string; movie_id: string; media_type: string }) {
  const bodyFormData = new FormData()
  params?.id && bodyFormData.append('id', params.id!)
  bodyFormData.append('movie_id', params.movie_id)
  bodyFormData.append('media_type', params.media_type)

  return makeRequest('/history/remove', {
    method: 'DELETE',
    data: bodyFormData
  })
}

export function removeAllItemHistory() {
  return makeRequest('/history/clear', {
    method: 'DELETE'
  })
}

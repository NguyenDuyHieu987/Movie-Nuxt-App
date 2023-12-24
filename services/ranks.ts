import { makeRequest } from './makeRequest'

import type { formfilterRank, rankSort } from '~/types'

export function getRanking(page: number = 1, limit: number = 10) {
  return makeRequest(`/discover/all?sort_by=views_desc&page=${page}&limit=${limit}`)
}

export function filterRanks(formfilterRank: formfilterRank) {
  return makeRequest(
    `/ranks/filter/${formfilterRank.type}/${formfilterRank.sortBy}?media_type=${formfilterRank.mediaType}&with_genres=${formfilterRank.genre}&with_original_language=${formfilterRank.country}&page=${formfilterRank.page}&limit=${formfilterRank.limit}`
  )
}

export function getRankSearch(sort: rankSort = 'day', page: number = 1, limit: number = 10) {
  return makeRequest(`/ranks/hot-search/${sort}?page=${page}&limit=${limit}`)
}

export function getRankPlay(sort: rankSort = 'day', page: number = 1, limit: number = 10) {
  return makeRequest(`/ranks/hot-play/${sort}?page=${page}&limit=${limit}`)
}

export function getRankHighRate(sort: rankSort = 'day', page: number = 1, limit: number = 10) {
  return makeRequest(`/ranks/high-rate/${sort}?page=${page}&limit=${limit}`)
}

export function addRankPlay(params: { movie_id: string; media_type: string }) {
  const bodyFormData = new FormData()
  bodyFormData.append('movie_id', params.movie_id)
  bodyFormData.append('media_type', params.media_type)

  return makeRequest('/ranks/add-play', {
    method: 'POST',
    data: bodyFormData
  })
}

export function addRankSearch(params: { movie_id?: string; media_type?: string; query: string }) {
  const bodyFormData = new FormData()
  params?.movie_id && bodyFormData.append('movie_id', params.movie_id!)
  params?.media_type && bodyFormData.append('media_type', params.media_type!)
  bodyFormData.append('query', params.query)

  return makeRequest('/ranks/add-search', {
    method: 'POST',
    data: bodyFormData
  })
}

export function addRankRate(params: { movie_id: string; media_type: string; rate_value: number }) {
  const bodyFormData = new FormData()
  bodyFormData.append('movie_id', params.movie_id!)
  bodyFormData.append('media_type', params.media_type!)
  bodyFormData.append('rate_value', params.rate_value.toString())

  return makeRequest('/ranks/add-rate', {
    method: 'POST',
    data: bodyFormData
  })
}

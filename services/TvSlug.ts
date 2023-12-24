import { makeRequest } from './makeRequest'

import type { formfilter } from '~/types'

export function getTvs(page: number = 1) {
  return makeRequest(`/tv/all?page=${page}`)
}

export function getTvAiringToday(page: number = 1) {
  return makeRequest(`/tv/airingtoday?page=${page}`)
}

export function getTvOntheAir(page: number = 1) {
  return makeRequest(`/tv/ontheair?page=${page}`)
}

export function getTvPopular(page: number = 1) {
  return makeRequest(`/tv/popular?page=${page}`)
}

export function getTvTopRated(page: number = 1) {
  return makeRequest(`/tv/toprated?page=${page}`)
}

export function FilterTvSlug(formFilter: formfilter) {
  const yearLte = formFilter.year != '' ? formFilter.year + '-12-30' : ''
  const yearGte =
    formFilter.year != ''
      ? /^\d+$/.test(formFilter.year)
        ? formFilter.year + '-01-01'
        : formFilter.year.slice(-4) + '-01-01'
      : ''

  // const genreStr =
  //   formFilter.genre !== ''
  //     ? /^\d+$/.test(formFilter.genre)
  //       ? formFilter.genre
  //       : getGenreByName(formFilter.genre)?.id
  //     : '';

  return /^\d+$/.test(formFilter.year) || formFilter.year == ''
    ? makeRequest(
      `/tv/discover/${formFilter.type}?sort_by=${formFilter.sortBy}&primary_release_date_gte=${yearGte}&primary_release_date_lte=${yearLte}&with_genres=${formFilter.genre}&with_original_language=${formFilter.country}&page=${formFilter.page}&limit=${formFilter.limit}`
    )
    : makeRequest(
      `/tv/discover/${formFilter.type}?sort_by=${formFilter.sortBy}&primary_release_date_lte=${yearGte}&with_genres=${formFilter.genre}&with_original_language=${formFilter.country}&page=${formFilter.page}&limit=${formFilter.limit}`
    )
}

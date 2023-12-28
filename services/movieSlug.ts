import { makeRequest } from './makeRequest';

import type { formfilter } from '@/types';

const PREFIX_ROUTE = 'movie';

export function getMovies(page: number = 1) {
  return makeRequest(`/${PREFIX_ROUTE}/all?page=${page}`);
}

export function getNowPlaying(page: number = 1) {
  return makeRequest(`/${PREFIX_ROUTE}/nowplaying?page=${page}`);
}

export function getPopular(page: number = 1) {
  return makeRequest(`/${PREFIX_ROUTE}/popular?page=${page}`);
}

export function getTopRated(page: number = 1) {
  return makeRequest(`/${PREFIX_ROUTE}/toprated?page=${page}`);
}

export function getUpComing(page: number = 1) {
  return makeRequest(`/${PREFIX_ROUTE}/upcoming?page=${page}`);
}

export function FilterMovieSlug(formFilter: formfilter) {
  const yearLte = formFilter.year != '' ? formFilter.year + '-12-30' : '';
  const yearGte =
    formFilter.year != ''
      ? /^\d+$/.test(formFilter.year)
        ? formFilter.year + '-01-01'
        : formFilter.year.slice(-4) + '-01-01'
      : '';

  // const genreStr =
  //   formFilter.genre !== ''
  //     ? /^\d+$/.test(formFilter.genre)
  //       ? formFilter.genre
  //       : getGenreByName(formFilter.genre)?.id
  //     : '';

  return /^\d+$/.test(formFilter.year) || formFilter.year == ''
    ? makeRequest(
        `/${PREFIX_ROUTE}/discover/${formFilter.type}?sort_by=${formFilter.sortBy}&primary_release_date_gte=${yearGte}&primary_release_date_lte=${yearLte}&with_genres=${formFilter.genre}&with_original_language=${formFilter.country}&page=${formFilter.page}&limit=${formFilter.limit}`
      )
    : makeRequest(
        `/${PREFIX_ROUTE}/discover/${formFilter.type}?sort_by=${formFilter.sortBy}&primary_release_date_lte=${yearGte}&with_genres=${formFilter.genre}&with_original_language=${formFilter.country}&page=${formFilter.page}&limit=${formFilter.limit}`
      );
}

import { makeRequest } from './makeRequest';

import type { formfilter } from '~/types';

const PREFIX_ROUTE = 'tv';

export function getTvs(page: number = 1) {
  return makeRequest(`/${PREFIX_ROUTE}/all?page=${page}`);
}

export function getTvAiringToday(page: number = 1) {
  return makeRequest(`/${PREFIX_ROUTE}/airingtoday?page=${page}`);
}

export function getTvOntheAir(page: number = 1) {
  return makeRequest(`/${PREFIX_ROUTE}/ontheair?page=${page}`);
}

export function getTvPopular(page: number = 1) {
  return makeRequest(`/${PREFIX_ROUTE}/popular?page=${page}`);
}

export function getTvTopRated(page: number = 1) {
  return makeRequest(`/${PREFIX_ROUTE}/toprated?page=${page}`);
}

export function FilterTvSlug(formFilter: formfilter) {
  const utils = useUtils();

  const yearLte = !utils.isStringEmpty(formFilter.year.toString())
    ? formFilter.year + '-12-30'
    : '';

  const yearGte = !utils.isStringEmpty(formFilter.year.toString())
    ? utils.isNumber(formFilter.year)
      ? formFilter.year + '-01-01'
      : formFilter.year.toString().slice(-4) + '-01-01'
    : '';

  return utils.isStringNumber(formFilter.year) || formFilter.year == ''
    ? makeRequest(
        `/${PREFIX_ROUTE}/discover/${formFilter.type}?sort_by=${formFilter.sortBy}&primary_release_date_gte=${yearGte}&primary_release_date_lte=${yearLte}&with_genres=${formFilter.genre}&with_original_language=${formFilter.country}&page=${formFilter.page}&limit=${formFilter.limit}`
      )
    : makeRequest(
        `/${PREFIX_ROUTE}/discover/${formFilter.type}?sort_by=${formFilter.sortBy}&primary_release_date_lte=${yearGte}&with_genres=${formFilter.genre}&with_original_language=${formFilter.country}&page=${formFilter.page}&limit=${formFilter.limit}`
      );
}

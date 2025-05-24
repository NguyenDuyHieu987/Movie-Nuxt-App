import { makeRequest } from './makeRequest';

import type { formfilter } from '~/types';

const PREFIX_ROUTE = 'tv';

export function getTvs(page: number = 1, limit: number = 12) {
  return makeRequest(`/${PREFIX_ROUTE}/all`, {
    page,
    limit
  });
}

export function getTvAiringToday(page: number = 1, limit: number = 12) {
  return makeRequest(`/${PREFIX_ROUTE}/airingtoday`, {
    page,
    limit
  });
}

export function getTvOntheAir(page: number = 1, limit: number = 12) {
  return makeRequest(`/${PREFIX_ROUTE}/ontheair`, {
    page,
    limit
  });
}

export function getTvPopular(page: number = 1, limit: number = 12) {
  return makeRequest(`/${PREFIX_ROUTE}/popular`, {
    page,
    limit
  });
}

export function getTvTopRated(page: number = 1, limit: number = 12) {
  return makeRequest(`/${PREFIX_ROUTE}/toprated`, {
    page,
    limit
  });
}

export function FilterTvSlug(formFilter: formfilter) {
  const utils = useUtils();

  const isBefore = formFilter.year.toString().toLowerCase().startsWith('truoc');
  const isAfter = formFilter.year.toString().toLowerCase().startsWith('sau');

  const yearGte = !utils.isStringEmpty(formFilter.year.toString())
    ? utils.isNumber(formFilter.year)
      ? formFilter.year + '-01-01'
      : (isAfter
          ? (+formFilter.year.toString().slice(-4) + 1).toString()
          : formFilter.year.toString().slice(-4)) + '-01-01'
    : '';
  const yearLte = !utils.isStringEmpty(formFilter.year.toString())
    ? utils.isNumber(formFilter.year)
      ? formFilter.year + '-12-30'
      : formFilter.year.toString().slice(-4) + (isBefore ? '-01-01' : '-12-30')
    : '';

  // return utils.isStringNumber(formFilter.year) || formFilter.year == ''
  // ? makeRequest(
  //     `/${PREFIX_ROUTE}/discover/${formFilter.type}?sort_by=${formFilter.sortBy}&primary_release_date_gte=${yearGte}&primary_release_date_lte=${yearLte}&with_genres=${formFilter.genre}&with_origin_country=${formFilter.country}&page=${formFilter.page}&limit=${formFilter.limit}`
  //   )
  // : makeRequest(
  //     `/${PREFIX_ROUTE}/discover/${formFilter.type}?sort_by=${formFilter.sortBy}&primary_release_date_lte=${yearGte}&with_genres=${formFilter.genre}&with_origin_country=${formFilter.country}&page=${formFilter.page}&limit=${formFilter.limit}`
  //   );
  return makeRequest(`/${PREFIX_ROUTE}/discover/${formFilter.type}`, {
    sort_by: formFilter.sortBy,
    primary_release_date_gte: isBefore ? '' : yearGte,
    primary_release_date_lte: isAfter ? '' : yearLte,
    with_genres: formFilter.genre,
    with_origin_country: formFilter.country,
    page: formFilter.page,
    limit: formFilter.limit
  });
}

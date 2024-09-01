import { makeRequest } from './makeRequest';
import type { formfilter } from '@/types';

const PREFIX_ROUTE = 'mod';

export function getAllMod() {
  return makeRequest(`/${PREFIX_ROUTE}/get-all`);
}

export function getAllModWithData(
  type: string,
  page: number = 1,
  limit: number = 3,
  listCount: number = 20
) {
  return makeRequest(`/${PREFIX_ROUTE}/get-all-with-data`, {
    type,
    page,
    limit,
    list_count: listCount
  });
}

export function FilterModWithData(formFilter: formfilter) {
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

  return makeRequest(`/${PREFIX_ROUTE}/filter-with-data/${formFilter.type}`, {
    sort_by: formFilter.sortBy,
    primary_release_date_gte: isBefore ? '' : yearGte,
    primary_release_date_lte: isAfter ? '' : yearLte,
    with_genres: formFilter.genre,
    with_original_language: formFilter.country,
    page: formFilter.page,
    limit: formFilter.limit
  });
}

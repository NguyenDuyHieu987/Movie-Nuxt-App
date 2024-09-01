import { makeRequest } from './makeRequest';
import { FilterMovie } from './discover';
import type { formfilter } from '@/types';

const PREFIX_ROUTE = 'modlist';

export function FilterModList(formFilter: formfilter) {
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

  if (utils.isStringEmpty(formFilter.slug) || formFilter.slug == 'all') {
    return FilterMovie(formFilter);
  }

  return makeRequest(
    `/${PREFIX_ROUTE}/filter/${formFilter.type}/${formFilter.slug}`,
    {
      // slug: formFilter.slug,
      sort_by: formFilter.sortBy,
      primary_release_date_gte: isBefore ? '' : yearGte,
      primary_release_date_lte: isAfter ? '' : yearLte,
      with_genres: formFilter.genre,
      with_original_language: formFilter.country,
      page: formFilter.page,
      limit: formFilter.limit
    }
  );
}

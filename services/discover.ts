import ALLGENRES from '../constants/data/Genres.json';
import ALLCOUNTRIES from '@/constants/data/Country.json';
import { getCountryByShortName } from './country';
import { getGenreByShortName } from './genres';
import { makeRequest } from './makeRequest';

import type { country, formfilter, genre, typeMovie, typeTv } from '@/types';

const PREFIX_ROUTE = 'discover';

export function FilterMovie(formFilter: formfilter) {
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
  //   ? makeRequest(
  //       `/${PREFIX_ROUTE}/${formFilter.type}?sort_by=${formFilter.sortBy}&primary_release_date_gte=${yearGte}&primary_release_date_lte=${yearLte}&with_genres=${formFilter.genre}&with_origin_country=${formFilter.country}&page=${formFilter.page}&limit=${formFilter.limit}`
  //     )
  //   : makeRequest(
  //       `/${PREFIX_ROUTE}/${formFilter.type}?sort_by=${formFilter.sortBy}&primary_release_date_lte=${yearGte}&with_genres=${formFilter.genre}&with_origin_country=${formFilter.country}&page=${formFilter.page}&limit=${formFilter.limit}`
  //     );

  return makeRequest(`/${PREFIX_ROUTE}/${formFilter.type}`, {
    sort_by: formFilter.sortBy,
    primary_release_date_gte: isBefore ? '' : yearGte,
    primary_release_date_lte: isAfter ? '' : yearLte,
    with_genres: formFilter.genre,
    with_origin_country: formFilter.country,
    page: formFilter.page,
    limit: formFilter.limit
  });
}

export function DiscoverMovie(
  type: typeMovie,
  page: number = 1,
  limit: number = 20
) {
  return makeRequest(`/movie/${type}`, {
    page,
    limit
  });
}

export function DiscoverTv(type: typeTv, page: number = 1, limit: number = 20) {
  return makeRequest(`/tv/${type}`, {
    page,
    limit
  });
}

export function getMoviesByGenres(
  genre_short_name: string,
  sort_by: string = '',
  page: number = 1,
  limit: number = 20
) {
  const genre: genre | undefined = getGenreByShortName(
    genre_short_name,
    ALLGENRES
  );

  return makeRequest(`/${PREFIX_ROUTE}/all`, {
    sort_by,
    with_genres: genre?.id,
    page,
    limit
  });
}

export function getMoviesByYear(
  year: string | number,
  sort_by: string = '',
  page: number = 1,
  limit: number = 20
) {
  const utils = useUtils();

  const isBefore = year.toString().toLowerCase().startsWith('truoc');
  const isAfter = year.toString().toLowerCase().startsWith('sau');

  const yearGte = !utils.isStringEmpty(year.toString())
    ? utils.isNumber(year)
      ? year + '-01-01'
      : (isAfter
          ? (+year.toString().slice(-4) + 1).toString()
          : year.toString().slice(-4)) + '-01-01'
    : '';
  const yearLte = !utils.isStringEmpty(year.toString())
    ? utils.isNumber(year)
      ? year + '-12-30'
      : year.toString().slice(-4) + (isBefore ? '-01-01' : '-12-30')
    : '';

  //   const url =
  //   !isNaN(+year) || utils.isNumber(year) || utils.isStringNumber(year)
  //     ? `/${PREFIX_ROUTE}/all?sort_by=${sort_by}&primary_release_date_gte=${year}-01-01&primary_release_date_lte=${year}-12-30&page=${page}&limit=${limit}`
  //     : `/${PREFIX_ROUTE}/all?sort_by=${sort_by}&primary_release_date_lte=${year.slice(
  //         -4
  //       )}-01-01&page=${page}&limit=${limit}`;

  // return makeRequest(url);

  return makeRequest(`/${PREFIX_ROUTE}/all`, {
    sort_by,
    primary_release_date_gte: isBefore ? '' : yearGte,
    primary_release_date_lte: isAfter ? '' : yearLte,
    page,
    limit
  });
}

export function getMovieByCountry(
  country_short_name: string,
  sort_by: string = '',
  page: number = 1,
  limit: number = 20
) {
  const country: country | undefined = getCountryByShortName(
    country_short_name,
    ALLCOUNTRIES
  );

  return makeRequest(
    `/${PREFIX_ROUTE}/all?sort_by=${sort_by}&with_origin_country=${
      country!.iso_3166_1
    }&page=${page}&limit=${limit}`
  );
}

import ALLGENRES from '../constants/data/Genres.json';
import { getCountryByShortName } from './country';
import { getGenreByShortName } from './genres';
import { makeRequest } from './makeRequest';

import ALLCOUNTRIES from '@/constants/data/Country.json';
import type { country, formfilter, genre, typeMovie, typeTv } from '@/types';

export function FilterMovie(formFilter: formfilter) {
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
        `/discover/${formFilter.type}?sort_by=${formFilter.sortBy}&primary_release_date_gte=${yearGte}&primary_release_date_lte=${yearLte}&with_genres=${formFilter.genre}&with_original_language=${formFilter.country}&page=${formFilter.page}&limit=${formFilter.limit}`
      )
    : makeRequest(
        `/discover/${formFilter.type}?sort_by=${formFilter.sortBy}&primary_release_date_lte=${yearGte}&with_genres=${formFilter.genre}&with_original_language=${formFilter.country}&page=${formFilter.page}&limit=${formFilter.limit}`
      );
}

export function DiscoverMovie(type: typeMovie, page: number = 1) {
  return makeRequest(`/movie/${type}?page=${page}`);
}

export function DiscoverTv(type: typeTv, page: number = 1) {
  return makeRequest(`/tv/${type}?page=${page}`);
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

  return makeRequest(
    `/discover/all?sort_by=${sort_by}&with_genres=${
      genre!.id
    }&page=${page}&limit=${limit}`
  );
}

export function getMoviesByYear(
  year: string,
  sort_by: string = '',
  page: number = 1,
  limit: number = 20
) {
  const url = /^\d+$/.test(year)
    ? `/discover/all?sort_by=${sort_by}&primary_release_date_gte=${year}-01-01&primary_release_date_lte=${year}-12-30&page=${page}&limit=${limit}`
    : `/discover/all?sort_by=${sort_by}&primary_release_date_lte=${year.slice(
        -4
      )}-01-01&page=${page}&limit=${limit}`;

  return makeRequest(url);
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
    `/discover/all?sort_by=${sort_by}&with_original_language=${
      country!.iso_639_1
    }&page=${page}&limit=${limit}`
  );
}

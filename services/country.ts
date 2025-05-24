import { makeRequest } from './makeRequest';

import ALLCOUNTRIES from '@/constants/data/Country.json';
import type { country } from '~/types';

const PREFIX_ROUTE = 'country';

export function getAllCountry() {
  return makeRequest(`/${PREFIX_ROUTE}/get-all`);
}

export function getCountryVietSub(
  name: string,
  allCountries: country[]
): country {
  if (allCountries?.length != 0) {
    return allCountries.find((country) => country.name === name)!;
  } else {
    return ALLCOUNTRIES.find((country) => country.name === name)!;
  }
}

export function getCountryByShortName(
  country_short_name: string,
  allCountries: country[]
): country {
  if (allCountries?.length != 0) {
    return allCountries.find(
      (country) => country.short_name === country_short_name
    )!;
  } else {
    return ALLCOUNTRIES.find(
      (country) => country.short_name === country_short_name
    )!;
  }
}

export function getCountryByOriginalLanguage(
  origin_country: string | string[],
  allCountries: country[]
): country {
  var name = _lodash_IsArray(origin_country)
    ? origin_country[0]
    : origin_country;
  if (allCountries?.length != 0) {
    return allCountries.find((language) => language.iso_3166_1 === name)!;
  } else {
    return ALLCOUNTRIES.find((language) => language.iso_3166_1 === name)!;
  }
}

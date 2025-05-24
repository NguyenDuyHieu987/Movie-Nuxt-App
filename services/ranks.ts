import { makeRequest } from './makeRequest';

import type { formfilterRank, rankSort } from '~/types';

const PREFIX_ROUTE = 'ranks';

export function getRanking(page: number = 1, limit: number = 10) {
  return makeRequest(`/discover/all`, { sort_by: 'views_desc', page, limit });
}

export function filterRanks(formfilterRank: formfilterRank) {
  return makeRequest(
    `/${PREFIX_ROUTE}/filter/${formfilterRank.type}/${formfilterRank.sortBy}`,
    {
      media_type: formfilterRank.mediaType,
      with_genres: formfilterRank.genre,
      with_origin_country: formfilterRank.country,
      page: formfilterRank.page,
      limit: formfilterRank.limit
    }
  );
}

export function getRankSearch(
  sort: rankSort = 'day',
  page: number = 1,
  limit: number = 10
) {
  return makeRequest(`/${PREFIX_ROUTE}/hot-search/${sort}`, { page, limit });
}

export function getRankPlay(
  sort: rankSort = 'day',
  page: number = 1,
  limit: number = 10
) {
  return makeRequest(`/${PREFIX_ROUTE}/hot-play/${sort}`, { page, limit });
}

export function getRankHighRate(
  sort: rankSort = 'day',
  page: number = 1,
  limit: number = 10
) {
  return makeRequest(`/${PREFIX_ROUTE}/high-rate/${sort}`, { page, limit });
}

export function addRankPlay(params: { movie_id: string; media_type: string }) {
  const bodyFormData = new FormData();
  bodyFormData.append('movie_id', params.movie_id);
  bodyFormData.append('media_type', params.media_type);

  return makeRequest(`/${PREFIX_ROUTE}/add-play`, null, {
    method: 'POST',
    data: bodyFormData
  });
}

export function addRankSearch(params: {
  movie_id?: string;
  media_type?: string;
  query: string;
}) {
  const bodyFormData = new FormData();
  params?.movie_id && bodyFormData.append('movie_id', params.movie_id!);
  params?.media_type && bodyFormData.append('media_type', params.media_type!);
  bodyFormData.append('query', params.query);

  return makeRequest(`/${PREFIX_ROUTE}/add-search`, null, {
    method: 'POST',
    data: bodyFormData
  });
}

export function addRankRate(params: {
  movie_id: string;
  media_type: string;
  rate_value: number;
}) {
  const bodyFormData = new FormData();
  bodyFormData.append('movie_id', params.movie_id!);
  bodyFormData.append('media_type', params.media_type!);
  bodyFormData.append('rate_value', params.rate_value.toString());

  return makeRequest(`/${PREFIX_ROUTE}/add-rate`, null, {
    method: 'POST',
    data: bodyFormData
  });
}

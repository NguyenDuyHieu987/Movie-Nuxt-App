import { makeRequest } from './makeRequest';

const PREFIX_ROUTE = 'search';

export function getDaTaSearch(
  query: string,
  page: number = 1,
  limit: number = 20
) {
  return makeRequest(`/${PREFIX_ROUTE}/all`, { query, page, limit });
}

export function getDaTaTopSearch(page: number = 1, limit: number = 10) {
  return makeRequest(`/${PREFIX_ROUTE}/top-search`, { page, limit });
}

export function getDaTaSearchInTopSearch(
  query: string,
  page: number = 1,
  limit: number = 10
) {
  return makeRequest(`/${PREFIX_ROUTE}/top-history/search`, {
    query,
    page,
    limit
  });
}

export function getDaTaSearchHistory(page: number = 1, limit: number = 10) {
  return makeRequest(`/${PREFIX_ROUTE}/search-history`, { page, limit });
}

export function getDaTaSearchInHistory(
  query: string,
  page: number = 1,
  limit: number = 10
) {
  return makeRequest(`/${PREFIX_ROUTE}/search-history/search`, {
    query,
    page,
    limit
  });
}

export function addSearch(params: {
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

export function addSearchHistory(query: string) {
  const bodyFormData = new FormData();
  bodyFormData.append('query', query);

  return makeRequest(`/${PREFIX_ROUTE}/add-history`, null, {
    method: 'POST',
    data: bodyFormData
  });
}

export function removeSearchHistory(id: string) {
  const bodyFormData = new FormData();
  bodyFormData.append('id', id);

  return makeRequest(`/${PREFIX_ROUTE}/remove-history`, null, {
    method: 'DELETE',
    data: bodyFormData
  });
}

export function clearSearchHistory() {
  return makeRequest(`/${PREFIX_ROUTE}/clear-history`, null, {
    method: 'DELETE'
  });
}

import { makeRequest } from './makeRequest';

export function getDaTaSearch(
  query: string,
  page: number = 1,
  limit: number = 20
) {
  return makeRequest(`/search/all?query=${query}&page=${page}&limit=${limit}`);
}

export function getDaTaTopSearch(page: number = 1, limit: number = 10) {
  return makeRequest(`/search/top-search?page=${page}&limit=${limit}`);
}

export function getDaTaSearchInTopSearch(
  query: string,
  page: number = 1,
  limit: number = 10
) {
  return makeRequest(
    `/search/top-history/search?query=${query}&page=${page}&limit=${limit}`
  );
}

export function getDaTaSearchHistory(page: number = 1, limit: number = 10) {
  return makeRequest(`/search/search-history?page=${page}&limit=${limit}`);
}

export function getDaTaSearchInHistory(
  query: string,
  page: number = 1,
  limit: number = 10
) {
  return makeRequest(
    `/search/search-history/search?query=${query}&page=${page}&limit=${limit}`
  );
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

  return makeRequest('/search/add-search', {
    method: 'POST',
    data: bodyFormData
  });
}

export function addSearchHistory(query: string) {
  const bodyFormData = new FormData();
  bodyFormData.append('query', query);

  return makeRequest('/search/add-history', {
    method: 'POST',
    data: bodyFormData
  });
}

export function removeSearchHistory(id: string) {
  const bodyFormData = new FormData();
  bodyFormData.append('id', id);

  return makeRequest('/search/remove-history', {
    method: 'DELETE',
    data: bodyFormData
  });
}

export function clearSearchHistory() {
  return makeRequest('/search/clear-history', {
    method: 'DELETE'
  });
}

import { makeRequest } from './makeRequest';

const PREFIX_ROUTE = 'list';

export function getList(
  type: string = 'all',
  skip: number = 1,
  limit: number = 20
) {
  return makeRequest(`/${PREFIX_ROUTE}/get-all/${type}`, {
    skip,
    limit
  });
}

export function searchList(query: string, type: string = 'all') {
  return makeRequest(`/${PREFIX_ROUTE}/search/${type}`, { query });
}

export function getItemList(movieId: string, media_type: string) {
  return makeRequest(`/${PREFIX_ROUTE}/get/${media_type}/${movieId}`);
}

export function addItemList(params: { movie_id: string; media_type: string }) {
  const bodyFormData = new FormData();
  bodyFormData.append('movie_id', params.movie_id);
  bodyFormData.append('media_type', params.media_type);

  return makeRequest(`/${PREFIX_ROUTE}/add`, null, {
    method: 'POST',
    data: bodyFormData
  });
}

export function removeItemList(params: {
  id?: string;
  movie_id: string;
  media_type: string;
}) {
  const bodyFormData = new FormData();
  params?.id && bodyFormData.append('id', params.id!);
  bodyFormData.append('movie_id', params.movie_id);
  bodyFormData.append('media_type', params.media_type);

  return makeRequest(`/${PREFIX_ROUTE}/remove`, null, {
    method: 'DELETE',
    data: bodyFormData
  });
}

export function removeAllItemList() {
  return makeRequest(`/${PREFIX_ROUTE}/clear`, null, {
    method: 'DELETE'
  });
}

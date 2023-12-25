import { makeRequest } from './makeRequest';

export function getList(
  type: string = 'all',
  skip: number = 1,
  limit: number = 20
) {
  const store = useStore();

  if (!store.isLogin) return new Promise(() => {});

  return makeRequest(`/list/get-all/${type}?skip=${skip}&limit=${limit}`);
}

export function searchList(query: string, type: string = 'all') {
  return makeRequest(`/list/search/${type}?query=${query}`);
}

export function getItemList(movieId: string, media_type: string) {
  return makeRequest(`/list/get/${media_type}/${movieId}?api=hieu987`);
}

export function addItemList(params: { movie_id: string; media_type: string }) {
  const bodyFormData = new FormData();
  bodyFormData.append('movie_id', params.movie_id);
  bodyFormData.append('media_type', params.media_type);

  return makeRequest('/list/add', {
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

  return makeRequest('/list/remove', {
    method: 'DELETE',
    data: bodyFormData
  });
}

export function removeAllItemList() {
  return makeRequest('/list/clear', {
    method: 'DELETE'
  });
}

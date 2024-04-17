import { makeRequest } from './makeRequest';

const PREFIX_ROUTE = 'rating';

export function getRating(moveId: string, type: string) {
  return makeRequest(`/${PREFIX_ROUTE}/get/${type}/${moveId}`);
}

export function rating(params: {
  movie_id: string;
  media_type: string;
  value: number;
}) {
  const bodyFormData = new FormData();
  bodyFormData.append('value', params.value.toString());

  return makeRequest(
    `/${PREFIX_ROUTE}/${params.media_type}/${params.movie_id}`,
    null,
    {
      method: 'POST',
      data: bodyFormData
    }
  );
}

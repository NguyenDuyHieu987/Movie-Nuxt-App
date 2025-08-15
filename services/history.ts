import { makeRequest } from './makeRequest';
import { ElNotification } from 'element-plus';

const PREFIX_ROUTE = 'history';

export function getHistory(
  type: string = 'all',
  skip: number = 1,
  limit: number = 20
) {
  return makeRequest(`/${PREFIX_ROUTE}/get-all/${type}`, {
    skip,
    limit
  });
}

export function searchHistory(query: string, type: string = 'all') {
  return makeRequest(`/${PREFIX_ROUTE}/search/${type}`, {
    query
  });
}

export function getItemHistory(movieId: string, media_type: string) {
  return makeRequest(`/${PREFIX_ROUTE}/get/${media_type}/${movieId}`);
}

export function add_update_History(params: {
  movie_id: string;
  media_type: string;
  episode?: any;
  duration: number;
  percent: number;
  seconds: number;
}) {
  const bodyFormData = new FormData();
  bodyFormData.append('movie_id', params.movie_id);
  bodyFormData.append('media_type', params.media_type);
  params?.episode && bodyFormData.append('episode', params.episode);
  bodyFormData.append('duration', params.duration.toString());
  bodyFormData.append('percent', params.percent.toFixed(3));
  bodyFormData.append('seconds', params.seconds.toString());

  return makeRequest(`/${PREFIX_ROUTE}/add`, null, {
    method: 'POST',
    data: bodyFormData
  });
}

export function removeItemHistory(params: {
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

export function removeAllItemHistory() {
  return makeRequest(`/${PREFIX_ROUTE}/clear`, null, {
    method: 'DELETE'
  });
}

export async function handleRemoveItemFromHistory(
  movieId: string,
  media_type: string
): Promise<boolean> {
  return removeItemHistory({
    movie_id: movieId,
    media_type
  })
    .then((response) => {
      if (response?.success == true) {
        ElNotification.success({
          title: MESSAGE.STATUS.SUCCESS,
          message: 'Xóa phim khỏi lịch sử xem thành công.',
          position: 'bottom-right',
          duration: MESSAGE.DURATION.FAST
        });
        return true;
      } else {
        ElNotification.error({
          title: MESSAGE.STATUS.FAILED,
          message: 'Xóa phim khỏi lịch sử xem thất bại.',
          position: 'bottom-right',
          duration: MESSAGE.DURATION.FAST
        });
        return false;
      }
    })
    .catch((e) => {
      ElNotification.error({
        title: MESSAGE.STATUS.FAILED,
        message: 'Xóa phim khỏi lịch sử xem thất bại.',
        position: 'bottom-right',
        duration: MESSAGE.DURATION.FAST
      });

      return false;
    });
}

export async function handleRemoveAllitemFromHistory(): Promise<boolean> {
  return removeAllItemHistory()
    .then((response) => {
      if (response?.success == true) {
        ElNotification.success({
          title: MESSAGE.STATUS.SUCCESS,
          message: 'Xóa tất cả phim khỏi lịch sử xem thành công.',
          position: 'bottom-right',
          duration: MESSAGE.DURATION.FAST
        });
        return response?.results?.length == 0;
      } else {
        ElNotification.error({
          title: MESSAGE.STATUS.FAILED,
          message: 'Xóa tất cả phim khỏi lịch sử xem thất bại.',
          position: 'bottom-right',
          duration: MESSAGE.DURATION.FAST
        });
        return false;
      }
    })
    .catch((e) => {
      ElNotification.error({
        title: MESSAGE.STATUS.FAILED,
        message: 'Xóa tất cả phim khỏi lịch sử xem thất bại.',
        position: 'bottom-right',
        duration: MESSAGE.DURATION.FAST
      });

      return false;
    });
}

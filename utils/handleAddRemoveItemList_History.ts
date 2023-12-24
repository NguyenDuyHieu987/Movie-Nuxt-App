import { message } from 'ant-design-vue';
import { ElNotification } from 'element-plus';

import { removeAllItemHistory, removeItemHistory } from '~/services/history';
import {
  addItemList,
  removeAllItemList,
  removeItemList
} from '~/services/list';

export async function handleAddItemToList(
  movieId: string,
  media_type: string
): Promise<boolean> {
  // message.loading({ content: 'Đang thêm' });
  return addItemList({
    movie_id: movieId,
    media_type
  })
    .then((response) => {
      if (response?.success == true) {
        ElNotification.success({
          title: MESSAGE.STATUS.SUCCESS,
          message: 'Thêm phim vào danh sách thành công.',
          position: 'bottom-right',
          duration: MESSAGE.DURATION.FAST
        });

        return true;
      } else {
        ElNotification.error({
          title: MESSAGE.STATUS.FAILED,
          message: 'Thêm phim vào danh sách thất bại.',
          position: 'bottom-right',
          duration: MESSAGE.DURATION.FAST
        });
        return false;
      }
    })
    .catch((e) => {
      ElNotification.error({
        title: MESSAGE.STATUS.FAILED,
        message: 'Thêm phim vào danh sách thất bại.',
        position: 'bottom-right',
        duration: MESSAGE.DURATION.FAST
      });

      return false;
    });
}

export async function handleRemoveItemFromList(
  movieId: string,
  media_type: string
): Promise<boolean> {
  // message.loading({ content: 'Đang xóa' });

  return removeItemList({
    movie_id: movieId,
    media_type
  })
    .then((response) => {
      if (response?.success == true) {
        ElNotification.success({
          title: MESSAGE.STATUS.SUCCESS,
          message: 'Xóa phim khỏi danh sách thành công.',
          position: 'bottom-right',
          duration: MESSAGE.DURATION.FAST
        });

        return true;
      } else {
        ElNotification.error({
          title: MESSAGE.STATUS.FAILED,
          message: 'Xóa phim khỏi danh sách thất bại.',
          position: 'bottom-right',
          duration: MESSAGE.DURATION.FAST
        });
        return false;
      }
    })
    .catch((e) => {
      ElNotification.error({
        title: MESSAGE.STATUS.FAILED,
        message: 'Xóa phim khỏi danh sách thất bại.',
        position: 'bottom-right',
        duration: MESSAGE.DURATION.FAST
      });

      return false;
    });
}

export async function handleRemoveAllitemFromList(): Promise<boolean> {
  // message.loading({ content: 'Đang xóa tất cả Danh sách phát' });

  return removeAllItemList()
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

export async function handleRemoveItemFromHistory(
  movieId: string,
  media_type: string
): Promise<boolean> {
  // message.loading({ content: 'Đang xóa' });

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
  // message.loading({ content: 'Đang xóa tất cả Lịch sử xem' });

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

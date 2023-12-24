import { message } from 'ant-design-vue'
import axios from 'axios'
import { ElMessage, ElNotification } from 'element-plus'

import { removeAllItemHistory, removeItemHistory } from '~/services/history'
import { addItemList, removeAllItemList, removeItemList } from '~/services/list'

export async function handleAddItemToList(movieId: string, media_type: string): Promise<boolean> {
  // message.loading({ content: 'Đang thêm' });
  return addItemList({
    movie_id: movieId,
    media_type
  })
    .then((response) => {
      if (response?.success == true) {
        // message.destroy();
        // ElMessage({
        //   type: 'success',
        //   message: `Thêm thành công!`,
        // });

        ElNotification({
          title: 'Thành công!',
          message: 'Thêm phim vào danh sách thành công.',
          type: 'success',
          position: 'bottom-right',
          duration: 3000
        })

        return true
      } else {
        message.destroy()
        // ElMessage({
        //   type: 'error',
        //   message: `Thêm thất bại!`,
        // });

        ElNotification({
          title: 'Thất bại!',
          message: 'Thêm phim vào danh sách thất bại.',
          type: 'error',
          position: 'bottom-right',
          duration: 3000
        })
        return false
      }
    })
    .catch((e) => {
      message.destroy()
      ElNotification({
        title: 'Thất bại!',
        message: 'Thêm phim vào danh sách thất bại.',
        type: 'error',
        position: 'bottom-right',
        duration: 3000
      })

      return false
    })
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
        message.destroy()
        // ElMessage({
        //   type: 'success',
        //   message: `Xóa thành công!`,
        // });

        ElNotification({
          title: 'Thành công!',
          message: 'Xóa phim khỏi danh sách thành công.',
          type: 'success',
          position: 'bottom-right',
          duration: 3000
        })

        return true
      } else {
        message.destroy()
        // ElMessage({
        //   type: 'error',
        //   message: `Xóa thất bại!`,
        // });

        ElNotification({
          title: 'Thất bại!',
          message: 'Xóa phim khỏi danh sách thất bại.',
          type: 'error',
          position: 'bottom-right',
          duration: 3000
        })
        return false
      }
    })
    .catch((e) => {
      message.destroy()
      ElNotification({
        title: 'Thất bại!',
        message: 'Xóa phim khỏi danh sách thất bại.',
        type: 'error',
        position: 'bottom-right',
        duration: 3000
      })

      return false
    })
}

export async function handleRemoveAllitemFromList(): Promise<boolean> {
  // message.loading({ content: 'Đang xóa tất cả Danh sách phát' });

  return removeAllItemList()
    .then((response) => {
      if (response?.success == true) {
        message.destroy()
        // ElMessage({
        //   type: 'success',
        //   message: `Xóa thành công!`,
        // });
        ElNotification({
          title: 'Thành công!',
          message: 'Xóa tất cả phim khỏi lịch sử xem thành công.',
          type: 'success',
          position: 'bottom-right',
          duration: 3000
        })

        return response?.results?.length == 0
      } else {
        message.destroy()
        // ElMessage({
        //   type: 'error',
        //   message: `Xóa thất bại!`,
        // });
        ElNotification({
          title: 'Thất bại!',
          message: 'Xóa tất cả phim khỏi lịch sử xem thất bại.',
          type: 'error',
          position: 'bottom-right',
          duration: 3000
        })
        return false
      }
    })
    .catch((e) => {
      message.destroy()
      ElNotification({
        title: 'Thất bại!',
        message: 'Xóa tất cả phim khỏi lịch sử xem thất bại.',
        type: 'error',
        position: 'bottom-right',
        duration: 3000
      })

      return false
    })
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
        message.destroy()
        // ElMessage({
        //   type: 'success',
        //   message: `Xóa thành công!`,
        // });

        ElNotification({
          title: 'Thành công!',
          message: 'Xóa phim khỏi lịch sử xem thành công.',
          type: 'success',
          position: 'bottom-right',
          duration: 3000
        })
        return true
      } else {
        message.destroy()
        // ElMessage({
        //   type: 'error',
        //   message: `Xóa thất bại!`,
        // });

        ElNotification({
          title: 'Thất bại!',
          message: 'Xóa phim khỏi lịch sử xem thất bại.',
          type: 'error',
          position: 'bottom-right',
          duration: 3000
        })
        return false
      }
    })
    .catch((e) => {
      message.destroy()
      ElNotification({
        title: 'Thất bại!',
        message: 'Xóa phim khỏi lịch sử xem thất bại.',
        type: 'error',
        position: 'bottom-right',
        duration: 3000
      })

      return false
    })
}

export async function handleRemoveAllitemFromHistory(): Promise<boolean> {
  // message.loading({ content: 'Đang xóa tất cả Lịch sử xem' });

  return removeAllItemHistory()
    .then((response) => {
      if (response?.success == true) {
        message.destroy()
        ElNotification({
          title: 'Thành công!',
          message: 'Xóa tất cả phim khỏi lịch sử xem thành công.',
          type: 'success',
          position: 'bottom-right',
          duration: 3000
        })
        return response?.results?.length == 0
      } else {
        message.destroy()
        ElNotification({
          title: 'Thất bại!',
          message: 'Xóa tất cả phim khỏi lịch sử xem thất bại.',
          type: 'error',
          position: 'bottom-right',
          duration: 3000
        })
        return false
      }
    })
    .catch((e) => {
      message.destroy()
      ElNotification({
        title: 'Thất bại!',
        message: 'Xóa tất cả phim khỏi lịch sử xem thất bại.',
        type: 'error',
        position: 'bottom-right',
        duration: 3000
      })

      return false
    })
}

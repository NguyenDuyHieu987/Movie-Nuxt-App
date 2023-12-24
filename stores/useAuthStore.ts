import { computed, ref } from 'vue';
import { CloseCircleFilled } from '@ant-design/icons-vue';
import { useBreakpoints } from '@vueuse/core';
import { ElNotification } from 'element-plus';
import { defineStore } from 'pinia';

import type { user } from '@/types';
import { getUserToken, LogOut } from '~/services/authentication';

const breakpoints = useBreakpoints({
  desktop: 1300
});

export const useAuthStore = defineStore('auth', () => {
  const userAccount = ref<user>(null);
  const role = computed<string>(() => userAccount.value?.role || 'normal');
  const isLogin = computed<boolean>(() => !!userAccount.value);
  const openRequireAuthDialog = ref<boolean>(false);
  const loadingUser = ref<boolean>(true);

  // watch(largerThanDesktop, () => {
  //   if (largerThanDesktop.value) {
  //     collapsed.value = false;
  //   } else {
  //     collapsed.value = true;
  //   }
  // });

  const setCloseRequireAuthDialog = () => {
    openRequireAuthDialog.value = false;
  };

  const utils = useUtils();
  const store = useStore();

  const loadUser = async () => {
    loadingUser.value = true;

    if (
      utils.localStorage.getWithExpiry('user_token') != null ||
      utils.cookie.getCookie('user_token') != null
    ) {
      await getUserToken({
        user_token: utils.localStorage.getWithExpiry('user_token')
      })
        .then((accountResponse: any) => {
          if (accountResponse?.isLogin == true) {
            userAccount.value = accountResponse?.result;

            if (utils.localStorage.getWithExpiry('user_token') == null) {
              utils.localStorage.setWithExpiry(
                'user_token',
                utils.cookie.getCookie('user_token'),
                24
              );
            }
          } else {
            window.localStorage.removeItem('user_token');
          }
        })
        .catch((e) => {
          ElNotification.error({
            title: 'Lỗi!',
            message: 'Some thing went wrong.',
            icon: () =>
              h(CloseCircleFilled, {
                style: 'color: red'
              })
          });
        })
        .finally(() => {
          loadingUser.value = false;
        });
    } else {
      setTimeout(() => {
        loadingUser.value = false;
      }, 300);
    }
  };

  function logOut() {
    if (isLogin.value) {
      store.loadingAppInstance.start();

      LogOut({})
        .then((response) => {
          if (response?.isLogout == true) {
            new Promise((resolve, reject) => {
              resolve(navigateTo('/login'));
            }).then(() => {
              setTimeout(() => {
                window.localStorage.removeItem('user_token');
                userAccount.value = null;
              }, 200);
            });
          } else {
            ElNotification.error({
              title: 'Lỗi!',
              message: 'Đăng xuất thất bại.',
              icon: () =>
                h(CloseCircleFilled, {
                  style: 'color: red'
                })
            });
          }
        })
        .catch((e) => {
          ElNotification.error({
            title: 'Lỗi!',
            message: 'Đăng xuất thất bại.',
            icon: () =>
              h(CloseCircleFilled, {
                style: 'color: red'
              })
          });
        })
        .finally(() => {
          setTimeout(() => {
            store.loadingAppInstance.finish();
          }, 200);
        });
    }
  }

  return {
    userAccount,
    isLogin,
    role,
    openRequireAuthDialog,
    loadingUser,
    setCloseRequireAuthDialog,
    loadUser,
    logOut
  };
});

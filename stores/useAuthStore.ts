import { computed, ref } from 'vue';
import { ElNotification } from 'element-plus';
import { defineStore } from 'pinia';

import type { user } from '@/types';
import { getUserToken, LogOut } from '~/services/authentication';

export const useAuthStore = defineStore('auth', () => {
  const userAccount = ref<user>(null);
  const role = computed<string>(() => userAccount.value?.role || 'normal');
  const isLogin = computed<boolean>(() => !!userAccount.value);
  const openRequireAuthDialog = ref<boolean>(false);
  const loadingUser = ref<boolean>(true);

  const setCloseRequireAuthDialog = () => {
    openRequireAuthDialog.value = false;
  };

  const utils = useUtils();
  const store = useStore();

  const loadUser = async () => {
    loadingUser.value = true;

    if (
      utils.localStorage.getWithExpiry(TOKEN.NAME.USER_TOKEN) != null ||
      utils.cookie.getCookie(TOKEN.NAME.USER_TOKEN) != null
    ) {
      await getUserToken({
        user_token: utils.localStorage.getWithExpiry(TOKEN.NAME.USER_TOKEN)
      })
        .then((accountResponse: any) => {
          if (accountResponse?.isLogin == true) {
            userAccount.value = accountResponse?.result;

            if (
              utils.localStorage.getWithExpiry(TOKEN.NAME.USER_TOKEN) == null
            ) {
              utils.localStorage.setWithExpiry(
                TOKEN.NAME.USER_TOKEN,
                utils.cookie.getCookie(TOKEN.NAME.USER_TOKEN),
                TOKEN.OFFSET.USER_TOKEN
              );
            }
          } else {
            window.localStorage.removeItem(TOKEN.NAME.USER_TOKEN);
          }
        })
        .catch((e) => {
          ElNotification.error({
            title: MESSAGE.STATUS.BROKE,
            message: MESSAGE.STATUS.BROKE_MESSAGE,
            duration: MESSAGE.DURATION.DEFAULT
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
                window.localStorage.removeItem(TOKEN.NAME.USER_TOKEN);
                userAccount.value = null;
              }, 200);
            });
          } else {
            ElNotification.error({
              title: MESSAGE.STATUS.FAILED,
              message: 'Đăng xuất thất bại.',
              duration: MESSAGE.DURATION.DEFAULT
            });
          }
        })
        .catch((e) => {
          ElNotification.error({
            title: MESSAGE.STATUS.FAILED,
            message: 'Đăng xuất thất bại.',
            duration: MESSAGE.DURATION.DEFAULT
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

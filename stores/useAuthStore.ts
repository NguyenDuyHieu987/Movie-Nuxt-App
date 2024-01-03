import { computed, ref } from 'vue';
import { ElNotification } from 'element-plus';
import { defineStore } from 'pinia';

import type { subscription, user } from '@/types';
import { getUserToken, LogOut } from '~/services/authentication';
import { getMySubscription } from '~/services/subscription';

export const useAuthStore = defineStore('auth', () => {
  const userAccount = ref<user>(null);
  const subscription = ref<subscription>(null);
  const role = computed<string>(() => userAccount.value?.role || 'normal');
  const isLogin = computed<boolean>(() => !!userAccount.value);
  const isVipMember = computed<boolean>(
    () => !!subscription.value && subscription.value?.vip != 0
  );
  const isOpenRequireAuthDialog = ref<boolean>(false);
  const loadingUser = ref<boolean>(true);
  const loadingSubscription = ref<boolean>(true);

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
        .then((response) => {
          if (response?.isLogin == true) {
            userAccount.value = response?.result;

            if (response?.subscription) {
              subscription.value = response.subscription;
            }

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
        .finally(async () => {
          loadingUser.value = false;
        });
    } else {
      await wait(300);

      loadingUser.value = false;
    }
  };

  const loadSubscription = async () => {
    loadingSubscription.value = true;

    if (
      utils.localStorage.getWithExpiry(TOKEN.NAME.USER_TOKEN) != null ||
      utils.cookie.getCookie(TOKEN.NAME.USER_TOKEN) != null
    ) {
      await getMySubscription({
        user_token: utils.localStorage.getWithExpiry(TOKEN.NAME.USER_TOKEN)
      })
        .then((response) => {
          if (response) {
            subscription.value = response;
          }
        })
        .catch((e) => {
          ElNotification.error({
            title: MESSAGE.STATUS.BROKE,
            message: MESSAGE.STATUS.BROKE_MESSAGE,
            duration: MESSAGE.DURATION.DEFAULT
          });
        })
        .finally(async () => {
          loadingSubscription.value = false;
        });
    } else {
      await wait(300);

      loadingSubscription.value = false;
    }
  };

  function logOut() {
    if (isLogin.value) {
      store.loadingAppInstance.start();

      if (userAccount.value?.auth_type == 'facebook') {
        window.FB.logout(() => {
          console.log('Facebook logout');
        });
      }

      LogOut()
        .then(async (response) => {
          if (response?.isLogout == true) {
            navigateTo('/login');

            await wait(200);

            window.localStorage.removeItem(TOKEN.NAME.USER_TOKEN);
            userAccount.value = null;
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
          store.loadingAppInstance.finish();
        });
    }
  }

  return {
    userAccount,
    subscription,
    isLogin,
    role,
    isVipMember,
    isOpenRequireAuthDialog,
    loadingUser,
    loadUser,
    loadSubscription,
    logOut
  };
});

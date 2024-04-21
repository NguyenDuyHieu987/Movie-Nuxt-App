import { computed, ref } from 'vue';
import { ElNotification } from 'element-plus';
import { defineStore } from 'pinia';

import type { subscription, user } from '@/types';
import { getUserByToken, LogOut } from '~/services/authentication';
import { getMySubscription } from '~/services/subscription';

export const useAuthStore = defineStore('auth', () => {
  const userAccount = ref<user>(null);
  const subscription = ref<subscription>(null);
  const role = computed<string>(() => userAccount.value?.role || 'normal');
  const isLogin = computed<boolean>(() => !!userAccount.value);
  const isVipMember = computed<boolean>(
    () => !!subscription.value && subscription.value?.plan.vip != 0
  );
  const vipNumber = computed<number>(() => subscription.value?.plan?.vip || 0);
  const isOpenRequireAuthDialog = ref<boolean>(false);
  const loadingUser = ref<boolean>(true);
  const loadingSubscription = ref<boolean>(true);

  const utils = useUtils();
  const store = useStore();

  const loadUser = async () => {
    loadingUser.value = true;

    await nextTick();

    const localUserToken = utils.localStorage.getWithExpiry(
      TOKEN.NAME.USER_TOKEN
    );
    const cookieUserToken = utils.cookie.getCookie(TOKEN.NAME.USER_TOKEN);

    if (localUserToken || cookieUserToken) {
      await getUserByToken({
        userToken: localUserToken || cookieUserToken
      })
        .then((response) => {
          if (response?.isLogin == true) {
            userAccount.value = response?.result;

            if (response?.subscription) {
              subscription.value = response.subscription;
            }

            if (
              localUserToken != response.headers.get('Authorization') ||
              localUserToken != utils.cookie.getCookie(TOKEN.NAME.USER_TOKEN) ||
              localUserToken == null
            ) {
              utils.localStorage.setWithExpiry(
                TOKEN.NAME.USER_TOKEN,
                utils.cookie.getCookie(TOKEN.NAME.USER_TOKEN) ||
                  response.headers.get('Authorization'),
                TOKEN.OFFSET.USER_TOKEN
              );
            }
          } else {
            window.localStorage.removeItem(TOKEN.NAME.USER_TOKEN);
          }
        })
        .catch((e) => {
          window.localStorage.removeItem(TOKEN.NAME.USER_TOKEN);

          // if (e?.status != 401 || e?.status != 403) {
          //   ElNotification.error({
          //     title: MESSAGE.STATUS.BROKE,
          //     message: MESSAGE.STATUS.BROKE_MESSAGE,
          //     duration: MESSAGE.DURATION.DEFAULT
          //   });
          // }
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

  const logOut = async () => {
    if (isLogin.value) {
      store.loadingAppInstance.start();

      if (userAccount.value?.auth_type == 'facebook') {
        window.FB.logout(() => {});
      }

      await LogOut()
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
        .finally(async () => {
          store.loadingAppInstance.finish();
        });
    }
  };

  return {
    userAccount,
    subscription,
    isLogin,
    role,
    isVipMember,
    vipNumber,
    isOpenRequireAuthDialog,
    loadingUser,
    loadUser,
    loadSubscription,
    logOut
  };
});

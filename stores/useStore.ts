import { computed, ref } from 'vue';
import { CloseCircleFilled } from '@ant-design/icons-vue';
import { useBreakpoints } from '@vueuse/core';
import { ElNotification } from 'element-plus';
import { defineStore } from 'pinia';

import type { country, genre, user, year } from '@/types';
import { getUserToken, LogOut } from '~/services/authentication';

const breakpoints = useBreakpoints({
  desktop: 1300
});

export default defineStore('store', () => {
  const collapsed = breakpoints.smaller('desktop');

  const userAccount = ref<user>(null);
  const role = computed<string>(() => userAccount.value?.role || 'normal');
  const isLogin = computed<boolean>(() => !!userAccount.value);
  // const collapsed = ref<boolean>(!largerThanDesktop.value);
  const openSiderBarFixed = ref<boolean>(false);
  const headerScrolled = ref<boolean>(false);
  const openDrawer = ref<boolean>(false);
  const modalVisible = ref<boolean>(false);
  const openRequireAuthDialog = ref<boolean>(false);
  const breadCrumbValue = ref<string>('');
  const loadingApp = ref<boolean>(false);
  const loadingUser = ref<boolean>(true);
  const dataSearchHistory = ref<any[]>([]);
  const allGenres = ref<genre[]>([]);
  const allCountries = ref<country[]>([]);
  const allYears = ref<year[]>([]);

  const utils = useUtils();

  // watch(largerThanDesktop, () => {
  //   if (largerThanDesktop.value) {
  //     collapsed.value = false;
  //   } else {
  //     collapsed.value = true;
  //   }
  // });

  const setCollapsed = () => {
    collapsed.value = !collapsed.value;
  };

  const setOpendrawer = () => {
    openDrawer.value = !openDrawer.value;
  };

  const setCloseRequireAuthDialog = () => {
    openRequireAuthDialog.value = false;
  };

  const loadingAppInstance = {
    start: () => {
      loadingApp.value = true;
      document.body.classList.toggle('loading-mask');
    },
    finish: () => {
      loadingApp.value = false;
      document.body.classList.toggle('loading-mask');
    }
  };

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
      loadingAppInstance.start();

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
            loadingAppInstance.finish();
          }, 200);
        });
    }
  }

  return {
    userAccount,
    isLogin,
    role,
    breadCrumbValue,
    collapsed,
    openSiderBarFixed,
    headerScrolled,
    openDrawer,
    modalVisible,
    openRequireAuthDialog,
    loadingApp,
    loadingUser,
    loadingAppInstance,
    dataSearchHistory,
    allGenres,
    allCountries,
    allYears,
    setCollapsed,
    setOpendrawer,
    setCloseRequireAuthDialog,
    loadUser,
    logOut
  };
});

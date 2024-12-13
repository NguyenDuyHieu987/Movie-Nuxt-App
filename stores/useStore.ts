import { computed, ref } from 'vue';
import { useBreakpoints, useDark, useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';

import type { country, genre, user, year } from '@/types';

const breakpoints = useBreakpoints({
  desktop: APP.COLLAPSED_SIDEBAR_WIDTH
});

const appStorageStates = useLocalStorage(STORAGE.APP_STATES.KEY, {
  [STORAGE.APP_STATES.COLLAPSED_SIDEBAR]: false,
  [STORAGE.APP_STATES.URL_LOGIN_BACK]: '/'
});

export default defineStore('store', () => {
  const route = useRoute();
  const isDark = useDark({
    selector: 'html',
    attribute: 'class',
    valueDark: 'dark',
    valueLight: ''
  });
  const collapsed = breakpoints.smaller('desktop');

  const openSiderBarFixed = ref<boolean>(false);
  const headerScrolled = ref<boolean>(false);
  const openDrawer = ref<boolean>(false);
  const modalVisible = ref<boolean>(false);
  const breadCrumbValue = ref<string>('');
  const loadingApp = ref<boolean>(false);
  const loadingUser = ref<boolean>(true);
  const dataSearchHistory = ref<any[]>([]);
  const allGenres = ref<genre[]>([]);
  const allCountries = ref<country[]>([]);
  const allYears = ref<year[]>([]);
  const urlLoginBack = computed<string>(() =>
    appStorageStates.value[STORAGE.APP_STATES.URL_LOGIN_BACK].toString()
  );

  watch(collapsed, (newVal, oldVal) => {
    appStorageStates.value[STORAGE.APP_STATES.COLLAPSED_SIDEBAR] = newVal;

    if (oldVal) {
      openSiderBarFixed.value = false;
    } else {
      if (openSiderBarFixed.value == true) {
        openSiderBarFixed.value = false;
      }
    }
  });

  watch(
    () => route,
    () => {
      if (
        (route.meta.closeSidebar ||
          APP.PAGES_COLLAPSED_SIDEBAR.includes(route.meta.key as string)) &&
        !collapsed.value
      ) {
        collapsed.value = true;
      }
    },
    { immediate: true, deep: true }
  );

  const toogleSidebar = () => {
    collapsed.value = !collapsed.value;
  };

  const toogleDrawer = () => {
    openDrawer.value = !openDrawer.value;
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

  return {
    isDark,
    breadCrumbValue,
    collapsed,
    openSiderBarFixed,
    headerScrolled,
    openDrawer,
    modalVisible,
    loadingApp,
    loadingUser,
    loadingAppInstance,
    dataSearchHistory,
    allGenres,
    allCountries,
    allYears,
    urlLoginBack,
    toogleSidebar,
    toogleDrawer
  };
});

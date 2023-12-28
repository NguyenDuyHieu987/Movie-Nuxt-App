import { computed, ref } from 'vue';
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

  // const collapsed = ref<boolean>(!largerThanDesktop.value);
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

  // watch(largerThanDesktop, () => {
  //   if (largerThanDesktop.value) {
  //     collapsed.value = false;
  //   } else {
  //     collapsed.value = true;
  //   }
  // });

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
    toogleSidebar,
    toogleDrawer
  };
});

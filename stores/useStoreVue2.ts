import { defineStore } from 'pinia';

const utils = useUtils();

export default defineStore('store', {
  state() {
    return {
      collapsed: false,
      openDrawer: false,
      isOpenRequireAuthDialog: false,
      isLogin: !!utils.localStorage.getWithExpiry(TOKEN.NAME.USER_TOKEN),
      breadCrumbValue: '',
      role: 'normal',
      loadingHomePage: false,
      loadingMisc: false,
      loadingDashBoard: false,
      userAccount:
        utils.localStorage.getWithExpiry(TOKEN.NAME.USER_TOKEN) || {},
      allGenres: [],
      allCountries: [],
      allYears: []
    };
  },
  getters: {
    isLogin: (state) => state.isLogin
  },
  actions: {
    toogleSidebar() {
      this.collapsed = !this.collapsed;
    },
    toogleDrawer() {
      this.openDrawer = !this.openDrawer;
    }
  }
});

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();
  const utils = useUtils();

  // to.matched.some((record) => {
  //   if (record.meta.requireAuth) {
  //   }
  // });

  // if (utils.localStorage.getWithExpiry(TOKEN.NAME.USER_TOKEN)) {
  //   authStore.isLogin = true;
  // } else {
  // }
});

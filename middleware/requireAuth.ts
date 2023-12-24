export default defineNuxtRouteMiddleware((to, from) => {
  const store = useStore();
  const utils = useUtils();

  // to.matched.some((record) => {
  //   if (record.meta.requireAuth) {
  //   }
  // });

  // if (utils.localStorage.getWithExpiry(TOKEN.NAME.USER_TOKEN)) {
  //   store.isLogin = true;
  // } else {
  // }
});

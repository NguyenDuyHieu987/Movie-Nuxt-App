export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();
  const utils = useUtils();

  // to.matched.some((record: any) => {
  //   console.log(record);
  // });

  // if (utils.localStorage.getWithExpiry(TOKEN.NAME.USER_TOKEN)) {
  //   authStore.isLogin = true;
  // } else {
  // }
});

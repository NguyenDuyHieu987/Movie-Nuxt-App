export default defineNuxtRouteMiddleware((to, from) => {
  const store = useStore();
  const utils = useUtils();

  // to.matched.some((record: any) => {
  //   console.log(record);
  // });

  // if (utils.localStorage.getWithExpiry('userAccount')) {
  //   store.isLogin = true;
  // } else {
  // }
});

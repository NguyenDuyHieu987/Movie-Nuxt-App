export default defineNuxtRouteMiddleware((to, from) => {
  const store = useStore();
  const authStore = useAuthStore();
  const utils = useUtils();

  // to.matched.forEach((record: any) => {
  //   console.log(record);
  // });

  if (
    APP.PAGES_COLLAPSED_SIDEBAR.includes(to.meta.key as string) &&
    !store.collapsed
  ) {
    store.collapsed = true;
  }
});

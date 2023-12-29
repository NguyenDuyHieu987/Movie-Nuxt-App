export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();
  const utils = useUtils();

  console.log(to);

  to.matched.forEach((record: any) => {
    if (!authStore.isLogin) {
      authStore.isOpenRequireAuthDialog = true;
      return abortNavigation();
    }

    return navigateTo(record.path);
  });
});

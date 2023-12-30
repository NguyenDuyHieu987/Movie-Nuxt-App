export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();
  const utils = useUtils();

  to.matched.forEach(async (record: any) => {
    if (!authStore.loadingUser && !authStore.isLogin) {
      authStore.isOpenRequireAuthDialog = true;
      return abortNavigation();
    }

    return undefined;
  });
});

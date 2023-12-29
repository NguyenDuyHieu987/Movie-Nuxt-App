export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();
  const utils = useUtils();

  // to.matched.forEach((record: any) => {
  //   console.log(record);
  // });
});

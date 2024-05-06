export default defineNuxtRouteMiddleware((to, from) => {
  const store = useStore();
  const authStore = useAuthStore();
  const utils = useUtils();

  // to.matched.forEach((record: any) => {
  //   console.log(record);
  // });
});

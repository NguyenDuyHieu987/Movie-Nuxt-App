export default defineNuxtRouteMiddleware((to, from) => {
  const store = useStore();

  if (
    APP.PAGES_COLLAPSED_SIDEBAR.includes(to.meta.key as string) &&
    !store.collapsed
  ) {
    store.collapsed = true;
  }
});

// export default defineNuxtPlugin((nuxtApp) => {
//   nuxtApp.hook('app:created', async () => {
//     const route = useRoute();
//     // route.matched[0].meta.layout != 'auth'

//     const authStore = useAuthStore();
//     authStore.loadUser();
//   });
// });

export default defineNuxtPlugin({
  name: 'loadUser',
  async setup(nuxtApp) {
    // this is the equivalent of a normal functional plugin
  },
  hooks: {
    'app:created': async () => {
      // const route = useRoute();
      // route.matched[0].meta.layout != 'auth'

      const authStore = useAuthStore();

      authStore.loadUser();
      // authStore.loadSubscription();
    }
  },
  parallel: true,
  env: { islands: true }
});

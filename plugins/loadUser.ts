// export default defineNuxtPlugin((nuxtApp) => {
//   nuxtApp.hook('app:created', async () => {
//     const route = useRoute();
//     // route.matched[0].meta.layout != 'auth'

//     const store = useStore();
//     await store.loadUser();
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

      const store = useStore();
      await store.loadUser();
    },
  },
  parallel: true,
  env: { islands: true },
});

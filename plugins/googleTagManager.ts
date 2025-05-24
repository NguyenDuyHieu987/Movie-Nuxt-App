import VueGtag, { trackRouter } from 'vue-gtag-next';

// export default defineNuxtPlugin((nuxtApp) => {
//   nuxtApp.hook('app:created', () => {
//     const nuxtConfig = useRuntimeConfig();

//     // if (nuxtConfig.public.production_mode) {
//     nuxtApp.vueApp.use(VueGtag, {
//       property: {
//         id: nuxtConfig.public.googleAnalyticsID,
//         params: {},
//       },
//       appName: 'Phimhay247',
//       isEnabled: nuxtConfig.public.production_mode,
//     });
//     // }
//   });
// });

export default defineNuxtPlugin({
  name: 'googleTagManager',
  async setup(nuxtApp) {
    const nuxtConfig = useRuntimeConfig();

    if (nuxtConfig.public.production_mode) {
      nuxtApp.vueApp.use(VueGtag, {
        property: {
          id: nuxtConfig.public.googleAnalyticsID,
          params: {}
        },
        appName: 'Phimhay247',
        isEnabled: nuxtConfig.public.production_mode
      });
      trackRouter(useRouter());
    }
  },
  hooks: {},
  parallel: true,
  env: { islands: true }
});

import VueGtag, { trackRouter } from 'vue-gtag-next';

// export default defineNuxtPlugin((nuxtApp) => {
//   nuxtApp.hook('app:created', () => {
//     const nuxtConfig = useRuntimeConfig();

//     // if (import.meta.env.PROD) {
//     nuxtApp.vueApp.use(VueGtag, {
//       property: {
//         id: nuxtConfig.public.googleAnalyticsID,
//         params: {},
//       },
//       appName: 'Phimhay247',
//       isEnabled: import.meta.env.PROD,
//     });
//     // }
//   });
// });

export default defineNuxtPlugin({
  name: 'googleTagManager',
  async setup(nuxtApp) {
    const nuxtConfig = useRuntimeConfig();

    if (import.meta.env.PROD) {
      nuxtApp.vueApp.use(VueGtag, {
        property: {
          id: nuxtConfig.public.googleAnalyticsID,
          params: {}
        },
        appName: 'Phimhay247',
        isEnabled: import.meta.env.PROD
      });
      trackRouter(useRouter());
    }
  },
  hooks: {},
  parallel: true,
  env: { islands: true }
});

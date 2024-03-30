import VueGtag, { trackRouter } from 'vue-gtag-next';
import { isProduction } from 'std-env';

// export default defineNuxtPlugin((nuxtApp) => {
//   nuxtApp.hook('app:created', () => {
//     const nuxtConfig = useRuntimeConfig();

//     // if (isProduction) {
//     nuxtApp.vueApp.use(VueGtag, {
//       property: {
//         id: nuxtConfig.app.googleAnalyticsID,
//         params: {},
//       },
//       appName: 'Phimhay247',
//       isEnabled: isProduction,
//     });
//     // }
//   });
// });

export default defineNuxtPlugin({
  name: 'googleTagManager',
  async setup(nuxtApp) {
    const nuxtConfig = useRuntimeConfig();

    if (isProduction) {
      nuxtApp.vueApp.use(VueGtag, {
        property: {
          id: nuxtConfig.app.googleAnalyticsID,
          params: {}
        },
        appName: 'Phimhay247',
        isEnabled: isProduction
      });
      trackRouter(useRouter());
    }
  },
  hooks: {},
  parallel: true,
  env: { islands: true }
});

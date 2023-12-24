import { initFacebookSdk } from '@/utils/initFacebookSDK';

// export default defineNuxtPlugin((nuxtApp) => {
//   nuxtApp.hook('app:created', () => {
//     initFacebookSdk();
//   });
// });

export default defineNuxtPlugin({
  name: 'loadFacebookSDK',
  async setup(nuxtApp) {
    // this is the equivalent of a normal functional plugin
    // initFacebookSdk();

  },
  hooks: {
    'app:created': async () => {
      // initFacebookSdk();
    },
  },
  parallel: true,
  env: { islands: true },
});

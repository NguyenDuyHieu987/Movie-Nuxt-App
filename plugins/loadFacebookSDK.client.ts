// export default defineNuxtPlugin((nuxtApp) => {
//   nuxtApp.hook('app:created', () => {
//     utils.initFacebookSdk();
//   });
// });

export default defineNuxtPlugin({
  name: 'loadFacebookSDK',
  async setup(nuxtApp) {},
  hooks: {
    'app:created': async () => {
      const utils = useUtils();
      utils.initFacebookSdk();
    }
  },
  parallel: true,
  env: { islands: false }
});

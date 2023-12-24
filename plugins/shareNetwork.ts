import VueSocialSharing from 'vue-social-sharing';

// export default defineNuxtPlugin((nuxtApp) => {
//   nuxtApp.vueApp.use(VueSocialSharing, {});
// });

export default defineNuxtPlugin({
  name: 'shareNetwork',
  async setup(nuxtApp) {
    nuxtApp.vueApp.use(VueSocialSharing, {});
  },
  hooks: {
    'app:created': async () => {},
  },
  parallel: true,
  env: { islands: true },
});

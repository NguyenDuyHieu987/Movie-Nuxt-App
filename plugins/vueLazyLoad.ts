import VueLazyload from 'vue-lazyload';

// export default defineNuxtPlugin((nuxtApp) => {
//   nuxtApp.hook('app:created', () => {
//     nuxtApp.vueApp.use(VueLazyload, {
//       // error: '/images/svgs/error-image.svg',
//       preLoad: 1,
//     });
//   });
// });

export default defineNuxtPlugin({
  name: 'vueLazyLoad',
  async setup(nuxtApp) {
    // this is the equivalent of a normal functional plugin
  },
  hooks: {
    'app:created': async () => {
      const nuxtApp = useNuxtApp();
      nuxtApp.vueApp.use(VueLazyload, {
        // error: '/svgs/error-image.svg',
        // loading: '/gifs/Animation.gif',
        // preLoad: 1,
      });
    },
  },
  parallel: true,
  env: { islands: true },
});

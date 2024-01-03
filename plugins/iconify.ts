// import { disableCache } from '@iconify/vue';

// export default defineNuxtPlugin((nuxtApp) => {
//   // disableCache('all');
// });

export default defineNuxtPlugin({
  name: 'iconify',
  async setup(nuxtApp) {},
  hooks: {
    'app:created': async () => {
      // disableCache('all');
    }
  },
  parallel: true,
  env: { islands: true }
});

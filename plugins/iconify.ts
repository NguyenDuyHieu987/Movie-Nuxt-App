// import { disableCache } from '@iconify/vue';

// export default defineNuxtPlugin((nuxtApp) => {
//   // disableCache('all');
// });

export default defineNuxtPlugin({
  name: 'iconify',
  async setup(nuxtApp) {
    // this is the equivalent of a normal functional plugin
  },
  hooks: {
    'app:created': async () => {
      //     // disableCache('all');
    }
  },
  parallel: true,
  env: { islands: true }
});

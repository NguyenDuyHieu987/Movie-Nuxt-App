import VueProgressBar from '@aacassandra/vue3-progressbar';

const progressBarOptions = {
  color: 'var(--loading-progress-bar)',
  failedColor: 'red',
  thickness: '3px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300,
  },
  autoRevert: true,
  location: 'top',
  inverse: false,
};

// export default defineNuxtPlugin((nuxtApp) => {
//   nuxtApp.vueApp.use(VueProgressBar, progressBarOptions);
// });

export default defineNuxtPlugin({
  name: 'vueProgressBar',
  async setup(nuxtApp) {
    nuxtApp.vueApp.use(VueProgressBar, progressBarOptions);
  },
  hooks: {},
  parallel: true,
  env: { islands: true },
});

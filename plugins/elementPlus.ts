// import { ID_INJECTION_KEY } from 'element-plus';

// export default defineNuxtPlugin((nuxtApp) => {
//   // nuxtApp.vueApp.provide(ID_INJECTION_KEY, {
//   //   prefix: Math.floor(Math.random() * 10000),
//   //   current: 0,
//   // });
// });

export default defineNuxtPlugin({
  name: 'elementPlus',
  async setup(nuxtApp) {
    // this is the equivalent of a normal functional plugin
  },
  hooks: {},
  parallel: true,
  env: { islands: true },
});

// import Antd from 'ant-design-vue';

// export default defineNuxtPlugin((nuxtApp) => {
//   //   nuxtApp.vueApp.use(Antd);
// });

export default defineNuxtPlugin({
  name: 'antd',
  async setup(nuxtApp) {
    // nuxtApp.vueApp.use(Antd);
  },
  hooks: {},
  parallel: true,
  env: { islands: true }
});

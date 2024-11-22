import $ from 'jquery';

declare global {
  interface Window {
    jQuery: any;
    $: any;
  }
}

export default defineNuxtPlugin({
  name: 'jquery',
  async setup(nuxtApp) {
    nuxtApp.hook('app:beforeMount', () => {
      window.jQuery = window.$ = $;
    });
  },
  hooks: {},
  parallel: true,
  env: { islands: true }
});

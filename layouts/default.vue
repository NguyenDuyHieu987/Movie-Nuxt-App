<template>
  <div class="default-layout">
    <div
      class="body-content"
      :class="{
        expand: collapsed || openSiderBarFixed,
        fixed: openSiderBarFixed,
        // home: route.name?.includes('home')
        play: APP.PAGES_COLLAPSED_SIDEBAR.includes(route.meta.key as string)
      }"
    >
      <Header />

      <div
        id="body-wrapper"
        class="body-wrapper"
      >
        <Sider />
        <Drawer />

        <main class="main-content">
          <!-- <BreadCrumb /> -->

          <div class="container">
            <slot />
          </div>

          <Footer
            v-show="route.path != '/follow' && route.path != '/history'"
          />
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import {
//   // BreadCrumb,
//   Drawer,
//   Footer,
//   Header,
//   Sider
// } from '~/components/Layouts';
// import Drawer from '~/components/Layouts/Drawer/Drawer.vue';
// import Footer from '~/components/Layouts/Footer/Footer.vue';
// import Header from '~/components/Layouts/Header/Header.vue';
// import Sider from '~/components/Layouts/Sider/Sider.vue';
import { storeToRefs } from 'pinia';
import { APP } from '~/common';

const store = useStore();
const authStore = useAuthStore();
const { collapsed, openSiderBarFixed } = storeToRefs(store);
const { isLogin } = storeToRefs(authStore);
const route = useRoute();
// const router = useRouter();

// let promise = Promise.resolve();

// router.beforeResolve(async (to: any, from: any, next: any) => {
//   promise = new Promise((resolve) => {
//     router.afterEach(() => resolve());
//   });

//   if (to.name?.includes('home')) {
//     // await promise;
//   }

//   next();
// });
</script>

<!-- <style lang="scss" src="~/assets/style/defaultLayout.scss"></style> -->
<style lang="scss">
@import url('~/assets/style/defaultLayout.scss');
</style>

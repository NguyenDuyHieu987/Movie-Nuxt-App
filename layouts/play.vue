<template>
  <div class="play-layout">
    <div
      class="body-content-play"
      :class="{
        expand: collapsed || openSiderBarFixed,
        fixed: openSiderBarFixed
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

          <Footer />
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

const store = useStore();
const authStore = useAuthStore();
const { collapsed, openSiderBarFixed } = storeToRefs(store);
const { isLogin } = storeToRefs(authStore);
const router = useRouter();

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

<style lang="scss" src="~/assets/style/playLayout.scss"></style>

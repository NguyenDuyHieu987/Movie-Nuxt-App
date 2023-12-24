<template>
  <div
    class="body-content"
    :class="{
      expand: collapsed || openSiderBarFixed,
      fixed: openSiderBarFixed,
      home: $route.meta.name?.includes('home')
    }"
  >
    <Header />

    <div
      id="body-wrapper"
      class="body-wrapper"
    >
      <Sider />
      <Drawer />

      <!-- <section
        v-show="isLogin && $route.path == '/follow'"
        id="topic-follow-column-teleport"
      ></section> -->

      <main class="main-content">
        <!-- <BreadCrumb /> -->
        <div class="container">
          <slot />
        </div>
        <Footer v-show="$route.path != '/follow' && $route.path != '/history'" />
      </main>

      <!-- <section
        v-show="isLogin && $route.path == '/history'"
        id="topic-history-column-teleport"
      ></section> -->
    </div>
  </div>
</template>

<script setup lang="ts">
// import BreadCrumb from '~/components/layouts/BreadCrumb';
import { storeToRefs } from 'pinia';

import Drawer from '~/components/layouts/Drawer/Drawer.server.vue';
import Footer from '~/components/layouts/Footer/Footer.server.vue';
import Header from '~/components/layouts/Header/Header.server.vue';
import Sider from '~/components/layouts/Sider/Sider.server.vue';

const store = useStore();
const router = useRouter();
const { collapsed, isLogin, openSiderBarFixed } = storeToRefs(store);

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

<style lang="scss" src="~/assets/style/defaultLayout.scss"></style>

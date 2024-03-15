<template>
  <div
    class="body-content"
    :class="{
      expand: collapsed || openSiderBarFixed,
      fixed: openSiderBarFixed
      // home: $route.meta.name?.includes('home')
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

        <Footer
          v-show="$route.path != '/follow' && $route.path != '/history'"
        />
      </main>

      <!-- <section
          v-show="isLogin && $route.path == '/history'"
          id="topic-history-column-teleport"
        ></section> -->
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
import Drawer from '~/components/Layouts/Drawer/Drawer.server.vue';
import Footer from '~/components/Layouts/Footer/Footer.server.vue';
import Header from '~/components/Layouts/Header/Header.server.vue';
import Sider from '~/components/Layouts/Sider/Sider.server.vue';
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

<style lang="scss" src="~/assets/style/defaultLayout.scss"></style>

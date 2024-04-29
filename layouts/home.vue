<template>
  <div
    class="body-content home"
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
        <div class="container">
          <slot />
        </div>
        <Footer />
      </main>
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
import { storeToRefs } from 'pinia';

const store = useStore();
const authStore = useAuthStore();
const { collapsed, openSiderBarFixed } = storeToRefs(store);
const { isLogin } = storeToRefs(authStore);
</script>

<style lang="scss" src="~/assets/style/homeLayout.scss"></style>

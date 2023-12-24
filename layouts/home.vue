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
        <!-- <BreadCrumb /> -->
        <div class="container">
          <slot />
        </div>
        <Footer />
      </main>
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
const { collapsed, isLogin, openSiderBarFixed } = storeToRefs(store);
</script>

<style lang="scss" src="~/assets/style/homeLayout.scss"></style>

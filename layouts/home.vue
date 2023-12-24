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
import { storeToRefs } from 'pinia';

import {
  // BreadCrumb,
  Drawer,
  Footer,
  Header,
  Sider
} from '~/components/Layouts';

const store = useStore();
const { collapsed, isLogin, openSiderBarFixed } = storeToRefs(store);
</script>

<style lang="scss" src="~/assets/style/homeLayout.scss"></style>

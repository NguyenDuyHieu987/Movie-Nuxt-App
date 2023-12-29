<template>
  <div class="home-layout">
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
const authStore = useAuthStore();
const { collapsed, openSiderBarFixed } = storeToRefs(store);
const { isLogin } = storeToRefs(authStore);
</script>

<style lang="scss" src="~/assets/style/homeLayout.scss"></style>

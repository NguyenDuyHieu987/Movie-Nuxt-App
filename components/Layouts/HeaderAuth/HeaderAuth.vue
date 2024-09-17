<template>
  <header class="header-bar-auth">
    <div class="left-header">
      <div class="logo">
        <NuxtLink :to="{ path: '/' }">
          <NuxtImg
            :src="getImage('logo.png', 'logo', { w: 45 })"
            alt=""
            :height="30"
            :width="30"
            preload
          />
          <span> PhimHay247</span>
        </NuxtLink>
      </div>
    </div>

    <div class="right-header">
      <div class="signup-suggest">
        <span
          v-if="route.path.toLowerCase() == '/login'"
          class="signup-note"
        >
          Chưa có tài khoản?
        </span>
        <NuxtLink
          v-if="route.path == '/login'"
          class="signup-btn click-active"
          :to="{ path: '/signup' }"
        >
          Đăng ký ngay
        </NuxtLink>
      </div>

      <NuxtLink
        v-if="
          route.path.toLowerCase() == '/signup' ||
          route.path.toLowerCase() == '/forgotpassword'
        "
        class="login-btn click-active"
        :to="{ path: '/login' }"
      >
        Đăng nhập
      </NuxtLink>
    </div>
  </header>
</template>

<script setup lang="ts">
import { getImage } from '~/services/image';
import { storeToRefs } from 'pinia';

const authStore = useAuthStore();
const { isLogin } = storeToRefs(authStore);
const route = useRoute();

onMounted(() => {});
</script>

<style lang="scss" src="./HeaderAuth.scss"></style>
<!-- <style lang="scss">
@import url('./HeaderAuth.scss');
</style> -->

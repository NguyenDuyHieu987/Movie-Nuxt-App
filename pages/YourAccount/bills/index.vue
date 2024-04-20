<template>
  <div class="service-page bills-page padding-content">
    <div class="center-page">
      <div v-if="!authStore.loadingUser">
        <div
          v-if="isLogin"
          class="bills-page-container"
        >
          This is Bills page
        </div>
        <RequireAuth v-else="!isLogin" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { RequireAuth } from '~/components/RequireAuth';
import RequireAuth from '~/components/RequireAuth/RequireAuth.vue';
import { storeToRefs } from 'pinia';

definePageMeta({
  layout: 'service',
  pageTransition: {
    name: 'slide-left',
    appear: true
  },
  keepalive: false
});

const store = useStore();
const authStore = useAuthStore();
const { isLogin } = storeToRefs<any>(authStore);

useHead({
  title: 'Lịch sử giao dịch, Hóa đơn',
  htmlAttrs: { lang: 'vi' }
});

useSeoMeta({
  title: 'Lịch sử giao dịch, Hóa đơn',
  description: 'Hóa đơn của bạn. Lịch sử giao dịch',
  ogTitle: 'Lịch sử giao dịch, Hóa đơn',
  ogType: 'video.movie',
  // ogUrl: window.location.href,
  ogDescription: 'Hóa đơn của bạn. Lịch sử giao dịch',
  ogLocale: 'vi'
});
</script>

<style lang="scss" src="./BillsPage.scss"></style>
<!-- <style lang="scss">
@import url('./BillsPage.scss');
</style> -->

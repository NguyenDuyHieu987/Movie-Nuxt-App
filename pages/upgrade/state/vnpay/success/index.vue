<template>
  <div class="vnpay-success">
    <div class="icon-success">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="6rem"
        height="6rem"
        viewBox="0 0 1024 1024"
      >
        <path
          d="M512 64a448 448 0 1 1 0 896a448 448 0 0 1 0-896zm-55.808 536.384l-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.272 38.272 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336L456.192 600.384z"
        />
      </svg>
    </div>

    <h2 class="title">Nâng cấp tài khoản thành công</h2>

    <div class="payment-method">
      <span> Thanh toán bằng</span>
      <nuxt-img
        :src="getImage('vnpay.png', 'payment', 'w-100')"
        loading="lazy"
        :width="100"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { getImage } from '~/services/image';

definePageMeta({
  layout: 'service',
});

useHead({
  title: 'Nâng cấp tài khoản thành công',
  htmlAttrs: { lang: 'vi' },
});

useSeoMeta({
  title: 'Nâng cấp tài khoản thành công',
  description: 'Nâng cấp tài khoản thành công, Thanh toán bằng VNPAY',
  ogTitle: 'Nâng cấp tài khoản thành công',
  ogType: 'video.movie',
  // ogUrl: window.location.href,
  ogDescription: 'Nâng cấp tài khoản thành công, Thanh toán bằng VNPAY',
  ogLocale: 'vi',
});
</script>

<style lang="scss" src="./VnpaySuccessPage.scss"></style>

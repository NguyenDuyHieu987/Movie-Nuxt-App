<template>
  <div class="vnpay-success">
    <div class="icon-success">
      <SuccessIcon
        width="6rem"
        height="6rem"
        fill="currentColor"
      />
    </div>

    <h2 class="title">Nâng cấp tài khoản thành công</h2>

    <div class="payment-method">
      <span> Thanh toán bằng</span>
      <NuxtImg
        :src="getImage('vnpay.png', 'payment', { w: 100 })"
        loading="lazy"
        :width="100"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import SuccessIcon from '~/assets/svgs/icons/success.svg?component';

import { getImage } from '~/services/image';

definePageMeta({
  layout: 'service'
});

useHead({
  title: 'Nâng cấp tài khoản thành công',
  htmlAttrs: { lang: 'vi' }
});

useSeoMeta({
  title: 'Nâng cấp tài khoản thành công',
  description: 'Nâng cấp tài khoản thành công, Thanh toán bằng VNPAY',
  ogTitle: 'Nâng cấp tài khoản thành công',
  ogType: 'video.movie',
  // ogUrl: window.location.href,
  ogDescription: 'Nâng cấp tài khoản thành công, Thanh toán bằng VNPAY',
  ogLocale: 'vi'
});
</script>

<style lang="scss" src="./VnpaySuccessPage.scss"></style>
<!-- <style lang="scss">
@import url('./VnpaySuccessPage.scss');
</style> -->

<template>
  <div class="contact padding-content">
    <div class="center-page">
      <h1 class="contact-page-title">Liên hệ với chúng tôi</h1>

      <div class="contactus-form-section">
        <p class="contactus-form-label">
          Hãy chia sẻ thêm và chúng tôi sẽ tìm giải pháp tốt nhất cho bạn
        </p>

        <form
          action=""
          class="contactus-issue-form"
        >
          <div class="issue-description-field">
            <a-input
              v-model:value="issueDescription"
              placeholder="Mô tả sự cố của bạn"
              allow-clear
            />
            <a-button
              class="submit-issue-description"
              type="primary"
              :disabled="issueDescription.length == 0"
            >
              Gửi
            </a-button>
          </div>
        </form>
      </div>

      <div class="quick-helps">
        <p class="quick-helps-title">Trợ giúp nhanh</p>

        <ul class="quick-helps-list">
          <li class="quick-helps-item">
            <SvgoLock
              width="2rem"
              height="2rem"
              fill="currentColor"
            />
            <NuxtLink
              class="title-suggestion"
              to="/YourAccount/ChangePassword"
            >
              Cập nhật mật khẩu
            </NuxtLink>
          </li>

          <li class="quick-helps-item">
            <SvgoEmail
              class="email-icon"
              width="2rem"
              height="2rem"
              fill="currentColor"
            />
            <NuxtLink
              class="title-suggestion"
              to="/YourAccount/ChangeEmail"
            >
              Cập nhật Email
            </NuxtLink>
          </li>

          <li class="quick-helps-item">
            <SvgoBillList
              width="2rem"
              height="2rem"
              fill="currentColor"
            />
            <NuxtLink
              class="title-suggestion"
              to="/YourAccount/bills"
            >
              Xem lại lịch sử thanh toán
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import SvgoLock from '~/assets/svgs/icons/lock.svg?component';
// import SvgoEmail from '~/assets/svgs/icons/email.svg?component';
// import SvgoBillList from '~/assets/svgs/icons/bill-list.svg?component';

definePageMeta({
  layout: 'center-page'
});

useHead({
  title: 'Liên hệ với chúng tôi',
  htmlAttrs: { lang: 'vi' }
});

useSeoMeta({
  title: 'Liên hệ với chúng tôi',
  description: 'Liên hệ với chúng tôi - Trợ giúp',
  ogTitle: 'Liên hệ với chúng tôi',
  ogType: 'video.movie',
  // ogUrl: window.location.href,
  ogDescription: 'Liên hệ với chúng tôi - Trợ giúp',
  ogLocale: 'vi'
});

const issueDescription = ref<string>('');
const quickHelps = ref<[{ title: string; path: string }]>([
  { title: '', path: '' }
]);
</script>

<style lang="scss" src="./ContactPage.scss"></style>
<!-- <style lang="scss">
@import url('./ContactPage.scss');
</style> -->

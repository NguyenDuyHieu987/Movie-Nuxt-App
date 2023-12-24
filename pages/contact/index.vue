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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2rem"
              height="2rem"
              viewBox="0 0 14 14"
              fill="currentColor"
            >
              <g
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect
                  width="10"
                  height="8"
                  x="2"
                  y="5.5"
                  rx="1"
                />
                <path d="M10.5 5.5V4a3.5 3.5 0 0 0-7 0v1.5" />
                <circle
                  cx="7"
                  cy="9.5"
                  r=".5"
                />
              </g>
            </svg>
            <NuxtLink
              class="title-suggestion"
              to="/YourAccount/ChangePassword"
            >
              Cập nhật mật khẩu
            </NuxtLink>
          </li>

          <li class="quick-helps-item">
            <svg
              class="email-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="2rem"
              height="2rem"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5l8-5v10zm-8-7L4 6h16l-8 5z"
              />
            </svg>
            <NuxtLink
              class="title-suggestion"
              to="/YourAccount/ChangeEmail"
            >
              Cập nhật Email
            </NuxtLink>
          </li>

          <li class="quick-helps-item">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2rem"
              height="2rem"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <g
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
              >
                <path
                  d="M16.755 2h-9.51c-1.159 0-1.738 0-2.206.163a3.046 3.046 0 0 0-1.881 1.936C3 4.581 3 5.177 3 6.37v14.004c0 .858.985 1.314 1.608.744a.946.946 0 0 1 1.284 0l.483.442a1.657 1.657 0 0 0 2.25 0a1.657 1.657 0 0 1 2.25 0a1.657 1.657 0 0 0 2.25 0a1.657 1.657 0 0 1 2.25 0a1.657 1.657 0 0 0 2.25 0l.483-.442a.946.946 0 0 1 1.284 0c.623.57 1.608.114 1.608-.744V6.37c0-1.193 0-1.79-.158-2.27a3.045 3.045 0 0 0-1.881-1.937C18.493 2 17.914 2 16.755 2Z"
                />
                <path
                  stroke-linecap="round"
                  d="M10.5 11H17M7 11h.5M7 7.5h.5m-.5 7h.5m3-7H17m-6.5 7H17"
                />
              </g>
            </svg>
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
const quickHelps = ref<[{ title: string; path: string }]>([{ title: '', path: '' }]);
</script>

<style lang="scss" src="./ContactPage.scss"></style>

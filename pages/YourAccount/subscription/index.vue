<template>
  <div class="service-page subscription-page padding-content">
    <div class="center-page">
      <div v-if="!authStore.loadingUser">
        <div
          v-if="isLogin"
          class="subscription-page-container"
        >
          <NuxtLink
            class="back-page-btn"
            to="/YourAccount"
          >
            <BackPage align-left> Tài khoản </BackPage>
          </NuxtLink>

          <div class="subscription-page-header">
            <h2>Gói đăng ký của bạn</h2>
          </div>

          <div class="subscription-info-list">
            <div class="subscription-info-item">
              <label>Tên gói</label>
              <span class="subscription-info"
                >{{ authStore.subscription?.plan.name }}
              </span>
            </div>
            <div class="subscription-info-item">
              <label>Vip</label>
              <span class="subscription-info">
                {{ authStore.subscription?.plan.vip }}
              </span>
            </div>
            <div class="subscription-info-item">
              <label>Ngày bắt đầu</label>
              <span class="subscription-info">
                {{
                  utils.dateTimeFormater.format(
                    authStore.subscription?.current_period_start!,
                    'LLL'
                  )
                }}
              </span>
            </div>
            <div class="subscription-info-item">
              <label>Ngày kết thúc</label>
              <span class="subscription-info">
                {{
                  utils.dateTimeFormater.format(
                    authStore.subscription?.current_period_end!,
                    'LLL'
                  )
                }}
              </span>
            </div>
            <div class="subscription-info-item">
              <label>Ngày gia hạn tiếp theo</label>
              <span class="subscription-info">
                {{
                  utils.dateTimeFormater.format(
                    authStore.subscription?.billing_cycle_anchor!,
                    'LL'
                  )
                }}
              </span>
            </div>
            <div class="subscription-info-item">
              <label>Ngày bắt đầu dùng thử</label>
              <span class="subscription-info">
                {{
                  utils.dateTimeFormater.format(
                    authStore.subscription?.trial_start!,
                    'LLL'
                  )
                }}
              </span>
            </div>
            <div class="subscription-info-item">
              <label>Thời gian gia hạn lại</label>
              <span class="subscription-info">
                Mỗi
                {{ authStore.subscription?.interval_count + ` ${interval}` }}
              </span>
            </div>
            <div class="subscription-info-item">
              <label>Trạng thái</label>
              <span class="subscription-info">
                {{ subscriptionStatus }}
              </span>
            </div>
            <div class="subscription-info-item">
              <label>Hóa đơn</label>
              <NuxtLink
                :to="`/YourAccount/invoices/${authStore.subscription?.latest_invoice}`"
                class="subscription-info underline"
              >
                Chi tiết
              </NuxtLink>
            </div>
          </div>

          <div class="actions">
            <a-button
              class="extend-btn"
              type="text"
              >Gia hạn</a-button
            >
            <a-button
              class="cancel-extend-btn"
              danger
            >
              Hủy gia hạn gói
            </a-button>
          </div>
        </div>
        <RequireAuth v-else />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { RequireAuth } from '~/components/RequireAuth';
import { storeToRefs } from 'pinia';

definePageMeta({
  layout: 'service',
  pageTransition: {
    name: 'slide-left',
    appear: true
  },
  keepalive: false
});

const utils = useUtils();
const store = useStore();
const authStore = useAuthStore();
const { isLogin } = storeToRefs<any>(authStore);
const interval = computed<string>(() => {
  switch (authStore.subscription?.interval) {
    case 'day':
      return 'ngày';
    case 'week':
      return 'tuần';
    case 'month':
      return 'tháng';
    case 'year':
      return 'năm';
    default:
      return 'tháng';
  }
});
const subscriptionStatus = computed<string>(() => {
  switch (authStore.subscription?.status) {
    case 'trialing':
      return 'Dùng thử';
    case 'active':
      return 'Hoạt động';
    case 'canceled':
      return 'Hủy bỏ';
    case 'inactive':
      return 'Không hoạt động';
    case 'past_due':
      return 'Quá hạn thanh toán';
    case 'paused':
      return 'Tạm ngưng';
    case 'unpaid':
      return 'Chưa trả';
    default:
      return 'Không hoạt động';
  }
});

useHead({
  title: 'Gói đăng ký của bạn',
  htmlAttrs: { lang: 'vi' }
});

useSeoMeta({
  title: 'Gói đăng ký của bạn',
  description: 'Gói đăng ký của bạn',
  ogTitle: 'Gói đăng ký của bạn',
  ogType: 'video.movie',
  // ogUrl: window.location.href,
  ogDescription: 'Gói đăng ký của bạn',
  ogLocale: 'vi'
});
</script>

<style lang="scss" src="./SubscriptionPage.scss"></style>
<!-- <style lang="scss">
  @import url('./BillsPage.scss');
  </style> -->

<template>
  <div class="service-page upgrade padding-content">
    <div class="upgrade-container center-page">
      <!-- <Transition appear name="slide-bottom"> -->
      <!-- v-show="showAnimation" -->
      <div class="upgrade-header">
        <p class="step">BƯỚC 1/2</p>

        <h2>Chọn gói dịch vụ phù hợp với bạn</h2>

        <ul>
          <li class="checkmark-group-row">
            <span>Chọn gói dịch vụ phù hợp với bạn</span>
          </li>

          <li class="checkmark-group-row">
            <span>Truy cập thêm nhiều chương trình truyền hình và phim.</span>
          </li>

          <li class="checkmark-group-row">
            <span>Lựa chọn xem trên nhiều thiết bị hơn.</span>
          </li>

          <li class="checkmark-group-row">
            <span>Thay đổi hoặc hủy gói dịch vụ của bạn bất cứ khi nào.</span>
          </li>
        </ul>
      </div>
      <!-- </Transition> -->

      <Transition
        appear
        name="slide-left"
      >
        <div v-show="!loading && showAnimation">
          <PlanGrid
            :plans="plans"
            :order="+(route.query?.order as string)"
            @onSelectPlan="handleOnSelectPlan"
          />
        </div>
      </Transition>

      <div
        v-show="!loading && showAnimation"
        class="submit-btn-container"
      >
        <a-button
          type="text"
          class="submit-btn"
          @click="onRouteToPaymentPage"
        >
          Tiếp theo
        </a-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { PlanGrid } from '~/components/PlanGrid';
// import PlanGrid from '~/components/PlanGrid/PlanGrid.vue';
import { getAllPlan } from '~/services/plans';
import type { plan } from '~/types';

definePageMeta({
  zoomOut: true
  // layout: 'service',
  // pageTransition: {
  //   name: 'slide-left',
  //   appear: true
  // }
});

useHead({
  title: 'Nâng cấp tài khoản',
  htmlAttrs: { lang: 'vi' }
});

useSeoMeta({
  title: 'Nâng cấp tài khoản',
  description: 'Nâng cấp tài khoản, Dịch vụ, đăng ký gói',
  ogTitle: 'Nâng cấp tài khoản',
  ogType: 'video.movie',
  // ogUrl: window.location.href,
  ogDescription: 'Nâng cấp tài khoản, Dịch vụ, đăng ký gói',
  ogLocale: 'vi'
});

const authStore = useAuthStore();
const route = useRoute();
const selectedPlan = ref<plan>();
const showAnimation = ref<boolean>(false);
// const plans = ref<plan[]>([]);
const loading = ref<boolean>(false);

loading.value = true;

const { data: plans, error } = await useAsyncData(`plan/all`, async () => {
  try {
    const res = await getAllPlan();
    return res.results;
  } catch (err) {
    console.error('Failed to fetch plans:', err);
    return []; // hoặc giá trị fallback
  }
});
if (error.value) {
  // Có thể xử lý lỗi hiển thị UI, hoặc redirect
  console.error('useAsyncData error:', error.value);
}

loading.value = false;

onBeforeMount(async () => {
  await nextTick();

  showAnimation.value = true;
});

const handleOnSelectPlan = (plan: plan | undefined) => {
  selectedPlan.value = plan;
};

const onRouteToPaymentPage = async () => {
  if (!authStore?.isLogin) {
    authStore.isOpenRequireAuthDialog = true;
    return;
  }

  await navigateTo(
    `/upgrade/PaymentPicker?planorder=${selectedPlan.value!?.order || 3}`
  );
};
</script>

<style lang="scss" src="./UpgradePage.scss"></style>
<!-- <style lang="scss">
@import url('./UpgradePage.scss');
</style> -->

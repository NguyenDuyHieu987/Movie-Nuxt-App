<template>
  <div class="service-page payment padding-content">
    <div class="center-page">
      <div v-if="!authStore.loadingUser">
        <div
          v-if="authStore.isLogin"
          class="payment-container"
        >
          <!-- <Transition
            appear
            name="slide-left"
          >
            <div v-show="showAnimation"> -->
          <NuxtLink
            class="back-page-btn"
            to="/upgrade/plans"
          >
            <BackPage align-left> Chọn lại gói</BackPage>
          </NuxtLink>

          <div class="payment-header">
            <p class="step">BƯỚC 2/2</p>

            <h1>Chọn phương thức thanh toán</h1>

            <p>
              Tư cách thành viên trả phí của bạn sẽ bắt đầu ngay khi bạn thiết
              lập thanh toán.
            </p>

            <div class="encouragement">
              <p>An toàn để an tâm.</p>
              <p>Hủy trực tuyến dễ dàng.</p>
            </div>
          </div>

          <section class="payment-methods">
            <div
              class="payment-method momo"
              @click="handleClickMoMoMethod"
            >
              <div class="left">
                <NuxtImg
                  :src="getImage('momo.jpg', 'payment', { w: 40 })"
                  loading="lazy"
                  :width="40"
                  alt=""
                />
                <span>Ví MoMo</span>
              </div>

              <div class="right">
                <SvgoChevronRight1
                  width="2.4rem"
                  height="2.4rem"
                  fill="currentColor"
                />
              </div>
            </div>

            <div
              class="payment-method zalopay"
              @click="handleClickZaloPayMethod"
            >
              <div class="left">
                <NuxtImg
                  :src="getImage('zalopay.png', 'payment', { w: 40 })"
                  loading="lazy"
                  :width="40"
                  alt=""
                />

                <span>Ví điện tử ZaloPay</span>
              </div>

              <div class="right">
                <SvgoChevronRight1
                  width="2.4rem"
                  height="2.4rem"
                  fill="currentColor"
                />
              </div>
            </div>

            <div
              class="payment-method atm"
              @click="handleClickVNPayMethod"
            >
              <div class="left">
                <NuxtImg
                  :src="getImage('vnpay.png', 'payment', { w: 40 })"
                  loading="lazy"
                  :width="40"
                  alt=""
                />
                <span>ATM - Ngân hàng nội địa</span>
              </div>

              <div class="right">
                <SvgoChevronRight1
                  width="2.4rem"
                  height="2.4rem"
                  fill="currentColor"
                />
              </div>
            </div>

            <div
              class="payment-method visa-mastercard"
              @click="handleClickStripeMethod"
            >
              <div class="left">
                <NuxtImg
                  :src="getImage('mastercard_1.jpg', 'payment', { w: 100 })"
                  loading="lazy"
                  :width="100"
                  alt=""
                />

                <NuxtImg
                  :src="getImage('visa.png', 'payment', { w: 40 })"
                  loading="lazy"
                  :width="40"
                  alt=""
                />

                <span>Thẻ ghi nợ - Thẻ tín dụng</span>
              </div>

              <div class="right">
                <SvgoChevronRight1
                  width="2.4rem"
                  height="2.4rem"
                  fill="currentColor"
                />
              </div>
            </div>
          </section>
          <!-- </div>
          </Transition> -->
        </div>

        <RequireAuth v-else />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import SvgoChevronRight1 from '~/assets/svgs/icons/chevron-right-1.svg?component';

import { ElNotification } from 'element-plus';
// import { BackPage } from '~/components/BackPage';
// import { RequireAuth } from '~/components/RequireAuth';
// import BackPage from '~/components/BackPage/BackPage.vue';
// import RequireAuth from '~/components/RequireAuth/RequireAuth.vue';
import { getImage } from '~/services/image';
import { getAllPlan, registerPlan } from '~/services/plans';
import { getBill } from '~/services/bill';

import type { plan } from '@/types';

definePageMeta({
  layout: 'service',
  middleware: [
    async (to, from) => {
      if (!to.query?.planorder) {
        await navigateTo('/upgrade/plans');
        return;
      }

      // getAllPlan()
      //   .then(async (response) => {
      //     if (
      //       !response?.results.some(
      //         (item: plan) => item.order == Number(to.query?.planorder)
      //       )
      //     )
      //       return await navigateTo('/upgrade/plans');
      //   })
      //   .catch(async (e) => {
      //     await navigateTo('/upgrade/plans');
      //   });

      const { data: plans } = await useAsyncData(
        `plan/all`,
        () => getAllPlan(),
        {
          transform: (data) => {
            return data?.results;
          }
        }
      );

      if (
        !plans.value?.some(
          (item: plan) => item.order == Number(to.query?.planorder)
        )
      ) {
        navigateTo('/upgrade/plans');
      }
    }
  ],
  pageTransition: {
    name: 'slide-left',
    appear: true
  },
  keepalive: false
});

const nuxtConfig = useRuntimeConfig();
const store = useStore();
const authStore = useAuthStore();
const route = useRoute();
const planSelected = ref<plan>();
const showAnimation = ref<boolean>(false);

watch(
  route.query,
  async () => {
    if (!route.query?.planorder) {
      navigateTo('/upgrade/plans');
      return;
    }

    // getAllPlan()
    //   .then(async (response) => {
    //     if (
    //       !response?.results.some(
    //         (item: plan) => item.order == Number(route.query?.planorder)
    //       )
    //     )
    //       return await navigateTo('/upgrade/plans');

    //     planSelected.value = response?.results.find(
    //       (item: plan) => item.order == Number(route.query?.planorder)
    //     );
    //   })
    //   .catch(async (e) => {
    //    await navigateTo('/upgrade/plans');
    //   });

    const { data: plans } = await useAsyncData(`plan/all`, () => getAllPlan(), {
      transform: (data) => {
        return data?.results;
      }
    });

    if (
      !plans.value.some(
        (item: plan) => item.order == Number(route.query?.planorder)
      )
    ) {
      await navigateTo('/upgrade/plans');
      return;
    }

    planSelected.value = plans.value.find(
      (item: plan) => item.order == Number(route.query?.planorder)
    );
  },
  { immediate: true, deep: true }
);

useHead({
  title: 'Phương thức thanh toán',
  htmlAttrs: { lang: 'vi' }
});

useSeoMeta({
  title: 'Phương thức thanh toán',
  description: 'Thanh toán gói dịch vụ',
  ogTitle: 'Phương thức thanh toán',
  ogType: 'video.movie',
  // ogUrl: window.location.href,
  ogDescription: 'Thanh toán gói dịch vụ',
  ogLocale: 'vi'
});

onBeforeMount(async () => {
  await nextTick();

  showAnimation.value = true;
});

const handleClickMoMoMethod = () => {};

const handleClickZaloPayMethod = () => {};

const handleClickVNPayMethod = async () => {
  store.loadingAppInstance.start();

  await registerPlan(planSelected.value!.id, 'VNPAY')
    .then((response) => {
      if (response?.isRegistered) {
        ElNotification.warning({
          title: MESSAGE.STATUS.WARN,
          message: 'You have currently signed up for a subscription',
          duration: MESSAGE.DURATION.DEFAULT
        });
        return;
      }

      if (response?.success) {
        window.open(response?.url);
        // window.location = response?.url;
      }
    })
    .catch(() => {})
    .finally(() => {
      store.loadingAppInstance.finish();
    });
};

const handleClickStripeMethod = async () => {
  store.loadingAppInstance.start();

  await registerPlan(planSelected.value!.id, 'STRIPE')
    .then((response) => {
      if (response?.isRegistered) {
        ElNotification.warning({
          title: MESSAGE.STATUS.WARN,
          message: 'Hiện tại bạn đã đăng ký 1 subscription rồi',
          duration: MESSAGE.DURATION.DEFAULT
        });
        return;
      }

      if (response?.success) {
        window.open(response?.url);
        // window.location = response?.url;

        getStatusInvoice(response.invoice_id);
        // return new WebSocket(
        //   nuxtConfig.app?.production_mode
        //     ? nuxtConfig.app?.apiGateway
        //     : 'ws://localhost:5000'
        // );
      }
    })
    // .then((socket: WebSocket | undefined) => {
    //   if (socket) {
    //     console.log(socket);
    //     // Xử lý khi nhận được tin nhắn từ máy chủ
    //     socket.onmessage = (event) => {
    //       console.log('Received message from server:', event);
    //     };

    //     // Gửi yêu cầu đến máy chủ thông qua kết nối WebSocket
    //     socket.send('Hello from client');

    //     socket.close();

    //     socket.onclose = () => {
    //       console.log('Disconnected from server');
    //     };
    //   }
    // })
    .catch(() => {})
    .finally(() => {
      store.loadingAppInstance.finish();
    });
};

const getStatusInvoice = async (id: string) => {
  await getBill(id)
    .then(async (response) => {
      if (response?.success) {
        if (response?.result?.status == 'complete') {
          await navigateTo('/upgrade/state/Stripe/success');
          return;
        }
        setTimeout(async () => await getStatusInvoice(id), 500);
      }
    })
    .catch(() => {});
};
</script>

<style lang="scss" src="./PaymentPickerPage.scss"></style>
<!-- <style lang="scss">
@import url('./PaymentPickerPage.scss');
</style> -->

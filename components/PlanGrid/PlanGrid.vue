<template>
  <!-- <Transition appear name="slide-left"> -->
  <section class="plan-grid">
    <div class="plan-sider">
      <el-skeleton
        :loading="loading"
        animated
      >
        <template #template>
          <div
            v-for="(a, b) in 3"
            :key="b"
            :index="b"
            class="plan-box-selector"
          >
            <el-skeleton-item />
          </div>
        </template>

        <template #default>
          <div
            v-for="(item, index) in plans"
            :key="index"
            :index="index"
            class="plan-box-selector"
            :class="{ selected: item.id == selected }"
            @click="handleClickPlanOpiton(item)"
            @dblclick="handleDBClickPlanOpiton(item)"
          >
            <!-- <div class="vip-number">VIP {{ item?.vip }}</div> -->
            <a-badge-ribbon
              :text="'VIP ' + item?.vip"
              placement="start"
            />

            <span>{{ item?.name }}</span>
          </div>
        </template>
      </el-skeleton>
    </div>

    <div class="plan-body">
      <table class="plan-table">
        <thead class="plan-header">
          <tr>
            <th class="plan-feature price">Giá hàng tháng</th>
            <th class="plan-feature video-quality">Chất lượng video</th>
            <th class="plan-feature resolution">Độ phân giải</th>
            <th class="plan-feature support-devices">
              Các thiết bị bạn có thể dùng để xem
            </th>
          </tr>
        </thead>

        <el-skeleton
          :loading="loading"
          animated
        >
          <template #template>
            <div
              v-for="(a, b) in 3"
              :key="b"
              :index="b"
              class="tr-skeleton"
            >
              <td class="plan-option">
                <el-skeleton-item />
              </td>
              <td class="plan-option">
                <el-skeleton-item />
              </td>
              <td class="plan-option">
                <el-skeleton-item />
              </td>
              <td class="plan-option">
                <el-skeleton-item />
              </td>
            </div>
          </template>

          <template #default>
            <tbody class="plan-grid-feature-table-body">
              <tr
                v-for="(item, index) in plans"
                :key="index"
                :index="index"
                :class="{ selected: item.id == selected }"
                @click="handleClickPlanOpiton(item)"
                @dblclick="handleDBClickPlanOpiton(item)"
              >
                <td class="plan-option price">
                  {{
                    item.price
                      ?.toString()
                      ?.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' ₫'
                  }}
                </td>
                <td class="plan-option video-quality">
                  {{ item.video_quality }}
                </td>
                <td class="plan-option resolution">{{ item.resolution }}</td>
                <!-- <td>{{ item.support_devices }}</td> -->
                <td class="plan-option support-devices">
                  <div>
                    <svg
                      width="2.4rem"
                      height="2.4rem"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      class="planGrid__supportedDevicesIcon default-ltr-cache-0 e1mhci4z1"
                      data-name="Phone"
                      aria-hidden="true"
                      focusable="false"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M6 0C4.89543 0 4 0.895431 4 2V22C4 23.1046 4.89543 24 6 24H18C19.1046 24 20 23.1046 20 22V2C20 0.89543 19.1046 0 18 0H6ZM6 2L18 2V22H6V2ZM13.5 18.5C13.5 17.6716 12.8284 17 12 17C11.1716 17 10.5 17.6716 10.5 18.5C10.5 19.3284 11.1716 20 12 20C12.8284 20 13.5 19.3284 13.5 18.5Z"
                      ></path>
                    </svg>
                    <span>Điện thoại</span>
                  </div>

                  <div>
                    <svg
                      width="2.4rem"
                      height="2.4rem"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      class="planGrid__supportedDevicesIcon default-ltr-cache-0 e1mhci4z1"
                      data-name="Tablet"
                      aria-hidden="true"
                      focusable="false"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M2 3C0.895431 3 0 3.89543 0 5V19C0 20.1046 0.895431 21 2 21H22C23.1046 21 24 20.1046 24 19V5C24 3.89543 23.1046 3 22 3H2ZM2 5H22V19H2V5ZM18.5 13.5C19.3284 13.5 20 12.8284 20 12C20 11.1716 19.3284 10.5 18.5 10.5C17.6716 10.5 17 11.1716 17 12C17 12.8284 17.6716 13.5 18.5 13.5Z"
                      ></path>
                    </svg>
                    <span>Máy tính bảng</span>
                  </div>

                  <div>
                    <svg
                      width="2.4rem"
                      height="2.4rem"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      class="planGrid__supportedDevicesIcon default-ltr-cache-0 e1mhci4z1"
                      data-name="Laptop"
                      aria-hidden="true"
                      focusable="false"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M5.0001 6.49964L5.00003 15.2485C4.32836 15.2967 3.66158 15.3517 3.00003 15.4134L3.00011 5.64259C3.00011 5.15287 3.35477 4.7352 3.83802 4.65582C6.44383 4.22777 9.17979 4 12.0001 4C14.8204 4 17.5564 4.22777 20.1622 4.65582C20.6455 4.7352 21.0001 5.15288 21.0001 5.6426L21 15.4134C20.3385 15.3517 19.6717 15.2967 19 15.2485L19.0001 6.49964C16.7553 6.17311 14.4115 6 12.0001 6C9.58874 6 7.24495 6.17311 5.0001 6.49964ZM1.11859 19.6355C4.58689 19.2212 8.23466 19 12 19C15.7653 19 19.413 19.2212 22.8813 19.6355L23.1186 17.6497C19.5701 17.2257 15.8431 17 12 17C8.15686 17 4.42984 17.2257 0.881348 17.6497L1.11859 19.6355Z"
                      ></path>
                    </svg>
                    <span>Máy tính</span>
                  </div>

                  <!-- <div>
                <svg
                  width="2.4rem"
                  height="2.4rem"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  class="planGrid__supportedDevicesIcon default-ltr-cache-0 e1mhci4z1"
                  data-name="Tv"
                  aria-hidden="true"
                  focusable="false"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M2 3C0.895431 3 0 3.89543 0 5V16C0 17.1046 0.895431 18 2 18H22C23.1046 18 24 17.1046 24 16V5C24 3.89543 23.1046 3 22 3H2ZM2 5H22V16H2V5ZM6.06305 21.1859C8.00211 21.0634 9.98427 21 12 21C14.0157 21 15.9979 21.0634 17.937 21.1859L18.063 19.1899C16.0818 19.0647 14.0576 19 12 19C9.94241 19 7.9182 19.0647 5.93695 19.1899L6.06305 21.1859Z"
                  ></path>
                </svg>
                <span>TV</span>
              </div> -->
                </td>
              </tr>
            </tbody>
          </template>
        </el-skeleton>
      </table>
    </div>
  </section>
  <!-- </Transition> -->
</template>

<script setup lang="ts">
import type { plan } from '@/types';
import { getAllPlan } from '~/services/plans';

const emits = defineEmits<{
  onSelectPlan: [selected: plan];
}>();

const authStore = useAuthStore();
// const plans = ref<plan[]>([]);
const loading = ref<boolean>(false);
const selected = ref<string>('');

// onBeforeMount(async () => {
// loading.value = true;
// await nextTick();
// await useAsyncData(`plan/all`, () => getAllPlan())
//   .then((response) => {
//     plans.value = response.data.value?.results;
//     selected.value = plans.value.find((item: plan) => item.order == 3)!.id;
//     emits(
//       'onSelectPlan',
//       plans.value.find((item: plan) => item.order == 3)
//     );
//   })
//   .catch((e) => {
//   })
//   .finally(() => {
//     loading.value = false;
//   });
// });

loading.value = true;

const { data: plans } = await useAsyncData(`plan/all`, () => getAllPlan(), {
  transform: (data) => {
    return data.results;
  }
});

loading.value = false;

selected.value = plans.value.find((item: plan) => item.order == 3)!.id;

emits(
  'onSelectPlan',
  plans.value.find((item: plan) => item.order == 3)
);

const handleClickPlanOpiton = (plan: plan) => {
  if (selected.value == plan.id) return;

  emits('onSelectPlan', plan);

  selected.value = plan.id;
};

const handleDBClickPlanOpiton = (plan: plan) => {
  if (!authStore.isLogin) {
    authStore.isOpenRequireAuthDialog = true;
    return;
  }

  navigateTo(`/upgrade/PaymentPicker?planorder=${plan.order}`);
};
</script>

<style lang="scss" src="./PlanGrid.scss"></style>

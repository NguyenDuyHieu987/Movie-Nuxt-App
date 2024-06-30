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
              :class="`vip-${item?.vip}`"
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
                class="plan-grid-feature-row"
                :class="{ selected: item.id == selected }"
                :style="{
                  '--background-image': `url(${getImage(
                    `Background_${index + 2}.jpg`,
                    'background/1',
                    {
                      w: 1000
                    }
                  )})`
                }"
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
                  <div v-if="item?.support_devices.includes('phone')">
                    <PhoneIcon
                      width="2.4rem"
                      height="2.4rem"
                      class="planGrid__supportedDevicesIcon default-ltr-cache-0 e1mhci4z1"
                      data-name="Phone"
                      aria-hidden="true"
                      focusable="false"
                      fill="currentColor"
                    />
                    <span>Điện thoại</span>
                  </div>

                  <div v-if="item?.support_devices.includes('tablet')">
                    <TabletIcon
                      width="2.4rem"
                      height="2.4rem"
                      class="planGrid__supportedDevicesIcon default-ltr-cache-0 e1mhci4z1"
                      data-name="Tablet"
                      aria-hidden="true"
                      focusable="false"
                      fill="currentColor"
                    />
                    <span>Máy tính bảng</span>
                  </div>

                  <div v-if="item?.support_devices.includes('desktop')">
                    <LaptopIcon
                      width="2.4rem"
                      height="2.4rem"
                      class="planGrid__supportedDevicesIcon default-ltr-cache-0 e1mhci4z1"
                      data-name="Laptop"
                      aria-hidden="true"
                      focusable="false"
                      fill="currentColor"
                    />
                    <span>Máy tính</span>
                  </div>

                  <!-- <div v-if="item?.support_devices.includes('tv')">
                    <TvIcon
                      width="2.4rem"
                      height="2.4rem"
                      class="planGrid__supportedDevicesIcon default-ltr-cache-0 e1mhci4z1"
                      data-name="Tv"
                      aria-hidden="true"
                      focusable="false"
                      fill="currentColor"
                    />
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
import PhoneIcon from '~/assets/svgs/icons/phone.svg?component';
import TabletIcon from '~/assets/svgs/icons/tablet.svg?component';
import LaptopIcon from '~/assets/svgs/icons/laptop.svg?component';
// import TvIcon from '~/assets/svgs/icons/tv.svg?component';

import { getImage } from '~/services/image';
import { getAllPlan } from '~/services/plans';
import type { plan } from '@/types';

const props = withDefaults(
  defineProps<{
    plans: plan[];
    order?: string | number;
  }>(),
  {
    order: 3
  }
);

const emits = defineEmits<{
  onSelectPlan: [selected: plan | undefined];
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
//     selected.value = plans.value.find((item: plan) => item.order == props.order)!.id;
//     emits(
//       'onSelectPlan',
//       plans.value.find((item: plan) => item.order == props.order)
//     );
//   })
//   .catch((e) => {
//   })
//   .finally(() => {
//     loading.value = false;
//   });
// });

// loading.value = true;

// const { data: plans } = await useLazyAsyncData(`plan/all`, () => getAllPlan(), {
//   transform: (data) => {
//     return data.results;
//   }
// });

// loading.value = false;

onBeforeMount(async () => {
  // loading.value = true;

  // await getAllPlan()
  //   .then((response) => {
  //     props.plans = response?.results;
  //   })
  //   .catch(() => {})
  //   .finally(() => {
  //     loading.value = false;
  //   });

  emits(
    'onSelectPlan',
    props.plans.find((item: plan) => item.order == props.order)
  );
});

watch(
  () => props.order,
  () => {
    if (props.order) {
      selected.value = props.plans.find(
        (item: plan) => item.order == props.order
      )!.id;
    }
  },
  { immediate: true }
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
<!-- <style lang="scss">
@import url('./PlanGrid.scss');
</style> -->

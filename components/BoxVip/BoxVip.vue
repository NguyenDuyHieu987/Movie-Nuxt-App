<template>
  <div
    v-if="authStore.isLogin"
    class="box-vip"
    :class="{ faded: isFade }"
  >
    <div class="box-vip-container">
      <a-badge-ribbon
        v-if="authStore.isVipMember"
        :text="'VIP ' + authStore.subscription?.plan.vip"
        placement="end"
      />

      <div class="user-info">
        <p class="username">
          {{ authStore.userAccount?.username }}
        </p>

        <div class="your-vip">
          <VipPrivilege
            height="1.5rem"
            width="1.5rem"
          />

          <span class="description">
            {{
              authStore.isVipMember
                ? `Bạn hiện đang là`
                : 'Bạn hiện vẫn chưa là'
            }}

            <strong class="vip-number">
              {{
                authStore.isVipMember
                  ? ` VIP ${authStore.subscription?.plan.vip}`
                  : 'VIP'
              }}
            </strong>
          </span>
        </div>
      </div>

      <div class="vip-pri-title box-vip-title">
        <fieldset><legend>Đặc quyền VIP</legend></fieldset>
      </div>

      <ul class="vip-privileges">
        <li
          class="resolution"
          title="Chất lượng hình ảnh"
        >
          <HDRect
            width="2rem"
            height="2rem"
            fill="currentColor"
          />

          <span>
            {{
              !authStore.subscription
                ? '1080P-HD'
                : authStore.subscription?.plan.resolution
            }}
          </span>
        </li>

        <li
          class="ads"
          title="Quảng cáo"
        >
          <BanCircle
            width="2rem"
            height="2rem"
            fill="currentColor"
          />

          <span>{{ authStore.subscription?.plan.ads ? 'Có' : 'Không' }}</span>
        </li>

        <li
          class="support-devices"
          title="Thiết bị"
        >
          <LaptopPhone
            width="2rem"
            height="2rem"
            fill="currentColor"
          />

          <div class="list-devices">
            <span
              v-if="
                !authStore.subscription ||
                authStore.subscription?.plan.support_devices.includes('phone')
              "
            >
              Điện thoại,
            </span>
            <span
              v-if="
                !authStore.subscription ||
                authStore.subscription?.plan.support_devices.includes('tablet')
              "
            >
              Tablet,
            </span>
            <span
              v-if="
                !authStore.subscription ||
                authStore.subscription?.plan.support_devices.includes('phone')
              "
            >
              Máy tinh
            </span>
          </div>
        </li>
      </ul>

      <div class="recommend-upgrade-vip box-vip-title">
        <fieldset>
          <legend>
            {{ authStore.isVipMember ? 'Nâng cấp' : 'Kích hoạt' }} VIP ngay
          </legend>
        </fieldset>
      </div>

      <a-button
        class="vip-active-btn"
        type="text"
        @click="handleClickAtiveVipBtn"
      >
        {{ authStore.isVipMember ? 'Nâng cấp' : 'Kích hoạt' }} Phimhay247 VIP
      </a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import VipPrivilege from '~/assets/svgs/icons/vip-privilege.svg?component';
import HDRect from '~/assets/svgs/icons/hd-rect.svg?component';
import BanCircle from '~/assets/svgs/icons/ban-circle.svg?component';
import LaptopPhone from '~/assets/svgs/icons/laptop-phone.svg?component';

const authStore = useAuthStore();
const isFade = ref<boolean>(false);

onBeforeMount(async () => {
  await wait(10000);

  isFade.value = true;
});

const handleClickAtiveVipBtn = () => {
  navigateTo('/upgrade/plans');
};
</script>

<style lang="scss" src="./BoxVip.scss"></style>
<!-- <style lang="scss">
@import url('./BoxVip.scss');
</style> -->

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
          <svg
            viewBox="0 0 192 192"
            height="1.5rem"
            width="1.5rem"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <linearGradient
              id="New_Gradient_Swatch_1"
              gradientUnits="userSpaceOnUse"
              x1="36.343"
              x2="155.657"
              y1="175.657"
              y2="56.343"
            >
              <stop
                offset="0"
                stop-color="#34cdfa"
              />
              <stop
                offset="1"
                stop-color="#ccbcd6"
              />
            </linearGradient>
            <path
              d="m180.521 81.4a8 8 0 0 0 -8.959-.056l-40.462 26.972-27.945-55.894a8 8 0 0 0 -14.31 0l-27.945 55.894-40.463-26.972a8 8 0 0 0 -12.247 8.391l16 72a8 8 0 0 0 7.81 6.265h128a8 8 0 0 0 7.81-6.265l16-72a8 8 0 0 0 -3.289-8.335z"
              fill="url(#New_Gradient_Swatch_1)"
            />
            <path
              d="m24 160v24a8 8 0 0 0 8 8h128a8 8 0 0 0 8-8v-24"
              fill="#99e6fd"
            />
            <path
              d="m40 184v-24h-16v24a8 8 0 0 0 8 8h16a8 8 0 0 1 -8-8z"
              fill="#67d9fb"
            />
            <g fill="#ccf2fe">
              <circle
                cx="96"
                cy="32"
                r="8"
              />
              <circle
                cx="184"
                cy="72"
                r="8"
              />
              <circle
                cx="8"
                cy="72"
                r="8"
              />
            </g>
          </svg>

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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2rem"
            height="2rem"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M6 15h1.5v-2h2v2H11V9H9.5v2.5h-2V9H6zm7 0h4.25l.75-.75v-4.5L17.25 9H13zm1.5-1.5v-3h2v3zM2 20V4h20v16zm2-2h16V6H4zm0 0V6z"
            />
          </svg>

          <span>{{ authStore.subscription?.plan.resolution }}</span>
        </li>

        <li
          class="ads"
          title="Quảng cáo"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2rem"
            height="2rem"
            viewBox="0 0 512 512"
            fill="currentColor"
          >
            <path
              d="M414.39 97.61A224 224 0 1 0 97.61 414.39A224 224 0 1 0 414.39 97.61M432 256a175.09 175.09 0 0 1-35.8 106.26L149.74 115.8A175.09 175.09 0 0 1 256 80c97.05 0 176 79 176 176m-352 0a175.09 175.09 0 0 1 35.8-106.26L362.26 396.2A175.09 175.09 0 0 1 256 432c-97 0-176-78.95-176-176"
            />
          </svg>

          <span>{{ authStore.subscription?.plan.ads ? 'Có' : 'Không' }}</span>
        </li>

        <li
          class="support-devices"
          title="Thiết bị"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2rem"
            height="2rem"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M4 6h18V4H4c-1.1 0-2 .9-2 2v11H0v3h14v-3H4zm19 2h-6c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1m-1 9h-4v-7h4z"
            />
          </svg>

          <div class="list-devices">
            <span
              v-if="
                authStore.subscription?.plan.support_devices.includes('phone')
              "
            >
              Điện thoại,
            </span>
            <span
              v-if="
                authStore.subscription?.plan.support_devices.includes('tablet')
              "
            >
              Tablet,
            </span>
            <span
              v-if="
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

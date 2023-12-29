<template>
  <div class="oauth-google">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:v="https://vecta.io/nano"
      width="6rem"
      height="6rem"
      viewBox="0 0 186.69 190.5"
      fill="currentColor"
    >
      <g transform="translate(1184.583 765.171)">
        <path
          clip-path="none"
          mask="none"
          d="M-1089.333-687.239v36.888h51.262c-2.251 11.863-9.006 21.908-19.137 28.662l30.913 23.986c18.011-16.625 28.402-41.044 28.402-70.052 0-6.754-.606-13.249-1.732-19.483z"
          fill="#4285f4"
        />
        <path
          clip-path="none"
          mask="none"
          d="M-1142.714-651.791l-6.972 5.337-24.679 19.223h0c15.673 31.086 47.796 52.561 85.03 52.561 25.717 0 47.278-8.486 63.038-23.033l-30.913-23.986c-8.486 5.715-19.31 9.179-32.125 9.179-24.765 0-45.806-16.712-53.34-39.226z"
          fill="#34a853"
        />
        <path
          clip-path="none"
          mask="none"
          d="M-1174.365-712.61c-6.494 12.815-10.217 27.276-10.217 42.689s3.723 29.874 10.217 42.689c0 .086 31.693-24.592 31.693-24.592-1.905-5.715-3.031-11.776-3.031-18.098s1.126-12.383 3.031-18.098z"
          fill="#fbbc05"
        />
        <path
          d="M-1089.333-727.244c14.028 0 26.497 4.849 36.455 14.201l27.276-27.276c-16.539-15.413-38.013-24.852-63.731-24.852-37.234 0-69.359 21.388-85.032 52.561l31.692 24.592c7.533-22.514 28.575-39.226 53.34-39.226z"
          fill="#ea4335"
          clip-path="none"
          mask="none"
        />
      </g>
    </svg>

    <div class="icon-loading">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="4rem"
        height="4rem"
        viewBox="0 0 24 24"
      >
        <circle
          cx="12"
          cy="2"
          r="0"
        >
          <animate
            attributeName="r"
            begin="0"
            calcMode="spline"
            dur="1s"
            keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
            repeatCount="indefinite"
            values="0;2;0;0"
          />
        </circle>
        <circle
          cx="12"
          cy="2"
          r="0"
          transform="rotate(45 12 12)"
        >
          <animate
            attributeName="r"
            begin="0.125s"
            calcMode="spline"
            dur="1s"
            keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
            repeatCount="indefinite"
            values="0;2;0;0"
          />
        </circle>
        <circle
          cx="12"
          cy="2"
          r="0"
          transform="rotate(90 12 12)"
        >
          <animate
            attributeName="r"
            begin="0.25s"
            calcMode="spline"
            dur="1s"
            keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
            repeatCount="indefinite"
            values="0;2;0;0"
          />
        </circle>
        <circle
          cx="12"
          cy="2"
          r="0"
          transform="rotate(135 12 12)"
        >
          <animate
            attributeName="r"
            begin="0.375s"
            calcMode="spline"
            dur="1s"
            keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
            repeatCount="indefinite"
            values="0;2;0;0"
          />
        </circle>
        <circle
          cx="12"
          cy="2"
          r="0"
          transform="rotate(180 12 12)"
        >
          <animate
            attributeName="r"
            begin="0.5s"
            calcMode="spline"
            dur="1s"
            keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
            repeatCount="indefinite"
            values="0;2;0;0"
          />
        </circle>
        <circle
          cx="12"
          cy="2"
          r="0"
          transform="rotate(225 12 12)"
        >
          <animate
            attributeName="r"
            begin="0.625s"
            calcMode="spline"
            dur="1s"
            keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
            repeatCount="indefinite"
            values="0;2;0;0"
          />
        </circle>
        <circle
          cx="12"
          cy="2"
          r="0"
          transform="rotate(270 12 12)"
        >
          <animate
            attributeName="r"
            begin="0.75s"
            calcMode="spline"
            dur="1s"
            keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
            repeatCount="indefinite"
            values="0;2;0;0"
          />
        </circle>
        <circle
          cx="12"
          cy="2"
          r="0"
          transform="rotate(315 12 12)"
        >
          <animate
            attributeName="r"
            begin="0.875s"
            calcMode="spline"
            dur="1s"
            keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
            repeatCount="indefinite"
            values="0;2;0;0"
          />
        </circle>
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElNotification } from 'element-plus';

import { loginGoogle } from '~/services/authentication';

definePageMeta({
  // layout: 'oauth',
  layout: false
});

const utils = useUtils();
const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();
const loading = ref<boolean>(false);

onBeforeMount(() => {
  const url = window.location.href;

  const access_token = url.match(/#(?:access_token)=([\S\s]*?)&/)?.at(1);

  if (access_token == null) {
    navigateTo({ path: '/' });
    return;
  }

  loading.value = true;
  // store.loadingAppInstance.start();

  loginGoogle({
    accessToken: access_token
  })
    .then((response) => {
      if (!response?.isLogin) {
        ElNotification.error({
          title: MESSAGE.STATUS.FAILED,
          message: 'Đăng nhập thất bại.',
          duration: MESSAGE.DURATION.DEFAULT
        });

        navigateTo({ path: '/login' });

        return;
      }

      if (response.isSignUp == true) {
        ElNotification.success({
          title: MESSAGE.STATUS.SUCCESS,
          message: 'Bạn đã đăng nhập bằng Google thành công tại Phimhay247.',
          duration: MESSAGE.DURATION.DEFAULT
        });
      }

      authStore.userAccount = response?.result;

      if (response?.subscription) {
        authStore.subscription = response.subscription;
      }

      utils.localStorage.setWithExpiry(
        TOKEN.NAME.USER_TOKEN,
        response.headers.get('Authorization'),
        TOKEN.OFFSET.USER_TOKEN
      );
      navigateTo({ path: '/' });
      // navigateTo({ path: urlBack.value });
    })
    .catch((e) => {
      navigateTo({ path: '/login' });

      ElNotification.error({
        title: MESSAGE.STATUS.BROKE,
        message: MESSAGE.STATUS.BROKE_MESSAGE,
        duration: MESSAGE.DURATION.DEFAULT
      });
    })
    .finally(() => {
      loading.value = false;

      // await wait(300);

      // store.loadingAppInstance.finish();
    });
});

// watch(route, () => {}, {
//   deep: true,
//   immediate: true,
// });
</script>

<style lang="scss" scoped>
.oauth-google {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 100vh;
  width: 100%;

  .icon-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 1;

    svg {
      fill: var(--app-background-color);
      width: 4rem;
      height: 4rem;
    }
  }
}
</style>

<template>
  <div class="oauth-google">
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
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons-vue';
import { ElNotification } from 'element-plus';

import { loginGoogle } from '~/services/authentication';

definePageMeta({
  // layout: 'oauth',
  layout: false
});

const utils = useUtils();
const store = useStore();
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
      if (response.isSignUp == true) {
        ElNotification.success({
          title: 'Thành công!',
          message: 'Bạn đã đăng nhập bằng Google thành công tại Phimhay247.',

          icon: () =>
            h(CheckCircleFilled, {
              style: 'color: green'
            })
        });

        store.userAccount = response?.result;
        utils.localStorage.setWithExpiry('user_token', response.headers.get('Authorization'), 24);
        navigateTo({ path: '/' });
        // navigateTo({ path: urlBack.value });
      } else if (response.isLogin == true) {
        store.userAccount = response?.result;
        utils.localStorage.setWithExpiry('user_token', response.headers.get('Authorization'), 24);
        navigateTo({ path: '/' });
        // navigateTo({ path: urlBack.value });
      } else if (response.isLogin == false) {
        navigateTo({ path: '/login' });

        ElNotification.error({
          title: 'Thất bại!',
          message: 'Some thing went wrong.',
          icon: () =>
            h(CloseCircleFilled, {
              style: 'color: red'
            })
        });
      }
    })
    .catch((e) => {
      navigateTo({ path: '/login' });

      ElNotification.error({
        title: 'Thất bại!',
        message: 'Some thing went wrong.',
        icon: () =>
          h(CloseCircleFilled, {
            style: 'color: red'
          })
      });
    })
    .finally(() => {
      loading.value = false;

      // setTimeout(() => {
      // store.loadingAppInstance.finish();
      // }, 300);
    });
});

// watch(route, () => {}, {
//   deep: true,
//   immediate: true,
// });
</script>

<style lang="scss" scoped>
.oauth-google {
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    fill: var(--app-background-color);
    width: 4rem;
    height: 4rem;
  }
}
</style>

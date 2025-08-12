<template>
  <div class="oauth-google">
    <SvgoGoogle
      width="6rem"
      height="6rem"
      fill="currentColor"
    />

    <div class="icon-loading">
      <SvgoLoadingApp
        width="4rem"
        height="4rem"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
// import SvgoGoogle from '~/assets/svgs/icons/google.svg?component';
// import SvgoLoadingApp from '~/assets/svgs/icons/loading-app.svg?component';

import { ElNotification } from 'element-plus';

import { loginGoogle } from '~/services/authentication';

definePageMeta({
  // layout: 'oauth',
  layout: false
});

const utils = useUtils();
const store = useStore();
const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();
const loading = ref<boolean>(false);

onBeforeMount(async () => {
  const url = window.location.href;

  const accessToken = url.match(/#(?:access_token)=([\S\s]*?)&/)?.at(1);
  const authorizationCode = url.match(/(?:code)=([\S\s]*?)&/)?.at(1);

  if (!accessToken && !authorizationCode) {
    await navigateTo('/login');
    return;
  }

  loading.value = true;
  // store.loadingAppInstance.start();

  loginGoogle({
    accessToken,
    authorizationCode
  })
    .then(async (response) => {
      if (response?.isLogin == false) {
        ElNotification.error({
          title: MESSAGE.STATUS.FAILED,
          message: 'Đăng nhập thất bại.',
          duration: MESSAGE.DURATION.DEFAULT
        });

        await navigateTo({ path: '/login' });

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

      // await navigateTo({ path: '/' });
      await navigateTo({ path: store.urlLoginBack });
    })
    .catch(async (e) => {
      await navigateTo({ path: '/login' });

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
      fill: var(--color-primary-800);
      width: 4rem;
      height: 4rem;
    }
  }
}
</style>

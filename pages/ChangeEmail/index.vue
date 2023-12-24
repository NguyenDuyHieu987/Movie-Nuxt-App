<template>
  <div class="service-page change-email padding-content">
    <div class="change-page">
      <div class="change-email-container">
        <Transition
          appear
          name="slide-bottom"
        >
          <div v-show="showAnimation">
            <div class="changeEmail-header">
              <h1>Xác nhận thay đổi Email của bạn</h1>
              <p>
                Vui lòng kiểm tra lại thông tin trước khi thay đổi email của bạn
              </p>
            </div>

            <a-form
              :model="formChangeEmail"
              name="change-email-form"
              class="form-change-email"
              hide-required-mark
              @finish="handleSubmit"
            >
              <a-form-item
                label="Email cũ"
                name="oldEmail"
              >
                <a-input
                  v-model:value="formChangeEmail.oldEmail"
                  placeholder="..."
                  disabled
                >
                </a-input>
              </a-form-item>

              <a-form-item
                label="Email mới"
                name="newEmail"
              >
                <a-input
                  v-model:value="formChangeEmail.newEmail"
                  placeholder="..."
                  disabled
                >
                </a-input>
              </a-form-item>

              <a-form-item
                class="submit"
                name="submit"
              >
                <a-button
                  class="submit-form-button submit-btn click-active"
                  type="primary"
                  html-type="submit"
                  size="large"
                  :loading="loadingChangeEmail"
                  :disabled="isDisabledForm || disabled"
                >
                  Thay đổi email
                </a-button>
              </a-form-item>
            </a-form>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons-vue';
import { ElNotification } from 'element-plus';

import {
  AccountConfirm,
  ChangeEmail,
  VerifyChangeEmail
} from '~/services/account';

definePageMeta({
  layout: 'service',
  pageTransition: {
    name: 'slide-bottom'
  }
});

const store = useStore();
const utils = useUtils();
const route = useRoute();
const loadingChangeEmail = ref<boolean>(false);
const formChangeEmail = reactive<{
  oldEmail: string;
  newEmail: string;
}>({
  oldEmail: '',
  newEmail: ''
});
const showAnimation = ref<boolean>(false);
const isShowVerifyOTPForm = ref<boolean>(false);
const chgEmailToken = computed<string>(() => route.query?.token);
const isDisabledForm = ref<boolean>(false);
const disabled = computed<boolean>((): boolean => {
  return !(
    formChangeEmail.newEmail &&
    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
      formChangeEmail.newEmail
    ) &&
    formChangeEmail.newEmail != store.userAccount?.email
  );
});
const internalInstance: any = getCurrentInstance();

useHead({
  title: 'Thay đỏi Email',
  htmlAttrs: { lang: 'vi' }
});

useSeoMeta({
  title: 'Thay đỏi Email',
  description: 'Thay đỏi Email của bạn',
  ogTitle: 'Thay đổi Email',
  ogType: 'video.movie',
  // ogUrl: window.location.href,
  ogDescription: 'Thay đỏi Email của bạn',
  ogLocale: 'vi'
});

await VerifyChangeEmail(chgEmailToken.value)
  .then((response) => {
    if (response.success) {
      formChangeEmail.oldEmail = response?.result.old_email;
      formChangeEmail.newEmail = response?.result.new_email;
    } else {
      isDisabledForm.value = true;

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
    isDisabledForm.value = true;

    ElNotification.error({
      title: 'Thất bại!',
      message: 'Some thing went wrong.',
      icon: () =>
        h(CloseCircleFilled, {
          style: 'color: red'
        })
    });
  });

onBeforeMount(() => {
  setTimeout(() => {
    showAnimation.value = true;
  });
});

const handleSubmit = () => {
  if (loadingChangeEmail.value) return;

  loadingChangeEmail.value = true;
  internalInstance.appContext.config.globalProperties.$Progress.start();

  ChangeEmail({
    chgEmailToken: chgEmailToken.value,
    newEmail: formChangeEmail.newEmail
  })
    .then((response) => {
      // console.log(response);
      if (response?.success == true) {
        ElNotification.success({
          title: 'Thành công!',
          message: 'Thay đổi email thành công.',
          icon: () =>
            h(CheckCircleFilled, {
              style: 'color: green'
            })
        });

        isDisabledForm.value = true;

        store.userAccount!.email = formChangeEmail.newEmail;

        utils.localStorage.setWithExpiry(
          'user_token',
          response.headers.get('Authorization'),
          24
        );

        window.localStorage.removeItem('change_email');

        navigateTo('/YourAccount');
      } else {
        ElNotification.error({
          title: 'Thất bại!',
          message: 'Thay đổi email thất bại.',
          icon: () =>
            h(CloseCircleFilled, {
              style: 'color: red'
            })
        });
      }
    })
    .catch((e) => {
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
      loadingChangeEmail.value = false;
      internalInstance.appContext.config.globalProperties.$Progress.finish();
    });
};

const handleClickBack = () => {
  showAnimation.value = false;

  setTimeout(() => {
    showAnimation.value = true;
    isShowVerifyOTPForm.value = false;
  }, 300);
};
</script>

<style lang="scss" src="./ChangeEmailPage.scss"></style>

<template>
  <div class="service-page change-email padding-content">
    <div class="change-page">
      <div v-if="!authStore.loadingUser">
        <div
          v-if="isLogin"
          class="change-email-container"
        >
          <Transition
            appear
            name="slide-left"
          >
            <div v-show="showAnimation">
              <div v-show="!isShowVerifyOTPForm && !isChangeEmailForm">
                <NuxtLink
                  class="back-page-btn"
                  to="/YourAccount"
                >
                  <BackPage align-left> Tài khoản </BackPage>
                </NuxtLink>

                <div class="verifyEmail-header">
                  <div class="note">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="8rem"
                      height="8rem"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path
                        d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12c5.16-1.26 9-6.45 9-12V5l-9-4zm7 10c0 4.52-2.98 8.69-7 9.93c-4.02-1.24-7-5.41-7-9.93V6.3l7-3.11l7 3.11V11zm-11.59.59L6 13l4 4l8-8l-1.41-1.42L10 14.17z"
                      />
                    </svg>
                    <h1>Trước tiên, Hãy xác nhận Email này là của bạn</h1>
                    <p>
                      Trước khi cấp phép thực hiện bất kỳ thay đổi nào, chúng
                      tôi cần đảm bảo đây là bạn.
                    </p>
                  </div>
                </div>

                <a-form
                  :model="formVerifyEmail"
                  name="verify-email-form"
                  class="form-verify-email"
                  :class="{ disabled: loadingVerifyEmail }"
                  hide-required-mark
                  @finish="handleSubmitVerifyEmail"
                >
                  <a-form-item
                    class="email"
                    name="email"
                  >
                    <button
                      class="submit-form-button submit-btn click-active"
                      html-type="submit"
                    >
                      <div class="left">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="3rem"
                          height="3rem"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path
                            d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5l8-5v10zm-8-7L4 6h16l-8 5z"
                          />
                        </svg>
                        <span> {{ authStore.userAccount?.email }}</span>
                      </div>

                      <div class="right">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="2.4rem"
                          height="2.4rem"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path
                            d="M8.025 22L6.25 20.225L14.475 12L6.25 3.775L8.025 2l10 10l-10 10Z"
                          />
                        </svg>
                      </div>
                    </button>
                  </a-form-item>
                </a-form>
              </div>

              <VerifyPinOTPForm
                v-model:isShowForm="isShowVerifyOTPForm"
                v-model:otpExpOffset="otpExpOffset"
                v-model:loadingResend="loadingResend"
                v-model:disabled_countdown="disabled_countdown"
                v-model:loadingVerify="loadingVerify"
                :email="authStore.userAccount?.email"
                :token="vrfEmailToken"
                @on-verify="handleVerify"
                @on-resend="handleResendVerifyEmail"
                @on-click-back="handleClickBack"
              >
                <template #title>
                  <h1>Xác nhận Email của bạn</h1>

                  <p>
                    {{ titleVerify }}
                    <strong> {{ authStore.userAccount?.email }}</strong>
                  </p>
                </template>
              </VerifyPinOTPForm>

              <div
                v-show="isChangeEmailForm"
                class="form-change-email-wrapper"
              >
                <div class="changeEmail-header">
                  <h1>Thay đổi Email của bạn</h1>
                  <p
                    class="note"
                    :class="{
                      'is-sended':
                        changeEmailLocalStr.exp_after > 0 &&
                        changeEmailLocalStr.email == formChangeEmail.newEmail
                    }"
                  >
                    {{ noteChangeEmail }}
                  </p>
                </div>

                <a-form
                  :model="formChangeEmail"
                  :rules="rules"
                  name="change-email-form"
                  class="form-change-email"
                  :class="{ disabled: loadingVerifyEmail }"
                  hide-required-mark
                  @finish="handleSubmitChangeEmail"
                >
                  <a-form-item
                    label="Email"
                    name="newEmail"
                  >
                    <a-input
                      v-model:value="formChangeEmail.newEmail"
                      placeholder="Nhập email mới bạn muốn thay đổi..."
                      allow-clear
                      @change="onChangeNewEmail"
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
                      :disabled="isActionFormChangeEmail || disabled"
                    >
                      Thay đổi email
                    </a-button>
                  </a-form-item>
                </a-form>
              </div>
            </div>
          </Transition>
        </div>
        <RequireAuth v-else />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Rule } from 'ant-design-vue/es/form';
import { ElNotification } from 'element-plus';
import { storeToRefs } from 'pinia';

import { BackPage } from '~/components/BackPage';
import { RequireAuth } from '~/components/RequireAuth';
import { VerifyPinOTPForm } from '~/components/VerifyForm';
import { AccountConfirm, ChangeEmail, VerifyEmail } from '~/services/account';

definePageMeta({
  layout: 'service',
  pageTransition: {
    //   name: 'slide-left',
    //   appear: true
  },
  keepalive: false
});

const authStore = useAuthStore();
const utils = useUtils();
const { isLogin } = storeToRefs<any>(authStore);
const loadingVerifyEmail = ref<boolean>(false);
const loadingChangeEmail = ref<boolean>(false);
const formVerifyEmail = reactive<{
  email: string | undefined;
}>({
  email: authStore.userAccount?.email
});
const formChangeEmail = reactive<{
  newEmail: string;
}>({
  newEmail: ''
});
const showAnimation = ref<boolean>(false);
const loadingVerify = ref<boolean>(false);
const isShowVerifyOTPForm = ref<boolean>(false);
const isChangeEmailForm = ref<boolean>(false);
const vrfEmailToken = ref<string>('');
const disabled_countdown = ref<boolean>(true);
const loadingResend = ref<boolean>(false);
const isActionFormChangeEmail = ref<boolean>(false);
const otpExpOffset = ref<number>(0);
const titleVerify = ref<string>('Mã xác nhận đã được gửi đến Email: ');
const noteChangeEmail = ref<string>(
  'Hãy nhập chính xác Email mới mà bạn muốn thay đổi. Tránh trường hợp nhầm lẫn xảy ra.'
);
const changeEmailLocalStr = reactive<{
  email: string;
  exp_after: number;
}>({
  email: '',
  exp_after: 0
});
const disabled = computed<boolean>((): boolean => {
  return !(
    formChangeEmail.newEmail &&
    utils.isEmailValid(formChangeEmail.newEmail) &&
    formChangeEmail.newEmail != authStore.userAccount?.email
  );
});
const nuxtLoadingIndicator = useLoadingIndicator();

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

onBeforeMount(async () => {
  await nextTick();

  showAnimation.value = true;
});

const checkConfirmNewEmail = async (_rule: any, value: string) => {
  if (value == authStore.userAccount?.email) {
    return Promise.reject(
      new Error('Email mới không được trùng với email cũ!')
    );
  } else {
    return Promise.resolve();
  }
};

const rules: Record<string, Rule[]> = {
  newEmail: [
    {
      required: true,
      message: 'Vui lòng nhập lại email mới!',
      trigger: ['change', 'blur']
    },
    {
      required: true,
      message: 'Vui lòng nhập đúng định dạng email (vd: example@gmail.com)!',
      pattern: new RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/),
      trigger: ['change', 'blur']
    },
    {
      validator: checkConfirmNewEmail,
      trigger: ['change', 'blur']
    }
  ]
};

const handleSubmitVerifyEmail = async () => {
  if (loadingVerifyEmail.value) return;

  if (
    otpExpOffset.value > 0 ||
    utils.cookie.getCookie(TOKEN.NAME.COOKIE_VRF_EMAIL_TOKEN) != null
  ) {
    showAnimation.value = false;

    await wait(300);

    showAnimation.value = true;
    isShowVerifyOTPForm.value = true;

    return;
  }

  loadingVerifyEmail.value = true;
  nuxtLoadingIndicator.start();

  AccountConfirm({ email: authStore.userAccount?.email }, 'email')
    .then(async (response) => {
      // console.log(response);

      if (response?.isSended === true) {
        ElNotification.success({
          title: MESSAGE.STATUS.SUCCESS,
          message: `Mã xác nhận đã được gửi đến đến Email: ${authStore.userAccount?.email}.`,
          duration: MESSAGE.DURATION.SLOW
        });

        vrfEmailToken.value = utils.cookie.getCookie(
          TOKEN.NAME.COOKIE_VRF_EMAIL_TOKEN
        )!;
        otpExpOffset.value = response.exp_offset;

        showAnimation.value = false;

        await wait(300);

        showAnimation.value = true;
        isShowVerifyOTPForm.value = true;
      } else if (response?.isWrongPassword == true) {
        ElNotification.error({
          title: MESSAGE.STATUS.FAILED,
          message: 'Sai mật khẩu.',
          duration: MESSAGE.DURATION.DEFAULT
        });
      } else if (response?.isSended == false) {
        ElNotification.error({
          title: MESSAGE.STATUS.FAILED,
          message: 'Gửi Email thất bại.',
          duration: MESSAGE.DURATION.DEFAULT
        });
      }
    })
    .catch((e) => {
      ElNotification.error({
        title: MESSAGE.STATUS.BROKE,
        message: MESSAGE.STATUS.BROKE_MESSAGE,
        duration: MESSAGE.DURATION.DEFAULT
      });
    })
    .finally(() => {
      nuxtLoadingIndicator.finish();
      loadingVerifyEmail.value = false;
    });
};

const handleVerify = (formVerify: any) => {
  if (loadingVerify.value) return;

  loadingVerify.value = true;

  VerifyEmail({
    otp: formVerify.otp,
    vrfEmailToken: vrfEmailToken.value
  })
    .then(async (response) => {
      // console.log(response);
      if (response?.success == true) {
        showAnimation.value = false;

        await wait(300);

        showAnimation.value = true;
        isShowVerifyOTPForm.value = false;
        isChangeEmailForm.value = true;
      } else if (response?.isInvalidOTP == true) {
        ElNotification.error({
          title: MESSAGE.STATUS.FAILED,
          message: 'Mã xác nhận không đúng.',
          duration: MESSAGE.DURATION.DEFAULT
        });
      } else if (response?.isOTPExpired == true) {
        ElNotification.error({
          title: MESSAGE.STATUS.FAILED,
          message: 'Mã xác nhận đã hết hạn.',
          duration: MESSAGE.DURATION.DEFAULT
        });
      } else if (response?.success == false) {
        ElNotification.error({
          title: MESSAGE.STATUS.FAILED,
          message: MESSAGE.STATUS.BROKE_MESSAGE,
          duration: MESSAGE.DURATION.DEFAULT
        });
      }
    })
    .catch((e) => {
      ElNotification.error({
        title: MESSAGE.STATUS.BROKE,
        message: MESSAGE.STATUS.BROKE_MESSAGE,
        duration: MESSAGE.DURATION.DEFAULT
      });
    })
    .finally(() => {
      loadingVerify.value = false;
    });
};

const handleResendVerifyEmail = () => {
  if (loadingResend.value) return;

  loadingResend.value = true;

  AccountConfirm({ email: authStore.userAccount?.email }, 'email')
    .then((response) => {
      // console.log(response);

      if (response?.isSended === true) {
        ElNotification.success({
          title: MESSAGE.STATUS.SUCCESS,
          message: `Mã xác nhận đã được gửi đến đến Email: ${authStore.userAccount?.email}.`,
          duration: MESSAGE.DURATION.SLOW
        });

        disabled_countdown.value = true;

        vrfEmailToken.value = utils.cookie.getCookie(
          TOKEN.NAME.COOKIE_VRF_EMAIL_TOKEN
        )!;
        otpExpOffset.value = response.exp_offset;
      } else {
        ElNotification.error({
          title: MESSAGE.STATUS.FAILED,
          message: 'Gửi Email thất bại.',
          duration: MESSAGE.DURATION.DEFAULT
        });
      }
    })
    .catch((e) => {
      ElNotification.error({
        title: MESSAGE.STATUS.BROKE,
        message: MESSAGE.STATUS.BROKE_MESSAGE,
        duration: MESSAGE.DURATION.DEFAULT
      });
    })
    .finally(() => {
      loadingResend.value = false;
    });
};

const getForgotPasswordLocalStr = async () => {
  const forgot_password = utils.localStorage.getWithExpiry_ExpRemain(
    TOKEN.NAME.LOCS_CHANGE_EMAIL
  );
  const isExpireForm = forgot_password == null;

  if (!isExpireForm) {
    changeEmailLocalStr.email = forgot_password.email;
    changeEmailLocalStr.exp_after = forgot_password.exp_after;
  } else {
    changeEmailLocalStr.email = '';
    changeEmailLocalStr.exp_after = 0;
  }
};

const checkSendedEmail = () => {
  getForgotPasswordLocalStr();

  if (
    changeEmailLocalStr.exp_after > 0 &&
    changeEmailLocalStr.email == formChangeEmail.newEmail
  ) {
    if (changeEmailLocalStr.exp_after > 60) {
      noteChangeEmail.value = `Chúng tôi đã gửi email kèm hướng dẫn đặt lại mật khẩu đến ${
        formChangeEmail.newEmail
      }. Vui lòng thử lại sau ${Math.round(
        changeEmailLocalStr.exp_after / 60
      )} phút nữa.`;
    } else {
      noteChangeEmail.value = `Chúng tôi đã gửi email kèm hướng dẫn đặt lại mật khẩu đến ${
        formChangeEmail.newEmail
      }. Vui lòng thử lại sau ${Math.round(
        changeEmailLocalStr.exp_after
      )} giây nữa.`;
    }
    isActionFormChangeEmail.value = true;
  } else {
    isActionFormChangeEmail.value = false;
    noteChangeEmail.value =
      'Hãy nhập Email của tài khoản mà bạn muốn khôi phục mật khẩu.';
  }
};

const onChangeNewEmail = () => {
  checkSendedEmail();
};

const handleSubmitChangeEmail = () => {
  if (loadingChangeEmail.value) return;

  checkSendedEmail();

  loadingChangeEmail.value = true;
  nuxtLoadingIndicator.start();

  AccountConfirm({ newEmail: formChangeEmail.newEmail }, 'change-email')
    .then((response) => {
      // console.log(response);

      if (response?.isSended === true) {
        ElNotification.success({
          title: MESSAGE.STATUS.SUCCESS,
          message: `Gửi Email thành công.`,
          duration: MESSAGE.DURATION.DEFAULT
        });

        changeEmailLocalStr.email = formChangeEmail.newEmail;
        changeEmailLocalStr.exp_after = +response.exp_offset;

        utils.localStorage.setWithExpiry(
          TOKEN.NAME.LOCS_CHANGE_EMAIL,
          {
            email: formChangeEmail.newEmail,
            exp_after: +response.exp_offset
          },
          +response.exp_offset * ONE_SECOND
        );

        noteChangeEmail.value = `Chúng tôi đã gửi email kèm hướng dẫn thay đổi email đến ${
          formChangeEmail.newEmail
        }. Email này sẽ hết hiệu lực sau ${response.exp_offset / 60} phút.`;

        isActionFormChangeEmail.value = true;
      } else if (response?.isEmailExist == true) {
        ElNotification.error({
          title: MESSAGE.STATUS.FAILED,
          message: 'Email đã được đăng ký.',
          duration: MESSAGE.DURATION.DEFAULT
        });
      } else if (response?.isInValidEmail == true) {
        ElNotification.error({
          title: MESSAGE.STATUS.FAILED,
          message: 'Email không tồn tại.',
          duration: MESSAGE.DURATION.DEFAULT
        });
      } else if (response?.isSended == false) {
        ElNotification.error({
          title: MESSAGE.STATUS.FAILED,
          message: 'Gửi Email thất bại.',
          duration: MESSAGE.DURATION.DEFAULT
        });
      }
    })
    .catch((e) => {
      ElNotification.error({
        title: MESSAGE.STATUS.BROKE,
        message: MESSAGE.STATUS.BROKE_MESSAGE,
        duration: MESSAGE.DURATION.DEFAULT
      });
    })
    .finally(() => {
      loadingChangeEmail.value = false;
      nuxtLoadingIndicator.finish();
    });
};

const handleClickBack = async () => {
  showAnimation.value = false;

  await wait(300);

  showAnimation.value = true;
  isShowVerifyOTPForm.value = false;
};
</script>

<!-- <style lang="scss" src="./ChangeEmailPage.scss"></style> -->
<style lang="scss">
@import url('./ChangeEmailPage.scss');
</style>

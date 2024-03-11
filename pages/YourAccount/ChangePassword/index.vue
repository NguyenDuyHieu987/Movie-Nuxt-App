<template>
  <div class="service-page change-password padding-content">
    <div class="change-page">
      <div v-if="!authStore.loadingUser">
        <div
          v-if="isLogin"
          class="changePass-container"
        >
          <Transition
            appear
            name="slide-left"
          >
            <div v-show="showAnimation">
              <div
                v-show="!isShowVerifyOTPForm"
                class="changePass-wrapper"
              >
                <NuxtLink
                  class="back-page-btn"
                  to="/YourAccount"
                >
                  <BackPage align-left> Tài khoản </BackPage>
                </NuxtLink>

                <div class="changePass-header">
                  <h1>Đổi mật khẩu của bạn</h1>
                  <p>
                    Để bảo vệ tài khoản bạn nên đặt một mật khẩu duy nhất dài ít
                    nhất 6 ký tự.
                  </p>
                </div>
                <a-form
                  :model="formChangePassword"
                  :rules="rules"
                  name="change-password-form"
                  class="form-change-password"
                  hide-required-mark
                  @finish="handleSubmit"
                >
                  <a-form-item
                    label="Mật khẩu cũ"
                    name="oldPassword"
                    :rules="[
                      {
                        required: true,
                        message: 'Vui lòng nhập mật khẩu cũ!',
                        trigger: ['change', 'blur']
                      }
                      // {
                      //   message: 'Mật khẩu cũ phải có ít nhất 6 ký tụ!',
                      //   min: 6,
                      //   trigger: ['change', 'blur'],
                      // },
                    ]"
                    has-feedback
                  >
                    <a-input-password
                      v-model:value="formChangePassword.oldPassword"
                      placeholder="Mật khẩu cũ..."
                      allow-clear
                    />
                  </a-form-item>

                  <a-form-item
                    label="Mật khẩu mới"
                    name="newPassword"
                    has-feedback
                  >
                    <a-input-password
                      v-model:value="formChangePassword.newPassword"
                      placeholder="Mật khẩu mới..."
                      allow-clear
                    >
                    </a-input-password>
                  </a-form-item>

                  <a-form-item
                    label="Xác nhận lại"
                    name="confirmNewPassword"
                    has-feedback
                  >
                    <a-input-password
                      v-model:value="formChangePassword.confirmNewPassword"
                      placeholder="Xác nhận lại mật khẩu mới..."
                      allow-clear
                    />
                  </a-form-item>

                  <a-form-item class="logout-all-device">
                    <a-checkbox
                      v-model:checked="formChangePassword.logOutAllDevice"
                    >
                      Đăng xuất khỏi tất cả các thiết bị
                    </a-checkbox>
                  </a-form-item>

                  <a-form-item>
                    <a-button
                      class="submit-form-button submit-btn click-active"
                      type="primary"
                      html-type="submit"
                      size="large"
                      :loading="loadingChangePassword"
                      :disabled="disabled"
                    >
                      Đổi mật khẩu
                    </a-button>
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
                :token="chgPwdToken"
                @on-verify="handleVerify"
                @on-resend="handleResendVerifyEmail"
                @on-click-back="handleClickBack"
              >
                <template #title>
                  <h1>Xác nhận thay đổi mật khẩu của bạn</h1>

                  <p>
                    {{ titleVerify }}
                    <strong> {{ authStore.userAccount?.email }}</strong>
                  </p>
                </template>
              </VerifyPinOTPForm>
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
import { AccountConfirm, ChangePassword } from '~/services/account';

definePageMeta({
  layout: 'service',
  pageTransition: {
    //   name: 'slide-left',
    //   appear: true
  },
  keepalive: false
});

const utils = useUtils();
const authStore = useAuthStore();
const { isLogin } = storeToRefs<any>(authStore);
const loadingChangePassword = ref<boolean>(false);
const formChangePassword = reactive<{
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
  logOutAllDevice: boolean;
}>({
  oldPassword: '',
  newPassword: '',
  confirmNewPassword: '',
  logOutAllDevice: false
});
const showAnimation = ref<boolean>(false);
const loadingVerify = ref<boolean>(false);
const isShowVerifyOTPForm = ref<boolean>(false);
const chgPwdToken = ref<string>('');
const disabled_countdown = ref<boolean>(true);
const loadingResend = ref<boolean>(false);
const otpExpOffset = ref<number>(0);
const titleVerify = ref<string>('Mã xác nhận đã được gửi đến Email: ');
const disabled = computed<boolean>((): boolean => {
  return !(
    formChangePassword.oldPassword &&
    formChangePassword.newPassword &&
    formChangePassword.confirmNewPassword &&
    formChangePassword.oldPassword != formChangePassword.newPassword &&
    formChangePassword.newPassword == formChangePassword.confirmNewPassword
  );
});
const nuxtLoadingIndicator = useLoadingIndicator();

useHead({
  title: 'Đỏi mật khẩu',
  htmlAttrs: { lang: 'vi' }
});

useSeoMeta({
  title: 'Đỏi mật khẩu',
  description: 'Đỏi mật khẩu của bạn',
  ogTitle: 'Đỏi mật khẩu',
  ogType: 'video.movie',
  // ogUrl: window.location.href,
  ogDescription: 'Đỏi mật khẩu của bạn',
  ogLocale: 'vi'
});

onBeforeMount(async () => {
  await nextTick();

  showAnimation.value = true;
});

const checkNewPassword = async (_rule: any, value: string) => {
  if (value == formChangePassword.oldPassword) {
    return Promise.reject(
      new Error('Mật khẩu mới không được trùng với mật khẩu cũ!')
    );
  } else {
    return Promise.resolve();
  }
};

const checkConfirmNewPassword = async (_rule: any, value: string) => {
  if (value !== formChangePassword.newPassword) {
    return Promise.reject(new Error('Mật khẩu mới nhập lại không khớp!'));
  } else {
    return Promise.resolve();
  }
};

const rules: Record<string, Rule[]> = {
  newPassword: [
    {
      required: true,
      message: 'Vui lòng nhập mật khẩu mới!',
      trigger: ['change', 'blur']
    },
    // {
    //   message: 'Mật khẩu phải có ít nhất 6 ký tụ!',
    //   min: 6,
    //   trigger: ['change', 'blur'],
    // },
    {
      validator: checkNewPassword,
      trigger: ['change', 'blur']
    }
  ],
  confirmNewPassword: [
    {
      required: true,
      message: 'Vui lòng nhập lại mật khẩu mới!',
      trigger: ['change', 'blur']
    },
    {
      validator: checkConfirmNewPassword,
      trigger: ['change', 'blur']
    }
  ]
};

const reset = () => {
  formChangePassword.oldPassword = '';
  formChangePassword.newPassword = '';
  formChangePassword.confirmNewPassword = '';
};

const handleSubmit = async () => {
  if (loadingChangePassword.value) return;

  if (
    otpExpOffset.value > 0 ||
    utils.cookie.getCookie(TOKEN.NAME.COOKIE_CHG_PASSWORD_TOKEN) != null
  ) {
    showAnimation.value = false;

    await wait(300);

    showAnimation.value = true;
    isShowVerifyOTPForm.value = true;

    return;
  }

  loadingChangePassword.value = true;
  nuxtLoadingIndicator.start();

  AccountConfirm(
    {
      // oldPassword: utils.encryptPassword(formChangePassword.oldPassword),
      // newPassword: utils.encryptPassword(formChangePassword.confirmNewPassword),
      oldPassword: formChangePassword.oldPassword,
      newPassword: formChangePassword.confirmNewPassword,
      logOutAllDevice: formChangePassword.logOutAllDevice
    },
    'change-password'
  )
    .then(async (response) => {
      // console.log(response);

      if (response?.isSended === true) {
        ElNotification.success({
          title: MESSAGE.STATUS.SUCCESS,
          message: `Mã xác nhận đã được gửi đến đến Email: ${authStore.userAccount?.email}.`,
          duration: MESSAGE.DURATION.SLOW
        });

        chgPwdToken.value = utils.cookie.getCookie(
          TOKEN.NAME.COOKIE_CHG_PASSWORD_TOKEN
        )!;
        otpExpOffset.value = response.exp_offset;

        // router.push({
        //   query: {
        //     token: chgPwdToken.value,
        //   },
        // });
        showAnimation.value = false;

        await wait(300);

        showAnimation.value = true;
        isShowVerifyOTPForm.value = true;
      } else if (response?.isWrongPassword == true) {
        ElNotification.error({
          title: MESSAGE.STATUS.FAILED,
          message: 'Mật khẩu cũ không đúng.',
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
        title: MESSAGE.STATUS.FAILED,
        message: 'Gửi Email thất bại.',
        duration: MESSAGE.DURATION.DEFAULT
      });
    })
    .finally(() => {
      nuxtLoadingIndicator.finish();
      loadingChangePassword.value = false;
    });
};

const handleVerify = (formVerify: { otp: string; token: string }) => {
  if (loadingVerify.value) return;

  loadingVerify.value = true;

  ChangePassword({
    otp: formVerify.otp,
    chgPwdToken: chgPwdToken.value
  })
    .then((response) => {
      // console.log(response);
      if (response?.success == true) {
        ElNotification.success({
          title: MESSAGE.STATUS.SUCCESS,
          message: 'Đổi mật khẩu thành công.',
          duration: MESSAGE.DURATION.DEFAULT
        });

        if (response?.logout_all_device) {
          utils.localStorage.setWithExpiry(
            TOKEN.NAME.USER_TOKEN,
            response.headers.get('Authorization'),
            TOKEN.OFFSET.USER_TOKEN
          );
        }

        navigateTo({ path: '/YourAccount' });
        reset();
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
          message: 'Đổi mật khẩu thất bại.',
          duration: MESSAGE.DURATION.DEFAULT
        });
      }
    })
    .catch((e) => {
      ElNotification.error({
        title: MESSAGE.STATUS.FAILED,
        message: 'Đổi mật khẩu thất bại.',
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

  AccountConfirm(
    {
      // oldPassword: utils.encryptPassword(formChangePassword.oldPassword),
      // newPassword: utils.encryptPassword(formChangePassword.confirmNewPassword),
      oldPassword: formChangePassword.oldPassword,
      newPassword: formChangePassword.confirmNewPassword,
      logOutAllDevice: formChangePassword.logOutAllDevice
    },
    'change-password'
  )
    .then((response) => {
      // console.log(response);

      titleVerify.value = `Một mã xác nhận khác đã được gửi đến Email: `;

      if (response?.isSended === true) {
        ElNotification.success({
          title: MESSAGE.STATUS.SUCCESS,
          message: `Mã xác nhận đã được gửi đến đến Email: ${authStore.userAccount?.email}.`,
          duration: MESSAGE.DURATION.SLOW
        });

        disabled_countdown.value = true;

        chgPwdToken.value = utils.cookie.getCookie(
          TOKEN.NAME.COOKIE_CHG_PASSWORD_TOKEN
        )!;
        otpExpOffset.value = response.exp_offset;
      } else if (response?.isWrongPassword == true) {
        ElNotification.error({
          title: MESSAGE.STATUS.FAILED,
          message: 'Mật khẩu cũ không đúng.',
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
        title: MESSAGE.STATUS.FAILED,
        message: 'Gửi Email thất bại.',
        duration: MESSAGE.DURATION.DEFAULT
      });
    })
    .finally(() => {
      loadingResend.value = false;
    });
};

const handleClickBack = async () => {
  showAnimation.value = false;

  await wait(300);

  showAnimation.value = true;
  isShowVerifyOTPForm.value = false;
};
</script>

<!-- <style lang="scss" src="./ChangePasswordPage.scss"></style> -->
<style lang="scss">
@import url('./ChangePasswordPage.scss');
</style>

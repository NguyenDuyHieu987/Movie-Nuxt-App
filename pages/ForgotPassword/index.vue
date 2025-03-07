<template>
  <div class="forgot-password center-page">
    <div class="forgot-password-container">
      <div class="form-forgot-password-container">
        <a-form
          :model="formForgotPassword"
          name="forgot-password-form"
          class="form-forgot-password"
          hide-required-mark
          @finish="handleSubmit"
        >
          <div class="forgotPass-header">
            <h1>Quên mật khẩu của bạn?</h1>
            <p
              class="note"
              :class="{
                'is-sended':
                  forgotPasswordLocalStr.exp_after > 0 &&
                  forgotPasswordLocalStr.email == formForgotPassword.email
              }"
            >
              {{ noteForgotPassword }}
            </p>
          </div>

          <a-form-item
            label="Email"
            name="email"
            :rules="[
              {
                required: true,
                message:
                  'Vui lòng nhập đúng định dạng email (vd: example@gmail.com)!',
                pattern: new RegExp(
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
                ),
                trigger: ['change', 'blur']
              }
            ]"
          >
            <a-input
              v-model:value="formForgotPassword.email"
              placeholder="Nhập email của bạn..."
              allow-clear
              @change="onChangeEmail"
            >
              <!-- <template #prefix>
                <SvgoAlternateEmail
                  width="1.4rem"
                  height="1.4rem"
                  fill="currentColor"
                />
              </template> -->
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
              :loading="loadingForgotPassword"
              :disabled="isActionForm || disabled"
            >
              Đặt lại mật khẩu
            </a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import SvgoAlternateEmail from '~/assets/svgs/icons/alternate-email.svg?component';

import { ElNotification } from 'element-plus';

import { forgotPassword } from '~/services/authentication';

definePageMeta({
  layout: 'auth',
  pageTransition: {
    name: 'slide-left'
  }
});

useHead({
  title: 'Trợ giúp, Quên mật khẩu',
  htmlAttrs: { lang: 'vi' }
});

useSeoMeta({
  title: 'Trợ giúp, Quên mật khẩu',
  description: 'Quên mật khẩu của bạn',
  ogTitle: 'Trợ giúp, Quên mật khẩu',
  ogType: 'video.movie',
  // ogUrl: window.location.href,
  ogDescription: 'Quên mật khẩu của bạn',
  ogLocale: 'vi'
});

const utils = useUtils();
const loadingForgotPassword = ref<boolean>(false);
const isActionForm = ref<boolean>(false);
const formForgotPassword = reactive<{
  email: string;
}>({
  email: ''
});
const forgotPasswordLocalStr = reactive<{
  email: string;
  exp_after: number;
}>({
  email: '',
  exp_after: 0
});
const noteForgotPassword = ref<string>(
  'Hãy nhập Email của tài khoản mà bạn muốn khôi phục mật khẩu.'
);
const disabled = computed<boolean>((): boolean => {
  return !utils.isEmailValid(formForgotPassword.email);
});

const reset = () => {
  formForgotPassword.email = '';
};

const getForgotPasswordLocalStr = async () => {
  const forgot_password = utils.localStorage.getWithExpiry_ExpRemain(
    TOKEN.NAME.LOCS_FORGOT_PASSWORD
  );
  const isExpireForm = forgot_password == null;

  if (!isExpireForm) {
    forgotPasswordLocalStr.email = forgot_password.email;
    forgotPasswordLocalStr.exp_after = forgot_password.exp_after;
  } else {
    forgotPasswordLocalStr.email = '';
    forgotPasswordLocalStr.exp_after = 0;
  }
};

const checkSendedEmail = () => {
  getForgotPasswordLocalStr();

  if (
    forgotPasswordLocalStr.exp_after > 0 &&
    forgotPasswordLocalStr.email == formForgotPassword.email
  ) {
    if (forgotPasswordLocalStr.exp_after > 60) {
      noteForgotPassword.value = `Chúng tôi đã gửi email kèm hướng dẫn đặt lại mật khẩu đến ${
        formForgotPassword.email
      }. Vui lòng thử lại sau ${Math.round(
        forgotPasswordLocalStr.exp_after / 60
      )} phút nữa.`;
    } else {
      noteForgotPassword.value = `Chúng tôi đã gửi email kèm hướng dẫn đặt lại mật khẩu đến ${
        formForgotPassword.email
      }. Vui lòng thử lại sau ${Math.round(
        forgotPasswordLocalStr.exp_after
      )} giây nữa.`;
    }
    isActionForm.value = true;
  } else {
    isActionForm.value = false;
    noteForgotPassword.value =
      'Hãy nhập Email của tài khoản mà bạn muốn khôi phục mật khẩu.';
  }
};

onBeforeMount(() => {
  getForgotPasswordLocalStr();
});

const onChangeEmail = () => {
  checkSendedEmail();
};

const handleSubmit = () => {
  if (loadingForgotPassword.value) return;

  checkSendedEmail();

  loadingForgotPassword.value = true;

  forgotPassword(formForgotPassword.email, 'email')
    .then((response) => {
      // console.log(response.headers['set-cookie']);

      if (response?.isSended === true) {
        ElNotification.success({
          title: MESSAGE.STATUS.SUCCESS,
          message: `Gửi Email thành công.`,
          duration: MESSAGE.DURATION.DEFAULT
        });

        forgotPasswordLocalStr.email = formForgotPassword.email;
        forgotPasswordLocalStr.exp_after = +response.exp_offset;

        utils.localStorage.setWithExpiry(
          TOKEN.NAME.LOCS_FORGOT_PASSWORD,
          {
            email: formForgotPassword.email,
            exp_after: +response.exp_offset
          },
          +response.exp_offset * ONE_SECOND
        );

        noteForgotPassword.value = `Chúng tôi đã gửi email kèm hướng dẫn đặt lại mật khẩu đến ${
          formForgotPassword.email
        }. Email này sẽ hết hiệu lực sau ${response.exp_offset / 60} phút.`;

        isActionForm.value = true;
      } else if (response?.isEmailExist == false) {
        ElNotification.error({
          title: MESSAGE.STATUS.FAILED,
          message: 'Email chưa được đăng ký.',
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
        title: MESSAGE.STATUS.FAILED,
        message: 'Gửi Email thất bại.',
        duration: MESSAGE.DURATION.DEFAULT
      });
    })
    .finally(() => {
      loadingForgotPassword.value = false;
    });
};
</script>

<style lang="scss" src="./ForgotPassword.scss"></style>
<!-- <style lang="scss">
@import url('./ForgotPassword.scss');
</style> -->

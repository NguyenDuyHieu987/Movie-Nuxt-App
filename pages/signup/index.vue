<template>
  <div class="signup">
    <Transition name="slide-left">
      <div
        v-show="showAnimation"
        class="signup-container"
      >
        <div
          v-show="!isShowVerifyOTPForm"
          class="signup-form-container"
        >
          <a-form
            class="signup-form"
            :model="formSignup"
            :rules="rules"
            name="signup-form"
            hideRequiredMark
            @finish="handleSignUp"
          >
            <h1 class="title-signup gradient-title-default">
              <span> Đăng ký </span>
            </h1>

            <a-form-item
              label="Họ và Tên"
              name="fullname"
              :rules="[
                {
                  required: true,
                  message: 'Vui lòng nhập đầy đủ họ tên của bạn!',
                  trigger: ['change', 'blur']
                },
                {
                  message: 'Họ và tên phải có ít nhất 5 ký tụ!',
                  min: 5,
                  trigger: ['change', 'blur']
                },
                {
                  message: 'Họ và tên chỉ được tối đa 30 ký tụ!',
                  max: 30,
                  trigger: ['change', 'blur']
                }
              ]"
            >
              <a-input
                v-model:value="formSignup.fullname"
                placeholder="Họ và Tên..."
                allow-clear
              >
                <template #prefix>
                  <UserOutlined />
                </template>
              </a-input>
            </a-form-item>

            <a-form-item
              label="Tài khoản"
              name="username"
              :rules="[
                {
                  required: true,
                  message: 'Vui lòng nhập tên tài khoản!',
                  trigger: ['change', 'blur']
                },
                {
                  message: 'Tên tài khoản phải có ít nhất 6 ký tụ!',
                  min: 6,
                  trigger: ['change', 'blur']
                },
                {
                  message: 'Tên tài khoản chỉ được tối đa 20 ký tụ!',
                  max: 20,
                  trigger: ['change', 'blur']
                },
                {
                  validator: checkSpecialCharacters,
                  trigger: ['change', 'blur']
                }
              ]"
            >
              <a-input
                ref="usernameRef"
                v-model:value="formSignup.username"
                placeholder="Username..."
                allow-clear
              >
                <template #prefix>
                  <UserOutlined />
                </template>
              </a-input>
            </a-form-item>

            <a-form-item
              label="Email"
              name="email"
              :rules="[
                {
                  required: true,
                  message: 'Vui lòng nhập email!',
                  trigger: ['change', 'blur']
                },
                {
                  message:
                    'Vui lòng nhập đúng định dạng email (vd: ...@gmail.com)!',
                  pattern: new RegExp(
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
                  ),
                  trigger: ['change', 'blur']
                }
              ]"
            >
              <a-input
                v-model:value="formSignup.email"
                placeholder="Email..."
                allow-clear
              >
                <template #prefix>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.4rem"
                    height="1.4rem"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="M256 64C150 64 64 150 64 256s86 192 192 192c17.7 0 32 14.3 32 32s-14.3 32-32 32C114.6 512 0 397.4 0 256S114.6 0 256 0s256 114.6 256 256v32c0 53-43 96-96 96c-29.3 0-55.6-13.2-73.2-33.9c-22.8 21-53.3 33.9-86.8 33.9c-70.7 0-128-57.3-128-128s57.3-128 128-128c27.9 0 53.7 8.9 74.7 24.1c5.7-5 13.1-8.1 21.3-8.1c17.7 0 32 14.3 32 32v112c0 17.7 14.3 32 32 32s32-14.3 32-32v-32c0-106-86-192-192-192zm64 192a64 64 0 1 0-128 0a64 64 0 1 0 128 0z"
                    />
                  </svg>
                </template>
              </a-input>
            </a-form-item>

            <a-form-item
              label="Mật khẩu"
              name="password"
              :rules="[
                {
                  required: true,
                  message: 'Vui lòng nhập mật khẩu!',
                  trigger: ['change', 'blur']
                },
                {
                  message: 'Mật khẩu phải có ít nhất 6 ký tụ!',
                  min: 6,
                  trigger: ['change', 'blur']
                }
              ]"
              has-feedback
            >
              <a-input-password
                v-model:value="formSignup.password"
                placeholder="Mật khẩu..."
              >
                <template #prefix>
                  <LockOutlined />
                </template>
              </a-input-password>
            </a-form-item>

            <a-form-item
              label="Nhập lại mật khẩu"
              name="confirmPass"
              has-feedback
              :rules="[
                {
                  required: true,
                  message: 'Vui lòng nhập lại mật khẩu!',
                  trigger: ['change', 'blur']
                },
                {
                  validator: checkConfirmPassword,
                  trigger: ['change', 'blur']
                }
              ]"
            >
              <a-input-password
                v-model:value="formSignup.confirmPass"
                placeholder="Xác nhận mật khẩu..."
              >
                <template #prefix>
                  <LockOutlined />
                </template>
              </a-input-password>
            </a-form-item>

            <a-form-item>
              <a-button
                class="signup-form-button"
                type="primary"
                html-type="submit"
                size="large"
                :loading="loadingSignUp"
                :disabled="disabled"
              >
                Đăng ký
              </a-button>
            </a-form-item>
          </a-form>
        </div>

        <VerifySignUpForm
          v-model:isShowForm="isShowVerifyOTPForm"
          v-model:otpExpOffset="otpExpOffset"
          v-model:loadingResend="loadingResend"
          v-model:disabled_countdown="disabled_countdown"
          v-model:loadingVerify="loadingVerify"
          :email="formSignup.email"
          :token="vrfSignupToken"
          @onVerify="handleVerify"
          @onResend="handleResendVerifyEmail"
          @onClickBack="handleClickBack"
        />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { LockOutlined, UserOutlined } from '@ant-design/icons-vue';
import type { Rule } from 'ant-design-vue/es/form';
import { ElNotification } from 'element-plus';

import VerifySignUpForm from '~/components/VerifyForm/VerifySignUpForm/VerifySignUpForm.vue';
import { signUp, verifySignUp } from '~/services/authentication';

definePageMeta({
  layout: 'auth',
  pageTransition: {
    name: 'slide-top'
  }
});

useHead({
  title: 'Đăng ký',
  htmlAttrs: { lang: 'vi' }
});

useSeoMeta({
  title: 'Đăng ký',
  description: 'Xem phim thỏa thích cùng Phimhay247',
  ogTitle: 'Đăng ký',
  ogType: 'video.movie',
  // ogUrl: window.location.href,
  ogDescription: 'Xem phim thỏa thích cùng Phimhay247',
  ogLocale: 'vi'
});

const formSignup = reactive<any>({
  id: '',
  fullname: '',
  username: '',
  password: '',
  confirmPass: '',
  email: '',
  avatar: ''
});

const utils = useUtils();
const router = useRouter();
const route = useRoute();
const loadingSignUp = ref<boolean>(false);
const loadingVerify = ref<boolean>(false);
const isShowVerifyOTPForm = ref<boolean>(false);
const vrfSignupToken = ref<string>('');
const disabled_countdown = ref<boolean>(true);
const loadingResend = ref<boolean>(false);
const otpExpOffset = ref<number>(0);
const showAnimation = ref<boolean>(true);
const disabled = computed<boolean>((): boolean => {
  return !(
    formSignup.fullname &&
    formSignup.username &&
    !/[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(formSignup.username) &&
    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formSignup.email) &&
    formSignup.password &&
    formSignup.confirmPass &&
    formSignup.password == formSignup.confirmPass
  );
});
const internalInstance: any = getCurrentInstance();

const reset = () => {
  formSignup.fullname = '';
  formSignup.username = '';
  formSignup.password = '';
  formSignup.confirmPass = '';
  formSignup.email = '';
};

const checkSpecialCharacters = async (_rule: Rule, value: string) => {
  if (/[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(value)) {
    return Promise.reject(
      new Error('Tên tài khoản không được có ký tự đặc biệt!')
    );
  } else {
    return Promise.resolve();
  }
};

const checkConfirmPassword = async (_rule: Rule, value: string) => {
  if (value !== formSignup.password) {
    return Promise.reject(new Error('Mật khẩu nhập lại không khớp!'));
  } else {
    return Promise.resolve();
  }
};

const rules: Record<string, Rule[]> = {
  confirmPass: [
    {
      required: true,
      message: 'Vui lòng nhập lại mật khẩu!',
      trigger: ['change', 'blur']
    },
    {
      validator: checkConfirmPassword,
      trigger: ['change', 'blur']
    }
  ]
};

// const aesjs = require('aes-js');
// const pbkdf2 = require('pbkdf2');

// var textBytes = aesjs.utils.utf8.toBytes('123');
// var aesCtr = new aesjs.ModeOfOperation.ctr(
//   pbkdf2.pbkdf2Sync('123', 'salt', 1, 256 / 8, 'sha512'),
//   new aesjs.Counter(24)
// );
// var encryptedBytes = aesCtr.encrypt(textBytes);
// var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
// console.log(encryptedHex);
// console.log(pbkdf2.pbkdf2Sync('123', 'salt', 1, 256 / 8, 'sha512'));

const handleSignUp = (e: any) => {
  if (loadingSignUp.value) return;

  if (
    otpExpOffset.value > 0 ||
    utils.cookie.getCookie(TOKEN.NAME.COOKIE_VRF_SIGNUP_TOKEN) != null
  ) {
    showAnimation.value = false;

    setTimeout(() => {
      showAnimation.value = true;
      isShowVerifyOTPForm.value = true;
    }, 300);

    return;
  }

  loadingSignUp.value = true;
  formSignup.id = Date.now();
  formSignup.avatar = `${Math.floor(Math.random() * 10) + 1}`;
  internalInstance.appContext.config.globalProperties.$Progress.start();

  verifySignUp(
    {
      id: formSignup.id,
      username: formSignup.username,
      email: formSignup.email,
      // password: utils.encryptPassword(formSignup.password),
      password: formSignup.password,
      full_name: formSignup.fullname,
      avatar: formSignup.avatar
    },
    'email'
  )
    .then((response) => {
      // console.log(response);

      if (response?.isInValidEmail == true) {
        ElNotification.error({
          title: MESSAGE.STATUS.FAILED,
          message: 'Email không tồn tại.',
          duration: MESSAGE.DURATION.DEFAULT
        });
      } else if (response?.isSended == true) {
        ElNotification.success({
          title: MESSAGE.STATUS.SUCCESS,
          message: `Mã xác nhận đã được gửi đến đến Email: ${formSignup.email}.`,
          duration: MESSAGE.DURATION.SLOW
        });

        // vrfSignupToken.value = response.headers.get('Authorization');
        vrfSignupToken.value = utils.cookie.getCookie(
          TOKEN.NAME.COOKIE_VRF_SIGNUP_TOKEN
        )!;
        otpExpOffset.value = response.exp_offset;

        showAnimation.value = false;

        setTimeout(() => {
          showAnimation.value = true;
          isShowVerifyOTPForm.value = true;
        }, 300);
      } else if (response?.isEmailExist == true) {
        ElNotification.error({
          title: MESSAGE.STATUS.FAILED,
          message: 'Email đã được đăng ký.',
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
      internalInstance.appContext.config.globalProperties.$Progress.finish();
      loadingSignUp.value = false;
    });
};

const handleResendVerifyEmail = () => {
  if (loadingResend.value) return;

  loadingResend.value = true;

  verifySignUp(
    {
      id: formSignup.id,
      username: formSignup.username,
      email: formSignup.email,
      // password: utils.encryptPassword(formSignup.password),
      password: formSignup.password,
      full_name: formSignup.fullname,
      avatar: formSignup.avatar
    },
    'email'
  )
    .then((response) => {
      // console.log(response);

      if (response?.isSended == true) {
        ElNotification.success({
          title: MESSAGE.STATUS.SUCCESS,
          message: `Mã xác nhận đã được gửi đến đến email: ${formSignup.email}.`,
          duration: MESSAGE.DURATION.SLOW
        });

        disabled_countdown.value = true;

        // vrfSignupToken.value = response.headers.get('Authorization');
        vrfSignupToken.value = utils.cookie.getCookie(
          TOKEN.NAME.COOKIE_VRF_SIGNUP_TOKEN
        )!;
        otpExpOffset.value = response.exp_offset;
      } else if (response?.isInValidEmail == true) {
        ElNotification.error({
          title: MESSAGE.STATUS.FAILED,
          message: 'Email không tồn tại.',
          duration: MESSAGE.DURATION.DEFAULT
        });
      } else if (response?.isEmailExist == true) {
        ElNotification.error({
          title: MESSAGE.STATUS.FAILED,
          message: 'Email đã được đăng ký.',
          duration: MESSAGE.DURATION.DEFAULT
        });
      } else if (response?.isSended == false) {
        ElNotification.error({
          title: MESSAGE.STATUS.FAILED,
          message: 'Gửi email thất bại.',
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

const handleVerify = (formVerify: { otp: string; token: string }) => {
  if (loadingVerify.value) return;

  loadingVerify.value = true;

  signUp({
    otp: formVerify.otp,
    vrfSignupToken: vrfSignupToken.value
  })
    .then((response) => {
      // console.log(response);
      if (response?.isSignUp == true) {
        ElNotification.success({
          title: MESSAGE.STATUS.SUCCESS,
          message: 'Bạn đã đăng ký thành công tài khoản tại Phimhay247.',
          duration: MESSAGE.DURATION.DEFAULT
        });

        navigateTo({ path: '/login' });
        reset();
      } else if (response?.isInvalidOTP == true) {
        ElNotification.error({
          title: MESSAGE.STATUS.FAILED,
          message: 'Mã xác nhận không đúng.',
          duration: MESSAGE.DURATION.DEFAULT
        });
      } else if (response?.isAccountExist == true) {
        ElNotification.error({
          title: MESSAGE.STATUS.FAILED,
          message: 'Tài khoản đã tồn tại.',
          duration: MESSAGE.DURATION.DEFAULT
        });
      } else if (response?.isOTPExpired == true) {
        ElNotification.error({
          title: MESSAGE.STATUS.FAILED,
          message: 'Mã xác nhận đã hết hạn.',
          duration: MESSAGE.DURATION.DEFAULT
        });
      }
    })
    .catch((e) => {
      ElNotification.error({
        title: MESSAGE.STATUS.FAILED,
        message: 'Đăng ký tài khoản thất bại.',
        duration: MESSAGE.DURATION.DEFAULT
      });
    })
    .finally(() => {
      loadingVerify.value = false;
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

<style lang="scss" src="./SignupPage.scss"></style>

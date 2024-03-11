<template>
  <div
    v-show="showAnimation"
    class="verify-signup"
    :class="{ active: isShowForm }"
  >
    <div
      v-if="isShowForm"
      class="verify-signup-container"
    >
      <!-- <a-button
        class="back-btn click-active"
        type="text"
        @click="handleClickBack"
      >
        <template #icon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2.5rem"
            height="2.5rem"
            role="img"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M20 11H7.83l5.59-5.59L12 4l-8 8l8 8l1.41-1.41L7.83 13H20v-2z"
            />
          </svg>
        </template>
        <span> Quay lại</span>
      </a-button> -->

      <a-form
        :model="formVerify"
        name="verify-form"
        class="verify-form"
        hide-required-mark
        @finish="handleVerify"
      >
        <div class="title-verify">
          <h1>Xác nhận Email</h1>
        </div>

        <a-form-item
          class="email-form-item"
          label="Email"
          name="email"
          :rules="[
            {
              required: true,
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
            v-model:value="formVerify.email"
            placeholder="Email..."
            disabled
          >
            <!-- <template #prefix> -->
            <!-- <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.4rem"
                height="1.4rem"
                viewBox="0 0 512 512"
                fill="currentColor"
              >
                <path
                  d="M256 64C150 64 64 150 64 256s86 192 192 192c17.7 0 32 14.3 32 32s-14.3 32-32 32C114.6 512 0 397.4 0 256S114.6 0 256 0s256 114.6 256 256v32c0 53-43 96-96 96c-29.3 0-55.6-13.2-73.2-33.9c-22.8 21-53.3 33.9-86.8 33.9c-70.7 0-128-57.3-128-128s57.3-128 128-128c27.9 0 53.7 8.9 74.7 24.1c5.7-5 13.1-8.1 21.3-8.1c17.7 0 32 14.3 32 32v112c0 17.7 14.3 32 32 32s32-14.3 32-32v-32c0-106-86-192-192-192zm64 192a64 64 0 1 0-128 0a64 64 0 1 0 128 0z"
                />
              </svg> -->
            <!-- </template> -->
          </a-input>
        </a-form-item>

        <!-- <a-form-item
          label="Mã xác nhận"
          name="otp"
          :rules="[
            {
              required: true,
              message: 'Vui lòng nhập mã xác nhận!',
              trigger: ['change', 'blur'],
            },
            {
              message: 'Mã xác nhận phải là 6 số!',
              min: 6,
              max: 6,
              len: 6,
              validator: checkPinOTP,
              trigger: ['change', 'blur'],
            },
          ]"
        >
          <a-input-number
            v-model:value="formVerify.otp"
            type="number"
            placeholder="Mã xác nhận..."
            :min="0"
            :controls="false"
            allowClear
          >
            <template #prefix>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.6rem"
                height="1.6rem"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12c5.16-1.26 9-6.45 9-12V5l-9-4zm7 10c0 4.52-2.98 8.69-7 9.93c-4.02-1.24-7-5.41-7-9.93V6.3l7-3.11l7 3.11V11zm-11.59.59L6 13l4 4l8-8l-1.41-1.42L10 14.17z"
                />
              </svg>
            </template>
          </a-input-number>

          <a-button
            type="link"
            size="large"
            @click="handleResendVerifyEmail"
            :disabled="disabled_countdown"
            :loading="loadingResend"
            class="count-down-button"
          >
            <span v-if="!loadingResend"> {{ countdown }}</span>
          </a-button>
        </a-form-item> -->

        <a-form-item
          class="pin"
          name="pin"
          label="Mã xác nhận"
        >
          <PinOTP v-model:pin="formVerify.pin" />
        </a-form-item>

        <a-form-item
          class="resend"
          name="resend"
        >
          <a-button
            class="count-down-btn"
            type="text"
            size="large"
            :disabled="disabled_countdown"
            :loading="loadingResend"
            @click="handleResendVerifyEmail"
          >
            <span v-if="!loadingResend"> {{ countdown }}</span>
          </a-button>
        </a-form-item>

        <a-form-item name="submit">
          <a-button
            class="verify-form-button submit-btn click-active"
            type="primary"
            html-type="submit"
            size="large"
            :loading="loadingVerify"
            :disabled="disabledVerifyEmail"
          >
            Xác nhận
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PinOTP } from '~/components/PinOTP';

const props = defineProps({
  email: {
    type: String,
    default: ''
  },
  token: {
    type: String,
    default: null
  }
});

const emits = defineEmits<{
  onVerify: [params: any];
  onResend: [];
  onClickBack: [];
}>();

const route = useRoute();
const showAnimation = defineModel('showAnimation', {
  type: Boolean,
  default: true
});
const isShowForm = defineModel('isShowForm', {
  type: Boolean,
  default: true
});
const formVerify = reactive<{
  email: string | undefined;
  otp: number | null;
  pin: number[] | null[];
}>({
  email: props.email,
  otp: null,
  pin: [null, null, null, null, null, null]
});
const disabled_countdown = defineModel('disabled_countdown', {
  type: Boolean,
  default: true
});
const loadingResend = defineModel('loadingResend', {
  type: Boolean,
  default: false
});
const loadingVerify = defineModel('loadingVerify', {
  type: Boolean,
  default: false
});
const otpExpOffset = defineModel('otpExpOffset', {
  type: Number,
  default: 60
});
const countdown = ref<string>(otpExpOffset.value + ' s');
const intervalCountdown = ref<any>();

const disabledVerifyEmail = computed<boolean>((): boolean => {
  return !(
    formVerify.email &&
    // formVerify.otp?.toString().length == 6
    !formVerify.pin.some(
      (number) => number == null || number?.toString().length == 0
    )
  );
});

watch(otpExpOffset, () => {
  if (otpExpOffset.value >= 0 && disabled_countdown.value == true) {
    countdown.value = 'Còn ' + otpExpOffset.value + ' s';
  }
});

watch(isShowForm, () => {
  if (!formVerify?.email) {
    formVerify.email = props.email;
  }

  if (otpExpOffset.value > 0) {
    if (disabled_countdown.value == false) {
      disabled_countdown.value = true;
    }

    clearInterval(intervalCountdown.value);

    // let a = otpExpOffset.value;
    intervalCountdown.value = setInterval(() => {
      // a -= 1;
      otpExpOffset.value -= 1;

      if (otpExpOffset.value == 0) {
        clearInterval(intervalCountdown.value);
        disabled_countdown.value = false;
        countdown.value = 'Gửi lại';
      }
    }, 1000);
  }
});

watch(disabled_countdown, () => {
  if (disabled_countdown.value == true) {
    clearInterval(intervalCountdown.value);

    // let a = otpExpOffset.value;
    intervalCountdown.value = setInterval(() => {
      // a -= 1;
      otpExpOffset.value -= 1;

      if (otpExpOffset.value == 0) {
        clearInterval(intervalCountdown.value);
        disabled_countdown.value = false;
        countdown.value = 'Gửi lại';
      }
    }, 1000);
  } else {
    countdown.value = 'Gửi lại';
  }
});

onBeforeMount(() => {});

const checkPinOTP = async (_rule: any, value: number) => {
  if (value.toString().length != 6) {
    return Promise.reject(new Error('Mã xác nhận phải có 6 số!'));
  } else {
    return Promise.resolve();
  }
};

const handleVerify = () => {
  emits('onVerify', {
    // otp: formVerify.otp,
    otp: formVerify.pin.join(''),
    user_token: props.token
  });
};

const handleResendVerifyEmail = () => {
  emits('onResend');
};

const handleClickBack = async () => {
  emits('onClickBack');

  await wait(310);

  formVerify.pin = [null, null, null, null, null, null];
};
</script>

<!-- <style lang="scss" src="./VerifySignUpForm.scss"></style> -->
<style lang="scss">
@import url('./VerifySignUpForm.scss');
</style>

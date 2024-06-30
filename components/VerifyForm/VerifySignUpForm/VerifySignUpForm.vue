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
      <a-button
        class="back-btn click-active"
        type="text"
        @click="handleClickBack"
      >
        <template #icon>
          <ArrowLeft
            width="2.5rem"
            height="2.5rem"
            role="img"
            fill="currentColor"
          />
        </template>
        <span> Quay lại</span>
      </a-button>

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
            <!-- <AlternateEmail
              width="1.4rem"
              height="1.4rem"
              fill="currentColor"
            /> -->
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
import ArrowLeft from '~/assets/svgs/icons/arrow-left.svg?component';
// import AlternateEmail from '~/assets/svgs/icons/alternate-email.svg?component';

// import { PinOTP } from '~/components/PinOTP';
import PinOTP from '~/components/PinOTP/PinOTP.vue';

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

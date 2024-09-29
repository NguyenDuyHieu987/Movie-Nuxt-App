<template>
  <div class="login">
    <div class="login-container">
      <div class="login-form-container">
        <a-form
          :model="formLogin"
          name="login-form"
          class="login-form"
          hideRequiredMark
          @finish="handleLogin"
        >
          <h1 class="title-login gradient-title-default">
            <span> Đăng nhập </span>
          </h1>

          <a-form-item
            label="Tài khoản"
            name="username"
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
              v-model:value="formLogin.username"
              placeholder="Email..."
            >
              <template #prefix>
                <UserOutlined />
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
              }
              // {
              //   message: 'Mật khẩu phải có ít nhất 6 ký tụ!',
              //   min: 6,
              //   trigger: ['change', 'blur'],
              // },
            ]"
            has-feedback
          >
            <a-input-password
              v-model:value="formLogin.password"
              placeholder="Mật khẩu..."
            >
              <template #prefix>
                <LockOutlined />
              </template>
            </a-input-password>
          </a-form-item>

          <a-form-item
            class="remember-me"
            name="remember-me"
          >
            <a-checkbox v-model:checked="formLogin.rememberMe">
              Ghi nhớ tôi
            </a-checkbox>
            <NuxtLink
              class="forgot-password-btn click-active"
              to="/ForgotPassword"
            >
              Quên mật khẩu?
            </NuxtLink>
          </a-form-item>

          <a-form-item
            class="submit"
            name="submit"
          >
            <a-button
              class="login-form-button"
              html-type="submit"
              size="large"
              :loading="loadingLogin"
              :disabled="disabled"
            >
              Đăng nhập
            </a-button>

            <NuxtLink
              class="play-now"
              :to="{ path: '/' }"
            >
              Xem phim ngay
            </NuxtLink>
          </a-form-item>

          <div class="bottom-form">
            <p>Hoặc</p>
          </div>

          <!-- <div class="separate"></div> -->

          <div class="social-login">
            <a-button
              class="facebook-login-btn click-active"
              size="large"
              :loading="loadingFacebookLogin"
              @click="handleClickFacebookLogin"
            >
              <template #icon>
                <FacebookIcon
                  class="fa-facebook-f"
                  width="1.6rem"
                  height="1.6rem"
                  fill="currentColor"
                />
              </template>
              <span>Đăng nhập bằng Facebook</span>
            </a-button>

            <a-button
              id="google-login-btn"
              class="google-login-btn click-active"
              size="large"
              :loading="loadingGoogleLogin"
              @click="handleClickGoogleLogin"
            >
              <template #icon>
                <GoogleIcon
                  width="1.6rem"
                  height="1.6rem"
                  fill="currentColor"
                />
              </template>
              <span>Đăng nhập bằng Google</span>
            </a-button>
          </div>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FacebookIcon from '~/assets/svgs/icons/facebook.svg?component';
import GoogleIcon from '~/assets/svgs/icons/google.svg?component';

import { LockOutlined, UserOutlined } from '@ant-design/icons-vue';
import { useLocalStorage } from '@vueuse/core';
import { ElNotification } from 'element-plus';

import { LogIn, loginFacebook, loginGoogle } from '~/services/authentication';

definePageMeta({
  layout: 'auth',
  pageTransition: {
    name: 'slide-top',
    appear: true
  }
});

useHead({
  title: 'Đăng nhập',
  htmlAttrs: { lang: 'vi' }
  // script: [
  //   {
  //     src: 'https://accounts.google.com/gsi/client',
  //     type: 'text/javascript',
  //     async: true
  //   }
  // ]
});

useSeoMeta({
  title: 'Đăng nhập',
  description: 'Xem phim thỏa thích cùng Phimhay247',
  ogTitle: 'Đăng nhập',
  ogType: 'video.movie',
  // ogUrl: window.location.href,
  ogDescription: 'Xem phim thỏa thích cùng Phimhay247',
  ogLocale: 'vi'
});

const nuxtConfig = useRuntimeConfig();
const store = useStore();
const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();
const utils = useUtils();
const loadingLogin = ref<boolean>(false);
const loadingFacebookLogin = ref<boolean>(false);
const loadingGoogleLogin = ref<boolean>(false);
const formLogin = reactive<any>({
  username: '',
  password: '',
  rememberMe: true
});
const tokenClient = ref<any>();
const disabled = computed<boolean>((): boolean => {
  return !(utils.isEmailValid(formLogin.username) && formLogin.password);
});
const appStorageStates = useLocalStorage(STORAGE.APP_STATES.KEY, {
  [STORAGE.APP_STATES.URL_LOGIN_BACK]: '/'
});

const reset = () => {
  formLogin.username = '';
  formLogin.password = '';
  formLogin.rememberMe = false;
};

onBeforeMount(() => {
  appStorageStates.value[STORAGE.APP_STATES.URL_LOGIN_BACK] = router.options
    .history.state?.back
    ? [
        '/signup',
        '/oauth',
        '/forgotpassword',
        '/resetpassword',
        '/changeemail'
      ].some((item) =>
        router.options.history.state?.back.toLowerCase().startsWith(item)
      )
      ? '/'
      : router.options.history.state.back
    : '/';

  utils.initFacebookSdk();
});

const initGoogleOauth2Client = (
  params: {
    model: 'code' | 'token';
    ux_mode?: 'popup' | 'redirect';
  } = {
    model: 'code',
    ux_mode: 'redirect'
  }
) => {
  if (params.model == 'code') {
    tokenClient.value = window.google?.accounts.oauth2.initCodeClient({
      client_id: nuxtConfig.app.googleOauth2ClientID,
      scope:
        'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
      ux_mode: params.ux_mode,
      select_account: true,
      redirect_uri: window.location.origin + '/oauth/google',
      prompt: 'select_account',
      callback: handleGooglePopupCallback,
      use_fedcm_for_prompt: true
    });
  } else if (params.model == 'token') {
    tokenClient.value = window.google?.accounts.oauth2.initTokenClient({
      client_id: nuxtConfig.app.googleOauth2ClientID,
      scope:
        'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
      prompt: 'select_account',
      callback: handleGooglePopupCallback,
      use_fedcm_for_prompt: true
    });
  }
};

onMounted(async () => {
  initGoogleOauth2Client({ model: 'token', ux_mode: 'redirect' });
});

const handleLogin = () => {
  if (loadingLogin.value) return;

  loadingLogin.value = true;

  LogIn({
    email: formLogin.username,
    // password: utils.encryptPassword(formLogin.password),
    password: formLogin.password
  })
    .then((response) => {
      if (response?.isLogin == true) {
        authStore.userAccount = response?.result;

        if (response?.subscription) {
          authStore.subscription = response.subscription;
        }

        utils.localStorage.setWithExpiry(
          TOKEN.NAME.USER_TOKEN,
          response.headers.get('Authorization'),
          TOKEN.OFFSET.USER_TOKEN
        );

        // navigateTo({ path: '/' });

        navigateTo({ path: store.urlLoginBack });

        reset();
      } else if (response?.isNotExist == true) {
        ElNotification.error({
          title: MESSAGE.STATUS.FAILED,
          message: 'Tài khoản không tồi tại.',
          duration: MESSAGE.DURATION.DEFAULT
        });
      } else if (response?.isWrongPassword == true) {
        ElNotification.error({
          title: MESSAGE.STATUS.FAILED,
          message: 'Sai tài khoản hoặc mật khẩu.',
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
      loadingLogin.value = false;
    });
};

const handleClickFacebookLogin = async () => {
  const {
    authResponse,
    status
  }: {
    authResponse: any;
    status: string;
  } = await new Promise(window.FB.login);

  // const authResponse: any = null;

  // window.FB.login(
  //   (response: any) => {
  //     console.log(response);
  //   },
  //   {
  //     scope: 'public_profile,email'
  //   }
  // );

  if (!authResponse || status != 'connected') return;

  loadingFacebookLogin.value = true;

  loginFacebook({
    accessToken: authResponse.accessToken
  })
    .then((response) => {
      // console.log(response?.result);

      if (response?.isLogin == false) {
        ElNotification.error({
          title: MESSAGE.STATUS.FAILED,
          message: 'Đăng nhập thất bại.',
          duration: MESSAGE.DURATION.DEFAULT
        });

        return;
      }

      if (response.isSignUp == true) {
        ElNotification.success({
          title: MESSAGE.STATUS.SUCCESS,
          message: 'Bạn đã đăng nhập bằng Facebook thành công tại Phimhay247.',
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

      // navigateTo({ path: '/' });
      navigateTo({ path: store.urlLoginBack });
    })
    .catch((e) => {
      ElNotification.error({
        title: MESSAGE.STATUS.BROKE,
        message: MESSAGE.STATUS.BROKE_MESSAGE,
        duration: MESSAGE.DURATION.DEFAULT
      });
    })
    .finally(() => {
      loadingFacebookLogin.value = false;
    });
};

// const handleClickGoogleLogin = async () => {
//   if (!tokenClient.value) {
//     return;
//   }

//   console.log(tokenClient.value);

//   if (tokenClient.value?.l == 'code') {
//     tokenClient.value.requestCode();
//     return;
//   }

//   if (tokenClient.value?.l == 'token') {
//     tokenClient.value.requestAccessToken();
//   }
// };

const handleClickGoogleLogin = () => {
  // Google's OAuth 2.0 endpoint for requesting an access token
  const oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

  // Create element to open OAuth 2.0 endpoint in new window.
  const form = document.createElement('form');
  form.setAttribute('method', 'GET');
  form.setAttribute('action', oauth2Endpoint);

  // Parameters to pass to OAuth 2.0 endpoint.
  const params:
    | {
        client_id: number;
        scope: string;
        prompt: string;
        redirect_uri: string;
        response_type: string;
        include_granted_scopes: string;
      }
    | any = {
    client_id: nuxtConfig.app.googleOauth2ClientID,
    scope:
      'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
    prompt: 'select_account',
    redirect_uri: window.location.origin + '/oauth/google',
    response_type: 'token',
    include_granted_scopes: 'true'
  };

  // Add form parameters as hidden input values.
  for (const p in params) {
    const input = document.createElement('input');
    input.setAttribute('type', 'hidden');
    input.setAttribute('name', p);
    input.setAttribute('value', params[p]);
    form.appendChild(input);
  }

  // Add form to page and submit it to open the OAuth 2.0 endpoint.
  document.body.appendChild(form);
  form.submit();
};

const handleGooglePopupCallback = (googleOauthResponse: any) => {
  if (!googleOauthResponse) {
    return;
  }

  if (googleOauthResponse?.access_token || googleOauthResponse?.code) {
    loadingGoogleLogin.value = true;

    loginGoogle({
      accessToken: googleOauthResponse?.access_token,
      authorizationCode: googleOauthResponse?.code,
      redirectUri: 'postmessage'
    })
      .then((response) => {
        if (response?.isLogin == false) {
          ElNotification.error({
            title: MESSAGE.STATUS.FAILED,
            message: 'Đăng nhập thất bại.',
            duration: MESSAGE.DURATION.DEFAULT
          });

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

        // navigateTo({ path: '/' });
        navigateTo({ path: store.urlLoginBack });
      })
      .catch((e) => {
        ElNotification.error({
          title: MESSAGE.STATUS.BROKE,
          message: MESSAGE.STATUS.BROKE_MESSAGE,
          duration: MESSAGE.DURATION.DEFAULT
        });
      })
      .finally(() => {
        loadingGoogleLogin.value = false;
      });
  }
};
</script>

<style lang="scss" src="./LoginPage.scss"></style>
<!-- <style lang="scss">
@import url('./LoginPage.scss');
</style> -->

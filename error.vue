<template>
  <div id="app">
    <a-extract-style>
      <div class="app-wrapper error">
        <NuxtLayout :name="isNetworkError ? 'error' : 'default'">
          <a-result
            class="error-page"
            :status="isNetworkError ? 500 : error.statusCode"
            :title="
              isNetworkError
                ? 'Kết nối mạng'
                : ` ${
                    utils.isStringEmpty(error.statusMessage)
                      ? error.statusCode
                      : error.statusMessage
                  }`
            "
          >
            <template
              v-if="error.statusCode == 404 && !isNetworkError"
              #subTitle
            >
              <h3>Ops!, Không thể tìm thấy trang này.</h3>
            </template>

            <template
              v-else-if="error.statusCode != 404 && !isNetworkError"
              #subTitle
            >
              <h3>Ops!, It looks like something broke.</h3>
            </template>

            <template
              v-else-if="isNetworkError"
              #subTitle
            >
              <h3>Không có kết nối Internet. Vui lòng kiểm tra lại mạng.</h3>
            </template>

            <template #extra>
              <a-button
                v-if="!isNetworkError"
                type="text"
                size="large"
                class="default"
                @click="$router.back()"
              >
                Quay lại
              </a-button>

              <NuxtLink
                v-if="!isNetworkError"
                to="/"
                @click.prevent="handleError"
              >
                <a-button
                  type="text"
                  size="large"
                  class="gradient"
                >
                  Quay về trang chủ
                </a-button>
              </NuxtLink>

              <a-button
                v-if="isNetworkError"
                type="text"
                size="large"
                class="default"
                @click="handleTryAgain"
              >
                Thử lại
              </a-button>
            </template>
          </a-result>
        </NuxtLayout>
      </div>
    </a-extract-style>
  </div>
</template>

<script setup lang="ts">
import { useOnline } from '@vueuse/core';
import type { ResultStatusType } from 'ant-design-vue/es/result';

type errorResponse = {
  url: string;
  statusCode: number & ResultStatusType;
  statusMessage: string;
  message: string;
  description: string;
  data: any;
};

// definePageMeta({
//   layout: false
// });

const props = defineProps<{ error: errorResponse }>();

const utils = useUtils();
const nuxtLoadingIndicator = useLoadingIndicator();
const isOnline = useOnline();

const isNetworkError = computed<boolean>(
  () => !isOnline.value || props.error.data?.networkError
);

useHead({
  title: `Lỗi - ${props.error.statusCode}`,
  htmlAttrs: { lang: 'vi' }
});

const handleError = () => {
  clearError({
    redirect: '/'
  });
};

const handleTryAgain = async () => {
  nuxtLoadingIndicator.start();
  reloadNuxtApp();
  await refreshNuxtData();
  nuxtLoadingIndicator.finish();
};
</script>

<style lang="scss" src="./assets/style/errorPage.scss"></style>

<template>
  <div id="app">
    <div class="app-wrapper error">
      <NuxtLayout :name="isNetworkError ? 'default' : 'error'">
        <a-result
          class="error-page"
          :status="error.statusCode as ResultStatusType"
          :title="`${error.statusCode} ${error.statusMessage}`"
        >
          <template
            v-if="error.statusCode == 404"
            #subTitle
          >
            <h3>Ops!, Không thể tìm thấy trang này.</h3>
          </template>
          <template
            v-else
            #subTitle
          >
            <h3>Ops!, It looks like something broke.</h3>
          </template>

          <template #extra>
            <a-button
              type="text"
              size="large"
              class="default"
              @click="$router.back()"
            >
              Quay lại
            </a-button>

            <NuxtLink to="/">
              <a-button
                type="text"
                size="large"
                class="default gradient"
              >
                Quay về trang chủ
              </a-button>
            </NuxtLink>
          </template>
        </a-result>
      </NuxtLayout>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useOnline } from '@vueuse/core';
import type { ResultStatusType } from 'ant-design-vue/es/result';

type errorResponse = {
  url: string;
  statusCode: number | ResultStatusType;
  statusMessage: string;
  message: string;
  description: string;
  data: any;
};

const props = defineProps<{ error: errorResponse }>();

const isOnline = useOnline();

const isNetworkError = computed<boolean>(
  () => isOnline.value && props.error.data?.networkError
);

useHead({
  title: `Lỗi - ${props.error.statusCode}`,
  htmlAttrs: { lang: 'vi' }
});
</script>

<style lang="scss" src="~/assets/style/errorPage.scss"></style>

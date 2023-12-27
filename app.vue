<template>
  <div id="app">
    <div id="append-to" />
    <div id="preview-modal" />

    <!-- <a-config-provider
      :theme="{
        token: {
          colorPrimary: '#008ddf',
          fontSize: 15,
          fontFamily: 'Roboto Flex, sans-serif',
          borderRadius: 2,
          borderRadiusLG: 5,
          lineHeight: 1.5,
        },
      }"
    /> -->

    <ClientOnly>
      <vue-progress-bar
        style="
          background: linear-gradient(
            90deg,
            var(--loading-progress-bar1),
            var(--loading-progress-bar2),
            var(--loading-progress-bar3)
          );
        "
      />
    </ClientOnly>

    <NuxtLoadingIndicator
      color="linear-gradient(
            90deg,
            var(--loading-progress-bar1),
            var(--loading-progress-bar2),
            var(--loading-progress-bar3)
          )"
      :height="3"
      :throttle="300"
    />

    <SeoKit />
    <!-- <OgImageStatic /> -->

    <LoadingApp />
    <RequireAuthDialog />

    <div class="app-wrapper">
      <NuxtLayout>
        <NuxtPage :keepalive="{ include: [], exclude: [] }" />

        <el-backtop
          class="app-back-top click-active"
          :visibility-height="600"
          @click="onBackTop"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2.5rem"
            height="2.5rem"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="m4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8l-8 8z"
            />
          </svg>
        </el-backtop>
      </NuxtLayout>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LoadingApp } from '~/components/Loading';
import { RequireAuthDialog } from '~/components/RequireAuth';

const runtimeConfig = useRuntimeConfig();

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk
      ? `${titleChunk} ${runtimeConfig.public.titleSeparator} ${runtimeConfig.public.siteName}`
      : runtimeConfig.public.siteName;
  }
});

useSeoMeta({
  description: runtimeConfig.public.siteDescription
});

const onBackTop = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'instant'
  });
};

onMounted(() => {
  // window.history.scrollRestoration = 'auto';
  screen.orientation.addEventListener('change', () => {
    const windowWidth: number = screen.availWidth;
    const windowHeight: number = screen.availHeight;

    const bodyStyle = document.body.style as any;

    if (windowWidth <= 1000) {
      const zoomLevel = windowWidth / windowHeight;

      bodyStyle.zoom = zoomLevel;
    } else {
      bodyStyle.zoom = 1;
    }
  });

  window.addEventListener('orientationchange', (e: any) => {
    // // Lấy kích thước của cửa sổ trình duyệt
    const windowWidth: number = screen.availWidth;
    const windowHeight: number = screen.availHeight;

    const bodyStyle = document.body.style as any;

    if (windowWidth <= 1000) {
      // // Tính toán tỉ lệ zoom tương ứng (có thể điều chỉnh theo ý muốn)
      // Ví dụ: zoom nhỏ khi chiều rộng cửa sổ dưới 1000px

      const zoomLevel = windowWidth / windowHeight;

      bodyStyle.zoom = zoomLevel;
    } else {
      bodyStyle.zoom = 1;
    }
  });

  // new ResizeObserver((entries) => {
  //   console.log(entries);
  //   for (const entry of entries) {
  //     console.log(
  //       'Kích thước đã thay đổi:',
  //       entry.target.clientWidth,
  //       entry.target.clientHeight
  //     );
  //   }
  // }).observe(document.body);
});
</script>

<style lang="scss" src="~/assets/style/app.scss"></style>
~/components/RequireAuth/RequireAuthDialog

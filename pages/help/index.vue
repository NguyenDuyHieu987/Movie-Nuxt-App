<template>
  <div class="help padding-content">
    <div class="center-page">
      <h1 class="help-page-title">Trung tâm trợ giúp</h1>
      <!-- {{ data }} -->
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'center-page'
});

useHead({
  title: 'Trung tâm trợ giúp',
  htmlAttrs: { lang: 'vi' }
});

useSeoMeta({
  title: 'Trung tâm trợ giúp',
  description: 'Trung tâm trợ giúp',
  ogTitle: 'Trung tâm trợ giúp',
  ogType: 'video.movie',
  // ogUrl: window.location.href,
  ogDescription: 'Trung tâm trợ giúp',
  ogLocale: 'vi'
});

// const { data } = await useFetch('/api/plan/get-all', { server: false });
</script>

<style lang="scss" src="./HelpPage.scss"></style>
<!-- <style lang="scss">
@import url('./HelpPage.scss');
</style> -->

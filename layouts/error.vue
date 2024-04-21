<template>
  <div class="error-layout">
    <Header />
    <slot />
  </div>
</template>

<script setup lang="ts">
// import { Header } from '~/components/Layouts';
// import Header from '~/components/Layouts/Header/Header.vue';
</script>

<style lang="scss">
.error-layout {
  .header-bar {
    position: relative;
  }
}
</style>

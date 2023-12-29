<template>
  <div class="error-layout">
    <Header />
    <slot />
  </div>
</template>

<script setup lang="ts">
import { Header } from '~/components/Layouts';
</script>

<style lang="scss">
.error-layout {
  .header-bar {
    position: relative;
  }
}
</style>

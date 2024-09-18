<template>
  <div class="slide-item">
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss">
.slide-item {
  min-width: calc(100% / var(--slides-per-view));
  margin-right: var(--space-between);
}
</style>

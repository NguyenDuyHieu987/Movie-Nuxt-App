<template>
  <a-button
    :class="`${APP.CSS_CLASS}-button`"
    :type="type"
    :size="size"
    :loading="loading"
  >
    <slot name="icon" />
    <slot />
  </a-button>
</template>

<script setup lang="ts">
import type { ButtonProps } from 'ant-design-vue/es/button';

type MyButtonProps = ButtonProps & {};

withDefaults(defineProps<MyButtonProps>(), {});
</script>

<style lang="scss" src="./Button.scss"></style>

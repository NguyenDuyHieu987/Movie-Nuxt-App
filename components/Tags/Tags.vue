<template>
  <div class="tags">
    <label class="tags-label">{{ tagsLabel }}</label>
    <slot name="tagsInfo" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  tagsLabel: string;
}>();
</script>

<style lang="scss" src="./Tags.scss" scoped></style>
<!-- <style lang="scss" scoped>
@import url('./Tags.scss');
</style> -->

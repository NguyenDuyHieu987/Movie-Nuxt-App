<template>
  <div class="tags">
    <label class="tags-label">{{ tagsLabel }}</label>
    <slot name="tagsInfo" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  tagsLabel: string;
  link?: boolean | false;
  multiple?: boolean | false;
}>();
</script>

<style lang="scss" scoped src="./Tags.scss"></style>

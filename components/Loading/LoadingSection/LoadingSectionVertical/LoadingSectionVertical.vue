<template>
  <el-skeleton
    class="loading-section-vertical"
    :loading="loading"
    animated
  >
    <template #template>
      <div
        v-for="(item, index) in 10"
        :key="index"
        class="img-box"
        :index="index"
        :item="item"
      >
        <!-- variant="image" -->
        <el-skeleton-item class="skeleton-img ratio-2-3" />

        <el-skeleton-item style="width: 85%" />
        <el-skeleton-item style="width: 60%" />
      </div>
    </template>
    <template #default>
      <slot name="content" />
    </template>
  </el-skeleton>
</template>

<script setup lang="ts">
const loading = defineModel<boolean>('loading', {
  default: true
});
</script>

<!-- <style lang="scss" src="./LoadingSectionVertical.scss"></style> -->
<style lang="scss">
@import url('./LoadingSectionVertical.scss');
</style>

<template>
  <el-skeleton
    class="loading-section-horizontal"
    :loading="loading"
    animated
  >
    <template #template>
      <div
        v-for="(item, index) in 6"
        :key="index"
        class="img-box"
        :index="index"
        :item="item"
      >
        <!-- variant="image"  -->
        <el-skeleton-item class="skeleton-img ratio-16-9" />

        <el-skeleton-item style="width: 85%" />
        <el-skeleton-item style="width: 60%" />
      </div>
    </template>
    <template #default> <slot name="content" /> </template>
  </el-skeleton>
</template>

<script setup lang="ts">
const loading = defineModel<boolean>('loading', {
  default: true
});
</script>

<!-- <style lang="scss" src="./LoadingSectionHorizontal.scss"></style> -->
<style lang="scss">
@import url('./LoadingSectionHorizontal.scss');
</style>

<template>
  <div class="control-page">
    <a-pagination
      class="pagination"
      :current="page"
      :total="total || 100"
      :page-size="pageSize"
      :show-size-changer="false"
      :responsive="true"
      @change="onChangePage"
    >
      <template #itemRender="{ type, originalElement }">
        <button v-if="type === 'prev'">Trước</button>
        <button v-else-if="type === 'next'">Sau</button>
        <component
          :is="originalElement"
          v-else
        ></component>
      </template>
    </a-pagination>
    <!-- :show-total="(total) => `Tổng ${total}`" -->

    <!-- <el-pagination
      :current-page="page"
      background
      layout="prev, pager, next"
      :total="total || 100"
      :page-size="pageSize"
      :pager-count="5"
      @current-change="onChangePage"
    /> -->
    <!-- layout="prev, pager, next, total" -->
  </div>
</template>

<script setup lang="ts">
defineProps<{
  page: number;
  total?: number;
  pageSize: number;
  onChangePage?: (page: number) => void;
}>();

// defineProps({
//   page: {
//     type: Number,
//   },
//   total: {
//     type: Number,
//     default: 100,
//   },
//   pageSize: {
//     type: Number,
//   },
//   onChangePage: {
//     type: Function,
//   },
// });
</script>

<!-- <style lang="scss" src="./ControlPage.scss"></style> -->
<style lang="scss">
@import url('./ControlPage.scss');
</style>

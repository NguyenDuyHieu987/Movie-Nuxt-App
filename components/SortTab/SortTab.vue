<template>
  <div class="sort-tab">
    <div
      v-for="(item, index) in allTab"
      :key="item.value"
      class="tab-item all"
      :class="{ active: props.activeTab == item.value }"
      :index="index"
      @click="handleChangeTab(item.value)"
    >
      <span> {{ item.label }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    activeTab?: string;
  }>(),
  { activeTab: 'all' }
);

const emits = defineEmits<{
  onChangeTab: [data: string];
}>();

const allTab = ref<any[]>([
  { value: 'all', label: 'Tất cả' },
  { value: 'movie', label: 'Phim lẻ' },
  { value: 'tv', label: 'Phim bộ' }
]);
// const activeTab = ref<string>('all');

const handleChangeTab = (value: string) => {
  if (props.activeTab == value) return;

  // activeTab.value = value;

  emits('onChangeTab', value);
};
</script>

<!-- <style lang="scss" src="./SortTab.scss"></style> -->
<style lang="scss">
@import url('./SortTab.scss');
</style>

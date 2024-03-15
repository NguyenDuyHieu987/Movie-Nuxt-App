<template>
  <div class="overview-content">
    <span class="text">
      {{
        overview || 'Sorry! This movie has not been updated overview content.'
      }}
    </span>
    <span
      v-show="props.content?.length >= 500"
      class="view-more"
      :class="{
        active: viewMore
      }"
      @click="onClickViewMore"
    >
      <span> {{ viewMore ? 'Hiện thêm' : 'Ẩn bớt' }}</span>
    </span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  content: string;
}>();

const overview = ref<string>(props.content?.slice(0, 500));
const viewMore = ref<boolean>(props.content?.length >= 500);

const onClickViewMore = () => {
  if (viewMore.value) {
    overview.value += props.content?.slice(500);
  } else {
    overview.value = props.content?.slice(0, 500);
  }
  viewMore.value = !viewMore.value;
};
</script>

<style lang="scss" src="./Overview.scss"></style>
<!-- <style lang="scss">
@import url('./Overview.scss');
</style> -->

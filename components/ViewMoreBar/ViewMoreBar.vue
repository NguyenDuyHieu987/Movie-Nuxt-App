<template>
  <div
    class="viewmore-bar"
    :class="{ open: isOpen }"
  >
    <a-button
      class="viewmore-btn click-active"
      size="large"
      type="text"
      shape="circle"
      @click="emits('onClick')"
    >
      <template #icon>
        <ChevronDown
          v-if="!isOpen"
          width="2rem"
          height="2rem"
          fill="currentColor"
        />

        <ChevronUp
          v-else
          width="2rem"
          height="2rem"
          fill="currentColor"
        />
      </template>
    </a-button>

    <!-- <a-tooltip
      v-show="recommends.length"
      :teleported="false"
      :title="!viewMoreRecommend ? 'Hiện thêm' : 'Ẩn bớt'"
      :content="!viewMoreRecommend ? 'Hiện thêm' : 'Ẩn bớt'"
      placement="bottom"
      @click="viewMoreRecommend = !viewMoreRecommend"
    >
    </a-tooltip> -->
  </div>
</template>

<script setup lang="ts">
import ChevronDown from '~/assets/svgs/icons/chevron-down.svg?component';
import ChevronUp from '~/assets/svgs/icons/chevron-up.svg?component';

const props = defineProps<{ isOpen: boolean }>();
const emits = defineEmits<{ onClick: [] }>();
</script>

<style lang="scss" src="./ViewMoreBar.scss" scoped></style>
<!-- <style lang="scss" scoped>
@import url('./ViewMoreBar.scss');
</style> -->

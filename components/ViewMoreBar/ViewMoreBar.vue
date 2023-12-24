<template>
  <div
    class="viewmore-bar"
    :class="{ open: isOpen }"
  >
    <a-button
      class="viewmore-btn click-active"
      type="text"
      shape="circle"
      size="large"
      @click="emits('onClick')"
    >
      <!-- <Icon v-if="!isOpen" name="ci:chevron-down" />
      <Icon v-else name="ci:chevron-big-up" /> -->

      <svg
        v-if="!isOpen"
        xmlns="http://www.w3.org/2000/svg"
        width="2rem"
        height="2rem"
        viewBox="0 0 24 24"
      >
        <path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m19 9l-7 7l-7-7"
        />
      </svg>

      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        width="2rem"
        height="2rem"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M20.485 15.535L12 7.05l-8.485 8.485L4.93 16.95L12 9.878l7.071 7.072l1.414-1.415Z"
        />
      </svg>
    </a-button>

    <!-- <a-tooltip
              @click="viewMoreRecommend = !viewMoreRecommend"
              v-show="recommends.length"
              :teleported="false"
              :title="!viewMoreRecommend ? 'Hiện thêm' : 'Ẩn bớt'"
              :content="!viewMoreRecommend ? 'Hiện thêm' : 'Ẩn bớt'"
              placement="bottom"
            >
          
            </a-tooltip> -->
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ isOpen: boolean }>();
const emits = defineEmits<{ onClick: [] }>();
</script>

<style lang="scss" scoped src="./ViewMoreBar.scss"></style>

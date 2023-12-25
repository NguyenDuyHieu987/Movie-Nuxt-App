<template>
  <div class="slider-container">
    <Swiper
      ref="swiper"
      class="slider-group"
      :modules="[
        // SwiperAutoplay,
        // SwiperNavigation,

        // SwiperFreeMode,
        // SwiperVirtual,
        // SwiperScrollbar,

        Scrollbar,
        FreeMode,
        Virtual
      ]"
      :breakpoints="responsive"
      :space-between="7"
      :speed="500"
      effect="creative"
      :free-mode="{
        enabled: true,
        sticky: true,
        momentum: false,
        momentumBounce: false
      }"
      :navigation="{
        prevEl: '.swiper-button-prev',
        nextEl: '.swiper-button-next'
      }"
      :autoplay="{
        delay: 10000,
        pauseOnMouseEnter: true,
        reverseDirection: true
      }"
      :scrollbar="{
        el: '.swiper-scrollbar',
        draggable: true
      }"
      @scrollbar-drag-move="onScrollbarDrag"
      @touch-move="onScrollbarDrag"
    >
      <slot name="content" />
      <!-- <div class="swiper-button-prev">
        <Icon name="bi:chevron-left"></Icon>
      </div> -->
      <div
        class="swiper-button-next"
        :class="{ 'swiper-button-disabled': isEndScrollbrDrag }"
      >
        <!-- <Icon name="bi:chevron-right"></Icon> -->
      </div>
      <div class="swiper-scrollbar"></div>
    </Swiper>
  </div>
</template>

<script setup lang="ts">
import { FreeMode, Scrollbar, Virtual } from 'swiper/modules';

const store = useStore();
const isEndScrollbrDrag = ref<boolean>(false);

defineProps<{
  data: any[];
  responsive: any;
}>();

const onScrollbarDrag = (e: any) => {
  if (e.isEnd) {
    if (isEndScrollbrDrag.value == false) {
      isEndScrollbrDrag.value = true;
    }
  } else {
    if (isEndScrollbrDrag.value == true) {
      isEndScrollbrDrag.value = false;
    }
  }
};
</script>

<style lang="scss" src="./SliderGroup.scss"></style>

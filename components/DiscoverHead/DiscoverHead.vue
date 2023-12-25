<template>
  <div
    class="discover-head"
    :class="{ fixed: isFixed }"
  >
    <div class="discover-head-wrapper">
      <Swiper
        class="filter-swiper genres"
        :modules="[
          // SwiperFreeMode,
          // SwiperNavigation,

          Navigation,
          FreeMode
        ]"
        :speed="500"
        :slides-per-view="'auto'"
        :slides-per-group="5"
        :space-between="10"
        :free-mode="true"
        :navigation="{
          prevEl: '.swiper-button-prev',
          nextEl: '.swiper-button-next'
        }"
        :initial-slide="initialSlide"
      >
        <slot />

        <div class="swiper-button-prev">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2.8rem"
            height="2.8rem"
            viewBox="0 0 16 16"
          >
            <path
              fill="currentColor"
              fill-rule="evenodd"
              d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
            />
          </svg>
        </div>
        <div class="swiper-button-next">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2.8rem"
            height="2.8rem"
            viewBox="0 0 16 16"
          >
            <path
              fill="currentColor"
              fill-rule="evenodd"
              d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8L4.646 2.354a.5.5 0 0 1 0-.708z"
            />
          </svg>
        </div>
      </Swiper>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FreeMode, Navigation } from 'swiper/modules';

const isFixed = ref<boolean>(false);

onMounted(() => {
  const headerHeight = +getComputedStyle(document.documentElement)
    .getPropertyValue('--header-height')
    .replace('px', '');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 15) {
      isFixed.value = true;
    } else {
      isFixed.value = false;
    }
  });
});

defineProps<{
  initialSlide: number;
}>();
</script>

<style src="./DiscoverHead.scss" lang="scss"></style>

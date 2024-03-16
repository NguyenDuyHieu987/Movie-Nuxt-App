<template>
  <div class="carousel-container">
    <Swiper
      class="carousel-swiper"
      :class="cardMode"
      :modules="[
        // SwiperAutoplay,
        // SwiperNavigation,
        // SwiperVirtual,

        Navigation,
        Virtual
      ]"
      :breakpoints="responsive"
      :space-between="gap || 7"
      :slides-per-view="5"
      :slides-per-group="5"
      :rewind="true"
      :speed="500"
      :allow-touch-move="true"
      :virtual="true"
      effect="creative"
      :navigation="{
        prevEl: '.swiper-button-prev',
        nextEl: '.swiper-button-next'
      }"
      :autoplay="{
        delay: 10000,
        pauseOnMouseEnter: true,
        reverseDirection: true
      }"
    >
      <slot name="content" />

      <div class="swiper-button-prev">
        <!-- <Icon name="bi:chevron-left"/> -->

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="3.5rem"
          height="3.5rem"
          viewBox="0 0 16 16"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
          />
        </svg>
      </div>
      <div class="swiper-button-next">
        <!-- <Icon name="bi:chevron-right"/> -->

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="3.5rem"
          height="3.5rem"
          viewBox="0 0 16 16"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8L4.646 2.354a.5.5 0 0 1 0-.708z"
          />
        </svg>
      </div>
    </Swiper>
  </div>
</template>

<script setup lang="ts">
// import { Navigation, Virtual } from 'swiper/modules';

withDefaults(
  defineProps<{
    data: any[];
    responsive: any;
    gap?: number;
    cardMode?: 'horizontal' | 'vertical';
  }>(),
  {
    gap: 7,
    cardMode: 'horizontal'
  }
);
</script>

<!-- <style lang="scss" src="./SwiperCarouselGroup.scss"></style> -->
<style lang="scss">
@import url('./SwiperCarouselGroup.scss');
</style>

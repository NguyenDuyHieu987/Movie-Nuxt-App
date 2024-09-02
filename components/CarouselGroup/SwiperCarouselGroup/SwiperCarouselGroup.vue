<template>
  <div class="carousel-container">
    <Swiper
      class="carousel-swiper"
      :class="cardMode"
      :modules="[
        // SwiperAutoplay,
        SwiperNavigation,
        SwiperVirtual

        // Navigation,
        // Virtual
      ]"
      :breakpoints="responsive"
      :space-between="gap || 7"
      :slides-per-view="5"
      :slides-per-group="5"
      :rewind="true"
      :speed="500"
      :allow-touch-move="isMobile || isTabl"
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
      :no-swiping="true"
      noSwipingClass="no-swiping"
      @swiper="onSwiperLoaded"
    >
      <slot name="content" />

      <div class="swiper-button-prev">
        <!-- <Icon name="bi:chevron-left"/> -->
        <ChevronLeftLight
          width="3.5rem"
          height="3.5rem"
          fill="currentColor"
        />
      </div>
      <div class="swiper-button-next">
        <!-- <Icon name="bi:chevron-right"/> -->
        <ChevronRightLight
          width="3.5rem"
          height="3.5rem"
          fill="currentColor"
        />
      </div>
    </Swiper>
  </div>
</template>

<script setup lang="ts">
import ChevronLeftLight from '~/assets/svgs/icons/chevron-left-light.svg?component';
import ChevronRightLight from '~/assets/svgs/icons/chevron-right-light.svg?component';

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

const emits = defineEmits<{
  onLoaded: [];
}>();

const { isMobile, isTablet, isDesktop } = useDevice();

const onSwiperLoaded = () => {
  emits('onLoaded');
};
</script>

<style lang="scss" src="./SwiperCarouselGroup.scss"></style>
<!-- <style lang="scss">
@import url('./SwiperCarouselGroup.scss');
</style> -->

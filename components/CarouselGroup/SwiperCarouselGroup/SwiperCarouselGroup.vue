<template>
  <div class="carousel-container">
    <SwiperContainer
      ref="swiperContainerRef"
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
      :allow-touch-move="isMobile || isTablet"
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
    </SwiperContainer>
  </div>
</template>

<script setup lang="ts">
import { Navigation, Pagination } from 'swiper/modules';
import ChevronLeftLight from '~/assets/svgs/icons/chevron-left-light.svg?component';
import ChevronRightLight from '~/assets/svgs/icons/chevron-right-light.svg?component';

// import { Navigation, Virtual } from 'swiper/modules';

const props = withDefaults(
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
const swiperContainerRef = ref(null);
const swiper = useSwiper(swiperContainerRef, {
  effect: 'creative',
  loop: true,
  modules: [Navigation, Pagination],
  breakpoints: props.responsive,
  spaceBetween: props.gap || 7,
  slidesPerView: 5,
  slidesPerGroup: 5,
  rewind: true,
  speed: 500,
  allowTouchMove: isMobile || isTablet,
  virtual: true,
  navigation: {
    prevEl: '.swiper-button-prev',
    nextEl: '.swiper-button-next'
  },
  autoplay: {
    delay: 10000,
    pauseOnMouseEnter: true,
    reverseDirection: true
  },
  noSwiping: true,
  noSwipingClass: 'no-swiping',
  // swiper: onSwiperLoaded,
  creativeEffect: {
    prev: {
      shadow: true,
      translate: [0, 0, -400]
    },
    next: {
      shadow: true,
      translate: [0, 0, -400]
    }
  }
});

const onSwiperLoaded = () => {
  emits('onLoaded');
};
</script>

<style lang="scss" src="./SwiperCarouselGroup.scss">
// @import '~swiper/css';
// @import '~swiper/css/bundle';
</style>
<!-- <style lang="scss">
@import url('./SwiperCarouselGroup.scss');
</style> -->

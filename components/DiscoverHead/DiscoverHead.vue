<template>
  <div
    class="discover-head"
    :class="{ fixed: isFixed }"
  >
    <div class="discover-head-wrapper">
      <SwiperContainer
        class="filter-swiper genres"
        :modules="[
          SwiperNavigation,
          SwiperFreeMode

          // Navigation,
          // FreeMode
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
          <ChevronLeftLight
            width="2.8rem"
            height="2.8rem"
            fill="currentColor"
          />
        </div>
        <div class="swiper-button-next">
          <ChevronRightLight
            width="2.8rem"
            height="2.8rem"
            fill="currentColor"
          />
        </div>
      </SwiperContainer>
    </div>
  </div>
</template>

<script setup lang="ts">
import ChevronLeftLight from '~/assets/svgs/icons/chevron-left-light.svg?component';
import ChevronRightLight from '~/assets/svgs/icons/chevron-right-light.svg?component';

// import { FreeMode, Navigation } from 'swiper/modules';

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

<!-- <style src="./DiscoverHead.scss" lang="scss"></style> -->
<style lang="scss">
@import url('./DiscoverHead.scss');
</style>

<template>
  <div
    class="slide-figure"
    :style="{
      '--slides-per-view': slidesPerViewRef,
      '--space-between': spaceBetweenRef + 'px'
    }"
  >
    <div class="slide-wrapper">
      <div
        class="slide-list"
        :style="sliderStyle"
      >
        <!-- <li
          :style="`min-width: calc(100% / ${slidesPerViewRef});`"
          class="slide-item"
          v-for="(slide, index) in slides"
          :key="index"
        >
          <img
            :src="slide.src"
            :alt="slide.alt"
          />
        </li> -->
        <slot name="content" />
      </div>
    </div>
    <div
      class="slide-button-prev"
      @click="prevSlide"
    >
      <!-- <Icon name="bi:chevron-left"/> -->
      <ChevronLeftLight
        width="3.5rem"
        height="3.5rem"
        fill="currentColor"
      />
    </div>
    <div
      class="slide-button-next"
      @click="nextSlide"
    >
      <!-- <Icon name="bi:chevron-right"/> -->
      <ChevronRightLight
        width="3.5rem"
        height="3.5rem"
        fill="currentColor"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ChevronLeftLight from '~/assets/svgs/icons/chevron-left-light.svg?component';
import ChevronRightLight from '~/assets/svgs/icons/chevron-right-light.svg?component';
import { useWindowSize } from '@vueuse/core';

const props = withDefaults(
  defineProps<{
    data: any[];
    breakpoints?: Record<
      number,
      { slidesPerView: number; slidesPerGroup: number; spaceBetween?: number }
    >;
    slidesPerView?: number;
    spaceBetween?: number;
    cardMode?: 'horizontal' | 'vertical';
  }>(),
  {
    slidesPerView: 8,
    spaceBetween: 7,
    cardMode: 'horizontal'
  }
);

const { width } = useWindowSize();

const slidesToScroll = ref<number>(0);
const currentIndex = ref<number>(1);
const slides = computed<any[]>(() => props.data);
// const currentBreakpoint = ref<number>(0);
const currentBreakpoint = computed(() => {
  const breakpoints = Object.keys(props.breakpoints).map(Number);
  return breakpoints.reduce(
    (prev, curr) => (width.value >= curr ? curr : prev),
    breakpoints[0]
  );
});
const slidesPerViewRef = computed(() => {
  const config = props.breakpoints[currentBreakpoint.value] || {};
  return config?.slidesPerView || props.slidesPerView;
});
const spaceBetweenRef = computed(() => {
  const config = props.breakpoints[currentBreakpoint.value] || {};
  return config?.spaceBetween || props.spaceBetween;
});
const sliderStyle = computed(() => ({
  transform: `translateX(-${(slidesToScroll.value / slidesPerViewRef.value) * 100}%)`
}));

const updateBreakpoint = () => {
  // const width = window.innerWidth;
  // const breakpoints = Object.keys(props.breakpoints).map(Number);
  // currentBreakpoint.value = breakpoints.reduce(
  //   (prev, curr) => (width >= curr ? curr : prev),
  //   breakpoints[0]
  // );
};

onMounted(() => {
  updateBreakpoint();
  // window.addEventListener('resize', updateBreakpoint);
});

onBeforeUnmount(() => {
  // window.removeEventListener('resize', updateBreakpoint);
});

const prevSlide = () => {
  if (currentIndex.value > 1) {
    const redundancy = slides.value.length % slidesPerViewRef.value;
    if (
      slides.value.length - currentIndex.value < slidesPerViewRef.value &&
      redundancy != 0
    ) {
      slidesToScroll.value -= redundancy;
      currentIndex.value -= redundancy;
    } else {
      slidesToScroll.value -= slidesPerViewRef.value;
      currentIndex.value -= slidesPerViewRef.value;
    }
  } else {
    currentIndex.value = slides.value.length - slidesPerViewRef.value + 1;
    slidesToScroll.value = slides.value.length - slidesPerViewRef.value;
  }
};

const nextSlide = () => {
  if (slides.value.length + 1 - slidesPerViewRef.value == currentIndex.value) {
    currentIndex.value = 1;
    slidesToScroll.value = 0;
    return;
  }

  if (
    slides.value.length + 1 - (currentIndex.value + slidesPerViewRef.value) <
    slidesPerViewRef.value
  ) {
    slidesToScroll.value +=
      slides.value.length + 1 - (currentIndex.value + slidesPerViewRef.value);
    currentIndex.value +=
      slides.value.length + 1 - (currentIndex.value + slidesPerViewRef.value);
  } else {
    slidesToScroll.value += slidesPerViewRef.value;
    currentIndex.value += slidesPerViewRef.value;
  }
};
</script>

<!-- <style lang="scss" src="./FigureSlide.scss"></style> -->
<style lang="scss">
@import url('./FigureSlide.scss');
</style>

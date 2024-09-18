<template>
  <div
    class="slide-figure"
    :style="{
      '--slides-per-view': slidesPerView,
      '--space-between': spaceBetween + 'px'
    }"
  >
    <div class="slide-wrapper">
      <div
        class="slide-list"
        :style="sliderStyle"
      >
        <!-- <li
          :style="`min-width: calc(100% / ${slidesPerView});`"
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

const props = withDefaults(
  defineProps<{
    data: any[];
    responsive: any;
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

const slidesPerView = computed<number>(() => props.slidesPerView);
const slidesToScroll = ref<number>(0);
const currentIndex = ref<number>(1);
const slides = computed<any[]>(() => props.data);

const sliderStyle = computed(() => ({
  transform: `translateX(-${(slidesToScroll.value / slidesPerView.value) * 100}%)`
}));

const prevSlide = () => {
  if (currentIndex.value > 1) {
    const redundancy = slides.value.length % slidesPerView.value;
    if (
      slides.value.length - currentIndex.value < slidesPerView.value &&
      redundancy != 0
    ) {
      slidesToScroll.value -= redundancy;
      currentIndex.value -= redundancy;
    } else {
      slidesToScroll.value -= slidesPerView.value;
      currentIndex.value -= slidesPerView.value;
    }
  } else {
    currentIndex.value = slides.value.length - slidesPerView.value + 1;
    slidesToScroll.value = slides.value.length - slidesPerView.value;
  }
};

const nextSlide = () => {
  if (slides.value.length + 1 - slidesPerView.value == currentIndex.value) {
    currentIndex.value = 1;
    slidesToScroll.value = 0;
    return;
  }

  if (
    slides.value.length + 1 - (currentIndex.value + slidesPerView.value) <
    slidesPerView.value
  ) {
    slidesToScroll.value +=
      slides.value.length + 1 - (currentIndex.value + slidesPerView.value);
    currentIndex.value +=
      slides.value.length + 1 - (currentIndex.value + slidesPerView.value);
  } else {
    slidesToScroll.value += slidesPerView.value;
    currentIndex.value += slidesPerView.value;
  }
};
</script>

<!-- <style lang="scss" src="./FigureSlide.scss"></style> -->
<style lang="scss">
@import url('./FigureSlide.scss');
</style>

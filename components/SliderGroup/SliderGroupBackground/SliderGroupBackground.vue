<template>
  <div class="slider-group-background">
    <div
      class="slider-group-background-wrapper"
      :class="{ scrolled: !sliderState.isStartScroll }"
      :style="{
        backgroundImage: 'url(' + currentImage + ')',
        '--dominant-backdrop-color': dominantBackdropColor
      }"
    >
      <slot name="title" />

      <!-- <Swiper
        class="slider-group-background-list"
        ref="slider"
        :modules="[
          SwiperFreeMode,
          SwiperScrollbar,
          // Scrollbar,
          // FreeMode,
        ]"
        :speed="500"
        :slides-per-view="'auto'"
        :space-between="15"
        :free-mode="true"
        :scrollbar="{
          el: '.swiper-scrollbar',
          draggable: true,
        }"
      >
        <slot name="content" />
        <div class="swiper-scrollbar"></div>
      </Swiper> -->

      <div
        ref="slider"
        class="slider-group-background-list"
        :class="{
          dragging: sliderState.isDragging
        }"
        @pointerdown="onPointerDownSlider"
        @pointermove="onPointerMoveSlider"
        @pointerup="onPointerUpSlider"
        @scroll="onScollSlider"
        @pointerover="onPointerOverSlider"
      >
        <slot name="content" />
      </div>

      <!-- <div
        class="slider-button-prev"
        :class="{
          enable: sliderState.isScrollable && !sliderState.isStartScroll,
        }"
      ></div> -->

      <!-- <div
        class="slider-button-next"
        :class="{ disabled: sliderState.isEndScroll }"
      ></div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
// import { Scrollbar, FreeMode } from 'swiper/modules';
// import 'swiper/css/scrollbar';
import { getImage } from '~/services/image';

const props = defineProps<{
  data: any[];
}>();

const store = useStore();
const slider = ref<HTMLDivElement>();
const sliderState = reactive({
  isScrubbing: false,
  isDragging: false,
  isStartScroll: true,
  isScrollable: true,
  isEndScroll: false
});
const currentImage = ref<string>(
  getImage(props.data[0]?.backdrop_path, 'backdrop', { h: 250 })
);
const dominantBackdropColor = ref<string>(
  `rgb(${props.data[0]?.dominant_backdrop_color?.join(', ')}, 0.6)`
);

watchEffect(() => {
  if (props.data) {
    currentImage.value = getImage(props.data[0]?.backdrop_path, 'backdrop', {
      h: 250
    });

    dominantBackdropColor.value = `rgb(${props.data[0]?.dominant_backdrop_color?.join(', ')}, 0.6)`;
  }
});

onMounted(() => {
  window.addEventListener('pointermove', (e: any) => {
    if (e.target.closest('.slider-group-background-list')) {
      return;
    }
    onPointerMoveSlider(e);
  });
  window.addEventListener('pointerup', onPointerUpSlider);
});

onUnmounted(() => {
  window.removeEventListener('pointermove', onPointerMoveSlider);
  window.removeEventListener('pointerup', onPointerUpSlider);
});

const onPointerDownSlider = (e: any) => {
  if (e.target.closest('.slider-item')) {
    e.preventDefault();
    sliderState.isScrubbing = true;
  }
};

const onPointerMoveSlider = (e: any) => {
  if (sliderState.isScrubbing) {
    e.preventDefault();
    sliderState.isDragging = true;

    slider.value!.scrollLeft -= e.movementX;
    handleArrows(slider.value!?.scrollLeft);
  }
};

const onPointerUpSlider = (e: any) => {
  // if (sliderState.isDragging && sliderState.isScrubbing) {
  //   const svgTag = e.target.closest('svg') as HTMLOrSVGElement;

  //   const linkTag = e.target.closest('a') as HTMLLinkElement;

  //   linkTag?.addEventListener('pointerup', (e1: any) => {
  //     e1.preventDefault();
  //   });
  // }

  sliderState.isScrubbing = false;
  sliderState.isDragging = false;
};

const handleArrows = (scrollVal: number) => {
  const maxScrollableWidth =
    slider.value!.scrollWidth - slider.value!.clientWidth;

  sliderState.isStartScroll = scrollVal <= 0;

  sliderState.isScrollable = scrollVal > 0;

  sliderState.isEndScroll = Math.ceil(scrollVal) == maxScrollableWidth;

  // arrowIcons[0].parentElement.style.display = scrollVal <= 0 ? 'none' : 'flex';
  // arrowIcons[1].parentElement.style.display =
  //   maxScrollableWidth - scrollVal <= 1 ? 'none' : 'flex';
};

const onScollSlider = (e: any) => {
  handleArrows(slider.value!.scrollLeft);
};

const onPointerOverSlider = (e: any) => {
  if (e.target.closest('.slider-item')) {
    const sliderItem = e.target.closest('.slider-item');

    const sliderImage = sliderItem.querySelector(
      '.img-box img'
    ) as HTMLImageElement;

    if (sliderImage != null) {
      currentImage.value = sliderImage.src;
    }
    const indexItem = sliderItem
      .querySelector('.movie-card-item')
      .getAttribute('index');

    dominantBackdropColor.value = `rgba(${props.data[indexItem]?.dominant_backdrop_color?.join(', ')}, 0.6)`;
  }
};
</script>

<style lang="scss" src="./SliderGroupBackground.scss"></style>
<!-- <style lang="scss">
@import url('./SliderGroupBackground.scss');
</style> -->

<template>
  <div class="carousel-container">
    <a-carousel
      ref="slickCarousel1"
      class="carousel-slick"
      :class="cardMode"
      :style="{ '--gap': gap + 'px' }"
      :arrows="true"
      :infinite="false"
      :autoplay="false"
      :pause-on-hover="true"
      effect="scrollx"
      :dots="false"
      :initial-slide="0"
      :slides-to-show="cardMode == 'horizontal' ? 6 : 9"
      :slides-to-scroll="cardMode == 'horizontal' ? 6 : 9"
      :speed="300"
      :draggable="false"
      :swipe="false"
      :touch-move="false"
      :focus-on-select="false"
      :responsive="slickResponsive"
    >
      <slot name="content" />

      <template #prevArrow>
        <div class="slick-arrow prev">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="3.5rem"
            height="3.5rem"
            viewBox="0 0 16 16"
            fill="currrentColor"
          >
            <path
              fill-rule="evenodd"
              d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
            />
          </svg>
        </div>
      </template>
      <template #nextArrow>
        <div class="slick-arrow next">
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
      </template>
    </a-carousel>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    data: any[];
    responsive:
      | {
          key: {
            slidesPerView: number;
            slidesPerGroup: number;
            spaceBetween: number;
          };
        }
      | {
          breakpoint: number;
          settings: {
            slidesToShow: number;
            slidesToScroll: number;
            spaceBetween?: number;
          };
        }[];
    gap?: number;
    cardMode: 'horizontal' | 'vertical';
  }>(),
  {
    gap: 7,
    cardMode: 'horizontal'
  }
);

const slickResponsive = computed(() => {
  if (Array.isArray(props.responsive)) {
    return props.responsive;
  }

  let responsive: any[] = [];

  for (const [key, value] of Object.entries(props.responsive)) {
    responsive = [
      ...responsive,
      {
        breakpoint: +key,
        settings: {
          slidesToShow: value.slidesPerView,
          slidesToScroll: value.slidesPerGroup
        }
      }
    ];
  }

  return responsive;
});

const slickCarousel = ref();
</script>

<!-- <style lang="scss" src="./SlickCarouselGroup.scss"></style> -->
<style lang="scss">
@import url('./SlickCarouselGroup.scss');
</style>

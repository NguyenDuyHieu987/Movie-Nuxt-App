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
          <SvgoChevronLeftLight
            width="3.5rem"
            height="3.5rem"
            fill="currentColor"
          />
        </div>
      </template>
      <template #nextArrow>
        <div class="slick-arrow next">
          <SvgoChevronRightLight
            width="3.5rem"
            height="3.5rem"
            fill="currentColor"
          />
        </div>
      </template>
    </a-carousel>
  </div>
</template>

<script setup lang="ts">
// import SvgoChevronLeftLight from '~/assets/svgs/icons/chevron-left-light.svg?component';
// import SvgoChevronRightLight from '~/assets/svgs/icons/chevron-right-light.svg?component';

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

<style lang="scss" src="./SlickCarouselGroup.scss"></style>
<!-- <style lang="scss">
@import url('./SlickCarouselGroup.scss');
</style> -->

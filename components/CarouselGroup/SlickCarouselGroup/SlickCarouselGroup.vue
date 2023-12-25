<template>
  <div class="carousel-container">
    <a-carousel
      ref="carouselSlick"
      class="carousel-slick"
      :arrows="true"
      :infinite="false"
      :autoplay="false"
      :pause-on-hover="true"
      effect="scrollx"
      :dots="false"
      :initial-slide="0"
      :slides-to-show="5"
      :slides-to-scroll="5"
      :speed="300"
      :draggable="true"
      :swipe="true"
      :touch-move="true"
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
          >
            <path
              fill="currentColor"
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
          >
            <path
              fill="currentColor"
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
const props = defineProps<{
  data: any[];
  responsive: {
    key: {
      slidesPerView: number;
      slidesPerGroup: number;
      spaceBetween: number;
    };
  };
  gap?: number;
  cardMode?: 'horizontal' | 'vertical';
}>();

const slickResponsive = computed(() => {
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

console.log(slickResponsive.value);
</script>

<style lang="scss" src="./SlickCarouselGroup.scss"></style>

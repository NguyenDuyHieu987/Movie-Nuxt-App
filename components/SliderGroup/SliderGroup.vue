<template>
  <div class="slider-group">
    <div
      ref="slider"
      class="slider-group-list"
      :class="{
        dragging: sliderState.isDragging
      }"
      @pointerdown="onPointerDownSlider"
      @pointermove="onPointerMoveSlider"
      @pointerup="onPointerUpSlider"
      @scroll="onScollSlider"
    >
      <slot name="content" />
    </div>

    <!-- <div
      class="slider-button-prev"
      :class="{
        enable: sliderState.isScrollable && !sliderState.isStartScroll,
      }"
    ></div> -->

    <div
      class="slider-button-next"
      :class="{ disabled: sliderState.isEndScroll }"
    ></div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  data: any[];
}>();

const store = useStore();
const slider = ref();
const sliderState = reactive({
  isScrubbing: false,
  isDragging: false,
  isStartScroll: false,
  isScrollable: true,
  isEndScroll: false
});

onMounted(() => {
  window.addEventListener('pointermove', (e: any) => {
    if (e.target.closest('.slider-group-list')) {
      return;
    }

    onPointerMoveSlider(e);
  });

  window.addEventListener('pointerup', onPointerUpSlider);
});

const onPointerDownSlider = (e: any) => {
  if (e.target.closest('.slider-item')) {
    e.preventDefault();
    sliderState.isScrubbing = true;
  }
};

const onPointerMoveSlider = (e: any) => {
  if (sliderState.isScrubbing) {
    sliderState.isDragging = true;

    slider.value.scrollLeft -= e.movementX;
    handleArrows(slider.value.scrollLeft);
  }
};

const onPointerUpSlider = (e: any) => {
  e.preventDefault();
  sliderState.isScrubbing = false;
  sliderState.isDragging = false;
};

const handleArrows = (scrollVal: number) => {
  const maxScrollableWidth =
    slider.value.scrollWidth - slider.value.clientWidth;

  sliderState.isStartScroll = scrollVal <= 0;

  sliderState.isScrollable = scrollVal > 0;

  sliderState.isEndScroll = Math.ceil(scrollVal) == maxScrollableWidth;

  // arrowIcons[0].parentElement.style.display = scrollVal <= 0 ? 'none' : 'flex';
  // arrowIcons[1].parentElement.style.display =
  //   maxScrollableWidth - scrollVal <= 1 ? 'none' : 'flex';
};

const onScollSlider = (e: any) => {
  handleArrows(slider.value.scrollLeft);
};
</script>

<style lang="scss" src="./SliderGroup.scss"></style>

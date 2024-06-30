<template>
  <div
    ref="backPage"
    class="back-page"
    :class="{ fixed: fixed }"
  >
    <a-button
      class="not-focusable"
      :class="{ 'align-left': alignLeft }"
      type="text"
      @click="emits('onclick')"
    >
      <template #icon>
        <!-- <Icon name="ic:baseline-arrow-back" /> -->

        <ArrowLeft
          width="2.3rem"
          height="2.3rem"
          fill="currentColor"
        />
      </template>

      <slot />
    </a-button>
  </div>
</template>

<script setup lang="ts">
import ArrowLeft from '~/assets/svgs/icons/arrow-left.svg?component';

// const emits = defineEmits<{ onclick: [] }>();
const emits = defineEmits<{ (e: 'onclick'): void }>();
// const emits = defineEmits({
//   onclick() {}
// });

const props = defineProps({
  fixed: { type: Boolean, default: false },
  alignLeft: {
    type: Boolean,
    default: false
  }
});

const backPage = ref<HTMLElement>();

onMounted(() => {
  // window.onscroll = () => {
  //   if (window.scrollY >= backPage.value.offsetTop) {
  //     isfixed.value = true;
  //   } else {
  //     isfixed.value = false;
  //   }
  // };
});
</script>

<style lang="scss" src="./BackPage.scss"></style>
<!-- <style lang="scss">
@import url('./BackPage.scss');
</style> -->

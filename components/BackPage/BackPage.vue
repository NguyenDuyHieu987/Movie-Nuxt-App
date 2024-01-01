<template>
  <div
    ref="backPage"
    class="back-page"
    :class="{ fixed: fixed }"
  >
    <a-button
      type="text"
      @click="emits('onclick')"
    >
      <template #icon>
        <!-- <Icon name="ic:baseline-arrow-back" /> -->

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="2.3rem"
          height="2.3rem"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            d="M20 11H7.83l5.59-5.59L12 4l-8 8l8 8l1.41-1.41L7.83 13H20v-2z"
          />
        </svg>
      </template>

      <slot />
    </a-button>
  </div>
</template>

<script setup lang="ts">
// const emits = defineEmits<{ onclick: [] }>();
const emits = defineEmits<{ (e: 'onclick'): void }>();
// const emits = defineEmits({
//   onclick() {}
// });

const props = defineProps({ fixed: { type: Boolean, default: false } });

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

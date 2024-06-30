<template>
  <div class="loading-circle">
    <!-- <Icon name="icon-park-outline:loading-four" class="loading-icon" /> -->

    <LoadingFour
      class="loading-icon"
      width="3rem"
      height="3rem"
    />

    <!-- <Icon name="eos-icons:loading" /> -->
    <!-- <Icon name="line-md:loading-twotone-loop" /> -->
    <!-- <Icon name="line-md:loading-loop" /> -->
  </div>
</template>

<script setup lang="ts">
import LoadingFour from '~/assets/svgs/icons/loading-four.svg?component';
</script>

<style lang="scss" src="./LoadingCircle.scss"></style>
<!-- <style lang="scss">
@import url('./LoadingCircle.scss');
</style> -->

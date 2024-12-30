<template>
  <div
    class="app-loading"
    :class="{ active: store.loadingApp }"
  >
    <div
      v-if="store.loadingApp"
      class="app-loading-container"
    >
      <div class="logo">
        <!-- <NuxtImg :src="getImage('logo.png', 'logo', { w: 70 })" alt="" /> -->

        <div class="icon-loading">
          <SvgoLoadingApp
            width="5rem"
            height="5rem"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import SvgoLoadingApp from '~/assets/svgs/icons/loading-app.svg?component';
// import { getImage } from '~/services/image';

const store = useStore();
</script>

<style lang="scss" src="./LoadingApp.scss"></style>
<!-- <style lang="scss">
@import url('./LoadingApp.scss');
</style> -->

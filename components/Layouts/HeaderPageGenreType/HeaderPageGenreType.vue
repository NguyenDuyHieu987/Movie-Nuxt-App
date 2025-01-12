<template>
  <div
    class="header-home-breadcrumb"
    :class="{ scrolled: store.headerScrolled }"
  >
    <div class="header-home-breadcrumb-wrapper">
      <div class="left">
        <div class="breadcrumb-label">
          <slot name="label" />
        </div>
        <h1 class="breadcrumb-title">{{ genreTitle }}</h1>
      </div>
      <div class="right">
        <NuxtLink :to="`/discover/genre/${genreRoute.short_name}`">
          Tất cả nội dung
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getGenreById } from '~/services/genres';
import type { genre } from '~/types';

const store = useStore();
const route = useRoute();
const genreRoute = ref<genre>(
  getGenreById(route.params.genre, store.allGenres)!
);
const genreTitle = ref<string>(
  route.params?.genre
    ? getGenreById(route.params.genre, store.allGenres)?.name || 'Thể loại'
    : 'Thể loại'
);
</script>

<style lang="scss" src="./HeaderPageGenreType.scss"></style>
<!-- <style lang="scss">
@import url('./HeaderPageGenreType.scss');
</style> -->

<template>
  <div
    class="header-page-type-movie"
    :class="{ scrolled: store.headerScrolled }"
  >
    <div class="header-page-type-movie-wrapper">
      <div class="left">
        <h1 class="header-page-type-movie-title">{{ title }}</h1>

        <el-dropdown
          trigger="hover"
          class="dropdown-genre"
          popper-class="header-page-type-movie-genre"
          placement="bottom-start"
          :show-timeout="0"
          :tabindex="-1"
        >
          <span
            class="el-dropdown-link genre"
            aria-label="dropdown-genre"
          >
            {{ genreDropdownTitle }}
            <SvgoCaret
              width="1.2rem"
              height="1.2rem"
              fill="currentColor"
            />
          </span>

          <template #dropdown>
            <el-dropdown-menu class="dropdown-genre">
              <el-dropdown-item
                v-for="(item, index) in genres"
                :key="index.toString()"
                :index="index"
                @click="handleSelectGenre(item)"
              >
                <NuxtLink
                  :to="{
                    path: `${route.path}/genre/${item.id}`
                    // params: {
                    //   slug: 'genre',
                    //   genre: item.id,
                    // },
                  }"
                >
                  <span>{{ item.name }}</span>
                </NuxtLink>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>

      <div class="right">
        <NuxtLink :to="viewAllLink"> Tất cả nội dung </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import SvgoCaret from '~/assets/svgs/icons/caret.svg?component';

import { getGenreById } from '~/services/genres';
import type { genre } from '~/types';

defineProps<{
  title: string;
  viewAllLink?: string;
}>();

const emits = defineEmits<{
  genSelected: [genSelected: genre];
}>();

const store = useStore();
const route = useRoute();
const genres = ref<genre[]>(store.allGenres);
const genreDropdownTitle = ref<string>(
  route.query?.genre
    ? getGenreById(+(route.query?.genre as string), store.allGenres)!.name
    : 'Thể loại'
);

const handleSelectGenre = (item: genre) => {
  genreDropdownTitle.value = item.name;
  emits('genSelected', item);
};
</script>

<style lang="scss" src="./HeaderPageMovieType.scss"></style>
<!-- <style lang="scss">
@import url('./HeaderPageMovieType.scss');
</style> -->

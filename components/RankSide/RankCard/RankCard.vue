<template>
  <NuxtLink
    :to="{
      path: `/info-${dataMovie.media_type}/${dataMovie?.id}`
    }"
    class="movie-rank-item"
  >
    <!-- <el-skeleton :loading="loading" animated>
      <template #template>
        <div class="img-box">
          <el-skeleton-item class="skeleton-img ratio-2-3" />
        </div>
        <div class="content-skeleton">
          <el-skeleton-item variant="text" style="width: 80%" />
          <el-skeleton-item variant="text" style="width: 60%" />
          <el-skeleton-item variant="text" style="width: 70%" />
          <el-skeleton-item variant="text" style="width: 50%" />
        </div>
      </template>

      <template #default> -->
    <div class="img-box">
      <div class="img-wrapper ratio-2-3">
        <!-- <img
          v-lazy="getImage(dataMovie?.poster_path, 'poster', { w: 120 })"
          :lazy="true"
          loading="lazy"
          alt=""
        /> -->

        <NuxtImg
          :src="getImage(dataMovie?.poster_path, 'poster', { w: 120 })"
          placeholder="/images/loading-img-2-3.webp"
          format="avif"
          loading="lazy"
          alt=""
        />
      </div>
    </div>

    <div class="info">
      <div class="top">
        <p class="title">
          {{ dataMovie?.name }}
          <span v-if="dataMovie?.media_type == 'tv'">
            {{ ' - Phần ' + dataMovie?.last_episode_to_air?.season_number }}
          </span>
        </p>
        <p class="genres">
          {{ Array?.from(dataMovie?.genres, (x: any) => x.name).join(' • ') }}
        </p>

        <p class="release-date">
          Năm:
          {{
            dataMovie?.release_date
              ? dataMovie?.release_date
              : dataMovie?.first_air_date
          }}
        </p>

        <p
          v-if="dataMovie?.media_type == 'movie'"
          class="duration-episode"
        >
          Thời lượng:
          {{ dataMovie?.runtime + ' phút' || '' }}
        </p>

        <!-- <p v-if="dataMovie?.media_type == 'tv'" class="duration-episode">
          Tập mới nhất:
          {{ 'Tập ' + dataMovie?.last_episode_to_air?.episode_number || '' }}
        </p> -->
      </div>
      <div class="bottom">
        <span class="views"
          >{{ utils.viewFormatter(dataMovie?.views) }} lượt xem</span
        >
      </div>
    </div>
    <!-- </template>
    </el-skeleton> -->
  </NuxtLink>
</template>

<script setup lang="ts">
import { getImage } from '~/services/image';

const utils = useUtils();
const props = defineProps<{
  item: any;
}>();

const dataMovie = ref<any>(props.item || {});
const loading = ref<boolean>(false);

// loading.value = true;

// await wait(500);

// loading.value = false;
</script>

<style lang="scss" src="./RankCard.scss"></style>
<!-- <style lang="scss">
@import url('./RankCard.scss');
</style> -->

<template>
  <NuxtLink
    :to="{
      path:
        item?.type || item?.media_type == 'tv'
          ? `/info-tv/${item?.id}${utils.convertPath.toPathInfo_Play(
              item?.name
            )}`
          : `/info-movie/${item?.id}${utils.convertPath.toPathInfo_Play(
              item?.name
            )}`
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
          v-lazy="getImage(item?.poster_path, 'poster', { w: 120 })"
          :lazy="true"
          loading="lazy"
          alt=""
        /> -->

        <NuxtImg
          :src="getImage(item?.poster_path, 'poster', { w: 120 })"
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
          {{ item?.name }}
          <span v-if="type == 'tv'">
            {{ ' - Phần ' + item?.last_episode_to_air?.season_number }}
          </span>
        </p>
        <p class="genres">
          {{ Array?.from(item?.genres, (x: any) => x.name).join(' • ') }}
        </p>

        <p class="release-date">
          Năm:
          {{ item?.release_date ? item?.release_date : item?.first_air_date }}
        </p>

        <p
          v-if="type == 'movie'"
          class="duration-episode"
        >
          Thời lượng:
          {{ item?.runtime + ' phút' || '' }}
        </p>

        <!-- <p v-if="type == 'tv'" class="duration-episode">
          Tập mới nhất:
          {{ 'Tập ' + item?.last_episode_to_air?.episode_number || '' }}
        </p> -->
      </div>
      <div class="bottom">
        <span class="views"
          >{{ utils.viewFormatter(item?.views) }} lượt xem</span
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
  type: string;
}>();

const loading = ref<boolean>(false);

// loading.value = true;

// await wait(500);

// loading.value = false;
</script>

<style lang="scss" src="./RankCard.scss"></style>
<!-- <style lang="scss">
@import url('./RankCard.scss');
</style> -->

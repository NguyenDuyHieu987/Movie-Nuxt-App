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
    class="movie-search-item"
  >
    <el-skeleton
      :loading="loading"
      animated
    >
      <template #template>
        <div class="img-box">
          <el-skeleton-item class="skeleton-img ratio-2-3" />
        </div>
        <div class="content-skeleton">
          <el-skeleton-item
            variant="text"
            style="width: 80%"
          />
          <el-skeleton-item
            variant="text"
            style="width: 60%"
          />
          <el-skeleton-item
            variant="text"
            style="width: 70%"
          />
          <el-skeleton-item
            variant="text"
            style="width: 50%"
          />
        </div>
      </template>

      <template #default>
        <div class="img-box">
          <div class="img-wrapper ratio-2-3">
            <NuxtImg
              :src="getImage(item?.poster_path, 'poster', 'w-120')"
              format="avif"
              loading="lazy"
              alt=""
            />
          </div>
        </div>

        <div class="info">
          <h3 class="title">
            {{ item?.name ? item?.name : item?.title }}
            <span v-if="type == 'tv'">
              {{ ' - Phần ' + item?.last_episode_to_air?.season_number }}
            </span>
          </h3>

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

          <p
            v-if="type == 'tv'"
            class="duration-episode"
          >
            Tập mới nhất:
            {{ 'Tập ' + item?.last_episode_to_air?.episode_number || '' }}
          </p>

          <p class="views">
            <!-- Lượt xem: -->
            {{
              item?.views ? utils.viewFormatter(item?.views) + ' lượt xem' : ''
            }}
          </p>
        </div>
      </template>
    </el-skeleton>
  </NuxtLink>
</template>
<script setup lang="ts">
import { getImage } from '~/services/image';

const props = defineProps<{
  item: any;
  type: string;
}>();

const utils = useUtils();
const loading = ref<boolean>(false);

onBeforeMount(() => {});

loading.value = true;

await wait(500);

loading.value = false;
</script>

<style lang="scss" src="./SearchCard.scss"></style>
<!-- <style lang="scss">
@import url('./SearchCard.scss');
</style> -->

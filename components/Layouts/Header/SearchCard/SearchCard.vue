<template>
  <NuxtLink
    :to="{
      path: `/info-${dataMovie?.media_type}/${dataMovie?.id}`
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
              :src="getImage(dataMovie?.poster_path, 'poster', { w: 120 })"
              loading="lazy"
              alt=""
            />
          </div>
        </div>

        <div class="info">
          <h3 class="title">
            {{ dataMovie?.name ? dataMovie?.name : dataMovie?.title }}
            <span v-if="type == 'tv'">
              {{ ' - Phần ' + dataMovie?.last_episode_to_air?.season_number }}
            </span>
          </h3>

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
            v-if="type == 'movie'"
            class="duration-episode"
          >
            Thời lượng:
            {{ dataMovie?.runtime + ' phút' || '' }}
          </p>

          <p
            v-if="type == 'tv'"
            class="duration-episode"
          >
            Tập mới nhất:
            {{ 'Tập ' + dataMovie?.last_episode_to_air?.episode_number || '' }}
          </p>

          <p class="views">
            <!-- Lượt xem: -->
            {{
              dataMovie?.views
                ? utils.viewFormatter(dataMovie?.views) + ' lượt xem'
                : ''
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
const dataMovie = ref<any>(props.item || {});
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

<template>
  <NuxtLink
    :to="{
      path: isEpisodes
        ? `/info-tv/${item?.id}__${utils
            .removeVietnameseTones(item?.name)
            ?.replaceAll(/\s/g, '-')
            .toLowerCase()}`
        : `/info-movie/${item?.id}__${utils
            .removeVietnameseTones(item?.name)
            ?.replaceAll(/\s/g, '-')
            .toLowerCase()}`
    }"
    class="movie-card-item horizontal trailer"
  >
    <el-skeleton
      :loading="loading"
      animated
    >
      <template #template>
        <el-skeleton-item class="skeleton-img" />
        <!-- <div class="content-skeleton">
          <el-skeleton-item variant="text" />
          <el-skeleton-item variant="text" style="width: 60%" />
        </div> -->
      </template>

      <template #default>
        <div class="img-box">
          <img
            v-lazy="getImage(item?.backdrop_path, 'backdrop', 'h-250')"
            class="ant-image"
            loading="lazy"
            alt=""
          />

          <div
            v-show="isInHistory"
            class="viewed-overlay-bar"
          >
            <div
              class="percent-viewed"
              :style="{ width: percent * 100 + '%' }"
            ></div>
          </div>

          <!-- <div v-if="!loading" class="duration-episode-box">
            <p v-if="!isEpisodes" class="duration-episode">
              {{ item?.runtime + ' min' }}
            </p>
            <p v-else class="duration-episode">
              {{
                // dataMovie?.last_episode_to_air?.episode_number
                //   ? 'Tập ' + dataMovie?.last_episode_to_air?.episode_number
                //   : ''

                item?.episode_run_time[0]
                  ? item?.episode_run_time[0] + ' min'
                  : '? min / Ep'
              }}
            </p>
          </div> -->

          <div
            v-if="!loading"
            class="youtub-icon"
            @click.prevent="isOpenModalTrailer = true"
          >
            <!-- <font-awesome-icon icon="fa-brands fa-youtube" /> -->
            <svg
              class="fa-youtube"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              width="5rem"
              height="5rem"
            >
              <path
                fill="currentColor"
                d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"
              />
            </svg>
          </div>

          <div
            v-if="
              item?.release_date || item?.last_air_date || item?.first_air_date
            "
            class="release-date-box"
          >
            <p
              v-if="!isEpisodes"
              class="release-date"
            >
              {{ item?.release_date?.slice(0, 4) }}
            </p>
            <p
              v-else
              class="release-date"
            >
              {{
                item?.last_air_date?.slice(0, 4)
                  ? item?.last_air_date?.slice(0, 4)
                  : item?.first_air_date?.slice(0, 4)
              }}
            </p>
          </div>
        </div>

        <div class="info">
          <p class="title">
            {{ item?.name }}
            <!-- <span v-if="isEpisodes">
              {{ ' - Phần ' + dataMovie?.last_episode_to_air?.season_number }}
            </span> -->
          </p>
          <!-- <div class="info-bottom">
            <div class="genres">
              <span
                class="genre-item"
                v-for="(genre, index) in Array.from(item?.genres, (x: any) => x.name)"
                :index="index"
                :key="index"
              >
                {{ genre }}
              </span>
            </div>
          </div> -->
        </div>
      </template>
    </el-skeleton>

    <ModalTrailer
      :is-open-modal-trailer="isOpenModalTrailer"
      :item="item"
      :is-episodes="isEpisodes"
      @set-is-teleport-modal="(data: boolean) => (isOpenModalTrailer = data)"
    />
  </NuxtLink>
</template>

<script setup lang="ts">
import ModalTrailer from '~/components/ModalTrailer/ModalTrailer.vue';
import { getItemHistory } from '~/services/history';
import { getImage } from '~/services/image';

const props = defineProps<{
  item: any;
  type: string | undefined;
}>();

const store = useStore();
const utils = useUtils();
const dataMovie = ref<any>({});
const isEpisodes = ref<boolean>(false);
const loading = ref<boolean>(false);
const isInHistory = ref<boolean>(false);
const percent = ref<number>(0);
const isOpenModalTrailer = ref<boolean>(false);

const getData = async () => {
  // loading.value = true;

  // setTimeout(() => {
  //   loading.value = false;
  // }, 500);

  if (props?.type || props?.item?.media_type) {
    switch (props?.type || props?.item?.media_type) {
      case 'movie':
        isEpisodes.value = false;

        break;
      case 'tv':
        isEpisodes.value = true;

        break;
      default:
        break;
    }
  }

  if (store.isLogin) {
    if (dataMovie.value?.history_progress) {
      isInHistory.value = true;
      percent.value = dataMovie.value?.history_progress?.percent;
    } else {
      useAsyncData(
        `itemhistory/${store?.userAccount?.id}/${props.item?.id}`,
        () => getItemHistory(props.item?.id, props.item?.media_type)
      )
        .then((movieRespone: any) => {
          if (movieRespone.data.value.success == true) {
            isInHistory.value = true;
            percent.value = movieRespone.data.value?.result?.percent;
          }
        })
        .catch((e) => {});
    }
  }
};

getData();
</script>
<style lang="scss" src="./MovieCardHorizontalTrailer.scss"></style>

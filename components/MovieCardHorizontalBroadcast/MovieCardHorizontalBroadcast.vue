<template>
  <NuxtLink
    :to="{
      path: `/broadcast/${item?.id}`
    }"
    class="movie-card-item broadcast horizontal"
    :class="{
      'show-video': showVideo
    }"
    :style="`--dominant-backdrop-color: ${dataMovie.dominant_backdrop_color[0]}, ${dataMovie.dominant_backdrop_color[1]},${dataMovie.dominant_backdrop_color[2]}`"
    :title="item?.name"
  >
    <!-- <el-skeleton :loading="loading" animated class="ratio-16-9">
      <template #template>
        <el-skeleton-item class="skeleton-img" />
      </template> -->

    <!-- <template #default> -->
    <div
      ref="cardItem"
      class="img-box ratio-16-9"
    >
      <!-- <img
        v-lazy="getImage(dataMovie?.backdrop_path, 'backdrop', {h:250})"
        loading="lazy"
        alt=""
      /> -->

      <NuxtImg
        :src="getImage(dataMovie?.backdrop_path, 'backdrop', { h: 250 })"
        placeholder="/images/loading-img-16-9.webp"
        format="avif"
        loading="lazy"
        :alt="dataMovie?.name"
        :title="dataMovie?.name"
      />

      <!-- <Image
        :src="getImage(dataMovie?.backdrop_path, 'backdrop', {h:250})"
        placeholder="/images/loading-img-16-9.webp"
        format="avif"
        loading="lazy"
        alt=""
      /> -->

      <div
        v-if="isInHistory"
        class="viewed-overlay-bar"
      >
        <div
          class="percent-viewed"
          :style="{ width: percent * 100 + '%' }"
        ></div>
      </div>

      <div
        v-if="isEpisodes"
        class="lastest-episode"
      ></div>

      <div class="fade-card"></div>
    </div>

    <div class="info">
      <div class="title-wrapper">
        <p
          class="title"
          :title="dataMovie?.name"
        >
          {{ dataMovie?.name }}
        </p>

        <p
          class="original-title"
          :title="dataMovie?.original_name"
        >
          {{ dataMovie?.original_name }}
        </p>
      </div>

      <div class="right">
        <div class="release-time-wrapper">
          <p class="release-time">
            <ClientOnly>
              {{ utils.dateTimeFormater.toNow(item?.release_time) }}
            </ClientOnly>
          </p>
        </div>

        <!-- <div class="vote-average">
          <span>{{ dataMovie?.vote_average?.toFixed(2) }}</span>
        </div> -->
      </div>
    </div>
    <!-- </template>
    </el-skeleton> -->
  </NuxtLink>
</template>

<script setup lang="ts">
// import { Image } from '~/components/Image';
// import { PreviewModal } from '~/components/PreviewModal';
// import PreviewModal from '~/components/PreviewModal/PreviewModal.vue';
import { getImage } from '~/services/image';
import { getMovieById } from '~/services/movie';
import { getTvById } from '~/services/tv';
import { getVideo } from '~/services/video';
import { getItemList } from '~/services/list';
import { getItemHistory } from '~/services/history';

const props = defineProps<{
  item: any;
}>();

const nuxtConfig = useRuntimeConfig();
const authStore = useAuthStore();
const utils = useUtils();
const router = useRouter();
const dataMovie = ref<any>(props.item.movieData || {});
const loading = ref<boolean>(false);
const isAddToList = ref<boolean>(false);
const isInHistory = ref<boolean>(false);
const percent = ref<number>(0);
const urlShare = computed<string>((): string => window.location.href);
const cardItem = ref<HTMLElement>();
const timeOut = ref<any>();
const isEpisodes = computed<boolean>(() => props?.item?.media_type == 'tv');
const video = ref<HTMLVideoElement>();
const showVideo = ref<boolean>(false);
const videoSrc = computed<string>(() =>
  getVideo('/feature/Transformer_5/Transformer_5' + '.m3u8')
);

const getData = async () => {
  // loading.value = true;

  // switch (props?.type || props?.item?.media_type) {
  //   case 'movie':
  //     await getMovieById(dataMovie.id)
  //       .then((response) => {
  //         dataMovie.value = response;
  //       })
  //       .catch((e) => {})
  //       .finally(() => {
  //         loading.value = false;
  //       });
  //     break;
  //   case 'tv':
  //     await getTvById(dataMovie.id)
  //       .then((response) => {
  //         dataMovie.value = response;
  //       })
  //       .catch((e) => {})
  //       .finally(() => {
  //         loading.value = false;
  //       });
  //     break;
  //   default:
  //     break;
  // }

  if (authStore.isLogin) {
    if (dataMovie.value?.in_list) {
      isAddToList.value = true;
    } else {
      getItemList(dataMovie.value?.id, dataMovie.value?.media_type)
        .then((response) => {
          if (response.success == true) {
            isAddToList.value = true;
          }
        })
        .catch((e) => {});
    }

    if (dataMovie.value?.history_progress) {
      isInHistory.value = true;
      percent.value = dataMovie.value?.history_progress?.percent;
    } else {
      getItemHistory(dataMovie.value?.id, dataMovie.value?.media_type)
        .then((response) => {
          if (response.success == true) {
            isInHistory.value = true;
            percent.value = response?.result?.percent;
          }
        })
        .catch((e) => {});
    }
  }
};

// getData();

watch(
  () => authStore.isLogin,
  () => {
    if (authStore.isLogin) {
    }
  }
);

onMounted(() => {});
</script>

<!-- <style lang="scss" src="./MovieCardHorizontalBroadcast.scss"></style> -->
<style lang="scss">
@import url('./MovieCardHorizontalBroadcast.scss');
</style>

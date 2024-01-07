<template>
  <div
    class="movie-card-item-related"
    :class="{
      'show-video': showVideo
    }"
    @pointerenter="onMouseEnter"
    @pointerleave="onMouseLeave"
  >
    <!-- <el-skeleton :loading="loading" animated>
      <template #template>
        <div class="img-box ratio-16-9">
          <el-skeleton-item class="skeleton-img" />
        </div>
        <div class="content-skeleton">
          <div class="top">
            <div class="left">
              <el-skeleton-item variant="text" style="width: 70%" />
              <el-skeleton-item variant="text" style="width: 100%" />
            </div>
            <el-skeleton-item class="circle" />
          </div>

          <div class="bottom">
            <el-skeleton-item variant="text" />
            <el-skeleton-item variant="text" />
            <el-skeleton-item variant="text" />
            <el-skeleton-item variant="text" />
            <el-skeleton-item variant="text" />
          </div>
        </div>
      </template>

      <template #default> </template>
    </el-skeleton> -->

    <div
      class="img-box ratio-16-9"
      @click="onClickPlay"
    >
      <NuxtImg
        v-show="!showVideo"
        :src="getImage(item?.backdrop_path, 'backdrop', 'h-250')"
        placeholder="/imgs/loading-img-16-9.webp"
        format="avif"
        loading="lazy"
        alt=""
      />

      <div class="video-preview">
        <video
          v-show="showVideo"
          id="video-player"
          ref="video"
          :src="videoSrc"
          autoplay
          muted
          @loadstart="onLoadStartVideo"
          @waiting="onWaitingVideo"
          @playing="onPLayingVideo"
        ></video>

        <div class="float-center">
          <div
            v-show="videoStates.isLoading"
            class="loading-video"
          >
            <LoadingSpinner :width="25" />
          </div>
        </div>
      </div>

      <div
        v-show="isInHistory"
        class="viewed-overlay-bar"
      >
        <div
          class="percent-viewed"
          :style="{ width: percent * 100 + '%' }"
        ></div>
      </div>

      <div class="play-icon">
        <svg
          class="play"
          xmlns="http://www.w3.org/2000/svg"
          width="5rem"
          height="5rem"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
    </div>

    <NuxtLink
      class="info"
      :to="{
        path: isEpisodes
          ? `/info-tv/${item?.id}${utils.convertPath.toPathInfo_Play(
              item?.name
            )}`
          : `/info-movie/${item?.id}${utils.convertPath.toPathInfo_Play(
              item?.name
            )}`
      }"
    >
      <p
        class="title"
        :title="item?.name"
      >
        {{ item?.name }}
      </p>
      <div class="middle">
        <div class="left">
          <div
            v-if="
              item?.release_date || item?.last_air_date || item?.first_air_date
            "
            class="release-date-box"
          >
            <span
              v-if="!isEpisodes"
              class="release-date"
            >
              {{ item?.release_date?.slice(0, 4) }}
            </span>
            <span
              v-else
              class="release-date"
            >
              {{
                item?.last_air_date?.slice(0, 4)
                  ? item?.last_air_date?.slice(0, 4)
                  : item?.first_air_date?.slice(0, 4)
              }}
            </span>
          </div>
          <span class="views">
            {{ utils.viewFormatter(item?.views) }} lượt xem
          </span>
        </div>
        <div class="right">
          <a-button
            class="add click-active"
            shape="circle"
            size="large"
            @click.prevent="handleAddToList"
          >
            <template #icon>
              <!-- <Icon v-if="isAddToList" name="ic:baseline-check" />
                  <Icon v-else name="ic:baseline-plus" /> -->

              <svg
                v-if="isAddToList"
                xmlns="http://www.w3.org/2000/svg"
                width="2.4rem"
                height="2.4rem"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19L21 7l-1.41-1.41z" />
              </svg>

              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                width="2.4rem"
                height="2.4rem"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z" />
              </svg>
            </template>
          </a-button>
        </div>
      </div>
      <div class="bottom">
        <p class="overview">
          {{
            item?.overview ||
            'Sorry! This movie has not been updated overview content.'
          }}
        </p>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { LoadingSpinner } from '~/components/Loading';
import { getItemHistory } from '~/services/history';
import { getImage } from '~/services/image';
import { getItemList } from '~/services/list';
import { DEV_SERVER_VIDEO } from '~/services/video';

const props = defineProps<{
  item: any;
  type: string;
}>();

const nuxtConfig = useRuntimeConfig();
const utils = useUtils();
const authStore = useAuthStore();
const dataMovie = ref<any>({});
const loading = ref<boolean>(false);
const isInHistory = ref<boolean>(false);
const percent = ref<number>(0);
const isAddToList = ref<boolean>(false);
const isEpisodes = computed<boolean>(() => props?.item?.media_type == 'tv');
const video = ref<HTMLVideoElement>();
const showVideo = ref<boolean>(false);
const videoSrc = computed<string>(() =>
  nuxtConfig.app.production_mode
    ? `${nuxtConfig.app.serverVideoUrl}/videos` + '/feature/Transformer_5'
    : `${DEV_SERVER_VIDEO}/videos` + '/feature/Transformer_5'
);
const videoStates = reactive({
  isLoading: false,
  isVolumeOff: false
});

const getData = async () => {
  loading.value = true;

  setTimeout(() => {
    loading.value = false;
  }, 500);

  switch (props?.type || props?.item?.media_type) {
    case 'movie':
      break;
    case 'tv':
      break;
    default:
      break;
  }

  if (authStore.isLogin) {
    if (dataMovie.value?.in_list) {
      isAddToList.value = true;
    } else {
      // await useAsyncData(`itemlist/${store?.userAccount?.id}/${props.item?.id}`, () =>
      //   getItemList(props.item?.id, props.item?.media_type)
      // )
      await getItemList(props.item?.id, props.item?.media_type)
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
      // await useAsyncData(
      //   `itemhistory/${store?.userAccount?.id}/${props.item?.id}`,
      //   () => getItemHistory(props.item?.id, props.item?.media_type)
      // )
      await getItemHistory(props.item?.id, props.item?.media_type)
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

getData();

const handleAddToList = (e: any) => {
  if (!authStore?.isLogin) {
    authStore.isOpenRequireAuthDialog = true;
    return;
  }
  if (!isAddToList.value) {
    isAddToList.value = true;
    if (!utils.handleAddItemToList(props.item?.id, props.item.media_type)) {
      isAddToList.value = false;
    }
  } else {
    isAddToList.value = false;
    if (
      !utils.handleRemoveItemFromList(props.item?.id, props.item?.media_type)
    ) {
      isAddToList.value = true;
    }
  }
};

const onMouseEnter = () => {
  if (video.value! && video.value!.paused && !showVideo.value) {
    showVideo.value = true;
    video.value!.play().catch(() => {});
  }
};

const onMouseLeave = () => {
  if (video.value! && !video.value!.paused && showVideo.value) {
    showVideo.value = false;
    video.value!.pause();
  }
};

const onClickPlay = () => {
  navigateTo({
    path: isEpisodes.value
      ? `/play-tv/${props.item?.id}${utils.convertPath.toPathInfo_Play(
          props.item?.name
        )}/tap-1`
      : `/play-movie/${props.item?.id}${utils.convertPath.toPathInfo_Play(
          props.item?.name
        )}`
  });
};

const onLoadStartVideo = () => {
  videoStates.isLoading = true;
};

const onWaitingVideo = (e: any) => {
  videoStates.isLoading = true;
};

const onPLayingVideo = (e: any) => {
  videoStates.isLoading = false;
};

const onCanPlayVideo = () => {
  video.value!.play().catch(() => {});
};
</script>
<style lang="scss" src="./MovieCardRelated.scss"></style>

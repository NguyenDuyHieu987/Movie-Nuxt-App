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
      <VipRibbon
        v-if="dataMovie?.vip > 0"
        :vip="dataMovie?.vip"
      />

      <NuxtImg
        v-if="!showVideo"
        :src="getImage(dataMovie?.backdrop_path, 'backdrop', { h: 250 })"
        placeholder="/images/loading-img-16-9.webp"
        loading="lazy"
        :alt="dataMovie?.name"
        :title="dataMovie?.name"
      />

      <div
        class="video-preview"
        :class="{ show: showVideo }"
      >
        <!-- :src="videoSrc" -->
        <video
          v-if="showVideo"
          id="video-player"
          ref="video"
          autoplay
          muted
          :poster="getImage(dataMovie?.backdrop_path, 'backdrop', { h: 250 })"
          @loadstart="onLoadStartVideo"
          @waiting="onWaitingVideo"
          @playing="onPLayingVideo"
        ></video>

        <div class="float-center">
          <div
            v-if="videoStates.isLoading"
            class="loading-video"
          >
            <LoadingSpinner :width="25" />
          </div>
        </div>

        <div class="video-tool">
          <div class="volume">
            <SvgoVolumeUp
              v-show="!videoStates.isVolumeOff"
              width="1.8rem"
              height="1.8rem"
              fill="currentColor"
              @click.prevent="onClickVolumeUp"
            />

            <SvgoVolumeOff
              v-show="videoStates.isVolumeOff"
              width="1.8rem"
              height="1.8rem"
              fill="currentColor"
              @click.prevent="onClickVolumeOff"
            />
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
        <SvgoPlay
          class="play"
          width="5rem"
          height="5rem"
          fill="currentColor"
        />
      </div>
    </div>

    <NuxtLink
      class="info"
      :to="{
        path: `/info-${dataMovie?.media_type}/${dataMovie?.id}`
      }"
      target="_top"
    >
      <p class="title">
        {{ dataMovie?.name }}
      </p>
      <div class="middle">
        <div class="left">
          <div
            v-if="
              dataMovie?.release_date ||
              dataMovie?.last_air_date ||
              dataMovie?.first_air_date
            "
            class="release-date-box"
          >
            <span
              v-if="!isEpisodes"
              class="release-date"
            >
              {{ dataMovie?.release_date?.slice(0, 4) }}
            </span>
            <span
              v-else
              class="release-date"
            >
              {{
                dataMovie?.last_air_date?.slice(0, 4)
                  ? dataMovie?.last_air_date?.slice(0, 4)
                  : dataMovie?.first_air_date?.slice(0, 4)
              }}
            </span>
          </div>
          <span class="views">
            {{ utils.viewFormatter(dataMovie?.views) }} lượt xem
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

              <SvgoCheck
                v-if="isAddToList"
                width="2.4rem"
                height="2.4rem"
                fill="currentColor"
              />
              <SvgoPlus
                v-else
                width="2.4rem"
                height="2.4rem"
                fill="currentColor"
              />
            </template>
          </a-button>
        </div>
      </div>
      <div class="bottom">
        <p class="overview">
          {{
            dataMovie?.overview ||
            'Sorry! This movie has not been updated overview content.'
          }}
        </p>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
// import SvgoPlay from '~/assets/svgs/icons/play.svg?component';
// import SvgoPlus from '~/assets/svgs/icons/plus.svg?component';
// import SvgoCheck from '~/assets/svgs/icons/check.svg?component';

// import { LoadingSpinner } from '~/components/Loading';
import LoadingSpinner from '~/components/Loading/LoadingSpinner/LoadingSpinner.vue';
import { getItemList } from '~/services/list';
import { getItemHistory } from '~/services/history';
import { getImage } from '~/services/image';
import { getVideo } from '~/services/video';
import Hls from 'hls.js';

const props = defineProps<{
  item: any;
  type: string;
}>();

const nuxtConfig = useRuntimeConfig();
const utils = useUtils();
const authStore = useAuthStore();
const dataMovie = ref<any>(props.item || {});
const loading = ref<boolean>(false);
const isInHistory = ref<boolean>(false);
const percent = ref<number>(0);
const isAddToList = ref<boolean>(false);
const isEpisodes = computed<boolean>(() => dataMovie.value?.media_type == 'tv');
const video = ref<HTMLVideoElement>();
const showVideo = ref<boolean>(false);
const videoSrc = computed<string>(() =>
  getVideo(
    dataMovie.value?.video_path ||
      '/feature/Transformer_5/Transformer_5' + '.m3u8'
  )
);
const videoStates = reactive({
  isLoading: false,
  isVolumeOff: true
});
const hls = ref<Hls | null>();

const getData = async () => {
  loading.value = true;

  setTimeout(() => {
    loading.value = false;
  }, 500);

  if (authStore.isLogin) {
    if (dataMovie.value?.in_list) {
      isAddToList.value = true;
    } else {
      await getItemList(dataMovie.value?.id, dataMovie.value?.media_type)
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
      await getItemHistory(dataMovie.value?.id, dataMovie.value?.media_type)
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
    if (
      !utils.handleAddItemToList(
        dataMovie.value?.id,
        dataMovie.value.media_type
      )
    ) {
      isAddToList.value = false;
    }
  } else {
    isAddToList.value = false;
    if (
      !utils.handleRemoveItemFromList(
        dataMovie.value?.id,
        dataMovie.value?.media_type
      )
    ) {
      isAddToList.value = true;
    }
  }
};

const loadM3u8Video = () => {
  var videoEl = document.getElementById('video-player') as HTMLVideoElement;

  if (!video.value && videoEl) {
    video.value = videoEl;
  }

  if (!video.value) return;

  if (Hls.isSupported()) {
    if (!hls.value) hls.value = new Hls();

    hls.value.loadSource(videoSrc.value);
    hls.value.attachMedia(video.value!);
    hls.value.on(Hls.Events.MANIFEST_PARSED, function () {
      video.value?.play().catch(() => {});
    });
  } else if (video.value?.canPlayType('application/vnd.apple.mpegurl')) {
    video.value!.src = videoSrc.value;
    video.value?.addEventListener('loadedmetadata', function () {
      video.value?.play().catch(() => {});
    });
  }
};

const onMouseEnter = async () => {
  if (!showVideo.value) {
    showVideo.value = true;

    // if (video.value! && video.value!.paused && !showVideo.value) {
    //   video.value!.play().catch(() => {});
    // }

    await nextTick();
    loadM3u8Video();
  }
};

const onMouseLeave = () => {
  if (showVideo.value) {
    showVideo.value = false;

    if (video.value && !video.value!.paused) {
      video.value!.pause();
    }

    if (hls.value) {
      hls.value.destroy();
      hls.value = null;
    }
  }
};

const onClickPlay = async (e: Event) => {
  if ((e.target as Element)?.closest('.video-tool')) {
    return;
  }

  await navigateTo({
    path: `/play-${dataMovie.value?.media_type}/${dataMovie.value?.id}`
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

const onClickVolumeUp = () => {
  videoStates.isVolumeOff = true;
  video.value!.muted = true;
};

const onClickVolumeOff = () => {
  videoStates.isVolumeOff = false;
  video.value!.muted = false;
};
</script>

<!-- <style lang="scss" src="./MovieCardRelated.scss"></style> -->
<style lang="scss">
@import url('./MovieCardRelated.scss');
</style>

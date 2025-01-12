<template>
  <!-- v-if="isTeleport" -->
  <Teleport to="#preview-modal">
    <div class="preview-overlay">
      <div
        ref="previewModal"
        class="preview-modal"
        :class="{
          appear: isTeleport,
          disappear: isDisappear,
          'only-left': isOnlyLeft,
          'only-right': isOnlyRight,
          'show-video': showVideo
        }"
        :style="`--dominant-backdrop-color: ${dataMovie.dominant_backdrop_color[0]}, ${dataMovie.dominant_backdrop_color[1]},${dataMovie.dominant_backdrop_color[2]}`"
      >
        <el-skeleton
          :loading="loading"
          animated
        >
          <template #template>
            <div class="backdrop-box">
              <el-skeleton-item class="skeleton-img" />
            </div>

            <div class="bottom-content">
              <div class="widget">
                <div class="left">
                  <el-skeleton-item class="circle" />
                  <el-skeleton-item class="circle" />
                  <el-skeleton-item class="circle" />
                </div>
                <div class="right">
                  <el-skeleton-item class="circle" />
                </div>
              </div>
              <div class="info">
                <el-skeleton-item variant="text" />
                <el-skeleton-item
                  variant="text"
                  style="width: 60%"
                />
                <el-skeleton-item
                  variant="text"
                  style="width: 80%"
                />
              </div>
            </div>
          </template>

          <template #default>
            <div class="backdrop-box">
              <NuxtImg
                v-if="!showVideo"
                :src="
                  getImage(dataMovie?.backdrop_path, 'backdrop', { h: 250 })
                "
                loading="lazy"
                alt=""
              />

              <div class="video-preview">
                <!-- :src="videoSrc" -->
                <video
                  v-if="showVideo"
                  id="video-player"
                  ref="video"
                  autoplay
                  muted
                  :poster="
                    getImage(dataMovie?.backdrop_path, 'backdrop', { h: 250 })
                  "
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
                v-if="isInHistory"
                class="percent-viewed"
                :style="{ width: percent * 100 + '%' }"
              ></div>

              <div
                v-if="isInHistory"
                class="viewed-overlay-bar"
              ></div>
            </div>

            <div
              class="bottom-content"
              @click="onClickPreviewModal"
            >
              <div class="widget">
                <div class="left">
                  <el-tooltip
                    title="Xem ngay"
                    content="Xem ngay"
                    placement="top"
                    popper-class="popper-tooltip"
                    :hide-after="0"
                    :mouse-leave-delay="0"
                  >
                    <NuxtLink
                      class="btn-play-now"
                      :to="{
                        path: `/play-${dataMovie?.media_type}/${dataMovie?.id}`
                      }"
                    >
                      <a-button
                        class="click-active"
                        shape="circle"
                        size="large"
                        type="text"
                      >
                        <template #icon>
                          <!-- <Icon name="ic:play-arrow" /> -->

                          <SvgoPlay
                            width="2rem"
                            height="2rem"
                            fill="currentColor"
                          />
                        </template>
                      </a-button>
                    </NuxtLink>
                  </el-tooltip>

                  <el-tooltip
                    :title="
                      !isAddToList ? 'Thêm vào danh sách' : 'Xóa khỏi danh sách'
                    "
                    :content="
                      !isAddToList ? 'Thêm vào danh sách' : 'Xóa khỏi danh sách'
                    "
                    placement="top"
                    popper-class="popper-tooltip"
                    :hide-after="0"
                    :mouse-leave-delay="0"
                  >
                    <a-button
                      class="click-active"
                      shape="circle"
                      size="large"
                      type="text"
                      @click.prevent="handleAddToList"
                    >
                      <template #icon>
                        <!-- <Icon v-if="isAddToList" name="ic:baseline-check" />
                        <Icon v-else name="ic:baseline-plus" /> -->

                        <SvgoCheck
                          v-if="isAddToList"
                          width="2rem"
                          height="2rem"
                          fill="currentColor"
                        />
                        <SvgoPlus
                          v-else
                          width="2rem"
                          height="2rem"
                          fill="currentColor"
                        />
                      </template>
                    </a-button>
                  </el-tooltip>

                  <el-tooltip
                    title="Chia sẻ"
                    content="Chia sẻ"
                    placement="top"
                    popper-class="popper-tooltip"
                    :hide-after="0"
                    :mouse-leave-delay="0"
                  >
                    <ShareNetwork
                      network="facebook"
                      :url="urlShare"
                      :title="dataMovie?.name"
                      hashtags="phimhay247.site,vite"
                      style="white-space: nowrap; display: block"
                      @click.prevent
                    >
                      <a-button
                        class="click-active"
                        shape="circle"
                        size="large"
                        type="text"
                        @click.prevent
                      >
                        <template #icon>
                          <!-- <Icon name="fa6-solid:share" class="fa6-solid" /> -->
                          <!-- <Icon name="mdi:share" /> -->

                          <SvgoShareSolid
                            width="2rem"
                            height="2rem"
                            fill="currentColor"
                          />
                        </template>
                      </a-button>
                    </ShareNetwork>
                  </el-tooltip>
                </div>

                <div class="right">
                  <el-tooltip
                    title="Chi tiết phim"
                    content="Chi tiết phim"
                    placement="top"
                    popper-class="popper-tooltip"
                    :hide-after="0"
                    :mouse-leave-delay="0"
                  >
                    <NuxtLink
                      :to="{
                        path: `/info-${dataMovie?.media_type}/${dataMovie?.id}`
                      }"
                    >
                      <a-button
                        class="click-active"
                        shape="circle"
                        size="large"
                        type="text"
                      >
                        <template #icon>
                          <!-- <InfoOutlined /> -->

                          <!-- <Icon
                            class="info-icon"
                            name="mdi:information-variant"
                          /> -->

                          <SvgoInformationVariant
                            class="info-icon"
                            width="2rem"
                            height="2rem"
                            fill="currentColor"
                          />
                        </template>
                      </a-button>
                    </NuxtLink>
                  </el-tooltip>
                </div>
              </div>
              <div class="info">
                <!-- <h3 class="title">
                  {{ dataMovie?.name }}
                  <span v-if="isEpisodes">
                    {{
                      ' - Phần ' + dataMovie?.last_episode_to_air?.season_number
                    }}
                  </span>
                </h3> -->

                <div class="genres">
                  <span
                    v-for="(genre, index) in Array.from(
                      dataMovie?.genres,
                      (x: any) => x.name
                    )"
                    :key="index"
                    class="genre-item"
                    :index="index"
                  >
                    {{ genre }}
                  </span>
                </div>

                <div class="bottom">
                  <div class="evidence-tags">
                    <span class="evidence-item country">
                      {{
                        getCountryByOriginalLanguage(
                          dataMovie?.original_language,
                          store.allCountries
                        )?.name || ''
                      }}
                    </span>
                  </div>

                  <div class="views-rate">
                    <p class="views">
                      {{ utils.viewFormatter(dataMovie?.views) }} lượt xem
                    </p>

                    <p>
                      <span
                        v-if="dataMovie?.vote_average >= 8"
                        style="color: green; font-weight: bold"
                      >
                        {{ dataMovie?.vote_average.toFixed(2) }}
                      </span>
                      <span
                        v-if="
                          dataMovie?.vote_average >= 5 &&
                          dataMovie?.vote_average < 8
                        "
                        style="color: yellow; font-weight: bold"
                      >
                        {{ dataMovie?.vote_average.toFixed(2) }}
                      </span>
                      <span
                        v-if="dataMovie?.vote_average < 5"
                        style="color: red; font-weight: bold"
                      >
                        {{ dataMovie?.vote_average.toFixed(2) }}
                      </span>
                      diểm /
                      {{ dataMovie?.vote_count + ' lượt' }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </el-skeleton>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
// import SvgoVolumeUp from '~/assets/svgs/icons/volume-up.svg?component';
// import SvgoVolumeOff from '~/assets/svgs/icons/volume-off.svg?component';
// import SvgoPlay from '~/assets/svgs/icons/play.svg?component';
// import SvgoPlus from '~/assets/svgs/icons/plus.svg?component';
// import SvgoCheck from '~/assets/svgs/icons/check.svg?component';
// import SvgoShareSolid from '~/assets/svgs/icons/share-solid.svg?component';
// import SvgoInformationVariant from '~/assets/svgs/icons/information-variant.svg?component';

// import { LoadingSpinner } from '~/components/Loading';
// import LoadingSpinner from '~/components/Loading/LoadingSpinner/LoadingSpinner.vue';
import { getCountryByOriginalLanguage } from '~/services/country';
import { getImage } from '~/services/image';
import { getMovieById } from '~/services/movie';
import { getTvById } from '~/services/tv';
import { getItemList } from '~/services/list';
import { getItemHistory } from '~/services/history';
import { getVideo } from '~/services/video';
import gsap from 'gsap';
import Hls from 'hls.js';

const props = defineProps<{
  item: any;
  styleProps: {
    left: number;
    top: number;
    offsetHeight: number;
    offsetWidth: number;
    imgHeight: number;
    imgWidth: number;
    rectBound: any;
  };
  timeOut: any;
  isEpisodes: boolean;
}>();

const emit = defineEmits<{ setIsTeleportModal: [data: boolean] }>();

const nuxtConfig = useRuntimeConfig();
const store = useStore();
const authStore = useAuthStore();
const utils = useUtils();
const dataMovie = ref<any>(props.item || {});
// const isEpisodes = ref<boolean>(false);
const loading = ref<boolean>(false);
const isAddToList = ref<boolean>(false);
const isInHistory = ref<boolean>(false);
const percent = ref<number>(0);
const previewModal = ref<HTMLElement>();
const urlShare = computed<string>(
  (): string =>
    window.location.origin +
    `/info-${dataMovie.value?.media_type}/${dataMovie.value?.id}`
);
const isTeleport = defineModel<boolean>('isTeleport');
const style = defineModel<{
  left: number;
  top: number;
  offsetHeight: number;
  offsetWidth: number;
  imgHeight: number;
  imgWidth: number;
  rectBound: any;
}>('style');
const isDisappear = ref<boolean>(false);
const isOnlyLeft = ref<boolean>(false);
const isOnlyRight = ref<boolean>(false);
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

onMounted(() => {
  showVideo.value = true;
});

watch(
  previewModal,
  () => {
    if (isTeleport.value == true && previewModal.value) {
      previewModal.value.style.setProperty(
        '--width',
        style.value!.offsetWidth + 'px'
      );
      previewModal.value.style.setProperty(
        '--height',
        style.value!.offsetHeight + 'px'
      );
      previewModal.value.style.setProperty(
        '--img-height',
        style.value!.imgHeight + 'px'
      );

      let minRecLeft =
        +getComputedStyle(document.documentElement)
          .getPropertyValue('--sider-width')
          .replace('px', '') + 45;

      if (window.innerWidth < 900) {
        minRecLeft = 15;
      }

      if (store.collapsed && window.innerWidth >= 900) {
        minRecLeft =
          +getComputedStyle(document.documentElement)
            .getPropertyValue('--sider-width')
            .replace('px', '') + 30;
      }

      isOnlyLeft.value = false;
      isOnlyRight.value = false;

      if (style.value!?.rectBound.left <= minRecLeft) {
        // previewModal.value.style.setProperty(
        //   '--left',
        //   style.value!.rectBound.left + 'px'
        // );

        // previewModal.value.style.transform = 'translateX(0%) translateY(-50%)';

        isOnlyLeft.value = true;

        previewModal.value.style.setProperty(
          '--left',
          style.value!.rectBound.left + 'px'
        );

        previewModal.value.style.setProperty(
          '--left-only',
          style.value!.rectBound.left * 1.15 + 'px'
        );

        previewModal.value.style.transform =
          'translateX(0%) translateY(-50%) scale(1.3)';
      } else {
        const minRectRight = window.innerWidth - style.value!?.rectBound.right;

        if (minRectRight <= 45) {
          // previewModal.value.style.right = minRectRight - 15 + 'px';
          // previewModal.value.style.transform = 'translateX(0%) translateY(-50%)';

          isOnlyRight.value = true;

          previewModal.value.style.setProperty('--left', 'auto');

          previewModal.value.style.setProperty(
            '--right',
            minRectRight - 14 + 'px'
          );

          previewModal.value.style.setProperty(
            '--right-only',
            minRectRight + 14 * 1.8 + 'px'
          );

          previewModal.value.style.transform =
            'translateX(0%) translateY(-50%) scale(1.3)';
        } else {
          previewModal.value.style.setProperty(
            '--left',
            style.value!.left + 'px'
          );
        }
      }

      previewModal.value.style.setProperty('--top', style.value!.top + 'px');

      previewModal.value.addEventListener('pointerenter', () => {
        if (!isTeleport.value) {
          isTeleport.value = true;
        }
      });

      previewModal.value.addEventListener('pointerleave', (el: any) => {
        isDisappear.value = true;
        showVideo.value = false;

        if (isOnlyLeft.value) {
          gsap.fromTo(
            el.target,
            {
              left: style.value!.rectBound.left * 1.15 + 'px',
              transform: 'translateX(0%) translateY(-50%) scale(1.3)'
            },
            {
              left: style.value!.rectBound.left + 'px',
              transform: `translateX(0%) translateY(calc(${
                style.value!.offsetHeight
              }px / (-2)))
            scale(1)`,
              duration: 0.3,
              onComplete: () => {
                isDisappear.value = false;
                isTeleport.value = false;
              }
            }
          );
          return;
        } else if (isOnlyRight.value) {
          const minRectRight = window.innerWidth - style.value!.rectBound.right;

          gsap.fromTo(
            el.target,
            {
              right: minRectRight + 14 * 1.8 + 'px',
              transform: 'translateX(0%) translateY(-50%) scale(1.3)'
            },
            {
              right: minRectRight - 14 + 'px',
              transform: `translateX(0%) translateY(calc(${
                style.value!.offsetHeight
              }px / (-2)))
            scale(1)`,
              duration: 0.3,
              onComplete: () => {
                isDisappear.value = false;
                isTeleport.value = false;
              }
            }
          );
          return;
        }

        gsap.fromTo(
          el.target,
          {
            transform: 'translateX(-50%) translateY(-50%) scale(1.3)'
          },
          {
            transform: `translateX(-50%) translateY(calc(${
              style.value!.offsetHeight
            }px / (-2)))
            scale(1)`,
            duration: 0.3,
            onComplete: () => {
              isDisappear.value = false;
              isTeleport.value = false;
            }
          }
        );
      });
    }
  },
  { deep: true }
);

const loadM3u8Video = async () => {
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

watch(showVideo, async () => {
  var videoEl = document.getElementById('video-player') as HTMLVideoElement;

  if (showVideo.value) {
    videoStates.isLoading = true;
    if (!videoEl) {
      await nextTick();
      // await wait(1000);
    }

    // video.value!.play().catch(() => {});
    loadM3u8Video();
  } else {
    if (video.value) {
      video.value.pause();
    }
  }
});

onBeforeRouteLeave(() => {
  isTeleport.value = false;
  if (video.value) {
    video.value.pause();
  }

  if (hls.value) {
    hls.value.destroy();
    hls.value = null;
  }
});

const getData = async () => {
  showVideo.value = true;
  dataMovie.value = dataMovie.value;

  // if (!dataMovie.value) {
  //   loading.value = true;

  //   if (props.isEpisodes) {
  //     // await useAsyncData(`tv/short/${dataMovie.value?.id}`, () =>
  //     //   getTvById(dataMovie.value?.id)
  //     // )
  //     await getTvById(dataMovie.value?.id)
  //       .then((response) => {
  //         dataMovie.value = response;
  //       })
  //       .catch((e) => {})
  //       .finally(() => {});
  //   } else {
  //     // await useAsyncData(`movie/short/${dataMovie.value?.id}`, () =>
  //     //   getMovieById(dataMovie.value?.id)
  //     // )
  //     await getMovieById(dataMovie.value?.id)
  //       .then((response) => {
  //         dataMovie.value = response;
  //       })
  //       .catch((e) => {})
  //       .finally(() => {});
  //   }

  //   setTimeout(() => {
  //     loading.value = false;
  //   }, 500);
  // }

  loading.value = true;

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
        .catch((e) => {})
        .finally(() => {});
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
        .catch((e) => {})
        .finally(() => {});
    }
  }

  loading.value = false;
};

watch(isTeleport, async () => {
  if (isTeleport.value == true) {
    getData();
  }
});

getData();

const onClickPreviewModal = async (e: any) => {
  // console.log(e.target?.closest('.ant-btn'));
  // if (!e.target?.closest('.ant-btn')) {
  //  await navigateTo({
  //     path: `/info-${dataMovie.value?.media_type}/${dataMovie.value?.id}`
  //   });
  // }
};

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
        dataMovie.value?.media_type
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

const getPopupContainer = () => document.querySelector('.preview-modal');

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

<style lang="scss" src="./PreviewModal.scss"></style>
<!-- <style lang="scss">
@import url('./PreviewModal.scss');
</style> -->

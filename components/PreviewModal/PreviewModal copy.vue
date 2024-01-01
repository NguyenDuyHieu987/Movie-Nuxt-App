<template>
  <Teleport
    v-if="isTeleportPreviewModal"
    to="#__nuxt"
  >
    <div class="preview-overlay">
      <div
        ref="previewModal"
        class="preview-modal"
        :class="{
          disappear: isDisappear,
          'only-left': isOnlyLeft,
          'only-right': isOnlyRight,
          'show-video': showVideo
        }"
        :style="`--dominant-backdrop-color: ${item.dominant_backdrop_color[0]}, ${item.dominant_backdrop_color[1]},${item.dominant_backdrop_color[2]}`"
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
                v-show="!showVideo"
                :src="getImage(item?.backdrop_path, 'backdrop', 'h-250')"
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
                  preload="metadata"
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
                    <svg
                      v-show="!videoStates.isVolumeOff"
                      name="ic:baseline-volume-up"
                      xmlns="http://www.w3.org/2000/svg"
                      width="1.8rem"
                      height="1.8rem"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      @click="onClickVolumeUp"
                    >
                      <path
                        d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"
                      />
                    </svg>

                    <svg
                      v-show="videoStates.isVolumeOff"
                      name="ic:baseline-volume-off"
                      xmlns="http://www.w3.org/2000/svg"
                      width="1.8rem"
                      height="1.8rem"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      @click="onClickVolumeOff"
                    >
                      <path
                        d="M16.5 12A4.5 4.5 0 0 0 14 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0 0 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27L7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.99 8.99 0 0 0 3.69-1.81L19.73 21L21 19.73l-9-9L4.27 3zM12 4L9.91 6.09L12 8.18V4z"
                      />
                    </svg>
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
                        path: isEpisodes
                          ? `/play-tv/${
                              item?.id
                            }${utils.convertPath.toPathInfo_Play(
                              item?.name
                            )}/tap-1`
                          : `/play-movie/${
                              item?.id
                            }${utils.convertPath.toPathInfo_Play(item?.name)}`
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

                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="2rem"
                            height="2rem"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
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

                        <svg
                          v-if="isAddToList"
                          xmlns="http://www.w3.org/2000/svg"
                          width="2rem"
                          height="2rem"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path
                            d="M9 16.17L4.83 12l-1.42 1.41L9 19L21 7l-1.41-1.41z"
                          />
                        </svg>

                        <svg
                          v-else
                          xmlns="http://www.w3.org/2000/svg"
                          width="2rem"
                          height="2rem"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z" />
                        </svg>
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
                      :title="item?.name"
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

                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="2rem"
                            height="2rem"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path
                              d="m21 12l-7-7v4C7 10 4 15 3 20c2.5-3.5 6-5.1 11-5.1V19l7-7Z"
                            />
                          </svg>
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
                        path: isEpisodes
                          ? `/info-tv/${
                              item?.id
                            }${utils.convertPath.toPathInfo_Play(item?.name)}`
                          : `/info-movie/${
                              item?.id
                            }${utils.convertPath.toPathInfo_Play(item?.name)}`
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

                          <svg
                            class="info-icon"
                            xmlns="http://www.w3.org/2000/svg"
                            width="2rem"
                            height="2rem"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path
                              d="M13.5 4A1.5 1.5 0 0 0 12 5.5A1.5 1.5 0 0 0 13.5 7A1.5 1.5 0 0 0 15 5.5A1.5 1.5 0 0 0 13.5 4m-.36 4.77c-1.19.1-4.44 2.69-4.44 2.69c-.2.15-.14.14.02.42c.16.27.14.29.33.16c.2-.13.53-.34 1.08-.68c2.12-1.36.34 1.78-.57 7.07c-.36 2.62 2 1.27 2.61.87c.6-.39 2.21-1.5 2.37-1.61c.22-.15.06-.27-.11-.52c-.12-.17-.24-.05-.24-.05c-.65.43-1.84 1.33-2 .76c-.19-.57 1.03-4.48 1.7-7.17c.11-.64.41-2.04-.75-1.94Z"
                            />
                          </svg>
                        </template>
                      </a-button>
                    </NuxtLink>
                  </el-tooltip>
                </div>
              </div>
              <div class="info">
                <!-- <h3 class="title">
                  {{ item?.name }}
                  <span v-if="isEpisodes">
                    {{
                      ' - Phần ' + dataMovie?.last_episode_to_air?.season_number
                    }}
                  </span>
                </h3> -->

                <div class="genres">
                  <span
                    v-for="(genre, index) in Array.from(
                      item?.genres,
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
                          item?.original_language,
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
import gsap from 'gsap';

import { LoadingSpinner } from '~/components/Loading';
import { getCountryByOriginalLanguage } from '~/services/country';
import { getImage } from '~/services/image';
import { getMovieById } from '~/services/movie';
import { getTvById } from '~/services/tv';
import { DEV_SERVER_VIDEO } from '~/services/video';

const props = defineProps<{
  isTeleportPreviewModal: boolean;
  item: any;
  dataMovie?: any;
  style: {
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
const dataMovie = ref<any>(props.dataMovie || {});
// const isEpisodes = ref<boolean>(false);
const loading = ref<boolean>(false);
const isAddToList = ref<boolean>(false);
const isInHistory = ref<boolean>(false);
const percent = ref<number>(0);
const previewModal = ref<any>(null);
const urlShare = computed<string>(
  (): string =>
    window.location.origin +
    (props.isEpisodes
      ? `/info-tv/${props.item?.id}${utils.convertPath.toPathInfo_Play(
          props.item?.name
        )}`
      : `/info-movie/${props.item?.id}${utils.convertPath.toPathInfo_Play(
          props.item?.name
        )}`)
);
const isTeleport = defineModel<boolean>('isTeleport');
const isDisappear = ref<boolean>(false);
const isOnlyLeft = ref<boolean>(false);
const isOnlyRight = ref<boolean>(false);
// const isTeleport = computed<boolean>({
//   get() {
//     return props.isTeleportPreviewModal;
//   },
//   set(value: boolean) {
//     emit('setIsTeleportModal', value);
//   },
// });
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

onMounted(() => {
  // window.addEventListener('pointermove', (e: any) => {
  //   // if (document.querySelector('.preview-modal') == null) return;
  //   if (isTeleport.value == true && !e.target.closest('.preview-modal')) {
  //     isDisappear.value = true;
  //     setTimeout(() => {
  //       isDisappear.value = false;
  //       isTeleport.value = false;
  //     }, 250);
  //   }
  // });

  showVideo.value = true;
});

watch(showVideo, () => {
  if (video.value) {
    if (showVideo.value) {
      showVideo.value = true;
      video.value!.play();
    } else {
      showVideo.value = false;
      video.value!.pause();
    }
  }
});

watch(previewModal, () => {
  if (previewModal.value) {
    previewModal.value.style.setProperty(
      '--width',
      props.style.offsetWidth + 'px'
    );
    previewModal.value.style.setProperty(
      '--height',
      props.style.offsetHeight + 'px'
    );
    previewModal.value.style.setProperty(
      '--img-height',
      props.style.imgHeight + 'px'
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

    if (props.style.rectBound.left <= minRecLeft) {
      // previewModal.value.style.setProperty(
      //   '--left',
      //   props.style.rectBound.left + 'px'
      // );

      // previewModal.value.style.transform = 'translateX(0%) translateY(-50%)';

      isOnlyLeft.value = true;

      previewModal.value.style.setProperty(
        '--left',
        props.style.rectBound.left + 'px'
      );

      previewModal.value.style.setProperty(
        '--left-only',
        props.style.rectBound.left * 1.15 + 'px'
      );

      previewModal.value.style.transform =
        'translateX(0%) translateY(-50%) scale(1.3)';
    } else {
      const minRectRight = window.innerWidth - props.style.rectBound.right;

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
        previewModal.value.style.setProperty('--left', props.style.left + 'px');
      }
    }

    previewModal.value.style.setProperty('--top', props.style.top + 'px');

    previewModal.value?.addEventListener('pointerenter', () => {
      if (!isTeleport.value) {
        isTeleport.value = true;
      }
    });

    previewModal.value.addEventListener('pointerleave', (el: any) => {
      isDisappear.value = true;
      showVideo.value = false;

      // setTimeout(() => {
      //   isDisappear.value = false;
      //   isTeleport.value = false;
      // }, 250);

      // gsap.fromTo(
      //   '.preview-modal',
      //   {
      //     width: '22vw',
      //     minWidth: 350,
      //   },
      //   {
      //     width: props.style.offsetWidth,
      //     minWidth: props.style.offsetWidth,
      //     maxHeight: props.style.offsetHeight,
      //     duration: 0.25,
      //     onComplete: () => {
      //       isDisappear.value = false;
      //       isTeleport.value = false;
      //     },
      //   }
      // );

      if (isOnlyLeft.value) {
        gsap.fromTo(
          '.preview-modal',
          {
            left: props.style.rectBound.left * 1.15 + 'px',
            // width: '17vw',
            // minWidth: 260,
            transform: 'translateX(0%) translateY(-50%) scale(1.3)'
          },
          {
            left: props.style.rectBound.left + 'px',
            // width: props.style.offsetWidth,
            // minWidth: props.style.offsetWidth,
            transform: `translateX(0%) translateY(calc(${props.style.offsetHeight}px / (-2)))
          scale(1)`,
            duration: 0.2,
            onComplete: () => {
              isDisappear.value = false;
              isTeleport.value = false;
            }
          }
        );
        return;
      } else if (isOnlyRight.value) {
        const minRectRight = window.innerWidth - props.style.rectBound.right;

        gsap.fromTo(
          '.preview-modal',
          {
            // width: '17vw',
            // minWidth: 260,
            right: minRectRight + 14 * 1.8 + 'px',
            transform: 'translateX(0%) translateY(-50%) scale(1.3)'
          },
          {
            right: minRectRight - 14 + 'px',
            // width: props.style.offsetWidth,
            // minWidth: props.style.offsetWidth,
            transform: `translateX(0%) translateY(calc(${props.style.offsetHeight}px / (-2)))
          scale(1)`,
            duration: 0.2,
            onComplete: () => {
              isDisappear.value = false;
              isTeleport.value = false;
            }
          }
        );
        return;
      }

      gsap.fromTo(
        '.preview-modal',
        {
          // width: '17vw',
          // minWidth: 260,
          transform: 'translateX(-50%) translateY(-50%) scale(1.3)'
        },
        {
          // width: props.style.offsetWidth,
          // minWidth: props.style.offsetWidth,
          transform: `translateX(-50%) translateY(calc(${props.style.offsetHeight}px / (-2)))
          scale(1)`,
          duration: 0.2,
          onComplete: () => {
            isDisappear.value = false;
            isTeleport.value = false;
          }
        }
      );
    });
  }
});

watch(isTeleport, async () => {
  if (isTeleport.value == true) {
    showVideo.value = true;
    dataMovie.value = props.dataMovie;

    if (!dataMovie.value?.id) {
      loading.value = true;
      if (props.isEpisodes) {
        // await useAsyncData(`tv/short/${props.item?.id}`, () =>
        //   getTvById(props.item?.id)
        // )
        await getTvById(props.item?.id)
          .then((tvResponse) => {
            dataMovie.value = tvResponse;
          })
          .catch((e) => {})
          .finally(() => {
            setTimeout(() => {
              loading.value = false;
            }, 500);
          });
      } else {
        // await useAsyncData(`movie/short/${props.item?.id}`, () =>
        //   getMovieById(props.item?.id)
        // )
        await getMovieById(props.item?.id)
          .then((movieRespone) => {
            dataMovie.value = movieRespone;
          })
          .catch((e) => {})
          .finally(() => {
            setTimeout(() => {
              loading.value = false;
            }, 500);
          });
      }

      if (authStore.isLogin) {
        if (dataMovie.value?.in_list) {
          isAddToList.value = true;
        }

        if (dataMovie.value?.history_progress) {
          isInHistory.value = true;
          percent.value = dataMovie.value?.history_progress?.percent;
        }
      }
    } else {
      if (authStore.isLogin) {
        if (dataMovie.value?.in_list) {
          isAddToList.value = true;
        }

        if (dataMovie.value?.history_progress) {
          isInHistory.value = true;
          percent.value = dataMovie.value?.history_progress?.percent;
        }
      }
    }
  }
});

const actionBtn = ref<any>(null);

const onClickPreviewModal = (e: any) => {
  if (!actionBtn.value) {
    navigateTo({
      path: props.isEpisodes
        ? `/info-tv/${props.item?.id}${utils.convertPath.toPathInfo_Play(
            props.item?.name
          )}`
        : `/info-movie/${props.item?.id}${utils.convertPath.toPathInfo_Play(
            props.item?.name
          )}`
    });
  }
};

const handleAddToList = (e: any) => {
  if (!authStore?.isLogin) {
    authStore.isOpenRequireAuthDialog = true;
    return;
  }

  if (!isAddToList.value) {
    isAddToList.value = true;
    if (
      !utils.handleAddItemToList(dataMovie.value?.id, props.item?.media_type)
    ) {
      isAddToList.value = false;
    }
  } else {
    isAddToList.value = false;
    if (
      !utils.handleRemoveItemFromList(
        dataMovie.value?.id,
        props.item?.media_type
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

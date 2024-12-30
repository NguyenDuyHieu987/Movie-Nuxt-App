<template>
  <div class="video-player-wrapper">
    <div
      v-if="settingStates.switchBackgroud"
      class="overlay-backdrop"
    >
      <!-- <canvas ref="canvasOverlayBackdrop"> </canvas> -->
      <NuxtImg
        :src="backdrop"
        format="avif"
        loading="lazy"
        alt=""
      />
    </div>

    <div
      ref="videoPlayer"
      class="video-player"
      :class="{
        scrubbing: videoStates.isScrubbingProgressBar,
        'hide-controls': videoStates.isHideControls,
        'show-controls': videoStates.isShowControls,
        pause: !videoStates.isPlayVideo || videoStates.isEndedVideo,
        'full-screen': videoStates.isFullScreen,
        settings: settingStates.enable
      }"
      @click="handleClickVideoPlayer"
    >
      <div class="ratio-16-9"></div>
      <div
        class="box-video"
        v-show="!loadingData"
      >
        <!-- :src="videoSrc" -->
        <video
          v-if="isEligibleToWatch"
          id="video-player"
          ref="video"
          :poster="backdrop"
          @loadstart="onLoadStartVideo"
          @loadeddata="onLoadedDataVideo"
          @canplay="onCanPlayVideo"
          @timeupdate="onTimeUpdateVideo"
          @ended="onEndedVideo"
          @waiting="onWaitingVideo"
          @progress="onProgressVideo"
          @play="onPlayVideo"
          @pause="onPauseVideo"
          @playing="onPLayingVideo"
          :playsinline="true"
        >
          <!-- <source src="blobVideoSrc" ref="srcVideo" type="video/mp4" /> -->
        </video>

        <div
          v-else
          class="prevent-notification"
        >
          <!-- <div class="ratio-16-9"></div> -->
          <div
            v-if="!ísWatchable"
            class="prevent-notification-wrapper"
          >
            <div
              v-if="videoStates.isLoadError.enable"
              class="load-error"
            >
              <div class="load-error-message">
                <p>
                  Gặp sự cố trong quá trình tải video. Chúng tôi sẽ khắc phục sự
                  cố sớm nhất có thể.
                </p>
                <p>
                  <strong>{{ videoStates.isLoadError.type }}: </strong>
                  {{ videoStates.isLoadError.reason }}
                </p>
              </div>
            </div>
            <div
              class="end-live"
              v-else-if="isEndedBroadcast"
            >
              <p>Buổi công chiếu đã kết thúc</p>
            </div>
            <div
              class="coundown-remaining"
              v-else-if="timeRemaining > 0"
            >
              <p>Phim sẽ công chiếu sau:</p>
              <strong class="coundown-remaining-message">
                <!-- <span v-if="days != 0">{{ days.toString().padStart(2, '0') }} ngày, </span>
                <span>{{ hours.toString().padStart(2, '0') }} giờ, </span>
                <span>{{ minutes.toString().padStart(2, '0') }} phút, </span>
                <span>{{ seconds.toString().padStart(2, '0') }} giây </span> -->
                <span v-if="days != 0">
                  {{ days.toString().padStart(2, '0') }} ngày,
                </span>
                <span>{{ hours.toString().padStart(2, '0') }} : </span>
                <span>{{ minutes.toString().padStart(2, '0') }} : </span>
                <span>{{ seconds.toString().padStart(2, '0') }} </span>
                <!-- <span> nữa</span> -->
              </strong>
            </div>
          </div>
          <div
            v-else
            class="prevent-notification-wrapper"
          >
            <div class="require-vip">
              <div
                v-if="authStore.vipNumber == 0"
                class="require-vip-message"
              >
                <span>
                  Bạn cần nâng cấp tài khoản lên
                  <strong>VIP {{ movieVipNumber }}</strong> để tiếp tục xem
                  phim.
                </span>
                <NuxtLink
                  class="underline"
                  :to="{
                    path: `/upgrade/plans`,
                    query: {
                      order: movieVipNumber
                    }
                  }"
                >
                  Nâng cấp ngay
                </NuxtLink>
              </div>
              <div
                v-else
                class="require-vip-message"
              >
                <span>
                  Bạn cần nâng cấp tài khoản lên
                  <strong>VIP {{ movieVipNumber }}</strong> để tiếp tục xem phim
                </span>
                <NuxtLink
                  class="underline"
                  :to="{
                    path: `/upgrade/plans`,
                    query: {
                      order: movieVipNumber
                    }
                  }"
                >
                  Nâng cấp ngay
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="float-center">
        <div
          v-show="
            (videoStates.isLoading &&
              !videoStates.isEndedVideo &&
              !videoStates.isRewind.enable) ||
            ((!mounted || loadingData) && !isEndedBroadcast)
          "
          class="loading-video"
        >
          <LoadingSpinner />
        </div>

        <!-- <div
          v-if="isEligibleToWatch"
          v-show="videoStates.isEndedVideo"
          class="replay"
        >
          <SvgoReplay
            width="4rem"
            height="4rem"
            fill="currentColor"
            @click="onClickReplayVideo"
          />

          <span @click="onClickReplayVideo"> Phát lại </span>
        </div> -->

        <!-- <div
          v-if="isEligibleToWatch"
          v-show="
            videoStates.isShowNotify && isInHistory && !videoStates.isLoading
          "
          class="notify-keep-watching"
        >
          <CloseBtn
            class="transparent close-notify"
            @click="videoStates.isShowNotify = false"
          />

          <div class="notify-played">
            <span>
              Bạn đã xem đến:
              {{ formatDuration(historyProgress.seconds) }}
            </span>
          </div>

          <div class="notify-actions">
            <a-button
              class="click-active"
              type="text"
              @click="onClickPlayAgain"
            >
              Xem lại từ đầu
            </a-button>
            <a-button
              v-show="video!?.duration - historyProgress.seconds > 10"
              class="click-active"
              type="text"
              @click="onClickKeepWatching"
            >
              Xem tiếp
            </a-button>
          </div>
        </div> -->
      </div>

      <div
        v-if="isEligibleToWatch"
        class="overlay-controls-animation"
        :class="{
          active: videoStates.isActiveControlsAnimation,
          rewind: videoStates.isRewind.enable
        }"
      >
        <div class="box-icon">
          <div
            v-show="!videoStates.isRewind.enable"
            class="play-pause"
          >
            <SvgoPlay
              v-show="!videoStates.isPlayVideo && !videoStates.isEndedVideo"
              class="play"
              width="3rem"
              height="3rem"
              fill="currentColor"
              @click="onClickVideo"
            />

            <SvgoPause
              v-show="videoStates.isPlayVideo && !videoStates.isEndedVideo"
              class="play"
              width="3rem"
              height="3rem"
              fill="currentColor"
              @click="onClickVideo"
            />
          </div>

          <div
            v-show="videoStates.isRewind.enable"
            class="rewind-forward"
          >
            <span v-show="videoStates.isRewind.replay">-10</span>
            <span v-show="videoStates.isRewind.forward">+10</span>
          </div>
        </div>
      </div>

      <div
        v-if="isEligibleToWatch"
        ref="timeline"
        class="timeline"
        :class="{
          active:
            videoStates.isMouseMoveOverlayProgress ||
            videoStates.isScrubbingProgressBar
        }"
      >
        <div class="timeline-container">
          <div class="img-box ratio-16-9">
            <canvas
              ref="canvasPreviewImg"
              class="canvas-preview-img"
            >
            </canvas>
            <!-- <NuxtImg class="preview-img" format="avif" loading="lazy" alt="" /> -->
          </div>
        </div>
        <span class="timeline-indicator">{{ timelineUpdate }} </span>
      </div>

      <!-- v-show="videoStates.isLoaded || mounted" -->
      <div
        v-if="isEligibleToWatch"
        class="controls"
        :class="{
          scrubbing: videoStates.isScrubbingProgressBar
        }"
        tabindex="-1"
        @keydown="onKeyDownVideo"
      >
        <div class="controls-container">
          <div
            ref="overlayProgress"
            class="overlay-progress"
            @pointermove="onMouseMoveProgressBar"
            @touchmove="onTouchMoveProgressBar"
            @pointerdown="onMouseDownProgressBar"
            @touchstart="onTouchStartProgressBar"
            @pointerup="onMouseUpProgressBar"
            @touchend="onTouchEndProgressBar"
            @pointerleave="onMouseLeaveProgressBar"
          >
            <div class="overlay-progress-padding"></div>

            <div class="preview-progress"></div>

            <div class="seekable-progress"></div>

            <div
              ref="progressBar"
              class="progress-bar"
            >
              <div class="scrubber-point"></div>
            </div>
          </div>

          <div class="main-controls">
            <div class="left">
              <div class="play-pause">
                <SvgoReplay
                  v-show="videoStates.isEndedVideo"
                  class="replay"
                  width="2.6rem"
                  height="2.6rem"
                  fill="currentColor"
                  @click="onClickReplayVideo"
                />

                <SvgoPlay
                  v-show="!videoStates.isPlayVideo && !videoStates.isEndedVideo"
                  class="play"
                  width="2.6rem"
                  height="2.6rem"
                  fill="currentColor"
                  @click="onClickPlay"
                />

                <SvgoPause
                  v-show="videoStates.isPlayVideo && !videoStates.isEndedVideo"
                  class="pause"
                  width="2.6rem"
                  height="2.6rem"
                  fill="currentColor"
                  @click="onClickPause"
                />
              </div>

              <div class="rewind-forward">
                <SvgoRewind
                  class="rewind"
                  width="2.6rem"
                  height="2.6rem"
                  fill="currentColor"
                  @click="onClickRewind"
                />
              </div>

              <div class="volume">
                <div>
                  <SvgoVolumeDown
                    v-show="!videoStates.isVolumeOff && volume <= 30"
                    class="volume-down"
                    width="2.7rem"
                    height="2.7rem"
                    fill="currentColor"
                    @click="onClickVolumeUp"
                  />

                  <SvgoVolumeUp
                    v-show="!videoStates.isVolumeOff && volume > 30"
                    name="ic:baseline-volume-up"
                    width="2.7rem"
                    height="2.7rem"
                    fill="currentColor"
                    @click="onClickVolumeUp"
                  />

                  <!-- <SvgoVolumeOff -->
                  v-show="videoStates.isVolumeOff" name="ic:baseline-volume-off"
                  width="2.7rem" height="2.7rem" fill="currentColor"
                  @click="onClickVolumeOff" />
                </div>
                <!-- <a-slider
                  class="volume-slider"
                  :class="{ muted: videoStates.isVolumeOff }"
                  v-model:value="volume"
                  :tooltip="{ open: false }"
                  @change="onChangeVolume(volume)"
                /> -->

                <el-slider
                  v-model="volume"
                  class="volume-slider"
                  :class="{
                    muted: videoStates.isVolumeOff,
                    changing: videoStates.isChangingVolume
                  }"
                  :debounce="0"
                  @input="onChangeVolume(volume)"
                  @change="onChangeVolume(volume)"
                />
              </div>

              <div class="timeupdate-duration">
                <span class="timeupdate">{{ timeUpdate }} </span>
                <span class="separate"> / </span>
                <span class="duration">{{ duration }} </span>
              </div>
            </div>

            <div class="right">
              <div class="rewind-forward">
                <SvgoFastRewind
                  width="2.7rem"
                  height="2.7rem"
                  fill="currentColor"
                  @click="onClickRewind"
                />

                <SvgoFastForward
                  width="2.7rem"
                  height="2.7rem"
                  fill="currentColor"
                  @click="onClickForward"
                />
              </div>

              <div
                class="setting"
                :class="{ active: settingStates.enable }"
              >
                <SvgoSetting
                  class="setting"
                  width="2.5rem"
                  height="2.5rem"
                  fill="currentColor"
                  @click="
                    settingStates.enable = !settingStates.enable;
                    onCloseSettings();
                  "
                />
              </div>

              <div class="picture-in-picture">
                <SvgoPictureInPicture
                  width="2.7rem"
                  height="2.7rem"
                  fill="currentColor"
                  @click="onClickPictureInPicture"
                />
              </div>

              <div class="fullscreen-exit">
                <SvgoFullscreen
                  v-show="!videoStates.isFullScreen"
                  class="fullscreen"
                  width="3.3rem"
                  height="3.3rem"
                  fill="currentColor"
                  @click="onClickFullScreen"
                />

                <SvgoFullscreenExit
                  v-show="videoStates.isFullScreen"
                  width="3.3rem"
                  height="3.3rem"
                  fill="currentColor"
                  @click="onClickFullScreenExit"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="isEligibleToWatch"
        class="video-mask"
        tabindex="-1"
        @click="onClickVideo"
        @pointermove="onMouseMoveVideo"
        @touchmove="onMouseMoveVideo"
        @pointerleave="onMouseLeaveVideo"
        @keydown="onKeyDownVideo"
      ></div>

      <div
        v-if="!loadingData && isEligibleToWatch"
        class="background-controls"
        :style="{
          // backgroundImage: `url(${getImage(
          //   'background-gradient-opacity.png',
          //   'background/gradient'
          // )})`
          backgroundImage: `url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAACbCAYAAACj6PGsAAAAAXNSR0IArs4c6QAAAPVJREFUOE9lyNdHBQAARvHb3nvvuu2997jNe29TJJEkkkgSSSSJJJFEEkkiSfRH5rycl76Hn+MLBP4thidW4qh4SJBEKkmSqRRJpdIkncqATMmisiWHypU8Kl8KqEIokmKqREqpMimnKqSSqoJqqaGCUkvVST3VII1UEzRLC9UqbVS7dFCd0CXdVI/0Un3STw3IIDUEwzJCjcoYNS4TVEgmqSmZpmZgVuaosESoqMxTC7AoS9QyrMAqrME6bMAmbME27MAu7ME+HMAhHMExnMApnME5XMAlXME13MAt3ME9PMAjPMEzvMArvME7fMAnfME3/MDvH+JDJTFIrPkwAAAAAElFTkSuQmCC)`
        }"
      ></div>

      <div
        v-if="isEligibleToWatch"
        class="settings"
        :class="{
          active: settingStates.enable && !videoStates.isHideControls,
          general: !settingStates.subSetting.enable,
          'sub-setting': settingStates.subSetting.enable
        }"
      >
        <div
          v-show="!settingStates.subSetting.enable"
          class="setting-options"
        >
          <div
            class="setting-item switch-background"
            @click="
              settingStates.switchBackgroud = !settingStates.switchBackgroud
            "
          >
            <div class="left">
              <!-- <Icon name="ic:outline-light-mode" /> -->

              <SvgoLightMode
                width="2rem"
                height="2rem"
                fill="currentColor"
              />
              <span>Nền sáng</span>
            </div>
            <div class="right">
              <a-switch
                v-model:checked="settingStates.switchBackgroud"
                @click="
                  settingStates.switchBackgroud = !settingStates.switchBackgroud
                "
              />
            </div>
          </div>
          <div
            class="setting-item playback"
            @click="
              settingStates.subSetting.enable = true;
              settingStates.subSetting.playback = true;
            "
          >
            <div class="left">
              <!-- <Icon name="ic:baseline-fast-forward" /> -->

              <SvgoFastForward
                width="2rem"
                height="2rem"
                fill="currentColor"
              />
              <span>Tốc độ phát</span>
            </div>

            <div class="right">
              <span>{{ settings.playback.current }}</span>
              <!-- <Icon name="ic:baseline-arrow-forward-ios" /> -->

              <SvgoArrowForwardIos
                width="1.5rem"
                height="1.5rem"
                fill="currentColor"
              />
            </div>
          </div>

          <div
            class="setting-item quality"
            @click="
              settingStates.subSetting.enable = true;
              settingStates.subSetting.quality = true;
            "
          >
            <div class="left">
              <!-- <Icon name="ic:baseline-high-quality" /> -->

              <SvgoHighQuality
                width="2rem"
                height="2rem"
                fill="currentColor"
              />
              <span>Chất lượng</span>
            </div>

            <div class="right">
              <span>{{ settings.quality.current }}</span>
              <!-- <Icon name="ic:baseline-arrow-forward-ios" /> -->

              <ArrowForwardIos
                width="1.5rem"
                height="1.5rem"
                fill="currentColor"
              />
            </div>
          </div>
        </div>

        <div
          v-show="settingStates.subSetting.enable"
          class="sub-setting"
          :class="{
            playback: settingStates.subSetting.playback,
            quality: settingStates.subSetting.quality
          }"
        >
          <div
            v-show="settingStates.subSetting.playback"
            class="sub-setting-item play-back"
          >
            <div
              class="header"
              @click="
                settingStates.subSetting.enable = false;
                settingStates.subSetting.playback = false;
              "
            >
              <div class="left">
                <!-- <Icon name="ic:baseline-arrow-back-ios" /> -->

                <SvgoArrowBackIos
                  width="1.4rem"
                  height="1.4rem"
                  fill="currentColor"
                />
                <span>Tốc độ phát</span>
              </div>
              <div class="right">
                <span>Tùy chỉnh</span>
              </div>
            </div>

            <ul class="menu">
              <li
                v-for="(item, index) in settings.playback.all"
                :key="index"
                :class="{ active: settings.playback.current == item }"
                @click="onClickItemPlayback(item)"
              >
                <!-- <Icon
                  v-if="settings.playback.current == item"
                  name="ic:baseline-check"
                /> -->

                <SvgoCheck
                  v-if="settings.playback.current == item"
                  width="1.8rem"
                  height="1.8rem"
                  fill="currentColor"
                />
                <span> {{ item }}</span>
              </li>
            </ul>
          </div>

          <div
            v-show="settingStates.subSetting.quality"
            class="sub-setting-item quality"
          >
            <div
              class="header"
              @click="
                settingStates.subSetting.enable = false;
                settingStates.subSetting.quality = false;
              "
            >
              <div class="left">
                <!-- <Icon name="ic:baseline-arrow-back-ios" /> -->

                <SvgoArrowBackIos
                  width="1.4rem"
                  height="1.4rem"
                  fill="currentColor"
                />
                <span>Chất lượng</span>
              </div>
            </div>

            <ul class="menu">
              <li
                v-for="(item, index) in settings.quality.all"
                :key="index"
                :class="{ active: settings.quality.current == item }"
                @click="settings.quality.current = item"
              >
                <!-- <Icon
                  v-if="settings.quality.current == item"
                  name="ic:baseline-check"
                /> -->

                <SvgoCheck
                  v-if="settings.quality.current == item"
                  width="1.8rem"
                  height="1.8rem"
                  fill="currentColor"
                />
                <span> {{ item }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import SvgoReplay from '~/assets/svgs/icons/replay.svg?component';
// import SvgoPlay from '~/assets/svgs/icons/play.svg?component';
// import SvgoPause from '~/assets/svgs/icons/pause.svg?component';
// import SvgoRewind from '~/assets/svgs/icons/rewind.svg?component';
// import SvgoVolumeUp from '~/assets/svgs/icons/volume-up.svg?component';
// import SvgoVolumeDown from '~/assets/svgs/icons/volume-down.svg?component';
// import SvgoVolumeOff from '~/assets/svgs/icons/volume-off.svg?component';
// import SvgoFastRewind from '~/assets/svgs/icons/fast-rewind.svg?component';
// import SvgoFastForward from '~/assets/svgs/icons/fast-forward.svg?component';
// import SvgoSetting from '~/assets/svgs/icons/setting.svg?component';
// import SvgoPictureInPicture from '~/assets/svgs/icons/picture-in-picture.svg?component';
// import SvgoFullscreen from '~/assets/svgs/icons/fullscreen.svg?component';
// import SvgoFullscreenExit from '~/assets/svgs/icons/fullscreen-exit.svg?component';
// import SvgoLightMode from '~/assets/svgs/icons/light-mode.svg?component';
// import SvgoArrowForwardIos from '~/assets/svgs/icons/arrow-forward-ios.svg?component';
// import SvgoHighQuality from '~/assets/svgs/icons/high-quality.svg?component';
// import SvgoArrowBackIos from '~/assets/svgs/icons/arrow-back-ios.svg?component';
// import SvgoCheck from '~/assets/svgs/icons/check.svg?component';

// import { CloseBtn } from '~/components/Button';
// import { LoadingSpinner } from '~/components/Loading';
// import CloseBtn from '~/components/Button/CloseBtn/CloseBtn.vue';
// import LoadingSpinner from '~/components/Loading/LoadingSpinner/LoadingSpinner.vue';
// import { getImage } from '~/services/image';
import { getVideo } from '~/services/video';
import { useLocalStorage } from '@vueuse/core';
import Hls from 'hls.js';

const props = withDefaults(
  defineProps<{
    dataBroadcast: any;
    loadingData: boolean;
    backdrop: string;
    videoUrl: string;
  }>(),
  {
    loadingData: true
  }
);

const emits = defineEmits<{
  onPlay: [e: any];
  onTimeUpdate: [e: any];
  onEndedBroadcast: [data: boolean];
}>();

const nuxtConfig = useRuntimeConfig();
const authStore = useAuthStore();
const route = useRoute();
const dataMovie = computed<any>(() => props.dataBroadcast.movieData);
const dataEpisode = computed<any>(() => props.dataBroadcast.episodeData);
const movieVipNumber = computed<number>(
  () => dataEpisode.value?.vip || dataMovie.value?.vip || 0
);
const isEligibleToWatch = computed<boolean>(
  () =>
    !props.loadingData &&
    (movieVipNumber.value == 0 ||
      authStore.vipNumber! >= movieVipNumber.value) &&
    timeRemaining.value <= 0 &&
    !isEndedBroadcast.value
);
const ísWatchable = computed<boolean>(
  () =>
    !(
      videoStates.isLoading &&
      !videoStates.isEndedVideo &&
      !videoStates.isRewind.enable
    ) &&
    !mounted.value &&
    !props.loadingData &&
    !isEndedBroadcast.value &&
    timeRemaining.value <= 0 &&
    !videoStates.isLoadError.enable
);
const videoSrc = computed<string>(() =>
  getVideo(
    props.videoUrl.endsWith('.m3u8') ? props.videoUrl : props.videoUrl + '.m3u8'
  )
);
const videoPlayerStorageStates = useLocalStorage(
  STORAGE.VIDEO_PLAYER_STATES.KEY,
  {
    [STORAGE.VIDEO_PLAYER_STATES.VOLUME]: 100,
    [STORAGE.VIDEO_PLAYER_STATES.MUTED]: false
  }
);
const blobVideoSrc = ref<string>('');
const videoPlayer = ref<HTMLElement>();
const video = ref<HTMLVideoElement>();
const overlayProgress = ref<HTMLElement>();
const progressBar = ref<HTMLElement>();
const timeline = ref<HTMLElement>();
const canvasPreviewImg = ref();
const isInHistory = defineModel<boolean>('isInHistory', { default: false });
const historyProgress = defineModel<{
  duration: number;
  percent: number;
  seconds: number;
}>('historyProgress', {
  default: {
    duration: 0,
    percent: 0,
    seconds: 0
  }
});
const videoStates = reactive({
  isLoading: false,
  isLoaded: false,
  isLoadError: {
    enable: false,
    message: '',
    type: '',
    reason: ''
  },
  isPlayVideo: true,
  isScrubbingProgressBar: false,
  isFullScreen: false,
  isChangingVolume: false,
  isVolumeOff:
    videoPlayerStorageStates.value[STORAGE.VIDEO_PLAYER_STATES.MUTED] || false,
  isEndedVideo: false,
  isMouseMoveOverlayProgress: false,
  isHideControls: false,
  isShowControls: false,
  isShowNotify: isInHistory.value || false,
  isActiveControlsAnimation: false,
  isRewind: {
    enable: false,
    replay: false,
    forward: false
  }
});
const settingStates = reactive({
  enable: false,
  switchBackgroud: true,
  subSetting: {
    enable: false,
    playback: false,
    quality: false
  }
});
const settings = reactive({
  playback: {
    all: ['0.25', '0.5', '0.75', 'Bình thường', '1.25', '1.5', '1.75', '2'],
    current: 'Bình thường'
  },
  quality: {
    all: [
      '2560p - 4K',
      '1440p - 2K',
      '1080p - HD',
      '720p',
      '480p',
      '360p',
      'Tự động'
    ],
    current: '1080p - HD'
  }
});
const volume = ref<number>(
  (videoPlayerStorageStates.value[
    STORAGE.VIDEO_PLAYER_STATES.VOLUME
  ] as number) || 100
);
const timeUpdate = ref<string>('0:00');
const timelineUpdate = ref<string>('0:00');
const duration = ref<string>('00:00');
const elapsedSeconds = ref<number>(0);
const timeOutShowControls = ref<any>();
const timeOutVolumeChange = ref<any>();
const mounted = ref<boolean>(false);
const hls = ref<Hls | null>();
// const startTime = computed<number>(()=>new Date('2024-12-15T15:25:00').getTime());
const startTime = computed<number>(() =>
  new Date(props.dataBroadcast.release_time).getTime()
);
const timerCountdown = ref<NodeJS.Timeout | null>(null);
const timeRemaining = ref<number>(1);
const days = computed<number>(() =>
  Math.floor(timeRemaining.value / (1000 * 60 * 60 * 24))
);
const hours = computed<number>(() =>
  Math.floor((timeRemaining.value % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
);
const minutes = computed<number>(() =>
  Math.floor((timeRemaining.value % (1000 * 60 * 60)) / (1000 * 60))
);
const seconds = computed<number>(() =>
  Math.floor((timeRemaining.value % (1000 * 60)) / 1000)
);
const isEndedBroadcast = ref<boolean>(false);

const loadM3u8Video = async () => {
  // if (Hls.isSupported()) {
  //   const hls = new Hls();
  //   console.log(videoSrc.value);
  //   hls.on(Hls.Events.ERROR, (event, data) => {
  //     console.error(`hls.js error: ${data.type} - ${data.details}`);
  //   });
  //   hls.loadSource(
  //     'http://localhost:5002/static/videos/feature/Transformer_5/Transformer_5.m3u8'
  //   );
  //   hls.attachMedia(video.value!);
  //   console.log('HLS.js is supported');
  // } else {
  //   console.error('HLS is not supported on your browser, but native HLS is');
  // }

  var videoElment = document.getElementById('video-player') as HTMLVideoElement;

  if (!video.value && videoElment) {
    video.value = videoElment;
  }

  if (!video.value) return;

  video.value!.muted = true;

  if (Hls.isSupported()) {
    if (!hls.value) hls.value = new Hls();

    hls.value.on(Hls.Events.ERROR, function (event, data) {
      if (data.fatal) {
        // console.error('HLS error:', data);
        videoStates.isLoadError.enable = true;
        videoStates.isLoadError.type = `${data.type}`;
        videoStates.isLoadError.reason = `${data.reason}`;
        videoStates.isLoadError.message = `${data.type}: ${data.reason}`;
        videoStates.isPlayVideo = false;
        videoStates.isLoading = false;
      }
    });

    hls.value.loadSource(videoSrc.value);
    hls.value.attachMedia(video.value!);
    return new Promise((resolve, reject) => {
      hls.value!.on(Hls.Events.MANIFEST_PARSED, async function () {
        // console.log('play');
        const now = Date.now();

        const elapsedSeconds = Math.floor((now - startTime.value) / 1000);

        if (elapsedSeconds < video.value!.duration) {
          video
            .value!.play()
            .then(() => {
              resolve(true);
            })
            .catch((err) => {
              // console.log(err);
              if (videoStates.isPlayVideo) {
                videoStates.isPlayVideo = false;
              }
              reject(err);
            });

          if (videoStates.isLoadError.enable) {
            videoStates.isLoadError.enable = false;
          }
        } else {
          isEndedBroadcast.value = true;
          videoStates.isLoading = false;
          resolve(true);
        }
      });
    });
  } else if (video.value?.canPlayType('application/vnd.apple.mpegurl')) {
    video.value!.src = videoSrc.value;
    return new Promise((resolve, reject) => {
      video.value!.addEventListener('loadedmetadata', function () {
        video
          .value!.play()
          .then(() => {
            resolve(true);
          })
          .catch((err) => {
            if (videoStates.isPlayVideo) {
              videoStates.isPlayVideo = false;
            }
            reject(err);
          });
      });
    });
  } else {
    console.error('HLS is not supported.');
  }
};

watch(
  () => dataEpisode.value,
  async (newVal, oldVal) => {
    if (!isEligibleToWatch.value) return;

    await nextTick();

    if (dataMovie.value?.media_type == 'tv' && newVal && video.value) {
      loadM3u8Video();

      // video.value!.pause();
      // video.value!.src = videoSrc.value;
      // video.value!.load();

      if (videoStates.isPlayVideo == false) {
        videoStates.isPlayVideo = true;
      }
    }
  }
  // { immediate: true }
);

watch(
  isInHistory,
  () => {
    if (isInHistory.value) {
      // videoStates.isShowNotify = true;
    }
  },
  { immediate: true }
);

watch(
  () => props.dataBroadcast,
  (newVal) => {
    if (dataMovie.value) {
      const now = Date.now();

      const elapsedSeconds = Math.floor((now - startTime.value) / 1000);

      timeRemaining.value = startTime.value - now;

      if (elapsedSeconds >= dataMovie.value.runtime) {
        isEndedBroadcast.value = true;
        videoStates.isLoading = false;
      }
    }
  },
  { immediate: true }
);

watch(
  () => isEndedBroadcast.value,
  () => {
    emits('onEndedBroadcast', isEndedBroadcast.value);
  },
  {
    immediate: true
  }
);

const windowPointerUp = () => {
  if (videoStates.isScrubbingProgressBar) {
    if (videoStates.isPlayVideo) {
      video.value!.play();
    }
  }

  videoStates.isScrubbingProgressBar = false;
};

const windowTouchEnd = () => {
  videoStates.isScrubbingProgressBar = false;
  videoStates.isShowControls = false;
  videoStates.isMouseMoveOverlayProgress = false;

  if (videoStates.isLoaded) {
    if (videoStates.isEndedVideo || videoStates.isLoading) {
      return;
    }

    if (videoStates.isPlayVideo) {
      video.value!.play();
    }
  }
};

const clearVideoPlayer = () => {
  clearInterval(timerCountdown.value!);

  if (!isEligibleToWatch.value && !video.value) return;

  if (!video.value!.paused) {
    video.value!.pause();
  }

  if (hls.value) {
    hls.value.destroy();
    hls.value = null;
  }

  window.removeEventListener('pointerup', windowPointerUp);
  window.removeEventListener('touchend', windowTouchEnd);
  video.value!.removeEventListener('progress', onProgressVideo);
};

onBeforeUnmount(() => {
  clearVideoPlayer();
});

onUnmounted(() => {
  clearVideoPlayer();
});

onBeforeRouteLeave(() => {
  clearVideoPlayer();
});

onBeforeMount(() => {});

onMounted(async () => {
  // calculateTimeRemaining();
  if (timeRemaining.value > 0) {
    timerCountdown.value = setInterval(calculateTimeRemaining, 1000);
  }

  await loadM3u8Video();

  // watch(
  //   () => isEndedBroadcast.value,
  //   () => {
  //     if (isEndedBroadcast.value) {
  //       emits('onEndedBroadcast', isEndedBroadcast.value);
  //       return;
  //     }
  //   }
  // );

  mounted.value = true;

  if (isEndedBroadcast.value) return;

  if (!isEligibleToWatch.value) return;

  if (video.value!.autoplay) {
    video.value!.autoplay = false;
  }

  if (videoStates.isVolumeOff == true) {
    video.value!.muted = true;
  }

  // if (video.value!.paused == true) {
  //   const event = new Event('canplay');
  //   video.value!.dispatchEvent(event);
  // }

  if (videoStates.isPlayVideo == false) {
    videoStates.isPlayVideo = true;
  }

  videoPlayer.value?.scrollIntoView({
    block: 'end',
    behavior: 'instant'
  });

  // duration.value = formatDuration(video.value!.duration)!;

  const now = Date.now();
  // startTime = now - 2 * 60 * 1000;

  elapsedSeconds.value = Math.floor((now - startTime.value) / 1000);

  duration.value = formatDuration(elapsedSeconds.value);

  if (video.value) {
    video.value.currentTime = elapsedSeconds.value;
    updateVideoPlayback();
  }

  window.addEventListener('pointerup', windowPointerUp);

  window.addEventListener('touchend', windowTouchEnd);

  window.addEventListener('pointermove', (e) => {
    if (videoStates.isScrubbingProgressBar) {
      handleTimeUpdate(e);
    }
  });

  window.addEventListener('touchmove', (e) => {
    if (videoStates.isScrubbingProgressBar) {
      videoStates.isShowControls = true;
      [...e.changedTouches].forEach((touch) => {
        handleTimeUpdate({ x: touch.pageX });
      });
    }
  });

  window.addEventListener('click', (e: any) => {
    if (settingStates.enable) {
      if (
        !e.target.closest('.video-player .settings') &&
        !e.target.closest(
          '.video-player .controls .main-controls .right svg.setting'
        )
      ) {
        settingStates.enable = false;
        onCloseSettings();
      }
    }
  });
});

const calculateTimeRemaining = async () => {
  if (isEligibleToWatch.value && timerCountdown.value) {
    clearInterval(timerCountdown.value);
    return;
  }
  const now = new Date().getTime();
  timeRemaining.value = startTime.value - now;
  if (timeRemaining.value <= 0) {
    await nextTick();
    await loadM3u8Video();
  }
};

const handleTimeUpdate = (e: any) => {
  if (videoStates.isPlayVideo) {
    video.value!.pause();
  }

  const rect = overlayProgress.value!.getBoundingClientRect();

  const percent =
    Math.min(Math.max(0, e.x - rect.left), rect.width) / rect.width;

  progressBar.value!.style.setProperty('--progress-width', percent.toString());

  // video.value!.currentTime = percent * video.value!.duration;

  // videoStates.isEndedVideo = video.value!.currentTime == video.value!.duration;

  video.value!.currentTime = percent * elapsedSeconds.value;

  videoStates.isEndedVideo = video.value!.currentTime == elapsedSeconds.value;

  drawTimeLine(e);
};

const formatDuration = (time: number): string => {
  if (isNaN(time)) {
    return '00:00';
  }

  // const hours: number | string = Math.floor(time / 3600);
  // let mins: number | string = Math.floor(time / 60);
  // let seconds: number | string = Math.floor(time % 60);

  // if (hours == 0) {
  //   seconds = seconds < 10 ? (seconds = '0' + seconds) : seconds;
  //   return `${mins}:${seconds}`;
  // } else {
  //   mins = mins < 10 ? (mins = '0' + mins) : mins;
  //   seconds = seconds < 10 ? (seconds = '0' + seconds) : seconds;
  //   return `${hours}:${mins}:${seconds}`;
  // }

  const hours: number | string = Math.floor(time / 3600); // Số giờ
  const mins: number | string = Math.floor((time % 3600) / 60); // Số phút còn lại sau khi tính số giờ
  let seconds: number | string = Math.floor(time % 60); // Số giây

  // Thêm số '0' trước giây và phút nếu nhỏ hơn 10
  seconds = seconds < 10 ? '0' + seconds : seconds;
  const formattedMins = mins < 10 ? '0' + mins : mins;

  // Nếu video có hơn 1 giờ
  if (hours > 0) {
    return `${hours}:${formattedMins}:${seconds}`;
  } else {
    return `${formattedMins}:${seconds}`; // Trường hợp chỉ có phút và giây
  }
};

const onLoadStartVideo = () => {
  // console.log('load start video');
  videoStates.isLoading = true;

  // video.value.currentTime = 0;
  // progressBar.value!.style.setProperty('--progress-width', 0);
  // overlayProgress.value!.style.setProperty('--seekable-width', 0);
};

const onCanPlayVideo = () => {
  if (videoStates.isLoading) {
    videoStates.isLoading = false;
  }

  if (!video.value || video.value!.ended) return;

  video.value!.play().catch((err) => {
    if (videoStates.isPlayVideo) {
      videoStates.isPlayVideo = false;
    }
  });
};

const onLoadedDataVideo = () => {
  if (!video.value) return;

  // console.log('loaded start video');
  if (video.value!.muted) {
    video.value!.muted = false;
  }

  videoStates.isLoaded = true;
  // duration.value = formatDuration(video.value!.duration)!;
  duration.value = formatDuration(elapsedSeconds.value);
};

const updateVideoPlayback = () => {
  if (!video.value) return;

  const now = Date.now();
  elapsedSeconds.value = Math.floor((now - startTime.value) / 1000);

  duration.value = formatDuration(elapsedSeconds.value);
  timeUpdate.value = formatDuration(video.value!.currentTime)!;
  const percent = video.value!.currentTime / elapsedSeconds.value;
  progressBar.value!?.style.setProperty('--progress-width', percent.toString());
  isEndedBroadcast.value =
    elapsedSeconds.value >= Math.floor(dataMovie.value.runtime);

  // Nếu video tồn tại, tua đến thời điểm hiện tại
  if (video.value && video.value.readyState >= 2) {
    const currentTime = video.value.currentTime;
    if (
      currentTime < elapsedSeconds.value - 1 ||
      currentTime > elapsedSeconds.value
    ) {
      // video.value.currentTime = elapsedSeconds; // Tua tới thời điểm cuối cùng
    }
  }
};

const onTimeUpdateVideo = (e: any) => {
  updateVideoPlayback();

  // timeUpdate.value = formatDuration(e.target.currentTime)!;
  // const percent = e.target.currentTime / e.target.duration;
  // progressBar.value!?.style.setProperty('--progress-width', percent.toString());

  if (!video.value) return;

  emits('onTimeUpdate', {
    seconds: video.value!.currentTime,
    percent: video.value!.currentTime / video.value!.duration,
    duration: video.value!.duration
  });
};

const onProgressVideo = (e: any) => {
  // console.log('buffered:', video.value.buffered.end(0));
  // console.log('seekable:', video.value.seekable.end(0));

  if (videoStates.isLoaded && video.value) {
    const bufferedLength: number = video.value!.buffered.length;

    for (let i = 0; i < bufferedLength; i++) {
      const bufferedStart = video.value!.buffered.start(bufferedLength - 1 - i);
      const bufferedEnd = video.value!.buffered.end(bufferedLength - 1 - i);

      // console.log(`buffered start ${bufferedLength - 1 - i}:`, bufferedStart);
      // console.log(`buffered end ${bufferedLength - 1 - i}:`, bufferedEnd);

      if (video.value!.currentTime > bufferedStart) {
        const percent = bufferedEnd / e.target.duration;
        overlayProgress.value!.style.setProperty(
          '--seekable-width',
          percent.toString()
        );
        break;
      }
    }
  }
};

const onMouseMoveVideo = () => {
  if (videoStates.isPlayVideo && !videoStates.isEndedVideo) {
    videoStates.isHideControls = false;
    clearTimeout(timeOutShowControls.value);

    timeOutShowControls.value = setTimeout(() => {
      videoStates.isHideControls = true;
    }, 5000);
  }
};

const onMouseLeaveVideo = () => {
  if (videoStates.isLoaded) {
    clearTimeout(timeOutShowControls.value);
    videoStates.isHideControls = false;
    videoStates.isShowControls = false;
  }
};

const onWaitingVideo = (e: any) => {
  videoStates.isLoading = true;
};

const onPLayingVideo = (e: any) => {
  videoStates.isLoading = false;
  videoStates.isPlayVideo = true;
};

const onPlayVideo = (e: any) => {
  emits('onPlay', {
    seconds: e!.target!.currentTime,
    percent: e!.target!.currentTime / e!.target!.duration,
    duration: e!.target!.duration
  });
};

const onPauseVideo = () => {
  // videoStates.isPlayVideo = false;
};

const checkEndedVideo = () => {
  if (elapsedSeconds.value == video.value!.duration) {
    videoStates.isEndedVideo = true;
  } else {
    videoStates.isEndedVideo = false;
  }
};

const onEndedVideo = () => {
  videoStates.isEndedVideo = true;
  videoStates.isShowControls = true;
};

const onClickPlay = () => {
  videoStates.isPlayVideo = true;
  video.value!.play();
};

const onClickPause = () => {
  videoStates.isPlayVideo = false;
  video.value!.pause();
};

const onClickReplayVideo = () => {
  video.value!.currentTime = 0;
  progressBar.value!.style.setProperty('--progress-width', '0');
  videoStates.isPlayVideo = true;
  videoStates.isEndedVideo = false;
  videoStates.isShowControls = false;
  video.value!.play();
};

const playVideo = async () => {
  video.value!.play();
  videoStates.isPlayVideo = true;

  videoStates.isActiveControlsAnimation = false;
  await wait(10);
  videoStates.isActiveControlsAnimation = true;

  videoStates.isRewind.enable = false;
};

const pauseVideo = async () => {
  video.value!.pause();
  videoStates.isPlayVideo = false;

  videoStates.isActiveControlsAnimation = false;
  await wait(10);
  videoStates.isActiveControlsAnimation = true;

  videoStates.isRewind.enable = false;
};

const onClickVideo = (e: any) => {
  if (video.value!.ended || videoStates.isEndedVideo || videoStates.isLoading) {
    return;
  }

  if (videoStates.isPlayVideo) {
    pauseVideo();
    // hide controls
    clearTimeout(timeOutShowControls.value);
    videoStates.isHideControls = false;
  } else {
    playVideo();
    // hide controls
    videoStates.isHideControls = false;
    clearTimeout(timeOutShowControls.value);

    timeOutShowControls.value = setTimeout(() => {
      videoStates.isHideControls = true;
    }, 5000);
  }
};

const rewindVideo = async (value: number) => {
  if (video.value!.currentTime != 0) {
    video.value!.currentTime -= value;
    checkEndedVideo();

    const percent = video.value!.currentTime / elapsedSeconds.value;
    progressBar.value!.style.setProperty(
      '--progress-width',
      percent.toString()
    );

    if (videoStates.isPlayVideo) {
      video.value!.play();
    }

    videoStates.isActiveControlsAnimation = false;
    await wait(10);
    videoStates.isActiveControlsAnimation = true;

    videoStates.isRewind.enable = true;
    videoStates.isRewind.replay = true;
    videoStates.isRewind.forward = false;
  }
};

const onClickRewind = () => {
  rewindVideo(10);
};

const forwardVideo = async (value: number) => {
  if (!videoStates.isEndedVideo) {
    const now = Date.now();
    const elapsedSeconds = Math.floor((now - startTime.value) / 1000);
    if (video.value!.currentTime >= elapsedSeconds) {
      video.value!.currentTime = elapsedSeconds;
    } else {
      const valueToSkip = Math.min(
        elapsedSeconds - video.value!.currentTime,
        10
      );
      video.value!.currentTime += valueToSkip;

      const percent = video.value!.currentTime / elapsedSeconds;
      progressBar.value!.style.setProperty(
        '--progress-width',
        percent.toString()
      );

      videoStates.isActiveControlsAnimation = false;
      await wait(10);
      videoStates.isActiveControlsAnimation = true;

      videoStates.isRewind.enable = true;
      videoStates.isRewind.replay = false;
      videoStates.isRewind.forward = true;
    }

    checkEndedVideo();
  }
};

const onClickForward = () => {
  forwardVideo(10);
};

const onTouchStartProgressBar = (e: any) => {
  videoStates.isScrubbingProgressBar = true;
  [...e.changedTouches].forEach((touch) => {
    handleTimeUpdate({ x: touch.pageX });
  });
};

const onMouseDownProgressBar = (e: any) => {
  videoStates.isScrubbingProgressBar = true;

  handleTimeUpdate(e);
};

const onTouchEndProgressBar = (e: any) => {
  videoStates.isScrubbingProgressBar = false;
  videoStates.isShowControls = false;
  videoStates.isMouseMoveOverlayProgress = false;

  if (videoStates.isPlayVideo) {
    video.value!.play();
  }
};

const onMouseUpProgressBar = () => {
  videoStates.isScrubbingProgressBar = false;

  if (videoStates.isPlayVideo) {
    video.value!.play();
  }
};

const onTouchMoveProgressBar = (e: any) => {
  videoStates.isMouseMoveOverlayProgress = true;
  videoStates.isShowControls = true;
  const rect = overlayProgress.value!.getBoundingClientRect();

  [...e.changedTouches].forEach((touch) => {
    const percent =
      Math.min(Math.max(0, touch.pageX - rect.left), rect.width) / rect.width;
    overlayProgress.value!.style.setProperty(
      '--preview-width',
      percent.toString()
    );

    if (videoStates.isScrubbingProgressBar) {
      handleTimeUpdate({ x: touch.pageX });
    } else {
      drawTimeLine({ x: touch.pageX });
    }
  });
};

const onMouseMoveProgressBar = (e: any) => {
  videoStates.isMouseMoveOverlayProgress = true;
  const rect = overlayProgress.value!.getBoundingClientRect();

  const percent =
    Math.min(Math.max(0, e.x - rect.left), rect.width) / rect.width;

  overlayProgress.value!.style.setProperty(
    '--preview-width',
    percent.toString()
  );

  if (videoStates.isScrubbingProgressBar) {
    handleTimeUpdate(e);
  } else {
    drawTimeLine(e);
  }
};

const onMouseLeaveProgressBar = (e: any) => {
  videoStates.isMouseMoveOverlayProgress = false;
};

const drawTimeLine = (e: any) => {
  const rect = overlayProgress.value!.getBoundingClientRect();

  const percent =
    Math.min(Math.max(0, e.x - rect.left), rect.width) / rect.width;

  timelineUpdate.value = formatDuration(percent * video.value!.duration)!;

  const timeLinePosition = Math.max(0, e.x - rect.left);

  const timeLinePositionFinnal = Math.min(
    // Math.max(10, timeLinePosition - timeline.value!.offsetWidth / 2 + 10),
    Math.max(0, timeLinePosition - timeline.value!.offsetWidth / 2),
    overlayProgress.value!.offsetWidth - timeline.value!.offsetWidth
  );

  timeline.value!.style.setProperty(
    '--timeline-position',
    timeLinePositionFinnal + 'px'
  );

  // videoTemp.value.currentTime = percent * videoTemp.value.duration;

  // const ctx = canvasPreviewImg.value.getContext('2d');

  // ctx.drawImage(video.value!, 0, 0, 160, 90);

  // canvasPreviewImg.value.toBlob((blob: any) => {
  //   const previewImg = timeline.value!.querySelector(
  //     '.preview-img'
  //   ) as HTMLImageElement;
  //   previewImg.src = URL.createObjectURL(blob);
  // });

  // const img_url = canvasPreviewImg.value.toDataURL('image/jpeg');

  // const previewImg = timeline.value!.querySelector(
  //   '.preview-img'
  // ) as HTMLImageElement;
  // previewImg.src = img_url;
};

const onClickFullScreen = () => {
  videoStates.isFullScreen = true;
  videoPlayer.value!.requestFullscreen();
};

const onClickFullScreenExit = () => {
  videoStates.isFullScreen = false;
  document.exitFullscreen();
};

const onClickVolumeUp = () => {
  video.value!.muted = true;
  videoStates.isVolumeOff = true;

  videoPlayerStorageStates.value[STORAGE.VIDEO_PLAYER_STATES.MUTED] = true;
};

const onClickVolumeOff = () => {
  video.value!.muted = false;
  videoStates.isVolumeOff = false;

  videoPlayerStorageStates.value[STORAGE.VIDEO_PLAYER_STATES.MUTED] = false;
};

const onChangeVolume = (value: number) => {
  videoStates.isShowControls = true;
  videoStates.isChangingVolume = true;

  volume.value = value;
  video.value!.volume = value / 100;
  videoPlayerStorageStates.value[STORAGE.VIDEO_PLAYER_STATES.VOLUME] = value;

  if (volume.value > 0 && video.value!.muted) {
    video.value!.muted = false;
  }

  clearTimeout(timeOutVolumeChange.value);

  timeOutVolumeChange.value = setTimeout(() => {
    videoStates.isChangingVolume = false;
  }, 5000);
};

watch(volume, (newVal, oldVal) => {
  videoStates.isVolumeOff = video.value!.volume == 0;
});

const onClickPictureInPicture = () => {
  video.value!.requestPictureInPicture();
};

const onClickItemPlayback = (item: string) => {
  settings.playback.current = item;

  if (item == 'Bình thường') {
    video.value!.playbackRate = 1;
  } else {
    video.value!.playbackRate = +item;
  }
};

const onCloseSettings = async () => {
  await wait(150);

  settingStates.subSetting.enable = false;
  settingStates.subSetting.playback = false;
  settingStates.subSetting.quality = false;
};

const onClickPlayAgain = () => {
  video.value!.currentTime = 0;
  progressBar.value!.style.setProperty('--progress-width', '0');
  videoStates.isShowNotify = false;
  video.value!.play();
  videoStates.isPlayVideo = true;
};

const onClickKeepWatching = () => {
  video.value!.currentTime = historyProgress.value.seconds;
  progressBar.value!.style.setProperty(
    '--progress-width',
    historyProgress.value.percent.toString()
  );
  videoStates.isShowNotify = false;
  video.value!.play();
  videoStates.isPlayVideo = true;
};

const onKeyDownVideo = (e: any) => {
  // show controls
  if ([32, 37, 39].includes(e.keyCode)) {
    videoStates.isShowControls = true;
    clearTimeout(timeOutShowControls.value);

    timeOutShowControls.value = setTimeout(() => {
      videoStates.isShowControls = false;
    }, 5000);
  }

  switch (e.keyCode) {
    case 32:
      e.preventDefault();

      if (videoStates.isPlayVideo) {
        pauseVideo();
      } else {
        playVideo();
      }
      break;
    case 37:
      rewindVideo(10);
      break;
    case 39:
      forwardVideo(10);
      break;
    case 77:
      if (videoStates.isVolumeOff) {
        video.value!.muted = false;
        videoStates.isVolumeOff = false;
      } else {
        video.value!.muted = true;
        videoStates.isVolumeOff = true;
      }
      break;
    case 70:
      if (videoStates.isFullScreen) {
        videoStates.isFullScreen = false;
        document.exitFullscreen();
      } else {
        videoStates.isFullScreen = true;
        window.screen.orientation
          .lock('landscape')
          .then(function () {})
          .catch(function () {});
        videoPlayer.value!.requestFullscreen();
      }
      break;
    default:
      break;
  }
};

const handleClickVideoPlayer = () => {
  videoPlayer.value!.scrollIntoView({ block: 'end' });
};
</script>

<style lang="scss" src="./BroadcastVideoPlayer.scss" scoped></style>
<!-- <style lang="scss">
@import url('./BroadcastVideoPlayer.scss');
</style> -->

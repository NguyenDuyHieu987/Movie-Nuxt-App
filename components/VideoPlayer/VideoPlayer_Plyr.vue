<template>
  <div class="video-player-wrapper">
    <div
      class="video-player"
      :style="{ '--plyr-color-main': 'var(--app-background-color)' }"
    >
      <video
        id="video-player"
        ref="video"
        :src="videoSrc"
        :poster="backdrop"
        preload="metadata"
        autoplay
        muted
        controls
        data-not-lazy
        @timeupdate="onTimeUpdateVideo"
        @play="onPlayVideo"
      >
        <source
          ref="srcVideo"
          :data-src="videoSrc"
          type="video/mp4"
        />
      </video>
    </div>
  </div>
</template>

<script setup lang="ts">
import Hls from 'hls.js';
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';

import { CloseBtn } from '~/components/ButtonTemplate';
import { LoadingSpinner } from '~/components/Loading';
import { getVideo } from '~/services/video';

const props = withDefaults(
  defineProps<{
    dataMovie: any;
    // isInHistory: boolean;
    backdrop: string;
    videoUrl: string;
  }>(),
  {
    // isInHistory: false,
  }
);

const emits = defineEmits<{
  onPlay: [e: any];
  onTimeUpdate: [e: any];
}>();

const nuxtConfig = useRuntimeConfig();
const videoSrc = computed<string>(
  () =>
    // nuxtConfig.app.production_mode
    //   ? nuxtConfig.app.serverVideoUrl + '/videos/' + props.videoUrl
    //   : 'http://localhost:5002/videos' + props.videoUrl
    'http://localhost:5002/videos' + props.videoUrl
  // + '.m3u8'
);
const blobVideoSrc = ref<string>('');
const videoPlayer = ref();
const video = ref();
const overlayProgress = ref();
const progressBar = ref();
const timeline = ref();
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
  isPlayVideo: true,
  isScrubbingProgressBar: false,
  isFullScreen: false,
  isVolumeOff: false,
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
const volume = ref<number>(100);
const timeUpdate = ref<string>('00:00');
const timelineUpdate = ref<string>('00:00');
const duration = ref<string>('00:00');
// const duration = computed<string>(
//   () => formatDuration(video.value?.duration) || '00:00'
// );
const timeOut = ref<any>();
const mounted = ref<boolean>(false);

watch(
  () => props.videoUrl,
  (newVal, oldVal) => {
    // initVideo(newVal);
    video.value.src = videoSrc.value;
    video.value.load();
  }
  // { immediate: true }
);

onBeforeRouteLeave(() => {
  video.value.pause();
});

onBeforeMount(() => {});

onMounted(() => {
  mounted.value = true;

  const player = new Plyr('#video-player', {
    tooltips: { controls: true, seek: true },
    captions: { active: true }
  });
});

const onTimeUpdateVideo = (e: any) => {
  emits('onTimeUpdate', {
    seconds: video.value?.currentTime,
    percent: video.value?.currentTime / video.value?.duration,
    duration: video.value?.duration
  });
};

const onPlayVideo = (e: any) => {
  emits('onPlay', {
    seconds: e!.target!.currentTime,
    percent: e!.target!.currentTime / e!.target!.duration,
    duration: e!.target!.duration
  });
};
</script>

<style lang="scss" src="./VideoPlayer.scss"></style>

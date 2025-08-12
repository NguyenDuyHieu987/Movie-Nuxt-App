<template>
  <div class="video-player-wrapper">
    <div
      class="video-player"
      :style="{ '--plyr-color-main': 'var(--color-primary-800)' }"
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
        @timeupdate="onTimeUpdateVideo"
        @play="onPlayVideo"
      >
        <source
          ref="srcVideo"
          :src="videoSrc"
          type="video/mp4"
        />
      </video>
    </div>
  </div>
</template>

<script setup lang="ts">
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';

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
  () => getVideo(props.videoUrl + '.m3u8')
  // getVideo(props.videoUrl)
);
const video = ref<HTMLVideoElement>();
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
const mounted = ref<boolean>(false);

watch(
  () => props.videoUrl,
  (newVal, oldVal) => {
    // initVideo(newVal);
    video.value!.src = videoSrc.value;
    video.value!.load();
  }
  // { immediate: true }
);

onBeforeRouteLeave(() => {
  video.value!.pause();
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
    seconds: video.value!?.currentTime,
    percent: video.value!?.currentTime / video.value!?.duration,
    duration: video.value!?.duration
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

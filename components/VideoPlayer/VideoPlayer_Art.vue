<template>
  <div class="video-player-wrapper">
    <div class="video-player"></div>
  </div>
</template>

<script setup lang="ts">
// import Artplayer from 'artplayer';

import { DEV_SERVER_VIDEO } from '~/services/video';

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
    nuxtConfig.app.production_mode
      ? `${nuxtConfig.app.serverVideoUrl}/videos` + props.videoUrl
      : `${DEV_SERVER_VIDEO}/videos` + props.videoUrl
  // `${DEV_SERVER_VIDEO}/videos` + props.videoUrl
  // + '.m3u8'
);
const video = ref();
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

  // const art = new Artplayer({
  //   container: '.video-player',
  //   url: videoSrc.value,
  //   poster: props.backdrop,
  //   volume: 0.5,
  //   isLive: false,
  //   muted: false,
  //   autoplay: false,
  //   pip: true,
  //   autoSize: true,
  //   autoMini: true,
  //   screenshot: true,
  //   setting: true,
  //   loop: true,
  //   flip: true,
  //   playbackRate: true,
  //   aspectRatio: true,
  //   fullscreen: true,
  //   fullscreenWeb: true,
  //   subtitleOffset: true,
  //   miniProgressBar: true,
  //   mutex: true,
  //   backdrop: true,
  //   playsInline: true,
  //   autoPlayback: true,
  //   airplay: true,
  //   theme: '#23ade5'
  // });
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

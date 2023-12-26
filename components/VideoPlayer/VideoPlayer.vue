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
      <video
        id="video-player"
        ref="video"
        :src="videoSrc"
        :poster="backdrop"
        data-not-lazy
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
      >
        <!-- <source :data-src="blobVideoSrc" ref="srcVideo" type="video/mp4" /> -->
      </video>

      <div class="float-center">
        <div
          v-show="
            (videoStates.isLoading &&
              !videoStates.isEndedVideo &&
              !videoStates.isRewind.enable) ||
            !mounted
            // &&
            // videoStates.isLoaded
          "
          class="loading-video"
        >
          <!-- <svg
            class="loading-video-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="5rem"
            height="5rem"
            viewBox="0 0 48 48"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="4"
              d="M4 24c0 11.046 8.954 20 20 20s20-8.954 20-20S35.046 4 24 4"
            />
          </svg> -->

          <LoadingSpinner />
        </div>

        <div
          v-show="videoStates.isEndedVideo"
          class="replay"
        >
          <!-- <Icon
            name="ic:baseline-replay"
            class="replay"
            @click="onClickReplayVideo"
          /> -->

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="4rem"
            height="4rem"
            viewBox="0 0 24 24"
            @click="onClickReplayVideo"
          >
            <path
              fill="currentColor"
              d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6s-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8s-3.58-8-8-8z"
            />
          </svg>

          <span @click="onClickReplayVideo"> Phát lại </span>
        </div>

        <div
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
        </div>
      </div>

      <div
        class="overlay-controls-animation"
        :class="{
          active: videoStates.isActiveControlsAnimation,
          rewind: videoStates.isRewind
        }"
      >
        <div class="box-icon">
          <div
            v-show="!videoStates.isRewind.enable"
            class="play-pause"
          >
            <svg
              v-show="!videoStates.isPlayVideo && !videoStates.isEndedVideo"
              class="play"
              xmlns="http://www.w3.org/2000/svg"
              width="3rem"
              height="3rem"
              viewBox="0 0 24 24"
              @click="onClickVideo"
            >
              <path
                fill="currentColor"
                d="M8 5v14l11-7z"
              />
            </svg>

            <svg
              v-show="videoStates.isPlayVideo && !videoStates.isEndedVideo"
              class="play"
              xmlns="http://www.w3.org/2000/svg"
              width="3rem"
              height="3rem"
              viewBox="0 0 24 24"
              @click="onClickVideo"
            >
              <path
                fill="currentColor"
                d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"
              />
            </svg>
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
        ref="timeline"
        class="timeline"
        :class="{
          active:
            videoStates.isMouseMoveOverlayProgress ||
            videoStates.isScrubbingProgressBar
        }"
      >
        <div class="timeline-container">
          <div class="img-box">
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
                <svg
                  v-show="videoStates.isEndedVideo"
                  class="replay"
                  xmlns="http://www.w3.org/2000/svg"
                  width="2.6rem"
                  height="2.6rem"
                  viewBox="0 0 24 24"
                  @click="onClickReplayVideo"
                >
                  <path
                    fill="currentColor"
                    d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6s-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8s-3.58-8-8-8z"
                  />
                </svg>

                <svg
                  v-show="!videoStates.isPlayVideo && !videoStates.isEndedVideo"
                  class="play"
                  xmlns="http://www.w3.org/2000/svg"
                  width="2.6rem"
                  height="2.6rem"
                  viewBox="0 0 24 24"
                  @click="onClickPlay"
                >
                  <path
                    fill="currentColor"
                    d="M8 5v14l11-7z"
                  />
                </svg>

                <svg
                  v-show="videoStates.isPlayVideo && !videoStates.isEndedVideo"
                  class="pause"
                  xmlns="http://www.w3.org/2000/svg"
                  width="2.6rem"
                  height="2.6rem"
                  viewBox="0 0 24 24"
                  @click="onClickPause"
                >
                  <path
                    fill="currentColor"
                    d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"
                  />
                </svg>
              </div>

              <div class="rewind-forward">
                <svg
                  class="rewind"
                  xmlns="http://www.w3.org/2000/svg"
                  width="2.6rem"
                  height="2.6rem"
                  viewBox="0 0 24 24"
                  @click="onClickRewind"
                >
                  <path
                    fill="currentColor"
                    d="M11.99 5V1l-5 5l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6s-6-2.69-6-6h-2c0 4.42 3.58 8 8 8s8-3.58 8-8s-3.58-8-8-8z"
                  />
                  <path
                    fill="currentColor"
                    d="M10.89 16h-.85v-3.26l-1.01.31v-.69l1.77-.63h.09V16zm4.28-1.76c0 .32-.03.6-.1.82s-.17.42-.29.57s-.28.26-.45.33s-.37.1-.59.1s-.41-.03-.59-.1s-.33-.18-.46-.33s-.23-.34-.3-.57s-.11-.5-.11-.82v-.74c0-.32.03-.6.1-.82s.17-.42.29-.57s.28-.26.45-.33s.37-.1.59-.1s.41.03.59.1s.33.18.46.33s.23.34.3.57s.11.5.11.82v.74zm-.85-.86c0-.19-.01-.35-.04-.48s-.07-.23-.12-.31s-.11-.14-.19-.17s-.16-.05-.25-.05s-.18.02-.25.05s-.14.09-.19.17s-.09.18-.12.31s-.04.29-.04.48v.97c0 .19.01.35.04.48s.07.24.12.32s.11.14.19.17s.16.05.25.05s.18-.02.25-.05s.14-.09.19-.17s.09-.19.11-.32s.04-.29.04-.48v-.97z"
                  />
                </svg>
              </div>

              <div class="volume">
                <div>
                  <svg
                    v-show="!videoStates.isVolumeOff && volume <= 30"
                    class="volume-down"
                    xmlns="http://www.w3.org/2000/svg"
                    width="2.7rem"
                    height="2.7rem"
                    viewBox="0 0 24 24"
                    @click="onClickVolumeUp"
                  >
                    <path
                      fill="currentColor"
                      d="M18.5 12A4.5 4.5 0 0 0 16 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z"
                    />
                  </svg>

                  <svg
                    v-show="!videoStates.isVolumeOff && volume > 30"
                    name="ic:baseline-volume-up"
                    xmlns="http://www.w3.org/2000/svg"
                    width="2.7rem"
                    height="2.7rem"
                    viewBox="0 0 24 24"
                    @click="onClickVolumeUp"
                  >
                    <path
                      fill="currentColor"
                      d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"
                    />
                  </svg>

                  <svg
                    v-show="videoStates.isVolumeOff"
                    name="ic:baseline-volume-off"
                    xmlns="http://www.w3.org/2000/svg"
                    width="2.7rem"
                    height="2.7rem"
                    viewBox="0 0 24 24"
                    @click="onClickVolumeOff"
                  >
                    <path
                      fill="currentColor"
                      d="M16.5 12A4.5 4.5 0 0 0 14 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0 0 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27L7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.99 8.99 0 0 0 3.69-1.81L19.73 21L21 19.73l-9-9L4.27 3zM12 4L9.91 6.09L12 8.18V4z"
                    />
                  </svg>
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="2.7rem"
                  height="2.7rem"
                  viewBox="0 0 24 24"
                  @click="onClickRewind"
                >
                  <path
                    fill="currentColor"
                    d="M11 18V6l-8.5 6l8.5 6zm.5-6l8.5 6V6l-8.5 6z"
                  />
                </svg>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="2.7rem"
                  height="2.7rem"
                  viewBox="0 0 24 24"
                  @click="onClickForward"
                >
                  <path
                    fill="currentColor"
                    d="m4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z"
                  />
                </svg>
              </div>

              <div
                class="setting"
                :class="{ active: settingStates.enable }"
              >
                <svg
                  class="setting"
                  xmlns="http://www.w3.org/2000/svg"
                  width="2.5rem"
                  height="2.5rem"
                  viewBox="0 0 24 24"
                  @click="
                    settingStates.enable = !settingStates.enable;
                    onCloseSettings();
                  "
                >
                  <path
                    fill="currentColor"
                    d="M19.14 12.94c.04-.3.06-.61.06-.94c0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6s3.6 1.62 3.6 3.6s-1.62 3.6-3.6 3.6z"
                  />
                </svg>
              </div>

              <div class="picture-in-picture">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="2.7rem"
                  height="2.7rem"
                  viewBox="0 0 24 24"
                  @click="onClickPictureInPicture"
                >
                  <path
                    fill="currentColor"
                    d="M19 11h-8v6h8v-6zm4 8V4.98C23 3.88 22.1 3 21 3H3c-1.1 0-2 .88-2 1.98V19c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2zm-2 .02H3V4.97h18v14.05z"
                  />
                </svg>
              </div>

              <div class="fullscreen-exit">
                <svg
                  v-show="!videoStates.isFullScreen"
                  class="fullscreen"
                  xmlns="http://www.w3.org/2000/svg"
                  width="3.3rem"
                  height="3.3rem"
                  viewBox="0 0 24 24"
                  @click="onClickFullScreen"
                >
                  <path
                    fill="currentColor"
                    d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"
                  />
                </svg>

                <svg
                  v-show="videoStates.isFullScreen"
                  xmlns="http://www.w3.org/2000/svg"
                  width="3.3rem"
                  height="3.3rem"
                  viewBox="0 0 24 24"
                  @click="onClickFullScreenExit"
                >
                  <path
                    fill="currentColor"
                    d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="video-mask"
        tabindex="-1"
        @click="onClickVideo"
        @pointermove="onMouseMoveVideo"
        @touchmove="onMouseMoveVideo"
        @pointerleave="onMouseLeaveVideo"
        @keydown="onKeyDownVideo"
      ></div>

      <div class="background-controls"></div>

      <div
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2rem"
                height="2rem"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12 9c1.65 0 3 1.35 3 3s-1.35 3-3 3s-3-1.35-3-3s1.35-3 3-3m0-2c-2.76 0-5 2.24-5 5s2.24 5 5 5s5-2.24 5-5s-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 0 0-1.41 0a.996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 0 0-1.41 0a.996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0a.996.996 0 0 0 0-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 0 0 0-1.41a.996.996 0 0 0-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36a.996.996 0 0 0 0-1.41a.996.996 0 0 0-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"
                />
              </svg>
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2rem"
                height="2rem"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="m4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z"
                />
              </svg>
              <span>Tốc độ phát</span>
            </div>

            <div class="right">
              <span>{{ settings.playback.current }}</span>
              <!-- <Icon name="ic:baseline-arrow-forward-ios" /> -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.5rem"
                height="1.5rem"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M6.23 20.23L8 22l10-10L8 2L6.23 3.77L14.46 12z"
                />
              </svg>
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2rem"
                height="2rem"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M19 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-8 11H9.5v-2h-2v2H6V9h1.5v2.5h2V9H11v6zm7-1c0 .55-.45 1-1 1h-.75v1.5h-1.5V15H14c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1h3c.55 0 1 .45 1 1v4zm-3.5-.5h2v-3h-2v3z"
                />
              </svg>
              <span>Chất lượng</span>
            </div>

            <div class="right">
              <span>{{ settings.quality.current }}</span>
              <!-- <Icon name="ic:baseline-arrow-forward-ios" /> -->

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.5rem"
                height="1.5rem"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M6.23 20.23L8 22l10-10L8 2L6.23 3.77L14.46 12z"
                />
              </svg>
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.4rem"
                  height="1.4rem"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M11.67 3.87L9.9 2.1L0 12l9.9 9.9l1.77-1.77L3.54 12z"
                  />
                </svg>

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

                <svg
                  v-if="settings.playback.current == item"
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.8rem"
                  height="1.8rem"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M9 16.17L4.83 12l-1.42 1.41L9 19L21 7l-1.41-1.41z"
                  />
                </svg>
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.4rem"
                  height="1.4rem"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M11.67 3.87L9.9 2.1L0 12l9.9 9.9l1.77-1.77L3.54 12z"
                  />
                </svg>
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

                <svg
                  v-if="settings.quality.current == item"
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.8rem"
                  height="1.8rem"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M9 16.17L4.83 12l-1.42 1.41L9 19L21 7l-1.41-1.41z"
                  />
                </svg>
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
import Hls from 'hls.js';

import { CloseBtn } from '~/components/ButtonTemplate';
import { LoadingSpinner } from '~/components/Loading';
import { getVideo } from '~/services/video';

const props = withDefaults(
  defineProps<{
    dataMovie: any;
    // isInHistory: boolean;
    // historyProgress: { duration: number; percent: number; seconds: number };
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
const route = useRoute();
const videoSrc = computed<string>(
  () =>
    nuxtConfig.app.production_mode
      ? `${nuxtConfig.app.serverVideoUrl}/videos` + props.videoUrl
      : 'http://localhost:5002/videos' + props.videoUrl
  // 'http://localhost:5002/videos' + props.videoUrl
  // + '.m3u8'
);
const blobVideoSrc = ref<string>('');
const videoPlayer = ref<HTMLElement>();
const video = ref<HTMLVideoElement>();
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
  isChangingVolume: false,
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
const timeOutShowControls = ref<any>();
const timeOutVolumeChange = ref<any>();
const mounted = ref<boolean>(false);
let startByte: number = 0;
// 1 MB
const chunkSize: number = 1024 * 1024;

const fetchVideoChunk = async (value: string) => {
  const endByte: number = startByte + chunkSize - 1;

  // return new Promise(async (resolve, reject) => {
  // videoStates.isLoading = true;

  await getVideo(value, startByte, endByte)
    .then((response) => {
      // console.log(response);
      // const blobSrc = URL.createObjectURL(blob);

      const blobSrc = (window.URL || window.webkitURL).createObjectURL(
        new Blob([response.data], { type: 'video/mp4' })
      );

      // if (video.value) {
      //   // const myVid = document.getElementById(
      //   //   'video-player'
      //   // ) as HTMLVideoElement;
      //   // myVid!.setAttribute('src', blobSrc);
      //   video.value.src = blobSrc;
      //   video.value.muted = false;
      //   video.value.autoplay = true;
      //   // video.value.load();
      //   // myVid!.play();
      //   videoStates.isPlayVideo = true;
      // }

      if (!video.value!.src) {
        video.value!.src = blobSrc;
        video.value!.load();
      }

      startByte = endByte + 1;

      // Fetch next chunk
      fetchVideoChunk(value);

      //   resolve({ success: true });
      // })
      // .catch((e) => {
      //   reject(e);
      // })
      // .finally(() => {
      //   videoStates.isLoading = false;
      //   // video.value.load();
      // });
    })
    .catch((e) => {});
};

const initVideo = async (newVideoUrl: string) => {
  if (newVideoUrl && newVideoUrl?.length > 0) {
    if (props.dataMovie?.media_type == 'movie') {
      fetchVideoChunk(newVideoUrl);
    } else if (props.dataMovie?.media_type == 'tv') {
      if (videoStates.isPlayVideo) {
        video.value!.pause();
        videoStates.isPlayVideo = false;
      }
      fetchVideoChunk(newVideoUrl);
    }
  }
};

const loadM3u8Video = () => {
  if (Hls.isSupported()) {
    const hls = new Hls();
    console.log(videoSrc.value);

    hls.on(Hls.Events.ERROR, (event, data) => {
      console.error(`hls.js error: ${data.type} - ${data.details}`);
    });
    hls.loadSource(
      'http://localhost:5002/static/videos/feature/Transformer_5/Transformer_5.m3u8'
    );
    hls.attachMedia(video.value!);

    console.log('HLS.js is supported');
  } else {
    console.error('HLS is not supported on your browser, but native HLS is');
  }
};

watch(
  () => props.videoUrl,
  (newVal, oldVal) => {
    // initVideo(newVal);

    if (props.dataMovie?.media_type == 'tv') {
      video.value!.pause();
      video.value!.src = videoSrc.value;
      video.value!.load();

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
      videoStates.isShowNotify = true;
    }
  },
  { immediate: true }
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
  if (!video.value!.paused) {
    video.value!.pause();
  }

  window.removeEventListener('pointerup', windowPointerUp);
  window.removeEventListener('touchend', windowTouchEnd);
  video.value!.removeEventListener('progress', onProgressVideo);
};

onBeforeUnmount(() => {
  clearVideoPlayer();
});

onBeforeRouteLeave(() => {
  clearVideoPlayer();
});

onBeforeMount(() => {
  // initVideo(props.videoUrl);

  loadM3u8Video();
});

onMounted(() => {
  mounted.value = true;

  if (video.value!.autoplay) {
    video.value!.autoplay = false;
  }

  if (video.value!.muted) {
    video.value!.muted = false;
  }

  if (video.value!.paused == true) {
    const event = new Event('canplay');
    video.value!.dispatchEvent(event);
  }

  if (videoStates.isPlayVideo == false) {
    videoStates.isPlayVideo = true;
  }

  videoPlayer.value?.scrollIntoView({
    block: 'end',
    behavior: 'instant'
  });

  duration.value = formatDuration(video.value!.duration)!;

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

const handleTimeUpdate = (e: any) => {
  if (videoStates.isPlayVideo) {
    video.value!.pause();
  }

  const rect = overlayProgress.value.getBoundingClientRect();

  const percent =
    Math.min(Math.max(0, e.x - rect.left), rect.width) / rect.width;

  progressBar.value.style.setProperty('--progress-width', percent);

  video.value!.currentTime = percent * video.value!.duration;

  videoStates.isEndedVideo = video.value!.currentTime == video.value!.duration;

  drawTimeLine(e);
};

const formatDuration = (time: number): string => {
  if (isNaN(time)) {
    return '00:00';
  }

  const hours: number | string = Math.floor(time / 3600);
  let mins: number | string = Math.floor(time / 60);
  let seconds: number | string = Math.floor(time % 60);

  if (hours == 0) {
    seconds = seconds < 10 ? (seconds = '0' + seconds) : seconds;
    return `${mins}:${seconds}`;
  } else {
    mins = mins < 10 ? (mins = '0' + mins) : mins;
    seconds = seconds < 10 ? (seconds = '0' + seconds) : seconds;
    return `${hours}:${mins}:${seconds}`;
  }
};

const onLoadStartVideo = () => {
  // console.log('load start video');
  videoStates.isLoading = true;

  // video.value.currentTime = 0;
  // progressBar.value.style.setProperty('--progress-width', 0);
  // overlayProgress.value.style.setProperty('--seekable-width', 0);
};

const onCanPlayVideo = () => {
  if (videoStates.isLoading) {
    videoStates.isLoading = false;
  }

  if (video.value!.ended) {
    return;
  }

  video.value!.play().catch(() => {
    if (videoStates.isPlayVideo) {
      videoStates.isPlayVideo = false;
    }
  });
};

const onLoadedDataVideo = () => {
  // console.log('loaded start video');
  if (video.value!.muted) {
    video.value!.muted = false;
  }

  videoStates.isLoaded = true;
  duration.value = formatDuration(video.value!.duration)!;
};

const onTimeUpdateVideo = (e: any) => {
  timeUpdate.value = formatDuration(e.target.currentTime)!;
  const percent = e.target.currentTime / e.target.duration;
  progressBar.value?.style.setProperty('--progress-width', percent);

  emits('onTimeUpdate', {
    seconds: video.value!.currentTime,
    percent: video.value!.currentTime / video.value!.duration,
    duration: video.value!.duration
  });
};

const onProgressVideo = (e: any) => {
  // console.log('buffered:', video.value.buffered.end(0));
  // console.log('seekable:', video.value.seekable.end(0));

  if (videoStates.isLoaded) {
    const bufferedLength: number = video.value!.buffered.length;

    for (let i = 0; i < bufferedLength; i++) {
      const bufferedStart = video.value!.buffered.start(bufferedLength - 1 - i);
      const bufferedEnd = video.value!.buffered.end(bufferedLength - 1 - i);

      // console.log(`buffered start ${bufferedLength - 1 - i}:`, bufferedStart);
      // console.log(`buffered end ${bufferedLength - 1 - i}:`, bufferedEnd);

      if (video.value!.currentTime > bufferedStart) {
        const percent = bufferedEnd / e.target.duration;
        overlayProgress.value.style.setProperty('--seekable-width', percent);
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
  if (video.value!.ended) {
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
  progressBar.value.style.setProperty('--progress-width', 0);
  videoStates.isPlayVideo = true;
  videoStates.isEndedVideo = false;
  videoStates.isShowControls = false;
  video.value!.play();
};

const playVideo = () => {
  video.value!.play();
  videoStates.isPlayVideo = true;

  new Promise((resolve, reject) => {
    resolve((videoStates.isActiveControlsAnimation = false));
  }).then(() => {
    videoStates.isActiveControlsAnimation = true;
  });

  videoStates.isRewind.enable = false;
};

const pauseVideo = () => {
  video.value!.pause();
  videoStates.isPlayVideo = false;

  new Promise((resolve, reject) => {
    resolve((videoStates.isActiveControlsAnimation = false));
  }).then(() => {
    videoStates.isActiveControlsAnimation = true;
  });

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

const rewindVideo = (value: number) => {
  if (video.value!.currentTime != 0) {
    video.value!.currentTime -= value;
    checkEndedVideo();

    const percent = video.value!.currentTime / video.value!.duration;
    progressBar.value.style.setProperty('--progress-width', percent);

    if (videoStates.isPlayVideo) {
      video.value!.play();
    }

    new Promise((resolve, reject) => {
      resolve((videoStates.isActiveControlsAnimation = false));
    }).then(() => {
      videoStates.isActiveControlsAnimation = true;
    });

    videoStates.isRewind.enable = true;
    videoStates.isRewind.replay = true;
    videoStates.isRewind.forward = false;
  }
};

const onClickRewind = () => {
  rewindVideo(10);
};

const forwardVideo = (value: number) => {
  if (!videoStates.isEndedVideo) {
    video.value!.currentTime += value;
    checkEndedVideo();

    const percent = video.value!.currentTime / video.value!.duration;
    progressBar.value.style.setProperty('--progress-width', percent);

    new Promise((resolve, reject) => {
      resolve((videoStates.isActiveControlsAnimation = false));
    }).then(() => {
      videoStates.isActiveControlsAnimation = true;
    });

    videoStates.isRewind.enable = true;
    videoStates.isRewind.replay = false;
    videoStates.isRewind.forward = true;
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
  const rect = overlayProgress.value.getBoundingClientRect();

  [...e.changedTouches].forEach((touch) => {
    const percent =
      Math.min(Math.max(0, touch.pageX - rect.left), rect.width) / rect.width;
    overlayProgress.value.style.setProperty('--preview-width', percent);

    if (videoStates.isScrubbingProgressBar) {
      handleTimeUpdate({ x: touch.pageX });
    } else {
      drawTimeLine({ x: touch.pageX });
    }
  });
};

const onMouseMoveProgressBar = (e: any) => {
  videoStates.isMouseMoveOverlayProgress = true;
  const rect = overlayProgress.value.getBoundingClientRect();

  const percent =
    Math.min(Math.max(0, e.x - rect.left), rect.width) / rect.width;

  overlayProgress.value.style.setProperty('--preview-width', percent);

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
  const rect = overlayProgress.value.getBoundingClientRect();

  const percent =
    Math.min(Math.max(0, e.x - rect.left), rect.width) / rect.width;

  timelineUpdate.value = formatDuration(percent * video.value!.duration)!;

  const timeLinePosition = Math.max(0, e.x - rect.left);

  const timeLinePositionFinnal = Math.min(
    // Math.max(10, timeLinePosition - timeline.value.offsetWidth / 2 + 10),
    Math.max(0, timeLinePosition - timeline.value.offsetWidth / 2),
    overlayProgress.value.offsetWidth - timeline.value.offsetWidth
  );

  timeline.value.style.setProperty(
    '--timeline-position',
    timeLinePositionFinnal + 'px'
  );

  // videoTemp.value.currentTime = percent * videoTemp.value.duration;

  // const ctx = canvasPreviewImg.value.getContext('2d');

  // ctx.drawImage(video.value!, 0, 0, 160, 90);

  // canvasPreviewImg.value.toBlob((blob: any) => {
  //   const previewImg = timeline.value.querySelector(
  //     '.preview-img'
  //   ) as HTMLImageElement;
  //   previewImg.src = URL.createObjectURL(blob);
  // });

  // const img_url = canvasPreviewImg.value.toDataURL('image/jpeg');

  // const previewImg = timeline.value.querySelector(
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
};

const onClickVolumeOff = () => {
  video.value!.muted = false;
  videoStates.isVolumeOff = false;
};

const onChangeVolume = (value: number) => {
  videoStates.isShowControls = true;
  videoStates.isChangingVolume = true;

  volume.value = value;
  video.value!.volume = value / 100;

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
  progressBar.value.style.setProperty('--progress-width', 0);
  videoStates.isShowNotify = false;
  video.value!.play();
  videoStates.isPlayVideo = true;
};

const onClickKeepWatching = () => {
  video.value!.currentTime = historyProgress.value.seconds;
  progressBar.value.style.setProperty(
    '--progress-width',
    historyProgress.value.percent
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
        window.screen.orientation.lock('landscape');
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

<style lang="scss" src="./VideoPlayer.scss"></style>

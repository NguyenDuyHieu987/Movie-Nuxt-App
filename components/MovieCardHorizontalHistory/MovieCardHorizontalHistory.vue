<template>
  <div class="movie-history-item-wrapper">
    <p
      v-if="timeLine?.length"
      class="timeline"
    >
      <span v-if="timeLine.includes('-')">
        {{ timeLine.split(' - ')[0] }}
        <span style="margin: 0px 5px">-</span>
        {{ timeLine.split(' - ')[1] }}
      </span>
      <span v-else>
        {{ timeLine }}
      </span>
    </p>
    <!-- <el-skeleton :loading="loading" animated>
      <template #template>
        <div class="img-box">
          <el-skeleton-item class="skeleton-img ratio-16-9" />
        </div>
        <div class="content-skeleton">
          <el-skeleton-item variant="text" style="width: 40%" />
          <el-skeleton-item variant="text" style="width: 20%" />
          <el-skeleton-item variant="text" style="width: 30%" />
          <div class="overview">
            <el-skeleton-item variant="text" />
            <el-skeleton-item variant="text" style="width: 50%" />
          </div>
        </div>
      </template>
      <template #default> -->
    <NuxtLink
      :to="{
        path: isEpisodes
          ? `/info-tv/${item?.movie_id}${utils.convertPath.toPathInfo_Play(
              item?.name
            )}`
          : `/info-movie/${item?.movie_id}${utils.convertPath.toPathInfo_Play(
              item?.name
            )}`
      }"
      class="movie-history-item"
    >
      <div class="img-box">
        <div class="img-wrapper ratio-16-9">
          <!-- <img
            v-lazy="getImage(item?.backdrop_path, 'backdrop', 'h-250')"
            loading="lazy"
            alt=""
          /> -->

          <NuxtImg
            :src="getImage(item?.backdrop_path, 'backdrop', 'h-250')"
            placeholder="/imgs/loading-img-16-9.webp"
            format="avif"
            loading="lazy"
            alt=""
          />
        </div>

        <div class="viewed-overlay-bar">
          <div
            class="percent-viewed"
            :style="{ width: percent * 100 + '%' }"
          ></div>
        </div>
      </div>

      <div class="info">
        <h2
          class="title"
          :title="item?.name"
        >
          {{ item?.name }}
        </h2>

        <!-- <p v-if="isEpisodes" class="duration-episode">
              Tập mới nhất:
              {{
                dataMovie?.last_episode_to_air?.episode_number
                  ? 'Tập ' + dataMovie?.last_episode_to_air?.episode_number
                  : ''
              }}
            </p>

            <p v-else class="duration-episode">
              Thời lượng:
              {{ dataMovie?.runtime ? dataMovie?.runtime + ' phút' : '' }}
            </p> -->

        <div class="year-views">
          <p
            v-if="!isEpisodes"
            class="year"
          >
            {{ dataMovie?.release_date?.slice(0, 4) }}
          </p>

          <p
            v-else
            class="year"
          >
            {{
              dataMovie?.last_air_date?.slice(0, 4)
                ? dataMovie?.last_air_date?.slice(0, 4)
                : dataMovie?.first_air_date?.slice(0, 4)
            }}
          </p>

          <p class="views">
            {{ utils.viewFormatter(dataMovie?.views) }} lượt xem
          </p>
        </div>

        <p class="overview">
          {{
            dataMovie?.overview ||
            'Sorry! This movie has not been updated overview content.'
          }}
        </p>

        <div class="action">
          <el-tooltip
            title="Xóa khỏi Lịch sử xem"
            content="Xóa khỏi Lịch sử xem"
            effect="dark"
            placement="bottom"
            popper-class="popper-tooltip"
            :teleported="true"
            :mouse-leave-delay="0"
          >
            <a-button
              class="remove-btn click-active"
              type="text"
              @click.prevent="handleRemoveFromHistory"
            >
              <template #icon>
                <!-- <Icon name="ic:baseline-close" /> -->

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="2.5rem"
                  height="2.5rem"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"
                  />
                </svg>
              </template>
            </a-button>
          </el-tooltip>

          <el-dropdown
            trigger="click"
            placement="bottom-end"
            class="dropdown-viewmore"
            popper-class="dropdown-viewmore"
            :show-timeout="0"
          >
            <a-button
              class="viewmore-btn click-active"
              type="text"
              @click.prevent
            >
              <template #icon>
                <!-- <Icon name="fa6-solid:ellipsis-vertical" /> -->

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.9rem"
                  height="1.9rem"
                  viewBox="0 0 512 512"
                  fill="currentColor"
                >
                  <circle
                    cx="256"
                    cy="256"
                    r="48"
                  />
                  <circle
                    cx="256"
                    cy="416"
                    r="48"
                  />
                  <circle
                    cx="256"
                    cy="96"
                    r="48"
                  />
                </svg>
              </template>
            </a-button>

            <template #dropdown>
              <el-dropdown-menu>
                <div class="main-action">
                  <el-dropdown-item key="play">
                    <!-- <Icon class="play" name="ci:play-arrow" /> -->

                    <svg
                      class="play"
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>

                    <NuxtLink
                      v-if="isEpisodes"
                      :to="{
                        path: `/play-tv/${
                          item?.movie_id
                        }${utils.convertPath.toPathInfo_Play(item?.name)}/tap-1`
                      }"
                      class="btn-play-now"
                    >
                      <span> Đến trang xem phim </span>
                    </NuxtLink>
                    <NuxtLink
                      v-else
                      :to="{
                        path: `/play-movie/${
                          item?.movie_id
                        }${utils.convertPath.toPathInfo_Play(item?.name)}`
                      }"
                      class="btn-play-now"
                    >
                      <span>Đến trang xem phim</span>
                    </NuxtLink>
                  </el-dropdown-item>
                  <el-dropdown-item
                    key="add-list"
                    @click="handleAddToList"
                  >
                    <!-- <Icon
                            class="icon-material"
                            v-if="isAddToList"
                            name="ic:twotone-playlist-add-check"
                          />
                          <Icon
                            class="icon-material"
                            v-else
                            name="ic:twotone-playlist-add"
                          /> -->

                    <svg
                      v-if="isAddToList"
                      class="icon-material"
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path
                        d="M3 10h11v2H3zm0-4h11v2H3zm0 8h7v2H3zm17.59-2.07l-4.25 4.24l-2.12-2.12l-1.41 1.41L16.34 19L22 13.34z"
                      />
                    </svg>

                    <svg
                      v-else
                      class="icon-material"
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path
                        d="M14 10H3v2h11v-2zm0-4H3v2h11V6zm4 8v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM3 16h7v-2H3v2z"
                      />
                    </svg>

                    <span v-if="isAddToList">Xóa khỏi Danh sách phát</span>
                    <span v-else>Thêm vào Danh sách phát</span>
                  </el-dropdown-item>

                  <el-dropdown-item key="share">
                    <!-- <Icon name="ph:share-fat-bold" class="share" /> -->
                    <svg
                      class="share"
                      xmlns="http://www.w3.org/2000/svg"
                      width="1.8rem"
                      height="1.8rem"
                      viewBox="0 0 256 256"
                      fill="currentColor"
                    >
                      <path
                        d="m240.49 103.52l-80-80A12 12 0 0 0 140 32v36.74c-25.76 3.12-53.66 15.89-76.75 35.47c-29.16 24.74-47.32 56.69-51.14 90A16 16 0 0 0 39.67 207c10.46-11.14 47-45.74 100.33-50.42V192a12 12 0 0 0 20.48 8.48l80-80a12 12 0 0 0 .01-16.96ZM164 163v-19a12 12 0 0 0-12-12c-49 0-86.57 21.56-109.79 40.11c7.13-18.16 19.63-35.22 36.57-49.59C101.3 103.41 128.67 92 152 92a12 12 0 0 0 12-12V61l51 51Z"
                      />
                    </svg>

                    <span class="social-share">
                      <ShareNetwork
                        network="facebook"
                        :url="urlShare"
                        :title="item?.name"
                        hashtags="phimhay247.site,vite"
                        style="white-space: nowrap; display: block"
                      >
                        Chia sẻ
                      </ShareNetwork>
                    </span>
                  </el-dropdown-item>
                </div>

                <div class="separate"></div>

                <div class="danger-zone">
                  <el-dropdown-item
                    key="remove-history"
                    class="remove-item"
                    @click="handleRemoveFromHistory"
                  >
                    <!-- <Icon name="fa6-solid:trash-can" /> -->
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1.5rem"
                      height="1.5rem"
                      viewBox="0 0 448 512"
                      fill="currentColor"
                    >
                      <path
                        d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0h120.4c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64s14.3-32 32-32h96l7.2-14.3zM32 128h384v320c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"
                      />
                    </svg>

                    <span>Xóa khỏi Lịch sử xem</span>
                  </el-dropdown-item>
                </div>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </NuxtLink>
    <!-- </template>
    </el-skeleton> -->
  </div>
</template>

<script setup lang="ts">
import _ from 'lodash';

import { getImage } from '~/services/image';
import { getMovieById } from '~/services/movie';
import { getTvById } from '~/services/tv';

const props = defineProps<{
  item: any;
  prevItem: any;
  type: string | undefined;
  getDataWhenRemoveHistory: (id: number) => void;
}>();

const store = useStore();
const utils = useUtils();
const dataMovie = ref<any>({});
const isEpisodes = ref<boolean>(false);
const loading = ref<boolean>(false);
const urlShare = computed<string>(
  (): string =>
    window.location.origin +
    (isEpisodes
      ? `/info-tv/${props.item?.id}${utils.convertPath.toPathInfo_Play(
          props.item?.name
        )}`
      : `/info-movie/${props.item?.id}${utils.convertPath.toPathInfo_Play(
          props.item?.name
        )}`)
);
const percent = ref<number>(0);
const isAddToList = ref<boolean>(false);
const timeLine = ref<string>('');

onMounted(() => {});

const getData = async () => {
  loading.value = true;
  percent.value = props.item?.percent;

  const prev_date_old = new Date(props.prevItem?.created_at);
  const date_old = new Date(props.item?.created_at);
  const now = new Date();

  // console.log('a: ', now.getTimezoneOffset());

  // console.log(utils.dateTimeFormater.fromNow('2023-08-04T12:33:02.293Z'));

  // Is 2nd onwards
  if (props?.prevItem) {
    const diff = prev_date_old.getTime() - date_old.getTime();
    const diffDays = diff / ONE_DAY;

    // Is today
    if (
      // prev_date_old.toISOString().slice(0, 9) !=
      // date_old.toISOString().slice(0, 9)
      diffDays > 1
    ) {
      timeLine.value =
        utils.dateTimeFormater.fromNow(props.item?.created_at, {
          onlyDay: true
        }) +
        ' - ' +
        utils.dateTimeFormater.format(props.item?.created_at, 'LL');
    }
  }
  // Is first item
  else {
    timeLine.value =
      utils.dateTimeFormater.fromNow(props.item?.created_at, {
        onlyDay: true
      }) +
      ' - ' +
      utils.dateTimeFormater.format(props.item?.created_at, 'LL');
  }

  switch (props?.type || props?.item?.media_type) {
    case 'movie':
      isEpisodes.value = false;
      // await useAsyncData(`movie/short/${props.item?.movie_id}`, () =>
      //   getMovieById(props.item?.movie_id)
      // )
      await getMovieById(props.item?.movie_id)
        .then((response) => {
          dataMovie.value = response;
        })
        .catch((e) => {})
        .finally(() => {
          loading.value = false;
        });
      break;
    case 'tv':
      isEpisodes.value = true;
      // await useAsyncData(`tv/short/${props.item?.movie_id}`, () =>
      //   getTvById(props.item?.movie_id)
      // )
      await getTvById(props.item?.movie_id)
        .then((response) => {
          dataMovie.value = response;
        })
        .catch((e) => {})
        .finally(() => {
          loading.value = false;
        });
      break;
    default:
      break;
  }

  if (dataMovie.value?.in_list) {
    isAddToList.value = true;
  }

  // await getItemList(props.item?.id, props.item?.media_type);
  //   .then((response) => {
  //     if (response?.success == true) {
  //       isAddToList.value = true;
  //     }
  //   })
  //   .catch((e) => {
  //   });
};

getData();

const handleAddToList = () => {
  if (!isAddToList.value) {
    isAddToList.value = true;
    if (
      !utils.handleAddItemToList(dataMovie.value?.id, props.item.media_type)
    ) {
      isAddToList.value = false;
    }
  } else {
    isAddToList.value = false;
    if (
      !utils.handleRemoveItemFromList(
        props.item?.movie_id,
        props.item?.media_type
      )
    ) {
      isAddToList.value = true;
    }
  }
};

const handleRemoveFromHistory = async () => {
  if (
    await utils.handleRemoveItemFromHistory(
      props.item?.movie_id,
      props.item?.media_type
    )
  ) {
    props.getDataWhenRemoveHistory(props.item?.movie_id);
  }
};
</script>

<!-- <style lang="scss" src="./MovieCardHorizontalHistory.scss"></style> -->
<style lang="scss">
@import url('./MovieCardHorizontalHistory.scss');
</style>

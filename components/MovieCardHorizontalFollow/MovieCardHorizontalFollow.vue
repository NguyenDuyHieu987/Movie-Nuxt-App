<template>
  <div class="movie-follow-item-wrapper">
    <p class="index-item">{{ index + 1 }}</p>
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
      class="movie-follow-item"
    >
      <div class="img-box">
        <div class="img-wrapper ratio-16-9">
          <!-- <img
            v-lazy="getImage(item?.backdrop_path, 'backdrop', {h:250})"
            loading="lazy"
            alt=""
          /> -->

          <NuxtImg
            :src="getImage(item?.backdrop_path, 'backdrop', { h: 250 })"
            placeholder="/imgs/loading-img-16-9.webp"
            format="avif"
            loading="lazy"
            alt=""
          />
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
            {{ dataMovie?.first_air_date?.slice(0, 4) }}
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
                <!-- <font-awesome-icon icon="fa-solid fa-ellipsis-vertical" /> -->
                <!-- <Icon name="fa6-solid:ellipsis-vertical" /> -->

                <EllipsisVertical
                  width="2rem"
                  height="2rem"
                  fill="currentColor"
                />
              </template>
            </a-button>

            <template #dropdown>
              <el-dropdown-menu>
                <div class="main-action">
                  <el-dropdown-item key="play">
                    <!-- <Icon class="play" name="ci:play-arrow" /> -->

                    <PlayIcon
                      class="play"
                      width="2.8rem"
                      height="2.8rem"
                      fill="currentColor"
                    />

                    <NuxtLink
                      v-if="isEpisodes"
                      :to="{
                        path: `/play-tv/${
                          item?.movie_id
                        }${utils.convertPath.toPathInfo_Play(item?.name)}/tap-1`
                      }"
                      class="btn-play-now"
                    >
                      Đến trang xem phim
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
                      Đến trang xem phim
                    </NuxtLink>
                  </el-dropdown-item>
                  <el-dropdown-item key="share">
                    <!-- <Icon name="ph:share-fat-bold"  /> -->

                    <ShareOutlined
                      class="share"
                      width="1.8rem"
                      height="1.8rem"
                      fill="currentColor"
                    />

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
                    key="remove-list"
                    class="remove-item"
                    @click="handleRemoveFromList"
                  >
                    <!-- <Icon name="fa6-solid:trash-can" /> -->

                    <TrashCan
                      width="1.5rem"
                      height="1.5rem"
                      fill="currentColor"
                    />

                    <span>Xóa khỏi Danh sách phát</span>
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
import EllipsisVertical from '~/assets/svgs/icons/ellipsis-vertical.svg?component';
import PlayIcon from '~/assets/svgs/icons/play.svg?component';
import ShareOutlined from '~/assets/svgs/icons/share-outlined.svg?component';
import TrashCan from '~/assets/svgs/icons/trash-can.svg?component';

import { getImage } from '~/services/image';
import { getMovieById } from '~/services/movie';
import { getTvById } from '~/services/tv';

const props = defineProps<{
  item: any;
  index: number;
  type: string | undefined;
  getDataWhenRemoveList: (id: number) => void;
}>();

const store = useStore();
const utils = useUtils();
const dataMovie = ref<any>({});
const isEpisodes = ref<boolean>(false);
const loading = ref<boolean>(false);
const isInHistory = ref<boolean>(false);
const percent = ref<number>(0);
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

onMounted(() => {});

const getData = async () => {
  loading.value = true;

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

  if (dataMovie.value?.history_progress) {
    isInHistory.value = true;
    percent.value = dataMovie.value?.history_progress?.percent;
  }

  // getItemHistory(props.item?.id, props.item?.media_type)
  //   .then((response) => {
  //     if (response.success == true) {
  //       isInHistory.value = true;
  //       percent.value = response.result?.percent;
  //     }
  //   })
  //   .catch((e) => {
  //   });
};

getData();

const handleRemoveFromList = async () => {
  if (
    await utils.handleRemoveItemFromList(
      props.item?.movie_id,
      props.item?.media_type
    )
  ) {
    props.getDataWhenRemoveList(props.item?.movie_id);
  }
};
</script>

<style lang="scss" src="./MovieCardHorizontalFollow.scss"></style>
<!-- <style lang="scss">
@import url('./MovieCardHorizontalFollow.scss');
</style> -->

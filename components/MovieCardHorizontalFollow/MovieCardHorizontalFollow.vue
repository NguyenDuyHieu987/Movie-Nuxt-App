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
          ? `/info-tv/${dataMovieDetail?.id}${utils.convertPath.toPathInfo_Play(
              dataMovieDetail?.name
            )}`
          : `/info-movie/${dataMovieDetail?.id}${utils.convertPath.toPathInfo_Play(
              dataMovieDetail?.name
            )}`
      }"
      class="movie-follow-item"
    >
      <div class="img-box">
        <div class="img-wrapper ratio-16-9">
          <!-- <img
            v-lazy="getImage(dataMovieDetail?.backdrop_path, 'backdrop', {h:250})"
            loading="lazy"
            alt=""
          /> -->
          <VipRibbon
            v-if="dataMovieDetail?.vip > 0"
            :vip="dataMovieDetail?.vip"
          />

          <NuxtImg
            :src="
              getImage(dataMovieDetail?.backdrop_path, 'backdrop', { h: 250 })
            "
            placeholder="/images/loading-img-16-9.webp"
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
          :title="dataMovieDetail?.name"
        >
          {{ dataMovieDetail?.name }}
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
            popper-class="dropdown-viewmore background-app-blur"
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

                <SvgoEllipsisVertical
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

                    <SvgoPlay
                      class="play"
                      width="2.8rem"
                      height="2.8rem"
                      fill="currentColor"
                    />

                    <NuxtLink
                      v-if="isEpisodes"
                      :to="{
                        path: `/play-tv/${
                          dataMovieDetail?.id
                        }${utils.convertPath.toPathInfo_Play(dataMovieDetail?.name)}`
                      }"
                      class="btn-play-now"
                    >
                      Đến trang xem phim
                    </NuxtLink>
                    <NuxtLink
                      v-else
                      :to="{
                        path: `/play-movie/${
                          dataMovieDetail?.id
                        }${utils.convertPath.toPathInfo_Play(dataMovieDetail?.name)}`
                      }"
                      class="btn-play-now"
                    >
                      Đến trang xem phim
                    </NuxtLink>
                  </el-dropdown-item>
                  <el-dropdown-item key="share">
                    <!-- <Icon name="ph:share-fat-bold"  /> -->

                    <SvgoShareOutlined
                      class="share"
                      width="1.8rem"
                      height="1.8rem"
                      fill="currentColor"
                    />

                    <span class="social-share">
                      <ShareNetwork
                        network="facebook"
                        :url="urlShare"
                        :title="dataMovieDetail?.name"
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

                    <SvgoTrashCan
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
// import SvgoEllipsisVertical from '~/assets/svgs/icons/ellipsis-vertical.svg?component';
// import SvgoPlay from '~/assets/svgs/icons/play.svg?component';
// import SvgoShareOutlined from '~/assets/svgs/icons/share-outlined.svg?component';
// import SvgoTrashCan from '~/assets/svgs/icons/trash-can.svg?component';

import { getImage } from '~/services/image';
import { getMovieById } from '~/services/movie';
import { getTvById } from '~/services/tv';

const props = defineProps<{
  item: any;
  index: number;
  type: string | undefined;
  getDataWhenRemoveList: (id: string) => void;
}>();

const store = useStore();
const utils = useUtils();
const dataMovie = ref<any>(props.item || {});
const dataMovieDetail = ref<any>(props.item.movieData || {});
const isEpisodes = computed<boolean>(
  () => props.item.movieData?.media_type == 'tv'
);
const loading = ref<boolean>(false);
const isInHistory = ref<boolean>(false);
const percent = ref<number>(0);
const urlShare = computed<string>(
  (): string =>
    window.location.origin +
    (isEpisodes
      ? `/info-tv/${dataMovieDetail.value?.id}${utils.convertPath.toPathInfo_Play(
          dataMovieDetail.value?.name
        )}`
      : `/info-movie/${dataMovieDetail.value?.id}${utils.convertPath.toPathInfo_Play(
          dataMovieDetail.value?.name
        )}`)
);

onMounted(() => {});

const getData = async () => {
  loading.value = true;

  // switch (props?.type || props?.item?.media_type) {
  //   case 'movie':
  //     isEpisodes.value = false;
  //     await getMovieById(props.item?.movie_id)
  //       .then((response) => {
  //         dataMovie.value = response;
  //       })
  //       .catch((e) => {})
  //       .finally(() => {
  //         loading.value = false;
  //       });
  //     break;
  //   case 'tv':
  //     isEpisodes.value = true;
  //     await getTvById(props.item?.movie_id)
  //       .then((response) => {
  //         dataMovie.value = response;
  //       })
  //       .catch((e) => {})
  //       .finally(() => {
  //         loading.value = false;
  //       });
  //     break;
  //   default:
  //     break;
  // }

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
    props.getDataWhenRemoveList(props.item?.id);
  }
};
</script>

<style lang="scss" src="./MovieCardHorizontalFollow.scss"></style>
<!-- <style lang="scss">
@import url('./MovieCardHorizontalFollow.scss');
</style> -->

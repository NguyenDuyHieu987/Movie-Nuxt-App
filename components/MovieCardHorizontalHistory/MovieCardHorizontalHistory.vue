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
        path: `/info-${dataMovie?.media_type}/${dataMovie?.id}`
      }"
      class="movie-history-item"
    >
      <div class="img-box">
        <div class="img-wrapper ratio-16-9">
          <!-- <img
            v-lazy="getImage(dataMovie?.backdrop_path, 'backdrop', {h:250})"
            loading="lazy"
            alt=""
          /> -->
          <VipRibbon
            v-if="dataMovie?.vip > 0"
            :vip="dataMovie?.vip"
          />

          <NuxtImg
            :src="getImage(dataMovie?.backdrop_path, 'backdrop', { h: 250 })"
            placeholder="/images/loading-img-16-9.webp"
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
        <h2 class="title">
          {{ dataMovie?.name }}
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
                <SvgoBaselineClose
                  width="2.5rem"
                  height="2.5rem"
                  fill="currentColor"
                />
              </template>
            </a-button>
          </el-tooltip>

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
                <!-- <Icon name="fa6-solid:ellipsis-vertical" /> -->

                <SvgoEllipsisVertical
                  width="1.9rem"
                  height="1.9rem"
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
                      :to="{
                        path: `/play-${dataMovie?.media_type}/${dataMovie?.id}`
                      }"
                      class="btn-play-now"
                    >
                      <span> Đến trang xem phim </span>
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

                    <SvgoPlaylistCheck
                      v-if="isAddToList"
                      class="icon-material"
                      width="2.8rem"
                      height="2.8rem"
                      fill="currentColor"
                    />
                    <SvgoPlaylistAdd
                      v-else
                      class="icon-material"
                      xmlns="http://www.w3.org/2000/svg"
                      width="2.8rem"
                      height="2.8rem"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    />

                    <span v-if="isAddToList">Xóa khỏi Danh sách phát</span>
                    <span v-else>Thêm vào Danh sách phát</span>
                  </el-dropdown-item>

                  <el-dropdown-item key="share">
                    <!-- <Icon name="ph:share-fat-bold" class="share" /> -->

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
                        :title="dataMovie?.name"
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

                    <SvgoTrashCan
                      width="1.5rem"
                      height="1.5rem"
                      fill="currentColor"
                    />

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
// import SvgoBaselineClose from '~/assets/svgs/icons/baseline-close.svg?component';
// import SvgoEllipsisVertical from '~/assets/svgs/icons/ellipsis-vertical.svg?component';
// import SvgoPlay from '~/assets/svgs/icons/play.svg?component';
// import SvgoPlaylistAdd from '~/assets/svgs/icons/playlist-add.svg?component';
// import SvgoPlaylistCheck from '~/assets/svgs/icons/playlist-check.svg?component';
// import SvgoShareOutlined from '~/assets/svgs/icons/share-outlined.svg?component';
// import SvgoTrashCan from '~/assets/svgs/icons/trash-can.svg?component';

import { getImage } from '~/services/image';
import { getMovieById } from '~/services/movie';
import { getTvById } from '~/services/tv';

const props = defineProps<{
  item: any;
  prevItem: any;
  type: string | undefined;
  getDataWhenRemoveHistory: (id: string) => void;
}>();

const store = useStore();
const utils = useUtils();
const dataHistory = ref<any>(props.item || {});
const dataMovie = ref<any>(props.item.movieData || {});
const isEpisodes = computed<boolean>(() => dataMovie.value?.media_type == 'tv');
const loading = ref<boolean>(false);
const urlShare = computed<string>(
  (): string =>
    window.location.origin +
    `/info-${dataMovie.value?.media_type}/${dataMovie.value?.id}`
);
const percent = ref<number>(0);
const isAddToList = ref<boolean>(false);
const timeLine = ref<string>('');

onMounted(() => {});

const getData = async () => {
  loading.value = true;
  percent.value = dataHistory.value?.percent;

  const prev_date_old = new Date(props.prevItem?.created_at);
  const date_old = new Date(dataHistory.value?.created_at);
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
        utils.dateTimeFormater.fromNow(dataHistory.value?.created_at, {
          onlyDay: true
        }) +
        ' - ' +
        utils.dateTimeFormater.format(dataHistory.value?.created_at, 'LL');
    }
  }
  // Is first item
  else {
    timeLine.value =
      utils.dateTimeFormater.fromNow(dataHistory.value?.created_at, {
        onlyDay: true
      }) +
      ' - ' +
      utils.dateTimeFormater.format(dataHistory.value?.created_at, 'LL');
  }

  // switch (props?.type || props?.item?.media_type) {
  //   case 'movie':
  //     isEpisodes.value = false;
  //     await getMovieById(dataHistory.value?.movie_id)
  //       .then((response) => {
  //         dataHistory.value = response;
  //       })
  //       .catch((e) => {})
  //       .finally(() => {
  //         loading.value = false;
  //       });
  //     break;
  //   case 'tv':
  //     isEpisodes.value = true;
  //     await getTvById(dataHistory.value?.movie_id)
  //       .then((response) => {
  //         dataHistory.value = response;
  //       })
  //       .catch((e) => {})
  //       .finally(() => {
  //         loading.value = false;
  //       });
  //     break;
  //   default:
  //     break;
  // }

  if (dataHistory.value?.in_list) {
    isAddToList.value = true;
  }

  // await getItemList(dataHistory.value?.id, dataHistory.value?.media_type);
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
      !utils.handleAddItemToList(
        dataMovie.value?.id,
        dataMovie.value.media_type
      )
    ) {
      isAddToList.value = false;
    }
  } else {
    isAddToList.value = false;
    if (
      !utils.handleRemoveItemFromList(
        dataMovie.value?.id,
        dataMovie.value.media_type
      )
    ) {
      isAddToList.value = true;
    }
  }
};

const handleRemoveFromHistory = async () => {
  if (
    await utils.handleRemoveItemFromHistory(
      dataHistory.value?.movie_id,
      dataHistory.value?.media_type
    )
  ) {
    props.getDataWhenRemoveHistory(dataHistory.value?.id);
  }
};
</script>

<style lang="scss" src="./MovieCardHorizontalHistory.scss"></style>
<!-- <style lang="scss">
@import url('./MovieCardHorizontalHistory.scss');
</style> -->

<template>
  <div class="movie-card-item-suggested">
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

    <!-- :to="{
        path: isEpisodes
          ? `/play-tv/${props.item?.id}${utils.convertPath.toPathInfo_Play(
              props.item?.name
            )}/tap-1`
          : `/play-movie/${props.item?.id}${utils.convertPath.toPathInfo_Play(
              props.item?.name
            )}`,
        force: true,
        replace: true
      }" -->
    <div
      class="img-box"
      @click="onClickPlay"
    >
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

      <div class="play-icon">
        <PlayIcon
          class="play"
          width="4rem"
          height="4rem"
          fill="currentColor"
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

    <NuxtLink
      class="info"
      :to="{
        path: isEpisodes
          ? `/info-tv/${item?.id}${utils.convertPath.toPathInfo_Play(
              item?.name
            )}`
          : `/info-movie/${item?.id}${utils.convertPath.toPathInfo_Play(
              item?.name
            )}`
      }"
    >
      <h2
        class="title"
        :title="item?.name"
      >
        {{ item?.name }}
      </h2>

      <p
        class="original-title"
        :title="item?.original_name"
      >
        {{ item?.original_name }}
      </p>

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
              <!-- <Icon name="fa6-solid:ellipsis-vertical" /> -->

              <EllipsisVertical
                width="1.8rem"
                height="1.8rem"
                fill="currentColor"
              />
            </template>
          </a-button>

          <template #dropdown>
            <el-dropdown-menu>
              <div class="main-action">
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

                  <PlaylistCheck
                    v-if="isAddToList"
                    class="icon-material"
                    width="2.8rem"
                    height="2.8rem"
                    fill="currentColor"
                  />

                  <PlaylistAdd
                    v-else
                    class="icon-material"
                    width="2.8rem"
                    height="2.8rem"
                    fill="currentColor"
                  />

                  <span v-if="isAddToList">Xóa khỏi Danh sách phát</span>
                  <span v-else>Thêm vào Danh sách phát</span>
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
    </NuxtLink>

    <!-- </template>
    </el-skeleton> -->
  </div>
</template>

<script setup lang="ts">
import PlayIcon from '~/assets/svgs/icons/play.svg?component';
import EllipsisVertical from '~/assets/svgs/icons/ellipsis-vertical.svg?component';
import PlaylistAdd from '~/assets/svgs/icons/playlist-add.svg?component';
import PlaylistCheck from '~/assets/svgs/icons/playlist-check.svg?component';
import ShareOutlined from '~/assets/svgs/icons/share-outlined.svg?component';
import TrashCan from '~/assets/svgs/icons/trash-can.svg?component';

import { getImage } from '~/services/image';
import { getMovieById, getMovieByType_Id } from '~/services/movie';
import { getTvById } from '~/services/tv';

const props = defineProps<{
  item: any;
  type: string | undefined;
}>();

const store = useStore();
const authStore = useAuthStore();
const utils = useUtils();
const dataMovie = ref<any>({});
const isEpisodes = computed<boolean>(() => props?.item?.media_type == 'tv');
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
const isAddToList = ref<boolean>(false);

onMounted(() => {});

const getData = async () => {
  loading.value = true;

  switch (props?.type || props?.item?.media_type) {
    case 'movie':
      break;
    case 'tv':
      break;
    default:
      break;
  }

  if (authStore.isLogin) {
    if (dataMovie.value?.history_progress) {
      isInHistory.value = true;
      percent.value = dataMovie.value?.history_progress?.percent;
    } else {
      // getItemHistory(props.item?.id, props.item?.media_type)
      //   .then((response) => {
      //     if (response.success == true) {
      //       isInHistory.value = true;
      //       percent.value = response.result?.percent;
      //     }
      //   })
      //   .catch((e) => {
      //   });
    }
  }
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

const onClickPlay = () => {
  return navigateTo(
    {
      path: isEpisodes.value
        ? `/play-tv/${props.item?.id}${utils.convertPath.toPathInfo_Play(
            props.item?.name
          )}/tap-1`
        : `/play-movie/${props.item?.id}${utils.convertPath.toPathInfo_Play(
            props.item?.name
          )}`
    },
    {
      replace: true,
      open: { target: '_self' }
    }
  );
};
</script>

<style lang="scss" src="./MovieCardSuggested.scss"></style>
<!-- <style lang="scss">
@import url('./MovieCardSuggested.scss');
</style> -->

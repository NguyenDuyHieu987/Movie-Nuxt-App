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
        path: `/play-${dataMovie?.media_type}/${props.dataMovie?.id}`,
        force: true,
        replace: true
      }" -->
    <div
      class="img-box"
      @click="onClickPlay"
    >
      <div class="img-wrapper ratio-16-9">
        <!-- <img
            v-lazy="getImage(dataMovie?.backdrop_path, 'backdrop', {h:250})"
            loading="lazy"
            alt=""
          /> -->
        <VipRibbon
          v-if="dataMovie?.vip > 0"
          size="small"
          :vip="dataMovie?.vip"
        />

        <NuxtImg
          :src="getImage(dataMovie?.backdrop_path, 'backdrop', { h: 250 })"
          placeholder="/images/loading-img-16-9.webp"
          format="avif"
          loading="lazy"
          :alt="dataMovie?.name"
          :title="dataMovie?.name"
        />
      </div>

      <div class="play-icon">
        <SvgoPlay
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
        path: `/info-${dataMovie?.media_type}/${dataMovie?.id}`
      }"
    >
      <h2 class="title">
        {{ dataMovie?.name }}
      </h2>

      <p
        class="original-title"
        :title="dataMovie?.original_name"
      >
        {{ dataMovie?.original_name }}
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
                    width="2.8rem"
                    height="2.8rem"
                    fill="currentColor"
                  />

                  <span v-if="isAddToList">Xóa khỏi Danh sách phát</span>
                  <span v-else>Thêm vào Danh sách phát</span>
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
                      :title="dataMovie?.name"
                      hashtags="phimhay247.site,vite"
                      style="white-space: nowrap; display: block"
                    >
                      Chia sẻ
                    </ShareNetwork>
                  </span>
                </el-dropdown-item>
              </div>

              <!-- <div class="separate"></div> -->

              <!-- <div class="danger-zone">
                <el-dropdown-item
                  key="remove-list"
                  class="remove-item"
                >
                  <SvgoTrashCan
                    width="1.5rem"
                    height="1.5rem"
                    fill="currentColor"
                  />

                  <span>Xóa khỏi Danh sách phát</span>
                </el-dropdown-item>
              </div> -->
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
// import SvgoPlay from '~/assets/svgs/icons/play.svg?component';
// import SvgoEllipsisVertical from '~/assets/svgs/icons/ellipsis-vertical.svg?component';
// import SvgoPlaylistAdd from '~/assets/svgs/icons/playlist-add.svg?component';
// import SvgoPlaylistCheck from '~/assets/svgs/icons/playlist-check.svg?component';
// import SvgoShareOutlined from '~/assets/svgs/icons/share-outlined.svg?component';
// import SvgoTrashCan from '~/assets/svgs/icons/trash-can.svg?component';

import { getImage } from '~/services/image';
import { getMovieById, getMovieByType_Id } from '~/services/movie';
import { getTvById } from '~/services/tv';
import { getItemList } from '~/services/list';
import { getItemHistory } from '~/services/history';

const props = defineProps<{
  item: any;
  type: string | undefined;
}>();

const store = useStore();
const authStore = useAuthStore();
const utils = useUtils();
const dataMovie = ref<any>(props.item || {});
const isEpisodes = computed<boolean>(() => dataMovie.value?.media_type == 'tv');
const loading = ref<boolean>(false);
const isInHistory = ref<boolean>(false);
const percent = ref<number>(0);
const urlShare = computed<string>(
  (): string =>
    window.location.origin +
    `/info-${dataMovie.value?.media_type}/${dataMovie.value?.id}`
);
const isAddToList = ref<boolean>(false);

onMounted(() => {});

const getData = async () => {
  loading.value = true;

  if (authStore.isLogin) {
    if (dataMovie.value?.in_list) {
      isAddToList.value = true;
    } else {
      await getItemList(dataMovie.value?.id, dataMovie.value?.media_type)
        .then((response) => {
          if (response.success == true) {
            isAddToList.value = true;
          }
        })
        .catch((e) => {});
    }

    if (dataMovie.value?.history_progress) {
      isInHistory.value = true;
      percent.value = dataMovie.value?.history_progress?.percent;
    } else {
      await getItemHistory(dataMovie.value?.id, dataMovie.value?.media_type)
        .then((response) => {
          if (response.success == true) {
            isInHistory.value = true;
            percent.value = response.result?.percent;
          }
        })
        .catch((e) => {});
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
        dataMovie.value?.movie_id,
        dataMovie.value?.media_type
      )
    ) {
      isAddToList.value = true;
    }
  }
};

const onClickPlay = () => {
  return navigateTo(
    {
      path: `/play-${dataMovie.value?.media_type}/${dataMovie.value?.id}`
    },
    {
      replace: true,
      open: { target: '_self' }
    }
  );
};
</script>

<!-- <style lang="scss" src="./MovieCardSuggested.scss"></style> -->
<style lang="scss">
@import url('./MovieCardSuggested.scss');
</style>

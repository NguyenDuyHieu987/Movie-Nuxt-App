<template>
  <div class="movie-card-item trailer">
    <!-- <el-skeleton :loading="loading" animated class="ratio-16-9">
      <template #template>
        <el-skeleton-item class="skeleton-img" />
      </template>

      <template #default> -->
    <NuxtLink
      class="img-wrapper"
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
      <div class="img-box ratio-16-9">
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

        <div
          v-show="isInHistory"
          class="viewed-overlay-bar"
        >
          <div
            class="percent-viewed"
            :style="{ width: percent * 100 + '%' }"
          ></div>
        </div>

        <div
          v-if="!loading"
          class="youtub-icon"
          @click.prevent="isOpenModalTrailer = true"
        >
          <!-- <font-awesome-icon icon="fa-brands fa-youtube" /> -->
          <svg
            class="fa-youtube"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
            width="5rem"
            height="5rem"
            fill="currentColor"
          >
            <path
              d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"
            />
          </svg>
        </div>
      </div>
    </NuxtLink>

    <div class="info">
      <p
        class="title"
        :title="item?.name"
      >
        {{ item?.name }}
      </p>
      <p class="original-title">
        {{ item?.original_name }}
      </p>
    </div>
    <!-- </template>
    </el-skeleton> -->

    <ModalTrailer
      v-model:isTeleport="isOpenModalTrailer"
      :is-open-modal-trailer="isOpenModalTrailer"
      :item="item"
      :is-episodes="isEpisodes"
    />
  </div>
</template>

<script setup lang="ts">
import { ModalTrailer } from '~/components/ModalTrailer';
import { getItemHistory } from '~/services/history';
import { getImage } from '~/services/image';

const props = defineProps<{
  item: any;
  type: string | undefined;
}>();

const authStore = useAuthStore();
const utils = useUtils();
const dataMovie = ref<any>({});
const loading = ref<boolean>(false);
const isInHistory = ref<boolean>(false);
const percent = ref<number>(0);
const isOpenModalTrailer = ref<boolean>(false);
const isEpisodes = computed<boolean>(() => props?.item?.media_type == 'tv');

const getData = async () => {
  // loading.value = true;

  // setTimeout(() => {
  //   loading.value = false;
  // }, 500);

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
      // await useAsyncData(
      //   `itemhistory/${store?.userAccount?.id}/${props.item?.id}`,
      //   () => getItemHistory(props.item?.id, props.item?.media_type)
      // )
      await getItemHistory(props.item?.id, props.item?.media_type)
        .then((response) => {
          if (response.success == true) {
            isInHistory.value = true;
            percent.value = response?.result?.percent;
          }
        })
        .catch((e) => {});
    }
  }
};

getData();
</script>

<!-- <style lang="scss" src="./MovieCardHorizontalTrailer.scss"></style> -->
<style lang="scss">
@import url('./MovieCardHorizontalTrailer.scss');
</style>

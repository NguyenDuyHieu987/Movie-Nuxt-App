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
        path: `/info-${dataMovie?.media_type}/${dataMovie?.id}`
      }"
    >
      <div class="img-box ratio-16-9">
        <!-- <img
          v-lazy="getImage(dataMovie?.backdrop_path, 'backdrop', {h:250})"
          loading="lazy"
          alt=""
        /> -->

        <NuxtImg
          :src="getImage(dataMovie?.backdrop_path, 'backdrop', { h: 250 })"
          placeholder="/images/loading-img-16-9.webp"
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

          <SvgoYoutube
            class="fa-youtube"
            width="5rem"
            height="5rem"
            fill="currentColor"
          />
        </div>
      </div>
    </NuxtLink>

    <div class="info">
      <p class="title">
        {{ dataMovie?.name }}
      </p>
      <p class="original-title">
        {{ dataMovie?.original_name }}
      </p>
    </div>
    <!-- </template>
    </el-skeleton> -->

    <LazyModalTrailer
      v-if="isOpenModalTrailer"
      v-model:isTeleport="isOpenModalTrailer"
      :is-open-modal-trailer="isOpenModalTrailer"
      :item="item"
      :is-episodes="isEpisodes"
    />
  </div>
</template>

<script setup lang="ts">
// import SvgoYoutube from '~/assets/svgs/icons/youtube.svg?component';

// import { ModalTrailer } from '~/components/ModalTrailer';
// import ModalTrailer from '~/components/ModalTrailer/ModalTrailer.vue';
import { getItemHistory } from '~/services/history';
import { getImage } from '~/services/image';

const props = defineProps<{
  item: any;
  type: string | undefined;
}>();

const authStore = useAuthStore();
const utils = useUtils();
const dataMovie = ref<any>(props.item || {});
const loading = ref<boolean>(false);
const isInHistory = ref<boolean>(false);
const percent = ref<number>(0);
const isOpenModalTrailer = ref<boolean>(false);
const isEpisodes = computed<boolean>(() => dataMovie.value?.media_type == 'tv');

const getData = async () => {
  // loading.value = true;

  // setTimeout(() => {
  //   loading.value = false;
  // }, 500);

  switch (props?.type || dataMovie.value?.media_type) {
    case 'movie':
      break;
    case 'tv':
      break;
    default:
      break;
  }

  // if (authStore.isLogin) {
  if (dataMovie.value?.history_progress) {
    isInHistory.value = true;
    percent.value = dataMovie.value?.history_progress?.percent;
  } else {
    // await useAsyncData(
    //   `itemhistory/${store?.userAccount?.id}/${dataMovie.value?.id}`,
    //   () => getItemHistory(dataMovie.value?.id, dataMovie.value?.media_type)
    // )
    await getItemHistory(dataMovie.value?.id, dataMovie.value?.media_type)
      .then((response) => {
        if (response.success == true) {
          isInHistory.value = true;
          percent.value = response?.result?.percent;
        }
      })
      .catch((e) => {});
  }
  // }
};

getData();
</script>

<style lang="scss" src="./MovieCardHorizontalTrailer.scss"></style>
<!-- <style lang="scss">
@import url('./MovieCardHorizontalTrailer.scss');
</style> -->

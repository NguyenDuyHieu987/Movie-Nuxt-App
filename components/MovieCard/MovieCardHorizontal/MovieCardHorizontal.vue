<template>
  <NuxtLink
    :to="{
      path: isEpisodes
        ? `/info-tv/${item?.id}${utils.convertPath.toPathInfo_Play(item?.name)}`
        : `/info-movie/${item?.id}${utils.convertPath.toPathInfo_Play(
            item?.name
          )}`
    }"
    class="movie-card-item horizontal"
    :class="{
      'show-video': showVideo
    }"
    :style="`--dominant-backdrop-color: ${item.dominant_backdrop_color[0]}, ${item.dominant_backdrop_color[1]},${item.dominant_backdrop_color[2]}`"
  >
    <!-- <el-skeleton :loading="loading" animated class="ratio-16-9">
      <template #template>
        <el-skeleton-item class="skeleton-img" />
      </template> -->

    <!-- <template #default> -->
    <div
      ref="cardItem"
      class="img-box ratio-16-9"
      @pointerenter="onMouseEnterImg"
      @pointerleave="onMouseLeaveImg"
    >
      <!-- <img
        v-lazy="getImage(item?.backdrop_path, 'backdrop', {h:250})"
        loading="lazy"
        alt=""
      /> -->

      <NuxtImg
        :src="getImage(item?.backdrop_path, 'backdrop', { h: 250 })"
        placeholder="/images/loading-img-16-9.webp"
        format="avif"
        loading="lazy"
        alt=""
      />

      <!-- <Image
        :src="getImage(item?.backdrop_path, 'backdrop', {h:250})"
        placeholder="/images/loading-img-16-9.webp"
        format="avif"
        loading="lazy"
        alt=""
      /> -->

      <div
        v-if="isInHistory"
        class="viewed-overlay-bar"
      >
        <div
          class="percent-viewed"
          :style="{ width: percent * 100 + '%' }"
        ></div>
      </div>

      <div
        v-if="isEpisodes"
        class="lastest-episode"
      ></div>

      <div class="fade-card"></div>
    </div>

    <div class="info">
      <div class="title-wrapper">
        <p
          class="title"
          :title="item?.name"
        >
          {{ item?.name }}
        </p>

        <p
          class="original-title"
          :title="item?.original_name"
        >
          {{ item?.original_name }}
        </p>
      </div>

      <div class="right">
        <div
          v-if="item?.release_date || item?.first_air_date"
          class="release-date-wrapper"
        >
          <p
            v-if="!isEpisodes"
            class="release-date"
          >
            {{ item?.release_date?.slice(0, 4) }}
          </p>
          <p
            v-else
            class="release-date"
          >
            {{ item?.first_air_date?.slice(0, 4) }}
          </p>
        </div>

        <div class="vote-average">
          <span>{{ dataMovie?.vote_average?.toFixed(2) }}</span>
        </div>
      </div>
    </div>
    <!-- </template>
    </el-skeleton> -->

    <LazyPreviewModal
      v-if="isTeleportPreviewModal"
      v-model:isTeleport="isTeleportPreviewModal"
      v-model:style="stylePreviewModal"
      :item="item"
      :data-movie="dataMovie"
      :styleProps="stylePreviewModal"
      :time-out="timeOut"
      :is-episodes="isEpisodes"
      @set-is-teleport-modal="
        (data: boolean) => (isTeleportPreviewModal = data)
      "
    />
  </NuxtLink>
</template>

<script setup lang="ts">
// import { Image } from '~/components/Image';
// import { PreviewModal } from '~/components/PreviewModal';
// import PreviewModal from '~/components/PreviewModal/PreviewModal.vue';
import { getImage } from '~/services/image';
import { getMovieById } from '~/services/movie';
import { getTvById } from '~/services/tv';
import { getVideo } from '~/services/video';
import { getItemList } from '~/services/list';
import { getItemHistory } from '~/services/history';

const props = defineProps<{
  item: any;
  type: string | undefined;
}>();

const nuxtConfig = useRuntimeConfig();
const authStore = useAuthStore();
const utils = useUtils();
const router = useRouter();
const dataMovie = ref<any>(props.item || {});
const loading = ref<boolean>(false);
const isAddToList = ref<boolean>(false);
const isInHistory = ref<boolean>(false);
const percent = ref<number>(0);
const urlShare = computed<string>((): string => window.location.href);
const isTeleportPreviewModal = ref<boolean>(false);
const cardItem = ref<HTMLElement>();
const stylePreviewModal = reactive<{
  left: number;
  top: number;
  offsetWidth: number;
  offsetHeight: number;
  imgHeight: number;
  imgWidth: number;
  rectBound: any;
}>({
  left: 0,
  top: 0,
  offsetWidth: 0,
  offsetHeight: 0,
  imgHeight: 0,
  imgWidth: 0,
  rectBound: null
});
const timeOut = ref<any>();
const isEpisodes = computed<boolean>(() => props?.item?.media_type == 'tv');
const video = ref<HTMLVideoElement>();
const showVideo = ref<boolean>(false);
const videoSrc = computed<string>(() =>
  getVideo('/feature/Transformer_5/Transformer_5' + '.m3u8')
);

const getData = async () => {
  // loading.value = true;

  // switch (props?.type || props?.item?.media_type) {
  //   case 'movie':
  //     await getMovieById(props.item.id)
  //       .then((response) => {
  //         dataMovie.value = response;
  //       })
  //       .catch((e) => {})
  //       .finally(() => {
  //         loading.value = false;
  //       });
  //     break;
  //   case 'tv':
  //     await getTvById(props.item.id)
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

  if (authStore.isLogin) {
    if (dataMovie.value?.in_list) {
      isAddToList.value = true;
    } else {
      await getItemList(props.item?.id, props.item?.media_type)
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

onMounted(() => {
  const rect = cardItem.value!?.getBoundingClientRect();

  const offsetX = rect?.left;
  const offsetY = window.scrollY + rect?.top;

  stylePreviewModal.left = offsetX + cardItem.value!?.offsetWidth / 2;
  stylePreviewModal.top = offsetY + cardItem.value!?.offsetHeight / 2;

  stylePreviewModal.offsetWidth = cardItem.value!?.offsetWidth;
  stylePreviewModal.offsetHeight = cardItem.value!?.offsetHeight;

  stylePreviewModal.imgHeight =
    cardItem.value!.querySelector('img')!?.offsetHeight;
  stylePreviewModal.imgWidth =
    cardItem.value!.querySelector('img')!?.offsetWidth;

  stylePreviewModal.rectBound = rect;
});

const onMouseEnterImg = ({ target }: { target: EventTarget | any }) => {
  if (loading.value || window.innerWidth <= APP.SHOW_PREVIEW_MODAL_MIN_WIDTH)
    return;

  const rect = target.getBoundingClientRect();

  const offsetX = rect?.left;
  const offsetY = window.scrollY + rect?.top;

  stylePreviewModal.left = offsetX + target?.offsetWidth / 2;
  stylePreviewModal.top = offsetY + target?.offsetHeight / 2;

  stylePreviewModal.offsetWidth = target?.offsetWidth;
  stylePreviewModal.offsetHeight = target?.offsetHeight;

  stylePreviewModal.imgHeight = target.querySelector('img')!?.offsetHeight;
  stylePreviewModal.imgWidth = target.querySelector('img')!?.offsetWidth;

  stylePreviewModal.rectBound = rect;

  timeOut.value = setTimeout(() => {
    isTeleportPreviewModal.value = true;
  }, 700);

  target.addEventListener('pointerleave', () => {
    clearTimeout(timeOut.value);
  });
};

const onMouseLeaveImg = () => {
  clearTimeout(timeOut.value);
};

const onMouseEnterCard = ({ target }: { target: HTMLElement | any }) => {
  if (video.value) {
    showVideo.value = true;
    video.value?.play();
  }
};

const onMouseLeaveCard = () => {
  if (video.value) {
    showVideo.value = false;
    video.value?.pause();
  }
};
</script>

<style lang="scss" src="./MovieCardHorizontal.scss"></style>
<!-- <style lang="scss">
@import url('./MovieCardHorizontal.scss');
</style> -->

<template>
  <NuxtLink
    ref="cardItem"
    :to="{
      path: isEpisodes
        ? `/info-tv/${item?.id}__${utils
            .removeVietnameseTones(item?.name)
            ?.replaceAll(/\s/g, '-')
            .toLowerCase()}`
        : `/info-movie/${item?.id}__${utils
            .removeVietnameseTones(item?.name)
            ?.replaceAll(/\s/g, '-')
            .toLowerCase()}`
    }"
    class="movie-card-item horizontal"
    :style="`--dominant-backdrop-color: ${item.dominant_backdrop_color[0]}, ${item.dominant_backdrop_color[1]},${item.dominant_backdrop_color[2]}`"
    @pointerenter="onMouseEnter"
  >
    <!-- <el-skeleton :loading="loading" animated class="ratio-16-9">
      <template #template>
        <el-skeleton-item class="skeleton-img" />
      </template> -->

    <!-- <template #default> -->
    <div class="img-box ratio-16-9">
      <!-- <img
        v-lazy="getImage(item?.backdrop_path, 'backdrop', 'h-250')"
        loading="lazy"
        alt=""
      /> -->

      <NuxtImg
        :src="getImage(item?.backdrop_path, 'backdrop', 'h-250')"
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
    </div>

    <div class="info">
      <div class="title-wrapper">
        <p class="title">
          {{ item?.name }}
        </p>

        <p class="original-title">
          {{ item?.original_name }}
        </p>
      </div>

      <div
        v-if="item?.release_date || item?.last_air_date || item?.first_air_date"
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
          {{
            item?.last_air_date?.slice(0, 4)
              ? item?.last_air_date?.slice(0, 4)
              : item?.first_air_date?.slice(0, 4)
          }}
        </p>
      </div>
    </div>
    <!-- </template>
    </el-skeleton> -->

    <PreviewModal
      v-model:isTeleport="isTeleportPreviewModal"
      :is-teleport-preview-modal="isTeleportPreviewModal"
      :item="item"
      :styleProps="{
        left: left,
        top: top,
        offsetHeight: offsetHeight,
        offsetWidth: offsetWidth,
        imgHeight: imgHeight,
        imgWidth: imgWidth,
        rectBound: rectBound
      }"
      :time-out="timeOut"
      :is-episodes="isEpisodes"
      @set-is-teleport-modal="
        (data: boolean) => (isTeleportPreviewModal = data)
      "
    />
  </NuxtLink>
</template>

<script setup lang="ts">
import { PreviewModal } from '~/components/PreviewModal';
import { getItemHistory } from '~/services/history';
import { getImage } from '~/services/image';

const props = defineProps<{
  item: any;
  type: string | undefined;
}>();

const store = useStore();
const utils = useUtils();
const router = useRouter();
const dataMovie = ref<any>({});
const isEpisodes = ref<boolean>(false);
const loading = ref<boolean>(false);
const isAddToList = ref<boolean>(false);
const isInHistory = ref<boolean>(false);
const percent = ref<number>(0);
const urlShare = computed<string>((): string => window.location.href);
const isTeleportPreviewModal = ref<boolean>(false);
const cardItem = ref<HTMLElement>();
const left = ref<number>(0);
const top = ref<number>(0);
const offsetWidth = ref<number>(0);
const offsetHeight = ref<number>(0);
const imgHeight = ref<number>(0);
const imgWidth = ref<number>(0);
const rectBound = ref<any>(0);
const timeOut = ref<any>();

const getData = async () => {
  // loading.value = true;

  // setTimeout(() => {
  //   loading.value = false;
  // }, 500);

  if (props?.type || props?.item?.media_type) {
    switch (props?.type || props?.item?.media_type) {
      case 'movie':
        isEpisodes.value = false;
        break;
      case 'tv':
        isEpisodes.value = true;
        break;
      default:
        break;
    }
  }

  if (store.isLogin) {
    if (dataMovie.value?.in_list) {
      isAddToList.value = true;
    }

    // await useAsyncData(
    //   `itemlist/${store?.userAccount?.id}/${props.item?.id}`,
    //   () => getItemList(store?.userAccount?.id, props.item?.id)
    // )
    //   .then((response) => {
    //     if (response.data.value.success == true) {
    //       isAddToList.value = true;
    //     }
    //   })
    //   .catch((e) => {
    //   });

    if (dataMovie.value?.history_progress) {
      isInHistory.value = true;
      percent.value = dataMovie.value?.history_progress?.percent;
    } else {
      // useAsyncData(
      //   `itemhistory/${store?.userAccount?.id}/${props.item?.id}`,
      //   () => getItemHistory(props.item?.id, props.item?.media_type)
      // )
      getItemHistory(props.item?.id, props.item?.media_type)
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

const onMouseEnter = ({ target }: { target: HTMLElement }) => {
  if (loading.value) return;

  const rect = target.getBoundingClientRect();

  const offsetX = rect.left;
  const offsetY = window.scrollY + rect.top;

  // left.value = offsetX + target.offsetWidth / 2 - width / 2;
  // top.value = offsetY + target.offsetHeight / 2 - height / 2;

  left.value = offsetX + target.offsetWidth / 2;
  top.value = offsetY + target.offsetHeight / 2;

  offsetWidth.value = target.offsetWidth;
  offsetHeight.value = target.offsetHeight;

  imgHeight.value = target.querySelector('img')!.offsetHeight;
  imgWidth.value = target.querySelector('img')!.offsetWidth;

  rectBound.value = rect;

  timeOut.value = setTimeout(() => {
    isTeleportPreviewModal.value = true;
  }, 700);

  target.addEventListener('pointerleave', () => {
    // isTeleportPreviewModal.value = false;
    clearTimeout(timeOut.value);
  });
};
</script>
<style lang="scss" src="./MovieCardHorizontal.scss"></style>

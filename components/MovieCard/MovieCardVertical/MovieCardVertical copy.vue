<template>
  <NuxtLink
    ref="cardItem"
    :to="{
      path: isEpisodes
        ? `/info-tv/${item?.id}${utils.convertPath.toPathInfo_Play(item?.name)}`
        : `/info-movie/${item?.id}${utils.convertPath.toPathInfo_Play(
            item?.name
          )}`
    }"
    class="movie-card-item vertical"
    @pointerenter="onMouseEnter"
  >
    <el-skeleton
      :loading="loading"
      animated
    >
      <template #template>
        <el-skeleton-item class="skeleton-img" />

        <!-- <div class="content-skeleton">
          <el-skeleton-item variant="text" />
          <el-skeleton-item variant="text" style="width: 60%" />
        </div> -->
      </template>

      <template #default>
        <div class="img-box">
          <img
            :src="getImage(item?.poster_path, 'poster')"
            class="ant-image"
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

          <!-- <div v-if="!loading" class="duration-episode-box">
            <p v-if="!isEpisodes" class="duration-episode">
              {{ item?.runtime + ' min' }}
            </p>
            <p v-else class="duration-episode">
              {{
                // dataMovie?.last_episode_to_air?.episode_number
                //   ? 'Tập ' + dataMovie?.last_episode_to_air?.episode_number
                //   : ''
                item?.episode_run_time[0]
                  ? item?.episode_run_time[0] + ' min'
                  : '? min'
              }}
            </p>
          </div> -->

          <div
            v-if="
              item?.release_date || item?.last_air_date || item?.first_air_date
            "
            class="release-date-box"
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

        <div class="info">
          <p class="title">
            {{ item?.name }}
            <!-- <span v-if="isEpisodes">
                {{ ' - Phần ' + dataMovie?.last_episode_to_air?.season_number }}
              </span> -->
          </p>
          <!-- <div class="info-bottom">
              <div class="genres">
                <span
                  class="genre-item"
                  v-for="(genre, index) in Array.from(item?.genres, (x: any) => x.name)"
                  :index="index"
                  :key="index"
                >
                  {{ genre }}
                </span>
              </div>
            </div> -->
        </div>
      </template>
    </el-skeleton>

    <PreviewModal
      v-model:isTeleport="isTeleportPreviewModal"
      v-model:style="stylePreviewModal"
      :item="item"
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
import { PreviewModal } from '~/components/PreviewModal';
import { getItemHistory } from '~/services/history';
import { getImage } from '~/services/image';

const props = defineProps<{
  item: any;
  type: string | undefined;
}>();

const authStore = useAuthStore();
const utils = useUtils();
const router = useRouter();
const isEpisodes = ref<boolean>(false);
const dataMovie = ref<any>({});
const loading = ref<boolean>(false);
const loadingImg = ref<boolean>(false);
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

  if (authStore.isLogin) {
    if (dataMovie.value?.in_list) {
      isAddToList.value = true;
    }

    // await useAsyncData(
    //   `itemlist/${store?.userAccount?.id}/${props.item?.id}`,
    //   () => getItemList(store?.userAccount?.id, props.item?.id)
    // )
    //   .then((movieRespone: any) => {
    //     if (movieRespone.data.value.data.success == true) {
    //       isAddToList.value = true;
    //     }
    //   })
    //   .catch((e) => {
    //   });

    if (dataMovie.value?.history_progress) {
      isInHistory.value = true;
      percent.value = dataMovie.value?.history_progress?.percent;
    } else {
      useAsyncData(
        `itemhistory/${authStore?.userAccount?.id}/${props.item?.id}`,
        () => getItemHistory(props.item?.id, props.item?.media_type)
      )
        .then((movieRespone: any) => {
          if (movieRespone.data.value.success == true) {
            isInHistory.value = true;
            percent.value = movieRespone.data.value?.result?.percent;
          }
        })
        .catch((e) => {});
    }
  }
};

getData();

const onMouseEnter = ({ target }: { target: EventTarget | any }) => {
  if (loading.value || window.innerWidth <= APP.SHOW_PREVIEW_MODAL_MIN_WIDTH)
    return;

  const rect = target.getBoundingClientRect();

  const offsetX = rect.left;
  const offsetY = window.scrollY + rect.top;

  // stylePreviewModal.left = offsetX + target.offsetWidth / 2 - width / 2;
  // stylePreviewModal.top = offsetY + target.offsetHeight / 2 - height / 2;

  stylePreviewModal.left = offsetX + target.offsetWidth / 2;
  stylePreviewModal.top = offsetY + target.offsetHeight / 2;

  stylePreviewModal.offsetWidth = target.offsetWidth;
  stylePreviewModal.offsetHeight = target.offsetHeight;

  stylePreviewModal.imgHeight = target.querySelector('img')!?.offsetHeight;
  stylePreviewModal.imgWidth = target.querySelector('img')!?.offsetWidth;

  stylePreviewModal.rectBound = rect;

  timeOut.value = setTimeout(() => {
    isTeleportPreviewModal.value = true;
  }, 700);

  target.addEventListener('pointerleave', () => {
    // isTeleportPreviewModal.value = false;
    clearTimeout(timeOut.value);
  });
};
</script>

<style lang="scss" src="./MovieCardVertical.scss"></style>

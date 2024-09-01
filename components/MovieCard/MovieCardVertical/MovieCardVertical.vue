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
    :style="`--dominant-poster-color: ${item.dominant_poster_color[0]}, ${item.dominant_poster_color[1]},${item.dominant_poster_color[2]}`"
  >
    <!-- <el-skeleton :loading="loading" animated class="ratio-2-3">
      <template #template>
        <el-skeleton-item class="skeleton-img" />
      </template> -->

    <!-- <template #default> -->
    <div class="img-box ratio-2-3">
      <!-- <img
        v-lazy="getImage(item?.poster_path, 'poster', {w:250})"
        loading="lazy"
        alt=""
      /> -->

      <NuxtImg
        :src="getImage(item?.poster_path, 'poster', { w: 250 })"
        placeholder="/imgs/loading-img-2-3.webp"
        format="avif"
        loading="lazy"
        alt=""
      />

      <div class="info-over-image">
        <div
          v-if="isInHistory"
          class="viewed-overlay-bar"
        >
          <div
            class="percent-viewed"
            :style="{ width: percent * 100 + '%' }"
          ></div>
        </div>

        <div class="left-bottom">
          <div
            v-if="item?.release_date || item?.first_air_date"
            class="release-date-wrapper"
          >
            <span
              v-if="!isEpisodes"
              class="release-date"
            >
              {{ item?.release_date?.slice(0, 4) }}
            </span>

            <span
              v-else
              class="release-date"
            >
              {{ item?.first_air_date?.slice(0, 4) }}
            </span>
          </div>

          <div class="vote-average">
            <span>{{ dataMovie?.vote_average?.toFixed(2) }}</span>
          </div>

          <div
            v-if="isEpisodes"
            class="lastest-episode"
          ></div>
        </div>

        <div class="right-bottom">
          <div class="views">
            <span>
              {{ utils.viewFormatter(dataMovie?.views) }}
            </span>
            <span class="text"> {{ ' lượt xem' }}</span>
          </div>

          <div class="widget">
            <el-tooltip
              title="Xem ngay"
              content="Xem ngay"
              placement="right"
              popper-class="popper-tooltip"
              :hide-after="0"
              :mouse-leave-delay="0"
            >
              <a-button
                class="click-active"
                shape="circle"
                size="large"
                type="text"
                @click.prevent="
                  navigateTo(
                    isEpisodes
                      ? `/play-tv/${
                          item?.id
                        }${utils.convertPath.toPathInfo_Play(item?.name)}/tap-1`
                      : `/play-movie/${
                          item?.id
                        }${utils.convertPath.toPathInfo_Play(item?.name)}`
                  )
                "
              >
                <template #icon>
                  <PlayIcon
                    width="2rem"
                    height="2rem"
                    fill="currentColor"
                  />
                </template>
              </a-button>
            </el-tooltip>

            <el-tooltip
              :title="
                !isAddToList ? 'Thêm vào danh sách' : 'Xóa khỏi danh sách'
              "
              :content="
                !isAddToList ? 'Thêm vào danh sách' : 'Xóa khỏi danh sách'
              "
              placement="right"
              popper-class="popper-tooltip"
              :hide-after="0"
              :mouse-leave-delay="0"
            >
              <a-button
                class="click-active add-list"
                shape="circle"
                size="large"
                type="text"
                @click.prevent="handleAddToList"
              >
                <template #icon>
                  <CheckIcon
                    v-if="isAddToList"
                    width="2em"
                    height="2em"
                    fill="currentColor"
                  />
                  <PlusIcon
                    v-else
                    width="2em"
                    height="2em"
                    fill="currentColor"
                  />
                </template>
              </a-button>
            </el-tooltip>

            <ClientOnly>
              <el-tooltip
                title="Chia sẻ"
                content="Chia sẻ"
                placement="right"
                popper-class="popper-tooltip"
                :hide-after="0"
                :mouse-leave-delay="0"
              >
                <ShareNetwork
                  network="facebook"
                  :url="urlShare"
                  :title="item?.name"
                  hashtags="phimhay247.site,vite"
                  style="white-space: nowrap; display: block"
                  @click.prevent
                >
                  <a-button
                    class="click-active"
                    shape="circle"
                    size="large"
                    type="text"
                    @click.prevent
                  >
                    <template #icon>
                      <ShareSolid
                        width="2rem"
                        height="2rem"
                        fill="currentColor"
                      />
                    </template>
                  </a-button>
                </ShareNetwork>
              </el-tooltip>
            </ClientOnly>
          </div>
        </div>
      </div>

      <div class="fade-card"></div>
    </div>

    <div class="info">
      <div
        class="info-box"
        :class="{ 'no-genres': item?.genres.length == 0 }"
      >
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

        <div class="genres-wrapper">
          <div class="genres">
            <!-- <ClientOnly>
              <NuxtLink
                v-for="(genreItem, index) in Array.from(
                  item?.genres,
                  (x: genre) => x
                )"
                :key="index"
                :index="index"
                :to="`/discover/genre/${
                  getGenreById(genreItem.id, store?.allGenres)?.short_name
                }`"
                class="genre-item"
                nuxt-client
              >
                {{ genreItem?.name }}
              </NuxtLink>
            </ClientOnly> -->

            <div
              v-for="(genreItem, index) in Array.from(
                item?.genres,
                (x: genre) => x
              )"
              :key="index"
              :index="index"
              class="genre-item"
              @click.prevent="handleClickGenreItem(genreItem)"
            >
              {{ genreItem?.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- </template>
    </el-skeleton> -->
  </NuxtLink>
</template>
<script setup lang="ts">
import PlayIcon from '~/assets/svgs/icons/play.svg?component';
import PlusIcon from '~/assets/svgs/icons/plus.svg?component';
import CheckIcon from '~/assets/svgs/icons/check.svg?component';
import ShareSolid from '~/assets/svgs/icons/share-solid.svg?component';

import { getGenreById } from '~/services/genres';
import { getImage } from '~/services/image';
import { getItemList } from '~/services/list';
import { getItemHistory } from '~/services/history';
import { getMovieById } from '~/services/movie';
import { getTvById } from '~/services/tv';
import type { genre } from '~/types';

const props = defineProps<{
  item: any;
  type: string | undefined;
}>();

const store = useStore();
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
const left = ref<number>(0);
const top = ref<number>(0);
const offsetWidth = ref<number>(0);
const offsetHeight = ref<number>(0);
const imgHeight = ref<number>(0);
const imgWidth = ref<number>(0);
const rectBound = ref<any>(0);
const timeOut = ref<any>();
const isEpisodes = computed<boolean>(() => props?.item?.media_type == 'tv');

const getData = async () => {
  // loading.value = true;

  switch (props?.type || props?.item?.media_type) {
    case 'movie':
      await getMovieById(props.item.id)
        .then((response) => {
          dataMovie.value = response;
        })
        .catch((e) => {})
        .finally(() => {
          loading.value = false;
        });
      break;
    case 'tv':
      await getTvById(props.item.id)
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

  if (authStore.isLogin) {
    if (dataMovie.value?.in_list) {
      isAddToList.value = true;
    } else {
      getItemList(props.item?.id, props.item?.media_type)
        .then((response) => {
          if (response.success == true) {
            isAddToList.value = true;
          }
        })
        .catch((e) => {});
    }

    if (dataMovie.value?.history_progress) {
      isInHistory.value = true;
      percent.value = dataMovie.value?.history_progress.percent;
    } else {
      getItemHistory(props.item?.id, props.item?.media_type)
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

// getData();

const onMouseEnter = ({ target }: { target: HTMLElement }) => {
  if (loading.value) return;

  const rect = target.getBoundingClientRect();

  const offsetX = rect?.left;
  const offsetY = window.scrollY + rect?.top;

  // left.value = offsetX + target.offsetWidth / 2 - width / 2;
  // top.value = offsetY + target.offsetHeight / 2 - height / 2;

  left.value = offsetX + target?.offsetWidth / 2;
  top.value = offsetY + target?.offsetHeight / 2;

  offsetWidth.value = target?.offsetWidth;
  offsetHeight.value = target?.offsetHeight;

  imgHeight.value = target.querySelector('img')!?.offsetHeight;
  imgWidth.value = target.querySelector('img')!?.offsetWidth;

  rectBound.value = rect;

  timeOut.value = setTimeout(() => {
    isTeleportPreviewModal.value = true;
  }, 700);

  target.addEventListener('pointerleave', () => {
    clearTimeout(timeOut.value);
  });
};

const onMouseLeave = () => {
  clearTimeout(timeOut.value);
};

const handleAddToList = (e: any) => {
  if (!authStore?.isLogin) {
    authStore.isOpenRequireAuthDialog = true;
    return;
  }

  if (!isAddToList.value) {
    isAddToList.value = true;
    if (!utils.handleAddItemToList(props.item?.id, props.item?.media_type)) {
      isAddToList.value = false;
    }
  } else {
    isAddToList.value = false;
    if (
      !utils.handleRemoveItemFromList(props.item?.id, props.item?.media_type)
    ) {
      isAddToList.value = true;
    }
  }
};

const handleClickGenreItem = (genreItem: genre) => {
  navigateTo(
    `/discover/genre/${
      getGenreById(genreItem.id, store?.allGenres)?.short_name
    }`
  );
};
</script>

<style lang="scss" src="./MovieCardVertical.scss"></style>
<!-- <style lang="scss">
@import url('./MovieCardVertical.scss');
</style> -->

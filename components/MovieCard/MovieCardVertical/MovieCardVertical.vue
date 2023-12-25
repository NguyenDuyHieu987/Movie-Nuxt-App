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
        v-lazy="getImage(item?.poster_path, 'poster', 'w-250')"
        loading="lazy"
        alt=""
      /> -->

      <NuxtImg
        :src="getImage(item?.poster_path, 'poster', 'w-250')"
        placeholder="/imgs/loading-img-2-3.webp"
        format="avif"
        loading="lazy"
        alt=""
      />

      <div class="info-over-image">
        <div
          v-show="isInHistory"
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
            v-show="isEpisodes"
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
                      ? `/play-tv/${item?.id}__${utils
                          .removeVietnameseTones(item?.name)
                          ?.replaceAll(/\s/g, '-')
                          .toLowerCase()}/tap-1`
                      : `/play-movie/${item?.id}__${utils
                          .removeVietnameseTones(item?.name)
                          ?.replaceAll(/\s/g, '-')
                          .toLowerCase()}`
                  )
                "
              >
                <template #icon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="2rem"
                    height="2rem"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
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
                  <svg
                    v-if="isAddToList"
                    xmlns="http://www.w3.org/2000/svg"
                    width="2em"
                    height="2em"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      d="M9 16.17L4.83 12l-1.42 1.41L9 19L21 7l-1.41-1.41z"
                    />
                  </svg>

                  <svg
                    v-else
                    xmlns="http://www.w3.org/2000/svg"
                    width="2em"
                    height="2em"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z" />
                  </svg>
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
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="2rem"
                        height="2rem"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path
                          d="m21 12l-7-7v4C7 10 4 15 3 20c2.5-3.5 6-5.1 11-5.1V19l7-7Z"
                        />
                      </svg>
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
                class="genre-item"
                v-for="(genre, index) in Array.from(item?.genres, (x: genre) => x)"
                :index="index"
                :key="index"
                :to="`/discover/genre/${
                  getGenreById(genre.id, store?.allGenres)?.short_name
                }`"
              >
                {{ genre?.name }}
              </NuxtLink>
            </ClientOnly> -->

            <div
              v-for="(genreItem, index) in Array.from(
                item?.genres,
                (x: genre) => x
              )"
              :key="index"
              class="genre-item"
              :index="index"
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
import { getGenreById } from '~/services/genres';
import { getItemHistory } from '~/services/history';
import { getImage } from '~/services/image';
import { getItemList } from '~/services/list';
import { getMovieById } from '~/services/movie';
import { getTvById } from '~/services/tv';
import type { genre } from '~/types';

const props = defineProps<{
  item: any;
  type: string | undefined;
}>();

const store = useStore();
const utils = useUtils();
const router = useRouter();
const dataMovie = ref<any>({});
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
      getMovieById(props.item.id)
        .then((response) => {
          dataMovie.value = response;
        })
        .catch((e) => {})
        .finally(() => {
          loading.value = false;
        });
      break;
    case 'tv':
      getTvById(props.item.id)
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

  if (store.isLogin) {
    if (dataMovie.value?.in_list) {
      isAddToList.value = true;
    } else {
      // await useAsyncData(
      //   `itemlist/${store?.userAccount?.id}/${props.item?.id}`,
      //   () => getItemList(store?.userAccount?.id, props.item?.id)
      // )
      // getItemList(props.item?.id, props.item?.media_type)
      //   .then((response) => {
      //     if (response.success == true) {
      //       isAddToList.value = true;
      //     }
      //   })
      //   .catch((e) => {
      //   });
    }

    if (dataMovie.value?.history_progress) {
      isInHistory.value = true;
      percent.value = dataMovie.value?.history_progress.percent;
    } else {
      // useAsyncData(
      //   `itemhistory/${store?.userAccount?.id}/${props.item?.id}`,
      //   () => getItemHistory(props.item?.id, props.item?.media_type)
      // )
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

const onMouseLeave = () => {
  clearTimeout(timeOut.value);
};

const handleAddToList = (e: any) => {
  if (!store?.isLogin) {
    store.openRequireAuthDialog = true;
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
    `/discover/genre/${getGenreById(genreItem.id, store?.allGenres)
      ?.short_name}`
  );
};
</script>

<style lang="scss" src="./MovieCardVertical.scss"></style>

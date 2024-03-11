<template>
  <div class="movie-info">
    <LoadingSpinner
      v-if="loading"
      class="loading-page"
    />

    <div
      v-else
      class="info-conainer"
    >
      <BackPage
        fixed
        @onclick="$router.back()"
      >
        Quay lại
      </BackPage>

      <div class="variant-backdrop"></div>

      <div class="main-info">
        <div class="backdrop-img">
          <div class="backdrop-wrapper ratio-16-9">
            <NuxtImg
              :src="
                getImage(
                  dataMovie?.backdrop_path,
                  'backdrop',
                  'w-' + windowWidth.toString()
                )
              "
              format="avif"
              loading="lazy"
              alt=""
            />
          </div>
          <div
            class="poster"
            :style="`--dominant-poster-color: ${dataMovie?.dominant_poster_color[0]}, ${dataMovie?.dominant_poster_color[1]},${dataMovie?.dominant_poster_color[2]}`"
          >
            <div class="poster-wrapper ratio-2-3">
              <NuxtImg
                :src="getImage(dataMovie?.poster_path, 'poster', 'w-250')"
                format="avif"
                loading="lazy"
                alt=""
              />
            </div>

            <NuxtLink
              class="play-now click-active"
              :to="{
                path: `/play-movie/${
                  dataMovie?.id
                }${utils.convertPath.toPathInfo_Play(dataMovie?.name)}`
              }"
            >
              Xem phim ngay
            </NuxtLink>
          </div>

          <div class="overlay-backdrop">
            <NuxtImg
              :src="
                getImage(
                  dataMovie?.backdrop_path,
                  'backdrop',
                  'w-' + windowWidth.toString()
                )
              "
              format="avif"
              loading="lazy"
              alt=""
            />
          </div>
        </div>

        <div class="movie-content">
          <!-- <div class="variant-content"></div> -->

          <div class="main-content">
            <div class="detail-content-left">
              <div class="head-content">
                <h1 class="movie-title">{{ dataMovie?.name }}</h1>
                <div class="action">
                  <div class="left">
                    <NuxtLink
                      class="action-btn"
                      :to="{
                        path: `/play-movie/${
                          dataMovie?.id
                        }${utils.convertPath.toPathInfo_Play(dataMovie?.name)}`
                      }"
                    >
                      <a-button
                        size="large"
                        type="text"
                        class="play modern"
                      >
                        <template #icon>
                          <!-- <Icon name="ci:play-arrow" class="play" /> -->

                          <svg
                            class="play"
                            xmlns="http://www.w3.org/2000/svg"
                            width="3rem"
                            height="3rem"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </template>
                        Xem ngay
                      </a-button>
                    </NuxtLink>

                    <div
                      class="action-btn"
                      @click="handleAddToList"
                    >
                      <a-button
                        size="large"
                        class="add modern"
                      >
                        <template #icon>
                          <!-- <Icon v-if="isAddToList" name="ic:baseline-check" />
                          <Icon v-else name="ic:baseline-plus" /> -->

                          <svg
                            v-if="isAddToList"
                            xmlns="http://www.w3.org/2000/svg"
                            width="1.8rem"
                            height="1.8rem"
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
                            width="1.8rem"
                            height="1.8rem"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z" />
                          </svg>
                        </template>
                        <span> Danh sách</span>
                      </a-button>
                    </div>

                    <NuxtLink
                      href="#trailer"
                      class="action-btn"
                      @click.prevent="scrollToTrailer"
                    >
                      <a-button
                        size="large"
                        class="trailer modern"
                      >
                        <template #icon>
                          <!-- <Icon name="fa6-brands:youtube" class="trailer" /> -->

                          <svg
                            class="trailer"
                            xmlns="http://www.w3.org/2000/svg"
                            width="1.8rem"
                            height="1.8rem"
                            viewBox="0 0 576 512"
                            fill="currentColor"
                          >
                            <path
                              d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597c-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821c11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205l-142.739 81.201z"
                            />
                          </svg>
                        </template>
                        <span> Trailer</span>
                      </a-button>
                    </NuxtLink>
                  </div>

                  <div class="right">
                    <Interaction
                      buttonClass="action-btn"
                      :dataMovie="dataMovie"
                    />

                    <NuxtLink
                      href="#comment"
                      class="action-btn"
                      @click.prevent="scrollToComment"
                    >
                      <a-button
                        size="large"
                        type="text"
                        class="comment modern"
                      >
                        <template #icon>
                          <!-- <Icon name="ic:outline-comment" class="comment" /> -->
                          <svg
                            class="comment"
                            xmlns="http://www.w3.org/2000/svg"
                            width="2.1rem"
                            height="2.1rem"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path
                              d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4l-.01-18zM20 4v13.17L18.83 16H4V4h16zM6 12h12v2H6zm0-3h12v2H6zm0-3h12v2H6z"
                            />
                          </svg>
                        </template>
                        <span> Bình luận</span>
                      </a-button>
                    </NuxtLink>

                    <!-- <div class="ellipsis">
                      <Icon name="fa6-solid:ellipsis" />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1.9rem"
                        height="1.9rem"
                        viewBox="0 0 512 512"
                        fill="currentColor" 
                      >
                        <circle cx="256" cy="256" r="48" />
                        <circle cx="256" cy="416" r="48" />
                        <circle cx="256" cy="96" r="48" />
                      </svg>
                    </div> -->
                  </div>
                </div>
              </div>

              <Tags
                tagsLabel="Nội dung:"
                class="tags-overview"
              >
                <template #tagsInfo>
                  <Overview :content="dataMovie?.overview" />
                  <!-- <span class="text">
                      {{
                        dataMovie?.overview ||
                        'Sorry! This movie has not been updated overview content.'
                      }}
                    </span> -->
                </template>
              </Tags>

              <RatingMovie
                :dataMovie="dataMovie"
                :ratedValue="ratedValue"
              />

              <Tags tagsLabel="Lượt xem:">
                <template #tagsInfo>
                  <span class="text">
                    {{
                      dataMovie?.views
                        ?.toString()
                        ?.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' lượt xem'
                    }}
                  </span>
                </template>
              </Tags>
            </div>

            <div class="detail-content-right">
              <Tags tagsLabel="Tên gốc:">
                <template #tagsInfo>
                  <span class="tags-item">
                    {{ dataMovie?.original_name }}
                  </span>
                </template>
              </Tags>

              <Tags tagsLabel="Đang phát:">
                <template #tagsInfo>
                  <span class="tags-item">HD - Vietsub</span>
                </template>
              </Tags>

              <Tags tagsLabel="Ngày phát hành:">
                <template #tagsInfo>
                  <span class="tags-item">
                    <NuxtLink
                      class="underline"
                      :to="`/discover/year/${dataMovie?.release_date?.slice(
                        0,
                        4
                      )}`"
                    >
                      {{ dataMovie?.release_date?.slice(0, 4) }}
                    </NuxtLink>
                    <span>
                      {{ dataMovie?.release_date?.slice(4) }}
                    </span>
                  </span>
                </template>
              </Tags>

              <Tags tagsLabel="Quốc gia:">
                <template #tagsInfo>
                  <span class="tags-item">
                    <NuxtLink
                      class="underline"
                      :to="`/discover/country/${
                        getCountryByOriginalLanguage(
                          dataMovie?.original_language,
                          store.allCountries
                        )?.short_name || 'au-my'
                      }`"
                    >
                      {{
                        getCountryByOriginalLanguage(
                          dataMovie?.original_language,
                          store.allCountries
                        )?.name || ''
                      }}
                    </NuxtLink>
                  </span>
                </template>
              </Tags>

              <Tags tagsLabel="Thể loại:">
                <template #tagsInfo>
                  <span
                    v-for="(item, index) in dataMovie?.genres"
                    :key="item?.id"
                    :index="index"
                    class="tags-item"
                  >
                    <NuxtLink
                      class="underline"
                      :to="`/discover/genre/${
                        getGenreById(item?.id, store.allGenres)?.short_name
                      }`"
                    >
                      {{ item?.name }}
                    </NuxtLink>
                    <span>
                      {{ index + 1 != dataMovie?.genres?.length ? ', ' : '' }}
                    </span>
                  </span>
                </template>
              </Tags>

              <Tags tagsLabel="Thời lượng:">
                <template #tagsInfo>
                  <span class="tags-item">
                    {{ dataMovie?.runtime + ' phút' }}</span
                  >
                </template>
              </Tags>

              <Tags tagsLabel="Trạng thái:">
                <template #tagsInfo>
                  <span class="tags-item"> {{ dataMovie?.status }}</span>
                </template>
              </Tags>
            </div>
          </div>

          <Tags
            v-if="isInHistory"
            tagsLabel="Đã xem:"
            class="progress-history-tags"
          >
            <template #tagsInfo>
              <HistoryProgressBar :historyProgress="percentProgressHistory" />
            </template>
          </Tags>
        </div>
      </div>

      <div class="related-content padding-content">
        <MovieRelated :dataMovie="dataMovie" />

        <CastCrew :dataMovie="dataMovie" />

        <div
          id="trailer"
          class="trailer"
        >
          <h2 class="title-default">Trailer</h2>
          <iframe
            height="100%"
            width="100%"
            :src="
              dataMovie?.videos?.length > 0
                ? `https://www.youtube.com/embed/${dataMovie?.videos[0]?.key}` // Math.floor(Math.random() * dataMovie?.videos?.length)
                : 'https://www.youtube.com/embed/itnqEauWQZM'
            "
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media;
          gyroscope; picture-in-picture"
            allowFullScreen
            frameBorder="{0}"
          />
        </div>

        <Comment :dataMovie="dataMovie" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LoadingSpinner } from '~/components/Loading';
import { BackPage } from '~/components/BackPage';
import { Tags } from '~/components/Tags';
import { Overview } from '~/components/Overview';
import { RatingMovie } from '~/components/RatingMovie';
import { Interaction } from '~/components/Interaction';
import { HistoryProgressBar } from '~/components/HistoryProgressBar';
import { MovieRelated } from '~/components/MovieRelated';
import { CastCrew } from '~/components/CastCrew';
import { Comment } from '~/components/Comment';
import { getMovieById } from '~/services/movie';
import { getCountryByOriginalLanguage } from '~/services/country';
import { getGenreById } from '~/services/genres';
import { getItemHistory } from '~/services/history';
import { getImage, getServerImage } from '~/services/image';
import { getItemList } from '~/services/list';
import { getRating } from '~/services/rating';

definePageMeta({
  pageTransition: {
    name: 'fade'
  }
});

const nuxtApp = useNuxtApp();
const store = useStore();
const authStore = useAuthStore();
const utils = useUtils();
const route = useRoute();
const router = useRouter();
// const dataMovie = ref<any>({});
const loading = ref<boolean>(false);
const srcBackdropList = ref<string[]>([]);
const isAddToList = ref<boolean>(false);
const isInHistory = ref<boolean>(false);
const percentProgressHistory = ref<number>(0);
const ratedValue = ref<number | undefined>();
const windowWidth = ref<number>(1200);
const movieId = computed<string>((): string =>
  utils.convertPath.parsePathInfo_Play(route.params?.id)
);

const setBackgroundColor = (color: string[]) => {
  const main_color = `rgba(${color[0]}, ${color[1]}, ${color[2]}, 1)`;

  const backdrop_wrapper = document.getElementsByClassName(
    'backdrop-wrapper'
  )[0] as HTMLElement;

  // backdrop_wrapper.style.setProperty('--dominant-backdrop-color', main_color);
};

const getData = async () => {
  loading.value = true;

  // await nextTick();

  // await useAsyncData(`movie/detail/${movieId.value}/videos`, () =>
  //   getMovieById(movieId.value, 'videos')
  // )
  await getMovieById(movieId.value, 'videos')
    .then((response) => {
      dataMovie.value = response;

      // dataMovie.value.images?.backdrops?.forEach((item) => {
      //   srcBackdropList.value.push(
      //     'https://image.tmdb.org/t/p/original' + item?.file_path
      //   );
      // });

      // srcBackdropList.value = Array.from(
      //   dataMovie.value.images?.backdrops,
      //   (item: any) => 'https://image.tmdb.org/t/p/original' + item?.file_path
      // );

      // setBackgroundColor(dataMovie.value.dominant_backdrop_color);
    })
    .catch((e) => {
      throw createError({
        statusCode: 404
      });
    })
    .finally(() => {
      loading.value = false;
    });

  if (authStore.isLogin) {
    isAddToList.value = dataMovie.value?.in_list == true;

    if (dataMovie.value?.history_progress) {
      isInHistory.value = true;
      percentProgressHistory.value = dataMovie.value?.history_progress.percent;
    }

    // disabledRate.value = !!dataMovie.value?.rated_value;
    ratedValue.value = dataMovie.value?.rated_value;
  }
};

onBeforeMount(() => {
  windowWidth.value = window.innerWidth;

  // window.scrollTo({
  //   top: 0,
  //   left: 0,
  //   behavior: 'instant',
  // });
});

// getData();

loading.value = true;

const { data: dataMovie } = await useAsyncData(
  `movie/detail/${movieId.value}/videos`,
  () => getMovieById(movieId.value, 'videos'),
  {
    // server: false,
    // lazy: true,
    // immediate: false,
  }
);

isAddToList.value = dataMovie.value?.in_list == true;

if (dataMovie.value?.history_progress) {
  isInHistory.value = true;
  percentProgressHistory.value = dataMovie.value?.history_progress.percent;
}

ratedValue.value = dataMovie.value?.rated_value;

if (authStore.isLogin) {
  if (!isAddToList.value) {
    getItemList(movieId.value, 'movie')
      .then((response) => {
        if (response.success == true) {
          isAddToList.value = true;
        }
      })
      .catch((e) => {});
  }

  if (!isInHistory.value) {
    getItemHistory(movieId.value, 'movie')
      .then((response) => {
        if (response.success == true) {
          isInHistory.value = true;
          percentProgressHistory.value = response.result?.percent;
        }
      })
      .catch((e) => {});
  }

  if (!ratedValue.value) {
    getRating(movieId.value, 'movie')
      .then((response) => {
        if (response.success == true) {
          ratedValue.value = response.result?.rate_value;
        }
      })
      .catch((e) => {});
  }
}
loading.value = false;

useHead({
  title: () => 'Thông tin: ' + dataMovie.value?.name + '',
  htmlAttrs: { lang: 'vi' }
});

useSeoMeta({
  title: () => 'Thông tin: ' + dataMovie.value?.name + '',
  description: () => dataMovie.value?.overview,
  ogTitle: () => 'Thông tin: ' + dataMovie.value?.name + '',
  ogType: 'video.movie',
  // ogUrl: () => window.location.href,
  ogDescription: () => dataMovie.value?.overview,
  ogImage: () =>
    getServerImage(
      dataMovie.value?.backdrop_path,
      'backdrop',
      'w-' + windowWidth.toString()
    ),
  ogLocale: 'vi'
});

const handleAddToList = () => {
  if (!authStore.isLogin) {
    authStore.isOpenRequireAuthDialog = true;
    return;
  }
  if (!isAddToList.value) {
    isAddToList.value = true;
    if (!utils.handleAddItemToList(dataMovie.value?.id, 'movie')) {
      isAddToList.value = false;
    }
  } else {
    isAddToList.value = false;
    if (!utils.handleRemoveItemFromList(dataMovie.value?.id, 'movie')) {
      isAddToList.value = true;
    }
  }
};

const scrollToTrailer = () => {
  const trailer = document.getElementById('trailer') as HTMLElement;
  trailer.scrollIntoView({ block: 'center', behavior: 'smooth' });
};

const scrollToComment = () => {
  const comment = document.getElementById('comment') as HTMLElement;
  comment.scrollIntoView({ block: 'center', behavior: 'smooth' });
};
</script>

<style lang="scss" src="./InfoMoviePage.scss"></style>

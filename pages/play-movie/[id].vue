<template>
  <div class="play-movie padding-content">
    <!-- <LoadingSpinner
      v-if="loading"
      class="loading-page"
    /> -->

    <div class="play-container">
      <div class="main-play">
        <div class="top-page">
          <BackPage @onclick="onClickBack">
            {{ dataMovie?.name }}
          </BackPage>

          <HistoryProgressBar :historyProgress="historyProgress.percent" />
        </div>

        <div class="video">
          <div class="video-wrapper">
            <!-- <iframe
                id="vimeo-player"
                :src="`https://player.vimeo.com/video/${urlCodeMovie}`"
                width="100%"
                height="100%"
                frameborder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowfullscreen
              ></iframe> -->

            <!-- <iframe
                id="okru-player"
                width="100%"
                height="100%"
                :src="`//ok.ru/videoembed/${'3056793684585'}`"
                frameborder="0"
                allow="autoplay"
                allowfullscreen
              ></iframe> -->

            <!-- videoUrl="/feature/Transformer_5/Transformer_5" -->

            <VideoPlayer
              v-model:isInHistory="isInHistory"
              v-model:historyProgress="historyProgress"
              :dataMovie="dataMovie"
              :loadingData="loading || !dataMovie"
              :videoUrl="`${dataMovie?.video_path || '/feature/Transformer_5/Transformer_5'}`"
              :backdrop="
                getImage(
                  dataMovie?.backdrop_path,
                  'backdrop',
                  // 'w-' + windowWidth.toString()
                  { w: windowWidth }
                )
              "
              @onPlay="(e: any) => onPLayVideoPlayer(e)"
              @onTimeUpdate="(e: any) => onTimeUpdateVideoPlayer(e)"
            />
          </div>
        </div>

        <div class="movie-content">
          <el-skeleton
            :loading="loadingMovie"
            animated
          >
            <template #template>
              <el-skeleton-item
                class="title"
                variant="text"
                style="width: 50%"
              />
              <div class="actions">
                <div class="left">
                  <el-skeleton-item
                    v-for="(item, index) in 3"
                    :key="index"
                    variant="button"
                  />
                </div>
                <div class="right">
                  <el-skeleton-item
                    v-for="(item, index) in 2"
                    :key="index"
                    variant="button"
                  />
                </div>
              </div>
              <div class="content">
                <el-skeleton-item
                  variant="text"
                  style="width: 90%"
                />
                <el-skeleton-item
                  variant="text"
                  style="width: 60%"
                />
                <el-skeleton-item
                  class="rate"
                  variant="text"
                  style="width: 70%"
                />
                <el-skeleton-item
                  class="view"
                  variant="text"
                  style="width: 30%"
                />
              </div>
            </template>
            <template #default>
              <h2 class="movie-title">{{ dataMovie?.name }}</h2>
              <h3
                v-if="dataMovie?.name != dataMovie?.original_name"
                class="movie-original-title"
              >
                {{ dataMovie?.original_name }}
              </h3>

              <div class="actions">
                <div class="left">
                  <div
                    class="action-btn"
                    @click="handleAddToList"
                  >
                    <a-button class="modern add">
                      <template #icon>
                        <!-- <Icon v-if="isAddToList" name="ic:baseline-check" />
                        <Icon v-else name="ic:baseline-plus" /> -->

                        <SvgoCheck
                          v-if="isAddToList"
                          width="2.5rem"
                          height="2.5rem"
                          fill="currentColor"
                        />

                        <SvgoPlus
                          v-else
                          width="2.5rem"
                          height="2.5rem"
                          fill="currentColor"
                        />
                      </template>
                      <span> Danh sách</span>
                    </a-button>
                  </div>
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
                      <!-- <Icon name="ic:outline-comment" class="comment" /> -->

                      <template #icon>
                        <SvgoComment
                          class="comment"
                          width="2.1rem"
                          height="2.1rem"
                          fill="currentColor"
                        />
                      </template>
                      <span> Bình luận</span>
                    </a-button>
                  </NuxtLink>
                </div>
              </div>

              <Tags tagsLabel="Lượt xem:">
                <template #tagsInfo>
                  <span class="text">{{
                    dataMovie?.views
                      ?.toString()
                      ?.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' lượt xem'
                  }}</span>
                </template>
              </Tags>

              <Tags
                tagsLabel="Nội dung:"
                class="tags-overview"
              >
                <template #tagsInfo>
                  <Overview :content="dataMovie?.overview" />
                </template>
              </Tags>

              <RatingMovie
                :dataMovie="dataMovie"
                :ratedValue="ratedValue"
              />
            </template>
          </el-skeleton>

          <Comment :dataMovie="dataMovie" />
        </div>
      </div>

      <div class="side-view">
        <div class="secondary-movie-content">
          <el-skeleton
            :loading="loadingMovie"
            animated
          >
            <template #template>
              <div class="poster-box">
                <div class="img-box">
                  <el-skeleton-item class="skeleton-img ratio-2-3" />
                </div>
                <div class="movie-info">
                  <el-skeleton-item
                    variant="text"
                    style="width: 100px"
                  />
                  <el-skeleton-item
                    variant="text"
                    style="width: 150px"
                  />
                </div>
              </div>

              <el-skeleton-item
                variant="text"
                style="width: 300px"
              />
              <el-skeleton-item
                variant="text"
                style="width: 150px"
              />
              <el-skeleton-item
                variant="text"
                style="width: 200px"
              />
            </template>
            <template #default>
              <div class="poster-box">
                <div
                  class="poster"
                  :style="`--dominant-poster-color: ${dataMovie?.dominant_poster_color[0]}, ${dataMovie?.dominant_poster_color[1]},${dataMovie?.dominant_poster_color[2]}`"
                >
                  <div class="img-box ratio-2-3">
                    <a-badge-ribbon
                      v-if="dataMovie?.vip > 0"
                      :text="'VIP ' + dataMovie?.vip"
                      placement="start"
                      :class="`vip-${dataMovie?.vip}`"
                    />

                    <NuxtImg
                      :src="
                        getImage(dataMovie?.poster_path, 'poster', { w: 250 })
                      "
                      placeholder="/images/loading-img-2-3.webp"
                      loading="lazy"
                      alt=""
                    />
                  </div>
                </div>
                <div class="movie-info">
                  <h2 class="movie-title">{{ dataMovie?.name }}</h2>
                  <h3
                    v-if="dataMovie?.name != dataMovie?.original_name"
                    class="movie-original-title"
                  >
                    {{ dataMovie?.original_name }}
                  </h3>

                  <div>
                    <div class="movie-info-item">HD - Vietsub</div>

                    <div class="movie-info-item">
                      <NuxtLink
                        class="underline"
                        :to="`/discover/year/${dataMovie?.release_date.slice(0, 4)}`"
                      >
                        {{ dataMovie?.release_date.slice(0, 4) }}
                      </NuxtLink>
                      <span>
                        {{ dataMovie?.release_date.slice(4) }}
                      </span>
                    </div>

                    <div class="movie-info-item">
                      <NuxtLink
                        class="underline"
                        :to="`/discover/country/${
                          getCountryByOriginalLanguage(
                            dataMovie?.origin_country,
                            store.allCountries
                          )?.short_name || 'au-my'
                        }`"
                      >
                        {{
                          getCountryByOriginalLanguage(
                            dataMovie?.origin_country,
                            store.allCountries
                          )?.name || ''
                        }}
                      </NuxtLink>
                    </div>
                  </div>
                </div>
              </div>

              <div>
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
                        >{{ item?.name }}
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
            </template>
          </el-skeleton>
        </div>

        <MovieSuggested :dataMovie="dataMovie" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import SvgoPlus from '~/assets/svgs/icons/plus.svg?component';
// import SvgoCheck from '~/assets/svgs/icons/check.svg?component';
// import SvgoComment from '~/assets/svgs/icons/comment.svg?component';
// import EllipsisHorizontal from '~/assets/svgs/icons/ellipsis-horizontal.svg?component';

// import { LoadingSpinner } from '~/components/Loading';
// import { BackPage } from '~/components/BackPage';
// import { VideoPlayer } from '~/components/VideoPlayer';
// import { HistoryProgressBar } from '~/components/HistoryProgressBar';
// import { Tags } from '~/components/Tags';
// import { Overview } from '~/components/Overview';
// import { RatingMovie } from '~/components/RatingMovie';
// import { Interaction } from '~/components/Interaction';
// import { Comment } from '~/components/Comment';
// import { MovieSuggested } from '~/components/MovieSuggested';
// import LoadingSpinner from '~/components/Loading/LoadingSpinner/LoadingSpinner.vue';
// import BackPage from '~/components/BackPage/BackPage.vue';
// import VideoPlayer from '~/components/VideoPlayer/VideoPlayer.vue';
// import HistoryProgressBar from '~/components/HistoryProgressBar/HistoryProgressBar.vue';
// import Tags from '~/components/Tags/Tags.vue';
// import Overview from '~/components/Overview/Overview.server.vue';
// import RatingMovie from '~/components/RatingMovie/RatingMovie.vue';
// import Interaction from '~/components/Interaction/Interaction.vue';
// import Comment from '~/components/Comment/Comment.vue';
// import MovieSuggested from '~/components/MovieSuggested/MovieSuggested.vue';
import { getCountryByOriginalLanguage } from '~/services/country';
import { getGenreById } from '~/services/genres';
import { add_update_History, getItemHistory } from '~/services/history';
import { getImage, getServerImage } from '~/services/image';
import {
  getMovieById,
  getMovieByType_Id,
  UpdateViewMovie
} from '~/services/movie';
import { getItemList } from '~/services/list';
import { addRankPlay } from '~/services/ranks';
import { getRating } from '~/services/rating';

defineOptions({ name: 'play-movie' });

definePageMeta({
  name: 'play-movie',
  key: 'play-movie',
  preventOpenFixedSidebar: true,
  closeSidebar: true
  // layout: 'play'
  // pageTransition: {
  //   name: 'fade'
  // }
});

const store = useStore();
const authStore = useAuthStore();
const utils = useUtils();
const route = useRoute();
const router = useRouter();
// const dataMovie = ref<any>({});
const loading = ref<boolean>(false);
const loadingMovie = computed<boolean>(
  () => !dataMovie.value || loading.value || status.value != 'success'
);
const urlCodeMovie = ref<string>('809431505');
const isAddToList = ref<boolean>(false);
const seconds = ref<number>(0);
const percent = ref<number>(0);
const duration = ref<number>(0);
const isPlayVideo = ref<boolean>(false);
const isUpdateView = ref<boolean>(true);
const isInHistory = ref<boolean>(false);
const historyProgress = ref<{
  duration: number;
  percent: number;
  seconds: number;
}>({
  duration: 0,
  percent: 0,
  seconds: 0
});
const ratedValue = ref<number | undefined>();
const windowWidth = ref<number>(1200);
const movieId = computed<string>(
  (): string =>
    // utils.convertPath.parsePathInfo_Play(route.params?.id as string)
    route.params?.id as string
);

const getData = async () => {
  loading.value = true;

  // await nextTick();

  // await useAsyncData(`movie/detail/${movieId.value}`, () =>
  //   getMovieByType_Id('movie', movieId.value)
  // )
  getMovieByType_Id('movie', movieId.value)
    .then((response) => {
      dataMovie.value = response;
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
      historyProgress.value = dataMovie.value?.history_progress;
    }

    // disabledRate.value = !!dataMovie.value?.rated_value;
    ratedValue.value = dataMovie.value?.rated_value;
  }
};

onMounted(() => {
  windowWidth.value = window.innerWidth;

  // const videoPlayer = document.querySelector(
  //   '.video-player #video-player'
  // ) as HTMLVideoElement;

  // videoPlayer?.scrollIntoView({
  //   block: 'end',
  //   behavior: 'instant'
  // });

  if (window.innerWidth < APP.COLLAPSED_SIDEBAR_WIDTH) {
    store.collapsed = true;
  }
});

// getData();

loading.value = true;

const {
  data: dataMovie,
  status,
  error
} = await useAsyncData(
  `movie/detail/${movieId.value}`,
  () => getMovieByType_Id('movie', movieId.value),
  {
    // lazy: true
  }
);

if (error.value) {
  throw createError({ statusCode: 500 });
}

isAddToList.value = dataMovie.value?.in_list == true;

ratedValue.value = dataMovie.value?.rated_value;

watch(
  () => authStore.isLogin,
  () => {
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
              historyProgress.value = response.result;
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
  },
  {
    immediate: true
  }
);

loading.value = false;

useHead({
  title: () => 'Xem phim: ' + dataMovie.value?.name + '',
  htmlAttrs: { lang: 'vi' }
});

useSeoMeta({
  title: () => 'Xem phim: ' + dataMovie.value?.name + '',
  description: () => dataMovie.value?.overview,
  ogTitle: () => 'Xem phim: ' + dataMovie.value?.name + '',
  ogType: 'video.movie',
  ogUrl: () => window?.location?.href,
  ogDescription: () => dataMovie.value?.overview,
  ogImage: () =>
    getServerImage(
      dataMovie.value?.backdrop_path,
      'backdrop',
      // 'w-' + windowWidth.toString()
      { w: windowWidth.value }
    ),
  ogLocale: 'vi'
});

const updateHistory = () => {
  if (isPlayVideo.value == true && authStore.isLogin) {
    if (
      seconds.value > 0 &&
      percent.value > 0 &&
      // percent.value > percentProgressHistory.value &&
      duration.value > 0
    ) {
      add_update_History({
        media_type: 'movie',
        movie_id: dataMovie.value?.id,
        duration: duration.value,
        percent: percent.value,
        seconds: seconds.value
      })
        .then((response) => {
          if (response?.success) {
            // percentProgressHistory.value = percent.value;
          }
        })
        .catch((e) => {});
    }
  }
};

onBeforeRouteLeave(() => {
  // updateHistory();
});

const onPLayVideoPlayer = (e: any) => {
  duration.value = e?.duration;
  isPlayVideo.value = true;
};

const throttleUpdateHistory = _lodash_Throttle(updateHistory, 1000);

const onTimeUpdateVideoPlayer = (e: any) => {
  if (!isPlayVideo.value) {
    isPlayVideo.value = true;
  }

  historyProgress.value.percent = e.percent;

  if (e.seconds > seconds.value && e.percent > percent.value) {
    seconds.value = e.seconds;
    percent.value = e.percent;

    if (duration.value != e.duration) {
      duration.value = e.duration;
    }

    throttleUpdateHistory();

    // updateHistory();

    if (seconds.value > e.duration / 2) {
      if (isUpdateView.value == true) {
        UpdateViewMovie(movieId.value)
          .then((response) => {
            if (response?.success) {
              // Do something
            }
          })
          .catch((e) => {});

        addRankPlay({
          movie_id: dataMovie.value?.id,
          media_type: dataMovie.value?.media_type
        })
          .then((response) => {
            if (response?.success) {
              // Do something
            }
          })
          .catch((e) => {});

        isUpdateView.value = false;
      }
    }
  }
};

const handleAddToList = () => {
  if (!authStore?.isLogin) {
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

const scrollToComment = () => {
  const comment = document.getElementById('comment') as HTMLElement;
  comment.scrollIntoView({ block: 'center', behavior: 'smooth' });
};

const onClickBack = async () => {
  await navigateTo({
    path: `/info-movie/${dataMovie.value?.id}`
  });
};
</script>

<!-- <style lang="scss" src="./PlayMoviePage.scss"></style> -->
<style lang="scss">
@import url('./PlayMoviePage.scss');
</style>

<template>
  <div class="play-movie padding-content">
    <LoadingSpinner
      v-if="loading"
      class="loading-page"
    />

    <div
      v-else
      class="play-container"
    >
      <div class="top-page">
        <BackPage
          @onclick="
            navigateTo({
              path: `/info-movie/${dataMovie?.id}__${utils
                .removeVietnameseTones(dataMovie?.name)
                ?.replaceAll(/\s/g, '-')
                .toLowerCase()}
            `
            })
          "
        >
          <span> {{ dataMovie?.name }}</span>
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

          <VideoPlayer
            v-model:isInHistory="isInHistory"
            v-model:historyProgress="historyProgress"
            :dataMovie="dataMovie"
            videoUrl="/feature/Transformer_5"
            :backdrop="
              getImage(
                dataMovie?.backdrop_path,
                'backdrop',
                'w-' + windowWidth.toString()
              )
            "
            @onPlay="(e) => onPLayVideoPlayer(e)"
            @onTimeUpdate="(e) => onTimeUpdateVideoPlayer(e)"
          />
        </div>
      </div>

      <div class="movie-content">
        <div class="main-content">
          <div class="detail-content-left">
            <h2 class="movie-title">{{ dataMovie?.name }}</h2>

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

            <div class="action">
              <div class="left">
                <div
                  class="action-btn"
                  @click="handleAddToList"
                >
                  <a-button
                    type="text"
                    class="modern add"
                  >
                    <template #icon>
                      <!-- <Icon v-if="isAddToList" name="ic:baseline-check" />
                      <Icon v-else name="ic:baseline-plus" /> -->

                      <svg
                        v-if="isAddToList"
                        xmlns="http://www.w3.org/2000/svg"
                        width="2.5rem"
                        height="2.5rem"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M9 16.17L4.83 12l-1.42 1.41L9 19L21 7l-1.41-1.41z"
                        />
                      </svg>

                      <svg
                        v-else
                        xmlns="http://www.w3.org/2000/svg"
                        width="2.5rem"
                        height="2.5rem"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z"
                        />
                      </svg>
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

                <div
                  class="action-btn"
                  @click="scrollToComment"
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
                      >
                        <path
                          fill="currentColor"
                          d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4l-.01-18zM20 4v13.17L18.83 16H4V4h16zM6 12h12v2H6zm0-3h12v2H6zm0-3h12v2H6z"
                        />
                      </svg>
                    </template>
                    <span> Bình luận</span>
                  </a-button>
                </div>
              </div>
            </div>
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
                    :to="`/discover/year/${dataMovie?.release_date.slice(
                      0,
                      4
                    )}`"
                  >
                    {{ dataMovie?.release_date.slice(0, 4) }}
                  </NuxtLink>
                  <span>
                    {{ dataMovie?.release_date.slice(4) }}
                  </span>
                </span>
              </template>
            </Tags>

            <Tags tagsLabel="Quốc gia:">
              <template #tagsInfo>
                <span class="tags-item">
                  <NuxtLink
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
        </div>

        <div class="related-content">
          <div class="left"><Comment :dataMovie="dataMovie" /></div>
          <div class="right">
            <MovieSuggested :dataMovie="dataMovie" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import _ from 'lodash';

import { BackPage } from '~/components/BackPage';
import Comment from '~/components/Comment/Comment.vue';
import HistoryProgressBar from '~/components/HistoryProgressBar/HistoryProgressBar.vue';
import Interaction from '~/components/Interaction/Interaction.vue';
import LoadingSpinner from '~/components/LoadingSpinner/LoadingSpinner.vue';
import MovieSuggested from '~/components/MovieSuggested/MovieSuggested.vue';
import Overview from '~/components/Overview/Overview.server.vue';
import RatingMovie from '~/components/RatingMovie/RatingMovie.vue';
import Tags from '~/components/Tags/Tags.server.vue';
import VideoPlayer from '~/components/VideoPlayer/VideoPlayer.vue';
import { getCountryByOriginalLanguage } from '~/services/country';
import { getGenreById } from '~/services/genres';
import { add_update_History, getItemHistory } from '~/services/history';
import { getImage, getServerImage } from '~/services/image';
import { getItemList } from '~/services/list';
import { getMovieById } from '~/services/movie';
import { addRankPlay } from '~/services/ranks';
import { getRating } from '~/services/rating';
import { UpdateView } from '~/services/updateView';

const store = useStore();
const utils = useUtils();
const route = useRoute();
const router = useRouter();
// const dataMovie = ref<any>({});
const loading = ref<boolean>(false);
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
const movieId = computed<string>((): string => route.params?.id.split('__')[0]);

const getData = async () => {
  loading.value = true;

  // await nextTick();

  // await useAsyncData(`movie/detail/${movieId.value}`, () =>
  //   getMovieById(movieId.value)
  // )
  getMovieById(movieId.value)
    .then((response) => {
      dataMovie.value = response;
    })
    .catch((e) => {
      navigateTo('/404');
    })
    .finally(() => {
      loading.value = false;
    });

  if (store.isLogin) {
    isAddToList.value = dataMovie.value?.in_list == true;

    if (dataMovie.value?.history_progress) {
      isInHistory.value = true;
      historyProgress.value = dataMovie.value?.history_progress;
    }

    // disabledRate.value = !!dataMovie.value?.rated_value;
    ratedValue.value = dataMovie.value?.rated_value;
  }
};

onBeforeMount(() => {
  windowWidth.value = window.innerWidth;
});

onMounted(() => {
  const videoPlayer = document.querySelector(
    '.video-player #video-player'
  ) as HTMLVideoElement;

  videoPlayer?.scrollIntoView({
    block: 'end',
    behavior: 'instant'
  });

  if (window.innerWidth < 1300) {
    store.collapsed = true;
  }
});

// getData();

loading.value = true;

const { data: dataMovie } = await useAsyncData(
  `movie/detail/${movieId.value}`,
  () => getMovieById(movieId.value)
);

isAddToList.value = dataMovie.value?.in_list == true;

if (dataMovie.value?.history_progress) {
  isInHistory.value = true;
  historyProgress.value = dataMovie.value?.history_progress;
}

ratedValue.value = dataMovie.value?.rated_value;

if (store.isLogin) {
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

const updateHistory = () => {
  if (isPlayVideo.value == true && store.isLogin) {
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

const throttleUpdateHistory = _.throttle(updateHistory, 1000);

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
        UpdateView(movieId.value, 'movie')
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
  if (!store?.isLogin) {
    store.openRequireAuthDialog = true;
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
  comment.scrollIntoView({ block: 'start' });
};
</script>

<style lang="scss" src="./PlayMoviePage.scss"></style>

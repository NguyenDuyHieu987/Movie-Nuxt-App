<template>
  <div class="home-page">
    <div class="home-billBoard">
      <BillboardAnimation v-model:data="trendings" />

      <BoxVip />
    </div>

    <div class="home-content">
      <section class="home-section outstanding">
        <h2 class="gradient-title-default">
          <span>Phim nổi bật</span>
          <NuxtLink
            class="view-all"
            :to="{
              path: `/discover/movie`,
              query: {
                type: 'nowplaying'
              }
            }"
          >
            Xem tất cả
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.2rem"
              height="1.2rem"
              viewBox="0 0 320 512"
              fill="currentColor"
            >
              <path
                d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256L73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
              />
            </svg>
          </NuxtLink>
        </h2>

        <LoadingSectionHorizontal v-model:loading="loadingNowPlaying">
          <template #content>
            <SwiperCarouselGroup
              :data="nowPlayings"
              :responsive="responsiveHorizoltal"
            >
              <template #content>
                <SwiperSlide
                  v-for="(item, index) in nowPlayings"
                  :key="item.id"
                  :index="index"
                  :virtual-index="index"
                >
                  <MovieCardHorizontal
                    :item="item"
                    :type="item.media_type"
                  />
                </SwiperSlide>
              </template>
            </SwiperCarouselGroup>
          </template>
        </LoadingSectionHorizontal>
      </section>

      <section
        v-show="authStore.isLogin"
        class="home-section recommend"
      >
        <h2
          v-show="loadingRecommend || recommends?.length"
          class="gradient-title-default"
        >
          <span>Gợi ý cho bạn</span>
        </h2>

        <LoadingSectionVertical v-model:loading="loadingRecommend">
          <template #content>
            <section
              class="movie-group vertical"
              :class="{ expand: viewMoreRecommend }"
            >
              <MovieCardVertical
                v-for="(item, index) in recommends"
                :key="item.id"
                :index="index"
                :item="item"
                :type="item.media_type"
              />
            </section>

            <ViewMoreBar
              v-show="recommends.length"
              :isOpen="viewMoreRecommend"
              @onClick="viewMoreRecommend = !viewMoreRecommend"
            />

            <a-button
              v-show="recommends.length"
              class="loadmore-btn"
              type="text"
              :loading="loadMoreRecommend"
              @click="handleLoadMoreRecommend"
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
                    fill="currentColor"
                    d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"
                  />
                </svg>
              </template>
              {{ loadMoreRecommend ? 'Đang tải...' : 'Tải thêm' }}
            </a-button>
          </template>
        </LoadingSectionVertical>
      </section>

      <section class="home-section cartoon">
        <h2 class="gradient-title-default">
          <span>Hoạt hình - Anime đặc sắc</span>
          <NuxtLink
            class="view-all"
            :to="{ path: `/discover/genre/hoat-hinh` }"
          >
            Xem tất cả
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.2rem"
              height="1.2rem"
              viewBox="0 0 320 512"
              fill="currentColor"
            >
              <path
                d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256L73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
              />
            </svg>
          </NuxtLink>
        </h2>

        <LoadingSectionHorizontal v-model:loading="loadingAnimation">
          <template #content>
            <SwiperCarouselGroup
              :data="animations"
              :responsive="responsiveHorizoltal"
            >
              <template #content>
                <SwiperSlide
                  v-for="(item, index) in animations"
                  :key="item.id"
                  :index="index"
                  :virtual-index="index"
                >
                  <MovieCardHorizontal
                    :item="item"
                    :type="item.media_type"
                  />
                </SwiperSlide>
              </template>
            </SwiperCarouselGroup>
          </template>
        </LoadingSectionHorizontal>
      </section>

      <section class="home-section tv-new hidden-bottom">
        <h2 class="gradient-title-default">
          <span>Phim bộ mới</span>
          <NuxtLink
            class="view-all"
            :to="{
              path: `/discover/tv`,
              query: {
                type: 'airingtoday'
              }
            }"
          >
            Xem tất cả
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.2rem"
              height="1.2rem"
              viewBox="0 0 320 512"
              fill="currentColor"
            >
              <path
                d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256L73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
              />
            </svg>
          </NuxtLink>
        </h2>

        <LoadingSectionVertical v-model:loading="loadingTvAiringToday">
          <template #content>
            <SwiperCarouselGroup
              :data="tvAiringTodays"
              :responsive="responsiveVertical"
              cardMode="vertical"
              :gap="15"
            >
              <template #content>
                <SwiperSlide
                  v-for="(item, index) in tvAiringTodays"
                  :key="item.id"
                  :index="index"
                  :virtual-index="index"
                >
                  <MovieCardVertical
                    :item="item"
                    :type="item.media_type"
                  />
                </SwiperSlide>
              </template>
            </SwiperCarouselGroup>
          </template>
        </LoadingSectionVertical>
      </section>

      <section class="home-section trailer">
        <!-- <h2 class="gradient-title-default">
          <span>Latest Trailers</span>

          <NuxtLink
            class="view-all"
            :to="{
              path: `/discover/movie`,
              query: {
                type: 'upcoming',
              },
            }"
          >
           Xem tất cả
           <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.2rem"
              height="1.2rem"
              viewBox="0 0 320 512"
              fill="currentColor"
            >
              <path
                d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256L73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
              />
            </svg>
          </NuxtLink>
        </h2> -->

        <!-- <LoadingSectionHorizontal v-model:loading="loadingUpComing">
          <template #content>
            <section class="movie-group horizontal trailer">
              <MovieCardHorizontalTrailer
                v-for="(item, index) in upComings"
                :index="index"
                :key="item.id"
                :item="item"
                :type="item.media_type"
              />
            </section>
          </template>
        </LoadingSectionHorizontal> -->

        <SliderGroupBackground :data="upComings">
          <template #title>
            <h2 class="gradient-title-default">
              <span>Latest Trailers</span>

              <NuxtLink
                class="view-all"
                :to="{
                  path: `/discover/movie`,
                  query: {
                    type: 'upcoming'
                  }
                }"
              >
                Xem tất cả
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.2rem"
                  height="1.2rem"
                  viewBox="0 0 320 512"
                  fill="currentColor"
                >
                  <path
                    d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256L73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
                  />
                </svg>
              </NuxtLink>
            </h2>
          </template>

          <template #content>
            <LoadingSectionHorizontal v-model:loading="loadingUpComing">
              <template #content>
                <div
                  v-for="(item, index) in upComings"
                  :key="item.id"
                  :index="index"
                  class="slider-item"
                >
                  <MovieCardHorizontalTrailer
                    :item="item"
                    :type="item.media_type"
                  />
                </div>
              </template>
            </LoadingSectionHorizontal>
          </template>
        </SliderGroupBackground>
      </section>

      <section class="home-section theater hidden-bottom">
        <h2 class="gradient-title-default">
          <span>Phim chiếu rạp mới</span>
          <NuxtLink
            class="view-all"
            :to="{
              path: `/discover/movie`,
              query: {
                type: 'toprated'
              }
            }"
          >
            Xem tất cả
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.2rem"
              height="1.2rem"
              viewBox="0 0 320 512"
              fill="currentColor"
            >
              <path
                d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256L73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
              />
            </svg>
          </NuxtLink>
        </h2>

        <LoadingSectionVertical v-model:loading="loadingTopRated">
          <template #content>
            <SwiperCarouselGroup
              :data="topRateds"
              :responsive="responsiveVertical"
              cardMode="vertical"
              :gap="15"
            >
              <template #content>
                <SwiperSlide
                  v-for="(item, index) in topRateds"
                  :key="item.id"
                  :index="index"
                  :virtual-index="index"
                >
                  <MovieCardVertical
                    :item="item"
                    :type="item.media_type"
                  />
                </SwiperSlide>
              </template>
            </SwiperCarouselGroup>
          </template>
        </LoadingSectionVertical>
      </section>

      <section class="home-section on-the-air">
        <h2 class="gradient-title-default">
          <span>TV On the air</span>
          <NuxtLink
            class="view-all"
            :to="{
              path: `/discover/tv`,
              query: {
                type: 'ontheair'
              }
            }"
          >
            Xem tất cả
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.2rem"
              height="1.2rem"
              viewBox="0 0 320 512"
              fill="currentColor"
            >
              <path
                d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256L73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
              />
            </svg>
          </NuxtLink>
        </h2>

        <LoadingSectionHorizontal v-model:loading="loadingTvOnTheAir">
          <template #content>
            <SwiperCarouselGroup
              :data="tvOnTheAirs"
              :responsive="responsiveHorizoltal"
            >
              <template #content>
                <SwiperSlide
                  v-for="(item, index) in tvOnTheAirs"
                  :key="item.id"
                  :index="index"
                  :virtual-index="index"
                >
                  <MovieCardHorizontal
                    :item="item"
                    :type="item.media_type"
                  />
                </SwiperSlide>
              </template>
            </SwiperCarouselGroup>
          </template>
        </LoadingSectionHorizontal>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BillboardAnimation } from '~/components/BillboardAnimation';
import { BoxVip } from '~/components/BoxVip';
import { SwiperCarouselGroup } from '~/components/CarouselGroup';
import {
  LoadingSectionHorizontal,
  LoadingSectionVertical
} from '~/components/Loading';
import { MovieCardHorizontal, MovieCardVertical } from '~/components/MovieCard';
import { MovieCardHorizontalTrailer } from '~/components/MovieCardHorizontalTrailer';
import { SliderGroupBackground } from '~/components/SliderGroup';
import { ViewMoreBar } from '~/components/ViewMoreBar';
import { getMoviesByGenres } from '~/services/discover';
import { getNowPlaying, getTopRated, getUpComing } from '~/services/movieSlug';
import { getMyRecommend } from '~/services/recommend';
import { getTrending } from '~/services/trending';
import { getTvAiringToday, getTvOntheAir } from '~/services/TvSlug';

definePageMeta({
  // layout: 'home',
  name: 'home'
  // keepalive: true
  // key: (route) => route.fullPath
});

useHead({
  title: 'Xem phim Online 24/7',
  htmlAttrs: { lang: 'vi' }
});

useSeoMeta({
  title: 'Xem phim Online 24/7',
  description: 'Xem phim thỏa thích cùng Phimhay247',
  ogTitle: 'Xem phim Online 24/7',
  ogType: 'video.movie',
  // ogUrl: window.location.href,
  ogDescription: 'Xem phim thỏa thích cùng Phimhay247',
  ogLocale: 'vi'
});

const authStore = useAuthStore();
// const trendings = ref<any[]>([]);
const nowPlayings = ref<any>([]);
const upComings = ref<any>([]);
const tvAiringTodays = ref<any>([]);
const tvOnTheAirs = ref<any>([]);
const animations = ref<any>([]);
const topRateds = ref<any>([]);
const recommends = ref<any>([]);
const loadingNowPlaying = ref<boolean>(true);
const loadingUpComing = ref<boolean>(true);
const loadingTvAiringToday = ref<boolean>(true);
const loadingTvOnTheAir = ref<boolean>(true);
const loadingAnimation = ref<boolean>(true);
const loadingTopRated = ref<boolean>(true);
const loadingRecommend = ref<boolean>(true);
const skipRecommend = ref<number>(1);
const viewMoreRecommend = ref<boolean>(false);
const loadMoreRecommend = ref<boolean>(false);
const responsiveHorizoltal = computed<any>((): any => ({
  0: {
    slidesPerView: 2,
    slidesPerGroup: 2
  },
  600: {
    slidesPerView: 3,
    slidesPerGroup: 3
  },
  900: {
    slidesPerView: 3,
    slidesPerGroup: 3,
    spaceBetween: 5
  },
  1000: {
    slidesPerView: 4,
    slidesPerGroup: 4
  },
  1200: {
    slidesPerView: 4,
    slidesPerGroup: 4
  },
  1500: {
    slidesPerView: 5,
    slidesPerGroup: 5
  },
  1700: {
    slidesPerView: 5,
    slidesPerGroup: 5
  },
  2000: {
    slidesPerView: 6,
    slidesPerGroup: 6
  }
}));

const responsiveVertical = computed<any>((): any => ({
  0: {
    slidesPerView: 2,
    slidesPerGroup: 2
  },
  500: {
    slidesPerView: 3,
    slidesPerGroup: 3
  },
  600: {
    slidesPerView: 4,
    slidesPerGroup: 4,
    spaceBetween: 13
  },
  800: {
    slidesPerView: 5,
    slidesPerGroup: 5
  },
  900: {
    slidesPerView: 5,
    slidesPerGroup: 5,
    spaceBetween: 15
  },
  1100: {
    slidesPerView: 5,
    slidesPerGroup: 5
  },
  1300: {
    slidesPerView: 6,
    slidesPerGroup: 6
  },
  1550: {
    slidesPerView: 7,
    slidesPerGroup: 7
  },
  1700: {
    slidesPerView: 8,
    slidesPerGroup: 8
  },
  2000: {
    slidesPerView: 9,
    slidesPerGroup: 9
  }
}));

const getData = async () => {
  loadingNowPlaying.value = true;
  loadingUpComing.value = true;
  loadingTvAiringToday.value = true;
  loadingTvOnTheAir.value = true;
  loadingAnimation.value = true;
  loadingTopRated.value = true;
  loadingRecommend.value = true;

  // await nextTick();

  // await useAsyncData(`trending/all/1`, () => getTrending(1))
  //   .then((response) => {
  //     trendings.value = response.data.value?.results;
  //   })
  //   .catch((e) => {
  //   });

  // useAsyncData('movie/nowplaying/1', () => getNowPlaying(1))
  getNowPlaying(1)
    .then((response) => {
      nowPlayings.value = response?.results.slice(0, 12);
    })
    .catch((e) => {})
    .finally(() => {
      loadingNowPlaying.value = false;
    });

  // useAsyncData(`genres/hoat-hinh/views_desc/1`, () =>
  //   getMoviesByGenres('hoat-hinh', 'views_desc', 1)
  // )
  getMoviesByGenres('hoat-hinh', 'views_desc', 1)
    .then((response) => {
      animations.value = response?.results.slice(0, 12);
    })
    .catch((e) => {})
    .finally(() => {
      loadingAnimation.value = false;
    });

  // useAsyncData('tv/airingtoday/1', () => getTvAiringToday(1))
  getTvAiringToday(1)
    .then((response) => {
      tvAiringTodays.value = response?.results.slice(0, 12);
    })
    .catch((e) => {})
    .finally(() => {
      loadingTvAiringToday.value = false;
    });

  // useAsyncData('movie/upcoming/1', () => getUpComing(1))
  getUpComing(1)
    .then((response) => {
      upComings.value = response?.results.slice(0, 15);
    })
    .catch((e) => {})
    .finally(() => {
      loadingUpComing.value = false;
    });

  // useAsyncData('movie/toprated/1', () => getTopRated(1))
  getTopRated(1)
    .then((response) => {
      topRateds.value = response?.results.slice(0, 12);
    })
    .catch((e) => {})
    .finally(() => {
      loadingTopRated.value = false;
    });

  // useAsyncData('tv/ontheair/1', () => getTvOntheAir(1))
  getTvOntheAir(1)
    .then((response) => {
      tvOnTheAirs.value = response?.results.slice(0, 12);
    })
    .catch((e) => {})
    .finally(() => {
      loadingTvOnTheAir.value = false;
    });

  // useAsyncData('recommend/get/1', () =>
  //   getMyRecommend(skipRecommend.value)
  // )
  getMyRecommend(skipRecommend.value, 20)
    .then((response) => {
      recommends.value = response?.results;
      skipRecommend.value++;
    })
    .catch((e) => {})
    .finally(() => {
      loadingRecommend.value = false;
    });
};

// const { results: trendings, pending } = await getTrending(1);

// const { data: trendingsCache } = useNuxtData('trending/all/1');

const { data: trendings, pending } = await useAsyncData(
  'trending/all/1',
  () => getTrending(1),
  {
    // default: () => {
    //   return { results: trendingsCache.value || [] };
    // },
    transform: (data: any) => {
      return data.results;
    }
  }
);

getData();

const handleLoadMoreRecommend = async () => {
  loadMoreRecommend.value = true;
  // await useAsyncData(`recommend/get/${skipRecommend.value}`, () =>
  //   getMyRecommend(skipRecommend.value)
  // )
  await getMyRecommend(skipRecommend.value)
    .then((response) => {
      if (response?.results.length > 0) {
        recommends.value = recommends.value.concat(response?.results);
        skipRecommend.value++;

        if (viewMoreRecommend.value == false) {
          viewMoreRecommend.value = true;
        }
      }
    })
    .catch((e) => {})
    .finally(() => {
      loadMoreRecommend.value = false;
    });
};
</script>

<style lang="scss" src="./HomePage.scss"></style>

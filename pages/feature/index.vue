<template>
  <div class="home-page feature">
    <HeaderPageMovieType
      title="Phim lẻ"
      viewAllLink="/discover/movie?type=all"
    />

    <BillboardAnimation v-model:data="dataBilboard" />

    <div class="home-content">
      <section class="home-section outstanding">
        <h2 class="gradient-title-default">
          <span>Now Playing</span>
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

      <section class="home-section popular">
        <h2 class="gradient-title-default">
          <span>Popular</span>
          <NuxtLink
            class="view-all"
            :to="{
              path: `/discover/movie`,
              query: {
                type: 'popular'
              }
            }"
          >
            Xem tất cả
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.2rem"
              height="1.2rem"
              viewBox="0 0 320 512"
            >
              <path
                d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256L73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
              />
            </svg>
          </NuxtLink>
        </h2>

        <LoadingSectionHorizontal v-model:loading="loadingPopular">
          <template #content>
            <SwiperCarouselGroup
              :data="populars"
              :responsive="responsiveHorizoltal"
            >
              <template #content>
                <SwiperSlide
                  v-for="(item, index) in populars"
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

      <section class="home-section upcoming">
        <h2 class="gradient-title-default">
          <span>Upcomimg</span>
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
            >
              <path
                d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256L73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
              />
            </svg>
          </NuxtLink>
        </h2>

        <LoadingSectionHorizontal v-model:loading="loadingUpComing">
          <template #content>
            <SwiperCarouselGroup
              :data="upComings"
              :responsive="responsiveHorizoltal"
            >
              <template #content>
                <SwiperSlide
                  v-for="(item, index) in upComings"
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

      <section class="home-section toprated">
        <h2 class="gradient-title-default">
          <span>Top Rated</span>
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
            >
              <path
                d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256L73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
              />
            </svg>
          </NuxtLink>
        </h2>

        <LoadingSectionHorizontal v-model:loading="loadingTopRated">
          <template #content>
            <SwiperCarouselGroup
              :data="topRateds"
              :responsive="responsiveHorizoltal"
            >
              <template #content>
                <SwiperSlide
                  v-for="(item, index) in topRateds"
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
import { SwiperCarouselGroup } from '~/components/CarouselGroup';
import HeaderPageMovieType from '~/components/Layouts/HeaderPageMovieType/HeaderPageMovieType.server.vue';
import { LoadingSectionHorizontal } from '~/components/Loading';
import { MovieCardHorizontal } from '~/components/MovieCard';
import {
  getMovies,
  getNowPlaying,
  getPopular,
  getTopRated,
  getUpComing
} from '~/services/movieSlug';

definePageMeta({
  // layout: 'home',
  name: 'home-feature'
});

useHead({
  title: 'Phim lẻ',
  htmlAttrs: { lang: 'vi' }
});

useSeoMeta({
  title: 'Phim lẻ',
  description: 'Phim lẻ, Phim chiếu rạp',
  ogTitle: 'Phim lẻ',
  ogType: 'video.movie',
  // ogUrl: window.location.href,
  ogDescription: 'Phim lẻ, Phim chiếu rạp',
  ogLocale: 'vi'
});

const store = useStore();
const nowPlayings = ref<any>([]);
const populars = ref<any>([]);
const upComings = ref<any>([]);
const topRateds = ref<any>([]);
const loadingNowPlaying = ref<boolean>(true);
const loadingPopular = ref<boolean>(true);
const loadingTopRated = ref<boolean>(true);
const loadingUpComing = ref<boolean>(true);

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

const getData = async () => {
  loadingNowPlaying.value = true;
  loadingTopRated.value = true;
  loadingUpComing.value = true;
  loadingPopular.value = true;

  // await nextTick();

  // useAsyncData('movie/nowplaying/1', () => getNowPlaying(1))
  getNowPlaying(1)
    .then((response) => {
      nowPlayings.value = response?.results.slice(0, 12);
    })
    .catch((e) => {})
    .finally(() => {
      loadingNowPlaying.value = false;
    });

  // useAsyncData(`movie/popular/1`, () => getPopular(2))
  getPopular(2)
    .then((response) => {
      populars.value = response?.results.slice(0, 12);
    })
    .catch((e) => {})
    .finally(() => {
      loadingPopular.value = false;
    });

  // useAsyncData('movie/upcoming/1', () => getUpComing(3))
  getUpComing(3)
    .then((response) => {
      upComings.value = response?.results.slice(0, 12);
    })
    .catch((e) => {})
    .finally(() => {
      loadingUpComing.value = false;
    });

  // await useAsyncData('movie/toprated/1', () => getTopRated(4))
  await getTopRated(4)
    .then((response) => {
      topRateds.value = response?.results.slice(0, 12);
    })
    .catch((e) => {})
    .finally(() => {
      loadingTopRated.value = false;
    });
};

const { data: dataBilboard, pending } = await useAsyncData(
  'movie/all/1',
  () => getMovies(1),
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
</script>

<style src="./FeaturePage.scss" lang="scss"></style>

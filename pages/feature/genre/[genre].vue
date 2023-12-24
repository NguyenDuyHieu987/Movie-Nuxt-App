<template>
  <div class="home-page feature genre-page">
    <HeaderPageGenreType>
      <template #label>
        <NuxtLink
          :to="{
            path: '/feature'
          }"
        >
          Phim lẻ
        </NuxtLink>
      </template>
    </HeaderPageGenreType>

    <BillboardAnimation v-model:data="dataBilboard" />

    <div class="home-content">
      <!-- v-if="nowPlayings?.length" -->
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
import { HeaderPageGenreType } from '~/components/layouts';
import { LoadingSectionHorizontal } from '~/components/Loading';
import { MovieCardHorizontal } from '~/components/MovieCard';
import { getGenreById } from '~/services/genres';
import { FilterMovieSlug } from '~/services/movieSlug';
import type { formfilter, genre } from '~/types';

definePageMeta({
  // layout: 'home',
  name: 'home-feature-genre'
});

const store = useStore();
const route = useRoute();
const nowPlayings = ref<any>([]);
const populars = ref<any>([]);
const upComings = ref<any>([]);
const topRateds = ref<any>([]);
const loadingNowPlaying = ref<boolean>(true);
const loadingPopular = ref<boolean>(true);
const loadingTopRated = ref<boolean>(true);
const loadingUpComing = ref<boolean>(true);
const formFilter = ref<formfilter>({
  type: 'all',
  sortBy: '',
  genre: route.params.genre,
  year: '',
  country: '',
  page: 1,
  limit: 20
});
const genreRoute = computed<genre>(
  () => getGenreById(route.params.genre, store.allGenres)!
);

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

useHead({
  title: () => 'Phim lẻ | Thể loại: ' + genreRoute.value.name_vietsub + '',
  htmlAttrs: { lang: 'vi' }
});

useSeoMeta({
  title: () => 'Phim lẻ | Thể loại: ' + genreRoute.value.name_vietsub + '',
  description: () =>
    'Phim lẻ, Phim chiếu rạp | Thể loại: ' + genreRoute.value.name_vietsub,
  ogTitle: () => 'Phim lẻ | Thể loại: ' + genreRoute.value.name_vietsub + '',
  ogType: 'video.movie',
  // ogUrl: window.location.href,
  ogDescription: () =>
    'Phim lẻ, Phim chiếu rạp | Thể loại: ' + genreRoute.value.name_vietsub,
  ogLocale: 'vi'
});

const getData = async () => {
  loadingNowPlaying.value = true;
  loadingTopRated.value = true;
  loadingUpComing.value = true;
  loadingPopular.value = true;

  // await nextTick();

  // if (route.params?.slug == 'genre') {
  // const genreId: number = getGenreByShortName(
  //   route.params.genre,
  //   store.allGenres
  // )!.id;

  // formFilter.value.genre = genreId.toString();

  formFilter.value.genre = route.params.genre;

  // useAsyncData(
  //   `discover/movie/nowplaying/${{
  //     ...formFilter.value,
  //     type: 'nowplaying',
  //   }}`,
  //   () =>
  //     FilterMovieSlug({
  //       ...formFilter.value,
  //       type: 'nowplaying',
  //     })
  // )
  FilterMovieSlug({
    ...formFilter.value,
    type: 'nowplaying'
  })
    .then((response) => {
      nowPlayings.value = response?.results.slice(0, 12);
    })
    .catch((e) => {})
    .finally(() => {
      loadingNowPlaying.value = false;
    });

  // useAsyncData(
  //   `discover/movie/popular/${{
  //     ...formFilter.value,
  //     type: 'popular',
  //   }}`,
  //   () =>
  //     FilterMovieSlug({
  //       ...formFilter.value,
  //       type: 'popular',
  //     })
  // )
  FilterMovieSlug({
    ...formFilter.value,
    type: 'popular'
  })
    .then((response) => {
      populars.value = response?.results.slice(0, 12);
    })
    .catch((e) => {})
    .finally(() => {
      loadingPopular.value = false;
    });

  // useAsyncData(
  //   `discover/movie/upcoming/${{
  //     ...formFilter.value,
  //     type: 'upcoming',
  //   }}`,
  //   () =>
  //     FilterMovieSlug({
  //       ...formFilter.value,
  //       type: 'upcoming',
  //     })
  // )
  FilterMovieSlug({
    ...formFilter.value,
    type: 'upcoming'
  })
    .then((response) => {
      upComings.value = response?.results.slice(0, 12);
    })
    .catch((e) => {})
    .finally(() => {
      loadingUpComing.value = false;
    });

  // useAsyncData(
  //   `discover/movie/toprated/${{
  //     ...formFilter.value,
  //     type: 'toprated',
  //   }}`,
  //   () =>
  //     FilterMovieSlug({
  //       ...formFilter.value,
  //       type: 'toprated',
  //     })
  // )
  FilterMovieSlug({
    ...formFilter.value,
    type: 'toprated'
  })
    .then((response) => {
      topRateds.value = response?.results.slice(0, 12);
    })
    .catch((e) => {})
    .finally(() => {
      loadingTopRated.value = false;
    });
  // } else {
  //   navigateTo('/404');
  // }
};

const { data: dataBilboard, pending } = await useAsyncData(
  `discover/movie/all/${JSON.stringify(formFilter.value)}`,
  () => FilterMovieSlug(formFilter.value),
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

// onBeforeMount(getData);

watch(
  () => route.params,
  async () => {},
  { deep: true, immediate: true }
);
</script>

<style src="../FeaturePage.scss" lang="scss"></style>

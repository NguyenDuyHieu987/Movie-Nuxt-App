<template>
  <div class="home-page televison genre-page">
    <HeaderPageGenreType>
      <template #label>
        <NuxtLink
          :to="{
            path: '/television'
          }"
        >
          Phim bộ
        </NuxtLink>
      </template>
    </HeaderPageGenreType>

    <BillboardAnimation v-model:data="dataBilboard" />

    <div class="home-content">
      <!-- v-if="airingTodays?.length" -->
      <section class="home-section outstanding">
        <h2 class="gradient-title-default">
          <span>Airing Today</span>
          <NuxtLink
            class="view-all"
            :to="{
              path: `/discover/tv`,
              query: { type: 'airingtoday' }
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

        <LoadingSectionHorizontal v-model:loading="loadingTvAiringToday">
          <template #content>
            <SwiperCarouselGroup
              :data="airingTodays"
              :responsive="responsiveHorizoltal"
            >
              <template #content>
                <SwiperSlide
                  v-for="(item, index) in airingTodays"
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
          <span>On The Air</span>
          <NuxtLink
            class="view-all"
            :to="{
              path: `/discover/tv`,
              query: { type: 'ontheair' }
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

        <LoadingSectionHorizontal v-model:loading="loadingTvOnTheAir">
          <template #content>
            <SwiperCarouselGroup
              :data="onTheAirs"
              :responsive="responsiveHorizoltal"
            >
              <template #content>
                <SwiperSlide
                  v-for="(item, index) in onTheAirs"
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
          <span>Popular</span>
          <NuxtLink
            class="view-all"
            :to="{
              path: `/discover/tv`,
              query: { type: 'popular' }
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

        <LoadingSectionHorizontal v-model:loading="loadingTvPopular">
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

      <section class="home-section toprated">
        <h2 class="gradient-title-default">
          <span>Top Rated</span>
          <NuxtLink
            class="view-all"
            :to="{
              path: `/discover/tv`,
              query: { type: 'toprated' }
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

        <LoadingSectionHorizontal v-model:loading="loadingTvTopRated">
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
import HeaderPageGenreType from '~/components/Layouts/HeaderPageGenreType/HeaderPageGenreType.server.vue';
import { LoadingSectionHorizontal } from '~/components/Loading';
import { MovieCardHorizontal } from '~/components/MovieCard';
import { getGenreById } from '~/services/genres';
import { FilterTvSlug } from '~/services/TvSlug';
import type { formfilter, genre } from '~/types';

definePageMeta({
  // layout: 'home',
  name: 'home-television-genre'
});

const store = useStore();
const route = useRoute();
const airingTodays = ref<any>([]);
const onTheAirs = ref<any>([]);
const populars = ref<any>([]);
const topRateds = ref<any>([]);
const loadingTvAiringToday = ref<boolean>(true);
const loadingTvOnTheAir = ref<boolean>(true);
const loadingTvPopular = ref<boolean>(true);
const loadingTvTopRated = ref<boolean>(true);
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
  title: () => 'Phim bộ | Thể loại: ' + genreRoute.value.name_vietsub + '',
  htmlAttrs: { lang: 'vi' }
});

useSeoMeta({
  title: () => 'Phim bộ | Thể loại: ' + genreRoute.value.name_vietsub + '',
  description: () =>
    'Phim bộ, Phim dài tập | Thể loại: ' + genreRoute.value.name_vietsub,
  ogTitle: () => 'Phim bộ | Thể loại: ' + genreRoute.value.name_vietsub + '',
  ogType: 'video.movie',
  // ogUrl: window.location.href,
  ogDescription: () =>
    'Phim bộ, Phim dài tập | Thể loại: ' + genreRoute.value.name_vietsub,
  ogLocale: 'vi'
});

const getData = async () => {
  loadingTvAiringToday.value = true;
  loadingTvOnTheAir.value = true;
  loadingTvPopular.value = true;
  loadingTvTopRated.value = true;

  // await nextTick();

  // if (route.params?.slug == 'genre') {
  // const genreId: number = getGenreByShortName(
  //   route.query?.genre,
  //   store.allGenres
  // )!.id;

  // formFilter.value.genre = genreId.toString();

  formFilter.value.genre = route.params.genre;

  // useAsyncData(
  //   `discover/tv/airingtoday/${{
  //     ...formFilter.value,
  //     type: 'airingtoday',
  //   }}`,
  //   () => FilterTvSlug({ ...formFilter.value, type: 'airingtoday' })
  // )
  FilterTvSlug({ ...formFilter.value, type: 'airingtoday' })
    .then((response) => {
      airingTodays.value = response?.results.slice(0, 12);
    })
    .catch((e) => {})
    .finally(() => {
      loadingTvAiringToday.value = false;
    });

  // useAsyncData(
  //   `discover/tv/ontheair/${{
  //     ...formFilter.value,
  //     type: 'ontheair',
  //   }}`,
  //   () => FilterTvSlug({ ...formFilter.value, type: 'ontheair' })
  // )
  FilterTvSlug({ ...formFilter.value, type: 'ontheair' })
    .then((response) => {
      onTheAirs.value = response?.results.slice(0, 12);
    })
    .catch((e) => {})
    .finally(() => {
      loadingTvOnTheAir.value = false;
    });

  // useAsyncData(
  //   `discover/tv/popular/${{
  //     ...formFilter.value,
  //     type: 'popular',
  //   }}`,
  //   () => FilterTvSlug({ ...formFilter.value, type: 'popular' })
  // )
  FilterTvSlug({ ...formFilter.value, type: 'popular' })
    .then((response) => {
      populars.value = response?.results.slice(0, 12);
    })
    .catch((e) => {})
    .finally(() => {
      loadingTvPopular.value = false;
    });

  // useAsyncData(
  //   `discover/tv/toprated/${{
  //     ...formFilter.value,
  //     type: 'toprated',
  //   }}`,
  //   () => FilterTvSlug({ ...formFilter.value, type: 'toprated' })
  // )
  FilterTvSlug({ ...formFilter.value, type: 'toprated' })
    .then((response) => {
      topRateds.value = response?.results.slice(0, 12);
    })
    .catch((e) => {})
    .finally(() => {
      loadingTvTopRated.value = false;
    });
  // } else {
  //   navigateTo('/404');
  // }
};

const { data: dataBilboard, pending } = await useAsyncData(
  `discover/tv/all/${JSON.stringify(formFilter.value)}`,
  () => FilterTvSlug(formFilter.value),
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

<style src="../TelevisionPage.scss" lang="scss"></style>

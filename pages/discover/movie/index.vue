<template>
  <div class="discover padding-content">
    <FilterSection
      v-model:loading="loading"
      :listFilter="[
        { name: 'Tất cả', value: 'all' },
        { name: 'Nowplaying', value: 'nowplaying' },
        { name: 'Popular', value: 'popular' },
        { name: 'Upcoming', value: 'upcoming' },
        { name: 'Toprated', value: 'toprated' }
      ]"
      :cancelFilter="cancelFilter"
      @onFilter="handleFilter"
    />

    <div class="discover-title">
      <h2 class="gradient-title-default underline">
        <span>Phim lẻ: {{ formFilter.type }}</span>
      </h2>
    </div>

    <section class="discover-section">
      <div
        v-if="!loading"
        class="movie-group vertical"
      >
        <MovieCardVertical
          v-for="(item, index) in dataDiscover"
          :key="item.id"
          :index="index"
          :item="item"
          :type="item.media_type"
        />
      </div>

      <LoadingSpinner
        v-else
        class="loading-page"
      />
    </section>

    <ControlPage
      :page="page"
      :total="totalPage"
      :pageSize="pageSize"
      :onChangePage="onChangePage"
    />
  </div>
</template>

<script setup lang="ts">
// import { FilterSection } from '~/components/FilterSection';
// import {
//   // MovieCardHorizontal,
//   MovieCardVertical
// } from '~/components/MovieCard';
// import { LoadingSpinner } from '~/components/Loading';
// import { ControlPage } from '~/components/ControlPage';
import FilterSection from '~/components/FilterSection/FilterSection.vue';
import MovieCardVertical from '~/components/MovieCard/MovieCardVertical/MovieCardVertical.vue';
import LoadingSpinner from '~/components/Loading/LoadingSpinner/LoadingSpinner.vue';
import ControlPage from '~/components/ControlPage/ControlPage.vue';
import { FilterMovieSlug } from '~/services/movieSlug';
import type { formfilter } from '@/types';

definePageMeta({
  // pageTransition: {
  //   name: 'fade'
  // }
});

const store = useStore();
const route = useRoute();
const router = useRouter();
const dataDiscover = ref<any[]>();
const page = ref<number>(+route.query?.page || 1);
const totalPage = ref<number>(100);
const pageSize = ref<number>(20);
const loading = ref<boolean>(false);
const formFilter = computed<formfilter>(() => {
  return {
    type: route.query?.type || 'all',
    sortBy: route.query?.sort_by || '',
    genre: route.query?.genre || '',
    year: route.query?.year || '',
    country: route.query?.country || '',
    page: route.query?.page || 1,
    limit: 20
  };
});
const nuxtLoadingIndicator = useLoadingIndicator();

useHead({
  title: () => 'Khám phá | Phim lẻ: ' + formFilter.value.type + '',
  htmlAttrs: { lang: 'vi' }
});

useSeoMeta({
  title: () => 'Khám phá | Phim lẻ: ' + formFilter.value.type + '',
  description: () => 'Khám phá phim mới cùng Phimhay247',
  ogTitle: () => 'Khám phá | Phim lẻ: ' + formFilter.value.type + '',
  ogType: 'video.movie',
  // ogUrl: () => window.location.href,
  ogDescription: () => 'Khám phá phim mới cùng Phimhay247',
  ogLocale: 'vi'
});

const getData = async () => {
  nuxtLoadingIndicator.start();
  // loading.value = true;

  await useAsyncData(`movie/discover/${JSON.stringify(formFilter.value)}`, () =>
    FilterMovieSlug(formFilter.value)
  )
    .then((movieResponse) => {
      dataDiscover.value = movieResponse.data.value?.results;
      totalPage.value = movieResponse.data.value?.total;
      pageSize.value = movieResponse.data.value?.page_size;
    })
    .catch((e) => {})
    .finally(() => {
      loading.value = false;
      nuxtLoadingIndicator.finish();
    });
};

loading.value = true;

const {
  data: dataDiscoverCache,
  pending,
  refresh
} = await useAsyncData(
  `movie/discover/${JSON.stringify(formFilter.value)}`,
  () => FilterMovieSlug(formFilter.value),
  {
    // transform: (data: any) => {
    //   totalPage.value = data?.total;
    //   pageSize.value = data?.page_size;
    //   loading.value = false;
    //   return data.results;
    // },
    // server: false,
  }
);

dataDiscover.value = dataDiscoverCache.value.results;

totalPage.value = dataDiscoverCache.value?.total;
pageSize.value = dataDiscoverCache.value?.page_size;
loading.value = false;

watch(
  formFilter,
  () => {
    getData();
  },
  { deep: true }
);

const handleFilter = () => {
  getData();
};

const onChangePage = (
  pageSelected: number
  // pageSize
) => {
  page.value = pageSelected;
  formFilter.value.page = pageSelected;
  router.push({ query: { ...route.query, page: pageSelected } });
  // getData();
};

const cancelFilter = () => {
  refreshNuxtData(`movie/${formFilter.value.type}`);
};
</script>

<style lang="scss" src="../DiscoverPage.scss"></style>
<!-- <style lang="scss">
@import url('../DiscoverPage.scss');
</style> -->

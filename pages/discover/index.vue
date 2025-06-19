<template>
  <div class="discover padding-content">
    <FilterSection
      v-model:loading="loading"
      :listFilter="[
        { name: 'Tất cả', value: 'all' },
        { name: 'Phim lẻ', value: 'movie' },
        { name: 'Phim bộ', value: 'tv' }
      ]"
      @onFilter="handleFilter"
    />

    <div class="discover-title">
      <h2 class="gradient-title-default underline">
        <span>Khám phá</span>
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
import { FilterMovie } from '~/services/discover';
import type { formfilter } from '@/types';

definePageMeta({
  // pageTransition: {
  //   name: 'fade'
  // }
});

const route = useRoute();
const router = useRouter();
const store = useStore();
// const dataDiscover = ref<any[]>();
const page = ref<number>(+(route.query?.page as string) || 1);
// const totalPage = ref<number>(100);
// const pageSize = ref<number>(20);
const loading = ref<boolean>(false);
const formFilter = computed<formfilter>(() => {
  return {
    type: (route.query?.type as string) || 'all',
    sortBy: (route.query?.sort_by as string) || '',
    genre: (route.query?.genre as string) || '',
    year: (route.query?.year as string) || '',
    country: (route.query?.country as string) || '',
    page: +(route.query?.page as string) || 1,
    limit: 20
  };
});
const nuxtLoadingIndicator = useLoadingIndicator();

useHead({
  title: () => 'Khám phá',
  htmlAttrs: { lang: 'vi' }
});

useSeoMeta({
  title: () => 'Khám phá',
  description: () => 'Khám phá phim mới cùng Phimhay247',
  ogTitle: () => 'Khám phá',
  ogType: 'video.movie',
  // ogUrl: () => window.location.href,
  ogDescription: () => 'Khám phá phim mới cùng Phimhay247',
  ogLocale: 'vi'
});

const getData = async () => {
  nuxtLoadingIndicator.start();
  // loading.value = true;

  await useAsyncData(`discover/${JSON.stringify(formFilter.value)}`, () =>
    FilterMovie(formFilter.value)
  )
    .then((response) => {
      // dataDiscover.value = response.data.value?.results;
      // totalPage.value = response.data.value?.total;
      // pageSize.value = response.data.value?.page_size;
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
  status,
  refresh
} = await useAsyncData(
  `discover/${JSON.stringify(formFilter.value)}`,
  () => FilterMovie(formFilter.value),
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

// dataDiscover.value = dataDiscoverCache.value?.results;
// pageSize.value = dataDiscoverCache.value?.page_size;
// totalPage.value = dataDiscoverCache.value?.total;

const dataDiscover = computed<any[]>(
  () => dataDiscoverCache.value?.results ?? []
);
const totalPage = computed<number>(() => dataDiscoverCache.value?.total ?? 0);
const pageSize = computed<number>(
  () => dataDiscoverCache.value?.page_size ?? 20
);

loading.value = false;

watch(
  formFilter,
  async () => {
    nuxtLoadingIndicator.start();
    await refresh();
    nuxtLoadingIndicator.finish();
  },
  { deep: true }
);

const handleFilter = async () => {
  nuxtLoadingIndicator.start();
  await refresh();
  nuxtLoadingIndicator.finish();
};

const onChangePage = (
  pageSelected: number
  // pageSize
) => {
  page.value = pageSelected;
  formFilter.value.page = pageSelected;
  router.push({ query: { ...route.query, page: pageSelected } });
};

const cancelFilter = () => {
  refreshNuxtData(`discover/${formFilter.value}`);
};
</script>

<!-- <style lang="scss" src="./DiscoverPage.scss"></style> -->
<style lang="scss">
@import url('./DiscoverPage.scss');
</style>

<template>
  <div class="discover genre padding-content">
    <!-- <FilterBar
      @dataFiltered="(data: any[], formSelect: formfilter) => setDataFiltered(data, formSelect)"
      v-model:loading="loading"
      :cancelFilter="cancelFilter"
    /> -->

    <DiscoverHead
      :initialSlide="
        years.findIndex(
          (item) =>
            (utils.isNumber(item?.name) || utils.isStringNumber(item?.name)
              ? item?.name
              : utils.convertPath.toPath(item?.name)) == route.params?.year
        )
      "
    >
      <SwiperSlide
        v-for="(item, index) in years"
        :key="item?.name"
        :index="index"
        :class="{
          active:
            (utils.isNumber(item?.name) || utils.isStringNumber(item?.name)
              ? item?.name
              : utils.convertPath.toPath(item?.name)) == route.params?.year
        }"
      >
        <NuxtLink
          :to="`/discover/year/${
            utils.isNumber(item?.name) || utils.isStringNumber(item?.name)
              ? item?.name
              : utils.convertPath.toPath(item?.name)
          }`"
        >
          {{ item?.name }}
        </NuxtLink>
      </SwiperSlide>
    </DiscoverHead>

    <div class="discover-title">
      <h2 class="gradient-title-default underline">
        <span>{{ metaHead }}</span>
      </h2>
    </div>

    <section class="discover-section">
      <div
        v-if="!loading"
        class="movie-group horizontal"
      >
        <MovieCardHorizontal
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
// import { DiscoverHead } from '~/components/DiscoverHead';
// // import { FilterBar } from '~/components/FilterBar';
// import { MovieCardHorizontal } from '~/components/MovieCard';
// import { LoadingSpinner } from '~/components/Loading';
// import { ControlPage } from '~/components/ControlPage';
import DiscoverHead from '~/components/DiscoverHead/DiscoverHead.vue';
import MovieCardHorizontal from '~/components/MovieCard/MovieCardHorizontal/MovieCardHorizontal.vue';
import LoadingSpinner from '~/components/Loading/LoadingSpinner/LoadingSpinner.vue';
import ControlPage from '~/components/ControlPage/ControlPage.vue';
import { getMoviesByYear } from '~/services/discover';
import type { year } from '@/types';

definePageMeta({
  // pageTransition: {
  //   name: 'fade'
  // }
});

const utils = useUtils();
const route = useRoute();
const router = useRouter();
const store = useStore();
const years = ref<year[]>(store.allYears);
// const dataDiscover = ref<any[]>();
const page = ref<number>(+(route.query?.page as string) || 1);
// const totalPage = ref<number>(100);
// const pageSize = ref<number>(20);
const loading = ref<boolean>(false);
const yearRoute = ref<string>(
  !isNaN(+(route.params.year as string)) ||
    utils.isStringNumber(route.params.year as string)
    ? (route.params.year as string)
    : 'Trước năm ' + (route.params.year as string)?.slice(-4)
);
const metaHead = ref<string>('Năm: ' + yearRoute.value);
const nuxtLoadingIndicator = useLoadingIndicator();

useHead({
  title: () => 'Khám phá | Năm: ' + yearRoute.value + '',
  htmlAttrs: { lang: 'vi' }
});

useSeoMeta({
  title: () => 'Khám phá | Năm: ' + yearRoute.value + '',
  description: () => 'Khám phá phim mới cùng Phimhay247',
  ogTitle: () => 'Khám phá | Năm: ' + yearRoute.value + '',
  ogType: 'video.movie',
  // ogUrl: () => window.location.href,
  ogDescription: () => 'Khám phá phim mới cùng Phimhay247',
  ogLocale: 'vi'
});

const getData = async () => {
  nuxtLoadingIndicator.start();
  // loading.value = true;

  await useAsyncData(
    `discover/year/all/${route.params.year}/${page.value}`,
    () => getMoviesByYear(route.params.year as string, '', page.value)
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

// getData();

loading.value = true;

const {
  data: dataDiscoverCache,
  status,
  refresh
} = await useAsyncData(
  `discover/year/all/${route.params.year}/${page.value}`,
  () => getMoviesByYear(route.params.year as string, '', page.value),
  {
    // transform: (data: any) => {
    //   totalPage.value = data?.total;
    //   pageSize.value = data?.page_size;
    //   loading.value = false;
    //   return data.results;
    // },
  }
);

// dataDiscover.value = dataDiscoverCache.value?.results;
// totalPage.value = dataDiscoverCache.value?.total;
// pageSize.value = dataDiscoverCache.value?.page_size;

const dataDiscover = computed<any[]>(
  () => dataDiscoverCache.value?.results ?? []
);
const totalPage = computed<number>(() => dataDiscoverCache.value?.total ?? 0);
const pageSize = computed<number>(
  () => dataDiscoverCache.value?.page_size ?? 20
);

loading.value = false;

const onChangePage = async (
  pageSelected: number
  // pageSize
) => {
  page.value = pageSelected;
  router.push({ query: { page: pageSelected } });
  nuxtLoadingIndicator.start();
  await refresh();
  nuxtLoadingIndicator.finish();
};
</script>

<style lang="scss" src="../DiscoverPage.scss"></style>
<!-- <style lang="scss">
@import url('../DiscoverPage.scss');
</style> -->

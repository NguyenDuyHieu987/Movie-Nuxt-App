<template>
  <div class="discover genre padding-content">
    <!-- <FilterBar
      @dataFiltered="(data: any[], formSelect: formfilter) => setDataFiltered(data, formSelect)"
      v-model:loading="loading"
      :cancelFilter="cancelFilter"
    /> -->

    <DiscoverHead
      :initialSlide="
        genres.findIndex((item) => item?.short_name == route.params?.genre)
      "
    >
      <SwiperSlide
        v-for="(item, index) in genres"
        :key="item?.id"
        :index="index"
        :class="{
          active: item?.short_name == route.params?.genre
        }"
      >
        <NuxtLink :to="`/discover/genre/${item.short_name}`">
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
import { getMoviesByGenres } from '~/services/discover';
import { getGenreByShortName } from '~/services/genres';
import type { genre } from '@/types';

definePageMeta({
  // pageTransition: {
  //   name: 'fade'
  // }
});

const route = useRoute();
const router = useRouter();
const store = useStore();
const genres = ref<genre[]>(store.allGenres);
// const dataDiscover = ref<any[]>();
const page = ref<number>(+(route.query?.page as string) || 1);
// const totalPage = ref<number>(100);
// const pageSize = ref<number>(20);
const loading = ref<boolean>(false);
const genreRoute = computed<genre>(
  () => getGenreByShortName(route.params.genre as string, store.allGenres)!
);
const metaHead = ref<string>('Thể loại: ' + genreRoute.value.name);
const nuxtLoadingIndicator = useLoadingIndicator();

useHead({
  title: () => 'Khám phá | Thể loại: ' + genreRoute.value.name + '',
  htmlAttrs: { lang: 'vi' }
});

useSeoMeta({
  title: () => 'Khám phá | Thể loại: ' + genreRoute.value.name + '',
  description: () => 'Khám phá phim mới cùng Phimhay247',
  ogTitle: () => 'Khám phá | Thể loại: ' + genreRoute.value.name + '',
  ogType: 'video.movie',
  // ogUrl: () => window.location.href,
  ogDescription: () => 'Khám phá phim mới cùng Phimhay247',
  ogLocale: 'vi'
});

watch(genreRoute, () => {});

const getData = async () => {
  nuxtLoadingIndicator.start();
  // loading.value = true;

  await useAsyncData(
    `discover/genre/all/${route.params.genre}/${page.value}`,
    () => getMoviesByGenres(route.params.genre as string, '', page.value)
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
  `discover/genre/all/${route.params.genre}/${page.value}`,
  () => getMoviesByGenres(route.params.genre as string, '', page.value),
  {
    lazy: true
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

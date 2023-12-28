<template>
  <div class="discover genre padding-content">
    <!-- <FilterBar
      @dataFiltered="(data: any[], formSelect: formfilter) => setDataFiltered(data, formSelect)"
      v-model:loading="loading"
      :cancelFilter="cancelFilter"
    /> -->

    <DiscoverHead
      :initial-slide="
        countries.findIndex(
          (item1) => item1.short_name == route.params?.country
        )
      "
    >
      <SwiperSlide
        v-for="(item, index) in countries"
        :key="item?.iso_639_1"
        :index="index"
        :class="{
          active: item.short_name == route.params?.country
        }"
      >
        <NuxtLink :to="`/discover/country/${item.short_name}`">
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
      :page-size="pageSize"
      :onChangePage="onChangePage"
    />
  </div>
</template>

<script setup lang="ts">
import type { country, formfilter } from '@/types';
import { ControlPage } from '~/components/ControlPage';
import { DiscoverHead } from '~/components/DiscoverHead';
import { FilterBar } from '~/components/FilterBar';
import { LoadingSpinner } from '~/components/Loading';
import { MovieCardHorizontal } from '~/components/MovieCard';
import { getCountryByShortName } from '~/services/country';
import { FilterMovie, getMovieByCountry } from '~/services/discover';

definePageMeta({
  pageTransition: {
    name: 'fade'
  }
});

const route = useRoute();
const router = useRouter();
const store = useStore();
const dataDiscover = ref<any[]>();
const countries = ref<country[]>(store.allCountries);
const page = ref<number>(+route.query?.page || 1);
const totalPage = ref<number>(100);
const pageSize = ref<number>(20);
const isFilter = ref<boolean>(false);
const loading = ref<boolean>(false);
const formFilter = ref<formfilter>({
  type: 'all',
  sortBy: '',
  genre: '',
  year: '',
  country: '',
  page: 1
});
const countryRoute = computed<country>(() =>
  getCountryByShortName(route.params.country, store.allCountries)
);
const metaHead = ref<string>('Quốc gia: ' + countryRoute.value.name);
const nuxtLoadingIndicator = useLoadingIndicator();

useHead({
  title: () => 'Khám phá | Quốc gia: ' + countryRoute.value.name + '',
  htmlAttrs: { lang: 'vi' }
});

useSeoMeta({
  title: () => 'Khám phá | Quốc gia: ' + countryRoute.value.name + '',
  description: () => 'Khám phá phim mới cùng Phimhay247',
  ogTitle: () => 'Khám phá | Quốc gia: ' + countryRoute.value.name + '',
  ogType: 'video.movie',
  // ogUrl: () => window.location.href,
  ogDescription: () => 'Khám phá phim mới cùng Phimhay247',
  ogLocale: 'vi'
});

const getData = async () => {
  // loading.value = true;

  await useAsyncData(
    `discover/country/all/${route.params.country}/${page.value}`,
    () => getMovieByCountry(route.params.country, '', page.value)
  )
    .then((response) => {
      dataDiscover.value = response.data.value?.results;
      totalPage.value = response.data.value?.total;
      pageSize.value = response.data.value?.page_size;
    })
    .catch((e) => {})
    .finally(() => {
      loading.value = false;
    });
};

// getData();

loading.value = true;

const { data: dataDiscoverCache, pending } = await useAsyncData(
  `discover/country/all/${route.params.country}/${page.value}`,
  () => getMovieByCountry(route.params.country, '', page.value),
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

const onChangePage = (
  pageSelected: number
  // pageSize
) => {
  page.value = pageSelected;
  router.push({ query: { page: pageSelected } });
  getData();
};

const setDataFiltered = (data: any[], formSelect: formfilter) => {
  nuxtLoadingIndicator.start();

  dataDiscover.value = data;
  formFilter.value = formSelect;
  isFilter.value = true;
  page.value = formSelect.page!;
  metaHead.value = 'Danh sách phim đã lọc';

  nuxtLoadingIndicator.finish();
};

const cancelFilter = () => {
  isFilter.value = false;
  // getData();
  refreshNuxtData(`discover/country/all/${route.params.country}/${page.value}`);
  metaHead.value = 'Quốc gia: ' + countryRoute.value.name;
};
</script>

<style lang="scss" src="../DiscoverPage.scss"></style>

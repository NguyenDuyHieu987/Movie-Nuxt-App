<template>
  <div class="search padding-content">
    <h2 class="gradient-title-default underline">
      <span
        >Kết quả tìm kiếm cho: {{ route.query?.q?.replaceAll('+', ' ') }}
      </span>

      <a-select
        v-show="
          searchData?.length || searchDataMovie?.length || searchDataTv?.length
        "
        ref="select"
        v-model:value="activeTabSearch"
        style="width: 170px"
        placeholder=""
        @change="handleChangeType"
      >
        <a-select-option
          value="all"
          label="Tất cả"
        >
          Tất cả
        </a-select-option>
        <a-select-option
          value="movie"
          label="Phim lẻ"
        >
          Phim lẻ
        </a-select-option>
        <a-select-option
          value="tv"
          label="Phim bộ"
        >
          Phim bộ
        </a-select-option>
      </a-select>
    </h2>
    <section
      class="search-section"
      :class="{ collapsed: store.collapsed }"
    >
      <div
        v-if="!loading"
        class="movie-group horizontal"
      >
        <MovieCardHorizontal
          v-for="(item, index) in searchData"
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

      <a-result
        v-if="!searchData?.length && !loading"
        status="404"
        title="Opps!"
        :sub-title="`Không có kêt quả nào khớp với từ
        khóa: ${searchQuery}`"
      />

      <!-- && activeTabSearch == 'all' -->
      <ControlPage
        v-if="searchData?.length"
        :page="page"
        :total="total"
        :pageSize="pageSize"
        :onChangePage="onChangePage"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import ControlPage from '~/components/ControlPage/ControlPage.vue';
import LoadingSpinner from '~/components/LoadingSpinner/LoadingSpinner.vue';
import MovieCardHorizontal from '~/components/MovieCardHorizontal/MovieCardHorizontal.vue';
import { addRankSearch } from '~/services/ranks';
import { addSearch, addSearchHistory, getDaTaSearch } from '~/services/search';

const store = useStore();
const route = useRoute();
const router = useRouter();
const searchData = ref<any>([]);
const searchDataMovie = ref<any[]>([]);
const searchDataTv = ref<any[]>([]);
const activeTabSearch = ref<string>('all');
const loading = ref<boolean>(false);
const page = ref<number>(+route.query?.page || 1);
const total = ref<number>(100);
const pageSize = ref<number>(20);
const internalInstance: any = getCurrentInstance();
const searchQuery = computed<string>(
  () => route.query?.q?.replaceAll('+', ' ') || ''
);

useHead({
  title: () => 'Tìm kiếm: ' + searchQuery.value + '',
  htmlAttrs: { lang: 'vi' }
});

useSeoMeta({
  title: () => 'Tìm kiếm: ' + searchQuery.value + '',
  description: 'Tìm kiếm phim hay vói Phimhay247',
  ogTitle: () => 'Tìm kiếm: ' + searchQuery.value + '',
  ogType: 'video.movie',
  // ogUrl: window.location.href,
  ogDescription: 'Tìm kiếm phim hay vói Phimhay247',
  ogLocale: 'vi'
});

const addSearchHistoryD = async () => {
  if (store.isLogin && total.value > 0 && searchQuery.value.length > 0) {
    addSearchHistory(searchQuery.value)
      .then((response) => {
        if (response?.added) {
          store.dataSearchHistory.unshift(response?.result);
        }
      })
      .catch((e) => {});
  }

  addSearch({ query: searchQuery.value })
    .then((response) => {
      if (response?.added) {
        // Do something
      }
    })
    .catch((e) => {});

  addRankSearch({ query: searchQuery.value })
    .then((response) => {
      if (response?.success) {
        // Do something
      }
    })
    .catch((e) => {});
};

const getData = async () => {
  if (searchQuery.value.length > 0) {
    // loading.value = true;
    internalInstance.appContext.config.globalProperties.$Progress.start();

    await useAsyncData(`search/all/${searchQuery.value}/${page.value}/20`, () =>
      getDaTaSearch(searchQuery.value, page.value)
    )
      .then((response) => {
        searchData.value = response.data.value?.results;
        total.value = response.data.value?.total;
        pageSize.value = response.data.value?.page_size;
        searchDataMovie.value = response.data.value?.movie;
        searchDataTv.value = response.data.value?.tv;
      })
      .catch((e) => {})
      .finally(() => {
        loading.value = false;
        internalInstance.appContext.config.globalProperties.$Progress.finish();
      });
  }
};

loading.value = true;

const { data: searchDataCache, pending } = await useAsyncData(
  `search/all/${searchQuery.value}/${page.value}/20`,
  () => getDaTaSearch(searchQuery.value, page.value),
  {
    // transform: (data: any) => {
    //   total.value = data?.total;
    //   pageSize.value = data?.page_size;
    //   searchDataMovie.value = data?.movie;
    //   searchDataTv.value = data?.tv;
    //   loading.value = false;
    //   return data.results;
    // },
    // server: false,
  }
);

searchData.value = searchDataCache.value?.results;

total.value = searchDataCache.value?.total;
pageSize.value = searchDataCache.value?.page_size;
searchDataMovie.value = searchDataCache.value?.movie;
searchDataTv.value = searchDataCache.value?.tv;

loading.value = false;

watch(
  () => route.query?.q,
  () => {
    getData();

    addSearchHistoryD();
  }
);

onMounted(() => {
  addSearchHistoryD();
});

const handleChangeType = (activeKey: any) => {
  switch (activeKey?.target?.value ? activeKey?.target?.value : activeKey) {
    case 'all':
      searchData.value = searchDataMovie.value.concat(searchDataTv.value);
      break;
    case 'movie':
      searchData.value = searchDataMovie.value;
      break;
    case 'tv':
      searchData.value = searchDataTv.value;
      break;
  }
};

const onChangePage = async (pageSelected: number) => {
  page.value = pageSelected;
  router.push({ query: { ...route.query, page: pageSelected } });
  getData();
};
</script>

<style lang="scss" src="./SearchPage.scss"></style>

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
      <section
        v-if="loading"
        class="home-section"
      >
        <h2 class="gradient-title-default">
          <span>{{ modLíst.results[0].name }}</span>
        </h2>
      </section>

      <LoadingSectionHorizontal
        :class="loading == true ? 'home-section' : null"
        v-model:loading="loading"
      >
        <template #content>
          <section
            v-for="(mod, index1) in modLíst.results"
            :key="mod.id"
            :index="index1"
            class="home-section"
          >
            <h2 class="gradient-title-default">
              <span>{{ mod.name }}</span>
              <NuxtLink
                class="view-all"
                :to="mod.path"
              >
                <!-- :to="{
                  path: `${mod.path}`,
                  query: {
                    type: mod.type
                  }
                }" -->
                Xem tất cả
                <ChevronRight
                  width="1.2rem"
                  height="1.2rem"
                  fill="currentColor"
                />
              </NuxtLink>
            </h2>

            <SwiperCarouselGroup
              :data="mod.data"
              :responsive="responsiveHorizoltal"
            >
              <template #content>
                <swiper-slide
                  v-for="(item, index) in mod.data"
                  :key="item.id"
                  :index="index"
                  :virtual-index="index"
                >
                  <MovieCardHorizontal
                    :item="item"
                    :type="item.media_type"
                  />
                </swiper-slide>
              </template>
            </SwiperCarouselGroup>
          </section>
        </template>
      </LoadingSectionHorizontal>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { HeaderPageGenreType } from '~/components/Layouts';
// import { BillboardAnimation } from '~/components/BillboardAnimation';
// import { SwiperCarouselGroup } from '~/components/CarouselGroup';
// import { LoadingSectionHorizontal } from '~/components/Loading';
// import { MovieCardHorizontal } from '~/components/MovieCard';
// import HeaderPageGenreType from '~/components/Layouts/HeaderPageGenreType/HeaderPageGenreType.server.vue';
// import BillboardAnimation from '~/components/BillboardAnimation/BillboardAnimation.vue';
// import LoadingSectionHorizontal from '~/components/Loading/LoadingSection/LoadingSectionHorizontal/LoadingSectionHorizontal.vue';
// import SwiperCarouselGroup from '~/components/CarouselGroup/SwiperCarouselGroup/SwiperCarouselGroup.vue';
// import MovieCardHorizontal from '~/components/MovieCard/MovieCardHorizontal/MovieCardHorizontal.vue';
import { getGenreById } from '~/services/genres';
import { FilterModWithData } from '~/services/mods';
import { FilterMovie } from '~/services/discover';
import type { formfilter, genre } from '~/types';

definePageMeta({
  // layout: 'home',
  name: 'home-television-genre'
});

const store = useStore();
const route = useRoute();
// const modLíst = ref<any>([]);
const page = ref<number>(1);
const pageSize = ref<number>(5);
const total = ref<number>(0);
const isLoading = computed<boolean>(() => status.value != 'success');
const loading = ref<boolean>(false);
const formFilter = ref<formfilter>({
  type: 'tv',
  sortBy: '',
  genre: +(route.params.genre as string),
  year: '',
  country: '',
  page: 1,
  limit: 20
});
const genreRoute = computed<genre>(
  () => getGenreById(+route.params.genre, store.allGenres)!
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

loading.value = true;

const { data: dataBilboard, status: statusBillboard } = await useAsyncData(
  `discover/tv/all/${JSON.stringify(formFilter.value)}`,
  () => FilterMovie(formFilter.value),
  {
    // default: () => {
    //   return { results: trendingsCache.value || [] };
    // },
    transform: (data: any) => {
      return data.results;
    }
  }
);

const { data: modLíst, status } = await useAsyncData(
  `mod/tv/filter/${JSON.stringify(formFilter.value)}`,
  () => FilterModWithData(formFilter.value)
  // {
  //   // default: () => {
  //   //   return { results: trendingsCache.value || [] };
  //   // },
  //   transform: (data: any) => {
  //     return data.results[0].data;
  //   }
  // }
);

total.value = modLíst.value?.total;
pageSize.value = modLíst.value?.page_size;
// page.value++;

const onSwiperLoaded = () => {
  // loading.value = false;
};

onMounted(() => {
  loading.value = false;
});

watch(
  () => route.params,
  async () => {},
  { deep: true, immediate: true }
);
</script>

<style src="../TelevisionPage.scss" lang="scss"></style>
<!-- <style lang="scss">
@import url('../TelevisionPage.scss');
</style> -->

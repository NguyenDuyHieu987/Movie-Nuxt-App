<template>
  <div class="home-page televison">
    <HeaderPageMovieType
      title="Phim bộ"
      :mediaType="'tv'"
      viewAllLink="/discover/tv?type=all"
    />

    <BillboardAnimation v-model:data="dataBilboard" />

    <div class="home-content">
      <section
        v-if="loading"
        class="home-section"
      >
        <h2 class="gradient-title-default">
          <span>{{ modLíst?.results?.[1].name }}</span>
        </h2>
      </section>

      <LoadingSectionHorizontal
        :class="loading == true ? 'home-section' : null"
        v-model:loading="loading"
      >
        <template #content>
          <section
            v-for="(mod, index1) in modLíst?.results?.slice(1)"
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
                <SvgoChevronRight
                  width="1.2rem"
                  height="1.2rem"
                  fill="currentColor"
                />
              </NuxtLink>
            </h2>

            <SwiperCarouselGroup
              :data="mod.data"
              :responsive="responsiveHorizoltal"
              @on-loaded="onSwiperLoaded"
            >
              <template #content>
                <SwiperSlide
                  v-for="(item, index) in mod.data"
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
          </section>
        </template>
      </LoadingSectionHorizontal>
    </div>
  </div>
</template>

<script setup lang="ts">
// import SvgoChevronRight from '~/assets/svgs/icons/chevron-right.svg?component';

// import { HeaderPageMovieType } from '~/components/Layouts';
// import { BillboardAnimation } from '~/components/BillboardAnimation';
// import { LoadingSectionHorizontal } from '~/components/Loading';
// import { SwiperCarouselGroup } from '~/components/CarouselGroup';
// import { MovieCardHorizontal } from '~/components/MovieCard';
// import HeaderPageMovieType from '~/components/Layouts/HeaderPageMovieType/HeaderPageMovieType.vue';
// import BillboardAnimation from '~/components/BillboardAnimation/BillboardAnimation.vue';
// import LoadingSectionHorizontal from '~/components/Loading/LoadingSection/LoadingSectionHorizontal/LoadingSectionHorizontal.vue';
// import SwiperCarouselGroup from '~/components/CarouselGroup/SwiperCarouselGroup/SwiperCarouselGroup.vue';
// import MovieCardHorizontal from '~/components/MovieCard/MovieCardHorizontal/MovieCardHorizontal.vue';
import { FilterMovie } from '~/services/discover';
import { getAllModWithData } from '~/services/mods';

definePageMeta({
  // layout: 'home',
  name: 'home-television'
});

useHead({
  title: 'Phim bộ',
  htmlAttrs: { lang: 'vi' }
});

useSeoMeta({
  title: 'Phim bộ',
  description: 'Phim bộ, Phim dài tập',
  ogTitle: 'Phim bộ',
  ogType: 'video.movie',
  ogUrl: () => window?.location?.href,
  ogDescription: 'Phim bộ, Phim dài tập',
  ogLocale: 'vi'
});

const store = useStore();
const dataBilboard = ref<any>([]);
// const modLíst = ref<any>([]);
const page = ref<number>(1);
const pageSize = ref<number>(5);
const total = ref<number>(0);
const isLoading = computed<boolean>(() => status.value != 'success');
const loading = ref<boolean>(false);

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

loading.value = true;

// const { data: dataBilboard, status: statusBillboard } = await useAsyncData(
//   'tv/all/1',
//   () =>
//     FilterMovie({
//       type: 'tv',
//       sortBy: '',
//       genre: '',
//       year: '',
//       country: '',
//       page: 1,
//       limit: 20
//     }),
//   {
//     // default: () => {
//     //   return { results: trendingsCache.value || [] };
//     // },
//     transform: (data: any) => {
//       return data.results;
//     }
//   }
// );

const { data: modLíst, status } = await useAsyncData(
  `mod/tv/${page.value}/${pageSize.value}`,
  () => getAllModWithData('all', 'tv', page.value, pageSize.value),
  {
    lazy: true
    // default: () => {
    //   return { results: trendingsCache.value || [] };
    // },
    // transform: (data: any) => {
    //   return data.results[0].data;
    // }
  }
);

// dataBilboard.value = modLíst.value?.results[0].data;
// total.value = modLíst.value?.total;
// pageSize.value = modLíst.value?.page_size;
// // page.value++;

watchEffect(() => {
  const {
    results = [],
    total: t = 0,
    page_size = pageSize.value
  } = modLíst.value || {};
  if (results.length) {
    dataBilboard.value = results[0]?.data || [];
    total.value = t;
    pageSize.value = page_size;
  }
});

const onSwiperLoaded = () => {
  loading.value = false;
};

onMounted(() => {
  loading.value = false;
});
</script>

<style src="./TelevisionPage.scss" lang="scss"></style>
<!-- <style lang="scss">
@import url('./TelevisionPage.scss');
</style> -->

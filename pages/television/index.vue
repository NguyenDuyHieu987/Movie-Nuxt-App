<template>
  <div class="home-page televison">
    <HeaderPageMovieType
      title="Phim bộ"
      viewAllLink="/discover/tv?type=all"
    />

    <BillboardAnimation v-model:data="dataBilboard" />

    <div class="home-content">
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
            <ChevronRight
              width="1.2rem"
              height="1.2rem"
              fill="currentColor"
            />
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
            <ChevronRight
              width="1.2rem"
              height="1.2rem"
              fill="currentColor"
            />
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
            <ChevronRight
              width="1.2rem"
              height="1.2rem"
              fill="currentColor"
            />
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
            <ChevronRight
              width="1.2rem"
              height="1.2rem"
              fill="currentColor"
            />
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
import ChevronRight from '~/assets/svgs/icons/chevron-right.svg?component';

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
import {
  getTvAiringToday,
  getTvOntheAir,
  getTvPopular,
  getTvs,
  getTvTopRated
} from '~/services/tvSlug';

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
  // ogUrl: window.location.href,
  ogDescription: 'Phim bộ, Phim dài tập',
  ogLocale: 'vi'
});

const store = useStore();
const airingTodays = ref<any>([]);
const onTheAirs = ref<any>([]);
const populars = ref<any>([]);
const topRateds = ref<any>([]);
const loadingTvAiringToday = ref<boolean>(true);
const loadingTvOnTheAir = ref<boolean>(true);
const loadingTvPopular = ref<boolean>(true);
const loadingTvTopRated = ref<boolean>(true);

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

const getData = async () => {
  loadingTvAiringToday.value = true;
  loadingTvOnTheAir.value = true;
  loadingTvPopular.value = true;
  loadingTvTopRated.value = true;

  // await nextTick();

  // useAsyncData('tv/airingtoday/1', () => getTvAiringToday(1))
  getTvAiringToday(1, 12)
    .then((response) => {
      airingTodays.value = response?.results;
    })
    .catch((e) => {})
    .finally(() => {
      loadingTvAiringToday.value = false;
    });

  // useAsyncData(`tv/ontheair/1`, () => getTvOntheAir(2))
  getTvOntheAir(2, 12)
    .then((response) => {
      onTheAirs.value = response?.results;
    })
    .catch((e) => {})
    .finally(() => {
      loadingTvOnTheAir.value = false;
    });

  // useAsyncData('tv/popular/1', () => getTvPopular(3))
  getTvPopular(3, 12)
    .then((response) => {
      populars.value = response?.results;
    })
    .catch((e) => {})
    .finally(() => {
      loadingTvPopular.value = false;
    });

  // useAsyncData('tv/toprated/1', () => getTvTopRated(4))
  getTvTopRated(4, 12)
    .then((response) => {
      topRateds.value = response?.results;
    })
    .catch((e) => {})
    .finally(() => {
      loadingTvTopRated.value = false;
    });
};

const { data: dataBilboard, pending } = await useAsyncData(
  'tv/all/1',
  () => getTvs(1),
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
</script>

<style src="./TelevisionPage.scss" lang="scss"></style>
<!-- <style lang="scss">
@import url('./TelevisionPage.scss');
</style> -->

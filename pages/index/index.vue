<template>
  <div class="home-page">
    <div class="home-billBoard">
      <!-- <NuxtIsland> -->
      <BillboardAnimation v-model:data="trendings" />
      <!-- </NuxtIsland> -->

      <BoxVip />
    </div>

    <div class="home-content">
      <section
        v-if="loading"
        class="home-section"
      >
        <h2 class="gradient-title-default">
          <span>{{ modLíst.results.slice(1)[0].name }}</span>
        </h2>
      </section>

      <LoadingSectionVertical
        :class="loading == true ? 'home-section' : null"
        v-model:loading="loading"
      >
        <template #content>
          <section
            v-for="(mod, index1) in modLíst.results.slice(1)"
            :key="mod.id"
            :index="index1"
            class="home-section"
          >
            <h2 class="gradient-title-default">
              <span>{{ mod.name }}</span>
              <NuxtLink
                class="view-all"
                :to="{
                  path: `/discover/movie`,
                  query: {
                    type: 'nowplaying'
                  }
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
            <SwiperCarouselGroup
              :data="mod.data"
              :responsive="responsiveVertical"
              @on-loaded="onSwiperLoaded"
            >
              <template #content>
                <SwiperSlide
                  v-for="(item, index) in mod.data"
                  :key="item.id"
                  :index="index"
                  :virtual-index="index"
                >
                  <MovieCardVertical
                    :item="item"
                    :type="item.media_type"
                  />
                </SwiperSlide>
              </template>
            </SwiperCarouselGroup>
          </section>
        </template>
      </LoadingSectionVertical>

      <LoadingSpinner
        v-show="loadMore"
        class="center"
        :width="35"
      />

      <!-- <section
        v-if="authStore.isLogin"
        class="home-section recommend"
      >
        <h2
          v-if="loadingRecommend || recommends?.length"
          class="gradient-title-default"
        >
          <span>Gợi ý cho bạn</span>
        </h2>

        <LoadingSectionVertical v-model:loading="loadingRecommend">
          <template #content>
            <section
              class="movie-group vertical"
              :class="{ expand: viewMoreRecommend }"
            >
              <MovieCardVertical
                v-for="(item, index) in recommends"
                :key="item.id"
                :index="index"
                :item="item"
                :type="item.media_type"
              />
            </section>

            <ViewMoreBar
              v-show="recommends?.length"
              :isOpen="viewMoreRecommend"
              @onClick="viewMoreRecommend = !viewMoreRecommend"
            />

            <a-button
              v-show="recommends?.length"
              class="loadmore-btn"
              type="text"
              :loading="loadMoreRecommend"
              @click="handleLoadMoreRecommend"
            >
              <template #icon>
                <Plus1Icon
                  width="2rem"
                  height="2rem"
                  fill="currentColor"
                />
              </template>
              {{ loadMoreRecommend ? 'Đang tải...' : 'Tải thêm' }}
            </a-button>
          </template>
        </LoadingSectionVertical>
      </section> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import ChevronRight from '~/assets/svgs/icons/chevron-right.svg?component';
import Plus1Icon from '~/assets/svgs/icons/plus-1.svg?component';

// import { BillboardAnimation } from '~/components/BillboardAnimation';
// import { BoxVip } from '~/components/BoxVip';
// import {
//   // SlickCarouselGroup,
//   SwiperCarouselGroup
// } from '~/components/CarouselGroup';
// import {
//   LoadingSectionHorizontal,
//   LoadingSectionVertical
// } from '~/components/Loading';
// import { SliderGroupBackground } from '~/components/SliderGroup';
// import { MovieCardHorizontal, MovieCardVertical } from '~/components/MovieCard';
// import { MovieCardHorizontalTrailer } from '~/components/MovieCardHorizontalTrailer';
// import { ViewMoreBar } from '~/components/ViewMoreBar';
// import BillboardAnimation from '~/components/BillboardAnimation/BillboardAnimation.vue';
// import BoxVip from '~/components/BoxVip/BoxVip.vue';
// import SwiperCarouselGroup from '~/components/CarouselGroup/SwiperCarouselGroup/SwiperCarouselGroup.vue';
// import LoadingSectionHorizontal from '~/components/Loading/LoadingSection/LoadingSectionHorizontal/LoadingSectionHorizontal.vue';
// import LoadingSectionVertical from '~/components/Loading/LoadingSection/LoadingSectionVertical/LoadingSectionVertical.vue';
// import SliderGroupBackground from '~/components/SliderGroup/SliderGroupBackground/SliderGroupBackground.vue';
// import MovieCardHorizontal from '~/components/MovieCard/MovieCardHorizontal/MovieCardHorizontal.vue';
// import MovieCardVertical from '~/components/MovieCard/MovieCardVertical/MovieCardVertical.vue';
// import MovieCardHorizontalTrailer from '~/components/MovieCardHorizontalTrailer/MovieCardHorizontalTrailer.vue';
import ViewMoreBar from '~/components/ViewMoreBar/ViewMoreBar.vue';
import { getAllMod } from '~/services/mods';
import { getMoviesByGenres } from '~/services/discover';
import { getNowPlaying, getTopRated, getUpComing } from '~/services/movieSlug';
import { getMyRecommend } from '~/services/recommend';
import { getTrending } from '~/services/trending';
import { getTvAiringToday, getTvOntheAir } from '~/services/tvSlug';

definePageMeta({
  // layout: 'home',
  name: 'home'
  // key: (route) => route.fullPath
});

useHead({
  title: 'Xem phim Online 24/7',
  htmlAttrs: { lang: 'vi' }
});

useSeoMeta({
  title: 'Xem phim Online 24/7',
  description: 'Xem phim thỏa thích cùng Phimhay247',
  ogTitle: 'Xem phim Online 24/7',
  ogType: 'video.movie',
  // ogUrl: window.location.href,
  ogDescription: 'Xem phim thỏa thích cùng Phimhay247',
  ogLocale: 'vi'
});

const utils = useUtils();
const authStore = useAuthStore();
const trendings = ref<any[]>([]);
// const modLíst = ref<any>([]);
const page = ref<number>(1);
const pageSize = ref<number>(3);
const total = ref<number>(0);
const nowPlayings = ref<any>([]);
const upComings = ref<any>([]);
const tvAiringTodays = ref<any>([]);
const tvOnTheAirs = ref<any>([]);
const animations = ref<any>([]);
const topRateds = ref<any>([]);
const recommends = ref<any>([]);
const isLoading = computed<boolean>(() => status.value != 'success');
const loading = ref<boolean>(false);
const loadMore = ref<boolean>(false);
const loadingRecommend = ref<boolean>(true);
const skipRecommend = ref<number>(1);
const viewMoreRecommend = ref<boolean>(false);
const loadMoreRecommend = ref<boolean>(false);
const responsiveHorizoltal = computed<any>(() => ({
  0: {
    slidesPerView: 2,
    slidesPerGroup: 2
  },
  600: {
    slidesPerView: 3,
    slidesPerGroup: 3,
    spaceBetween: 5
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

const responsiveVertical = computed<any>(() => ({
  0: {
    slidesPerView: 2,
    slidesPerGroup: 2
  },
  500: {
    slidesPerView: 3,
    slidesPerGroup: 3
  },
  600: {
    slidesPerView: 4,
    slidesPerGroup: 4
  },
  800: {
    slidesPerView: 5,
    slidesPerGroup: 5,
    spaceBetween: 13
  },
  900: {
    slidesPerView: 5,
    slidesPerGroup: 5,
    spaceBetween: 15
  },
  1100: {
    slidesPerView: 5,
    slidesPerGroup: 5
  },
  1300: {
    slidesPerView: 6,
    slidesPerGroup: 6
  },
  1550: {
    slidesPerView: 7,
    slidesPerGroup: 7
  },
  1700: {
    slidesPerView: 8,
    slidesPerGroup: 8
  },
  2000: {
    slidesPerView: 9,
    slidesPerGroup: 9
  }
}));

const responsiveHorizoltalSlick = computed<any[]>(() => [
  {
    breakpoint: 600,
    settings: {
      slidesToShow: 2,
      slidesToScroll: 2
    }
  },
  {
    breakpoint: 900,
    settings: {
      slidesToShow: 3,
      slidesToScroll: 3,
      spaceBetween: 5
    }
  },
  {
    breakpoint: 1000,
    settings: {
      slidesToShow: 4,
      slidesToScroll: 4
    }
  },
  {
    breakpoint: 1200,
    settings: {
      slidesToShow: 4,
      slidesToScroll: 4
    }
  },
  {
    breakpoint: 1500,
    settings: {
      slidesToShow: 4,
      slidesToScroll: 4
    }
  },
  {
    breakpoint: 2000,
    settings: {
      slidesToShow: 5,
      slidesToScroll: 5
    }
  }
]);

const responsiveVerticalSlick = computed<any[]>(() => [
  {
    breakpoint: 500,
    settings: {
      slidesToShow: 2,
      slidesToScroll: 2
    }
  },
  {
    breakpoint: 600,
    settings: {
      slidesToShow: 3,
      slidesToScroll: 3,
      spaceBetween: 13
    }
  },
  {
    breakpoint: 800,
    settings: {
      slidesToShow: 4,
      slidesToScroll: 4
    }
  },
  {
    breakpoint: 1100,
    settings: {
      slidesToShow: 5,
      slidesToScroll: 5
    }
  },
  {
    breakpoint: 1550,
    settings: {
      slidesToShow: 6,
      slidesToScroll: 6
    }
  },
  {
    breakpoint: 1700,
    settings: {
      slidesToShow: 7,
      slidesToScroll: 7
    }
  },
  {
    breakpoint: 2000,
    settings: {
      slidesToShow: 8,
      slidesToScroll: 8
    }
  }
]);

loading.value = true;

const { data: modLíst, status } = await useAsyncData(
  `mod/all/${page.value}/${pageSize.value}`,
  () => getAllMod(page.value, pageSize.value)
  // {
  //   // default: () => {
  //   //   return { results: trendingsCache.value || [] };
  //   // },
  //   transform: (data: any) => {
  //     return data.results[0].data;
  //   }
  // }
);

trendings.value = modLíst.value?.results[0].data;
total.value = modLíst.value?.total;
pageSize.value = modLíst.value?.page_size;
page.value++;

// useAsyncData(`mod/all/${page.value}/${pageSize.value}`, () =>
//   getAllMod(page.value, pageSize.value)
// )
//   // getAllMod(page.value, pageSize.value)
//   .then((response) => {
//     modLíst.value = response.data.value?.results;
//     total.value = response.data.value?.total;
//     pageSize.value = response.data.value?.page_size;
//   })
//   .catch((e) => {})
//   .finally(() => {
//     loading.value = false;
//   });

const onSwiperLoaded = async () => {
  // console.log('loaded');
  loading.value = false;
};

onMounted(() => {
  loading.value = false;

  window.addEventListener('scroll', async () => {
    if (modLíst.value?.results?.length == 0 || loading.value) {
      return;
    }

    if (
      utils.isScrollBottom() &&
      total.value > pageSize.value &&
      modLíst.value?.results?.length < total.value
    ) {
      loadMore.value = true;

      await getAllMod(page.value, pageSize.value)
        .then((response) => {
          if (response?.results?.length > 0) {
            modLíst.value.results = modLíst.value.results.concat(
              response?.results
            );
            page.value++;
          }
        })
        .catch((e) => {})
        .finally(() => {
          loadMore.value = false;
        });
    }
  });
});

const handleLoadMoreRecommend = async () => {
  loadMoreRecommend.value = true;
  // await useAsyncData(`recommend/get/${skipRecommend.value}`, () =>
  //   getMyRecommend(skipRecommend.value)
  // )
  await getMyRecommend(skipRecommend.value)
    .then((response) => {
      if (response?.results.length > 0) {
        recommends.value = recommends.value.concat(response?.results);
        skipRecommend.value++;

        if (viewMoreRecommend.value == false) {
          viewMoreRecommend.value = true;
        }
      }
    })
    .catch((e) => {})
    .finally(() => {
      loadMoreRecommend.value = false;
    });
};
</script>

<style lang="scss" src="./HomePage.scss"></style>
<!-- <style lang="scss">
@import url('./HomePage.scss');
</style> -->

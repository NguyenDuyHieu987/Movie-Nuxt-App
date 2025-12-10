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
                <SvgoPlus1
                  width="2rem"
                  height="2rem"
                  fill="currentColor"
                />
              </template>
              {{ loadMoreRecommend ? 'Đang tải...' : 'Tải thêm' }}
            </a-button>
          </template>
        </LoadingSectionVertical>
      </section>

      <section
        v-if="loading"
        class="home-section"
      >
        <h2 class="gradient-title-default">
          <span>{{ modList?.results?.slice(1)[0].name }}</span>
        </h2>
      </section>

      <LoadingSectionHorizontal
        :class="loading == true ? 'home-section' : null"
        v-model:loading="loading"
      >
        <template #content>
          <section
            v-if="broadcasts?.results?.length > 0"
            class="home-section broadcast-list"
          >
            <h2 class="gradient-title-default">
              <span>Sắp công chiếu</span>
              <NuxtLink
                class="view-all"
                :to="'broadcast/all'"
              >
                Xem tất cả
                <SvgoChevronRight
                  width="1.2rem"
                  height="1.2rem"
                  fill="currentColor"
                />
              </NuxtLink>
            </h2>
            <SwiperCarouselGroup
              :data="broadcasts.results"
              :responsive="responsiveHorizoltal"
              @on-loaded="onSwiperLoaded"
            >
              <template #content>
                <SwiperSlide
                  v-for="(item, index) in broadcasts?.results"
                  :key="item.id"
                  :index="index"
                >
                  <!-- :virtual-index="index" -->
                  <MovieCardHorizontalBroadcast :item="item" />
                </SwiperSlide>
              </template>
            </SwiperCarouselGroup>
          </section>

          <section
            v-for="(mod, index1) in modList"
            :key="mod.id"
            :index="index1"
            class="home-section mod-list"
          >
            <h2 class="gradient-title-default">
              <span>{{
                mod?.type == 'trending'
                  ? mod?.name +
                    ' ' +
                    utils.convertMediaTypeToVietnamese(mod?.media_type)
                  : mod?.name
              }}</span>
              <NuxtLink
                class="view-all"
                :to="{
                  path: `discover/${mod.media_type}`,
                  query: {
                    type: mod.type
                  }
                }"
              >
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
              :responsive="responsiveVertical"
              @on-loaded="onSwiperLoaded"
            >
              <template #content>
                <SwiperSlide
                  v-for="(item, index) in mod.data"
                  :key="item.id"
                  :index="index"
                >
                  <!-- :virtual-index="index" -->
                  <MovieCardVertical
                    :item="item"
                    :type="item.media_type"
                  />
                </SwiperSlide>
              </template>
            </SwiperCarouselGroup>

            <!-- <FigureSlide
          :data="mod.data"
          :breakpoints="responsiveVertical"
        >
          <template #content>
            <FigureSlideItem
              v-for="(item, index) in mod.data"
              :key="item.id"
              :index="index"
            >
              <MovieCardVertical
                :item="item"
                :type="item.media_type"
              />
            </FigureSlideItem>
          </template>
        </FigureSlide> -->
          </section>
        </template>
      </LoadingSectionHorizontal>

      <LoadingSpinner
        v-show="loadMore"
        class="center"
        :width="35"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
// import SvgoChevronRight from '~/assets/svgs/icons/chevron-right.svg?component';
// import SvgoPlus1 from '~/assets/svgs/icons/plus-1.svg?component';

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
// import ViewMoreBar from '~/components/ViewMoreBar/ViewMoreBar.vue';

import { getAllModWithData } from '~/services/mods';
import { getMyRecommend } from '~/services/recommend';
import { getAllAiringBroadcast } from '~/services/broadcast';

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
const modList = ref<any>([]);
const page = ref<number>(1);
const pageSize = ref<number>(3);
const total = ref<number>(0);
const recommends = ref<any>([]);
// const modListData = ref<any>([]);
// const broadcasts = ref<any>([]);
// const isLoading = computed<boolean>(() => status.value != 'success');
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
    slidesPerView: 6,
    slidesPerGroup: 6
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

// const pMods = getAllModWithData('all', 'all', page.value, pageSize.value);
// const pBroadcast = getAllAiringBroadcast(page.value, pageSize.value);

// const [modListData, broadcasts] = await Promise.all([
//   pMods,
//   pBroadcast,
// ]);
// trendings.value = modListData?.results?.[0].data;
// modList.value = modListData.value?.results?.slice(1);
// broadcasts.value = broadcasts;

// total.value = modListData.total;
// pageSize.value = modListData.page_size;
// page.value++;

const {
  data: modListData,
  pending: loadingMods,
  refresh: refreshMods
} = await useAsyncData(
  () => `mods/all/all/${page.value}/${pageSize.value}`,
  () => getAllModWithData('all', 'all', page.value, pageSize.value),
  {
    lazy: true
  }
);

// trendings.value = modListData.value?.results?.[0].data;
// modList.value = modListData.value?.results?.slice(1);
// total.value = modListData.value?.total;
// pageSize.value = modListData.value?.page_size;
// page.value++;

watchEffect(() => {
  const {
    results = [],
    total: t = 0,
    page_size = pageSize.value
  } = modListData.value || {};

  if (page.value === 1 && results.length) {
    trendings.value = results[0]?.data || [];
    modList.value = results.slice(1);
    total.value = t;
    pageSize.value = page_size;
    page.value++;
  }
});

const { data: broadcasts, pending: loadingBroadcasts } = await useAsyncData(
  `broadcasts/all/1/20`,
  () => getAllAiringBroadcast(page.value, pageSize.value),
  {
    lazy: true
  }
);

// const { data: modListData, status } = await useAsyncData(
//   `mod/all/${page.value}/${pageSize.value}`,
//   () => getAllModWithData('all', 'all', page.value, pageSize.value)
//   // {
//   //   // default: () => {
//   //   //   return { results: trendingsCache.value || [] };
//   //   // },
//   //   transform: (data: any) => {
//   //     return data.results[0].data;
//   //   }
//   // }
// );

// const { data: broadcasts, status: statusBroadcast } = await useAsyncData(
//   `broadcast/all/1/20`,
//   () => getAllAiringBroadcast(page.value, pageSize.value)
// );

// await getAllAiringBroadcast(page.value, pageSize.value)
//   .then((response) => {
//     broadcasts.value = response;
//   })
//   .catch((e) => {})
//   .finally(() => {});

// trendings.value = modListData.value?.results[0].data;
// modList.value = modListData.value?.results?.slice(1);
// total.value = modListData.value?.total;
// pageSize.value = modListData.value?.page_size;
// page.value++;

watch(
  () => authStore.isLogin,
  async () => {
    if (authStore.isLogin) {
      loadingRecommend.value = true;

      getMyRecommend(skipRecommend.value)
        .then((response) => {
          recommends.value = response?.results;
          skipRecommend.value++;
        })
        .catch((e) => {})
        .finally(() => {
          loadingRecommend.value = false;
        });
    }
  },
  { immediate: true }
);

onMounted(() => {
  loading.value = false;
  window.addEventListener('scroll', handleLoadMoreMods);
});

onUnmounted(() => window.removeEventListener('scroll', handleLoadMoreMods));

const handleLoadMoreMods = async () => {
  if (
    modList.value?.length == 0 ||
    loading.value ||
    loadMore.value ||
    total.value <= pageSize.value ||
    modList.value?.length >= total.value
  )
    return;

  if (
    utils.isWindowScrollBottom() &&
    total.value > pageSize.value &&
    modList.value?.length < total.value
  ) {
    loadMore.value = true;
    await refreshMods();
    modList.value = modList.value.concat(modListData.value?.results);
    page.value++;
    loadMore.value = false;
  }

  //   if (modList.value?.length == 0 || loading.value || loadMore.value) {
  //     return;
  //   }

  //   if (
  //     utils.isWindowScrollBottom() &&
  //     total.value > pageSize.value &&
  //     modList.value?.length < total.value
  //   ) {
  //     loadMore.value = true;

  //     await getAllModWithData('all', 'all', page.value, pageSize.value)
  //       .then((response) => {
  //         if (response?.results?.length > 0) {
  //           modList.value = modList.value.concat(response?.results);
  //           page.value++;
  //         }
  //       })
  //       .catch((e) => {})
  //       .finally(() => {
  //         loadMore.value = false;
  //       });
  //   }
};

const handleLoadMoreRecommend = async () => {
  loadMoreRecommend.value = true;
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

const onSwiperLoaded = () => {
  loading.value = false;
};
</script>

<!-- <style lang="scss" src="./HomePage.scss"></style> -->
<style lang="scss">
@import url('./HomePage.scss');
</style>

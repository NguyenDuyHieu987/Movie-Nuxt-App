<template>
  <div class="ranks padding-content">
    <div class="ranks-container">
      <div class="ranks-header">
        <div class="left">
          <div class="ranks-title">
            <span>Bảng xếp hạng</span>
          </div>
        </div>

        <div class="right">
          <div class="rank-type">
            <div
              v-for="(item, index) in typeRankList"
              :key="index"
              :index="index"
              class="rank-type-item"
              :class="{ active: item.value == formFilterRank.type }"
            >
              <NuxtLink
                :to="{
                  query: {
                    type: item.value
                  }
                }"
              >
                {{ item.label }}
              </NuxtLink>
            </div>
          </div>

          <div class="rank-sortBy">
            <a-select
              v-model:value="formFilterRank.sortBy"
              class="rank-sortBy-select"
              style="width: 150px"
              placeholder="Xắp sếp theo"
              @change="handleChangeType"
            >
              <a-select-option
                value="day"
                label="Ngày"
              >
                Ngày
              </a-select-option>
              <a-select-option
                value="week"
                label="Tuần"
              >
                Tuần
              </a-select-option>
              <a-select-option
                value="month"
                label="Tháng"
              >
                Tháng
              </a-select-option>
              <a-select-option
                value="year"
                label="Năm"
              >
                Năm
              </a-select-option>
              <a-select-option
                value="all"
                label="Tất cả"
              >
                Tất cả
              </a-select-option>
            </a-select>
          </div>
        </div>
      </div>

      <div
        v-if="!loading"
        class="ranks-body"
      >
        <RankSection
          class="all"
          :ranksData="ranksData"
          :rankSectionTitle="rankSectionTitle"
          :viewAllPath="{
            path: `/ranks/detail`,
            query: {
              type: formFilterRank.type,
              sort_by: formFilterRank.sortBy
            }
          }"
          main
        />

        <div class="rank-section-list">
          <RankSection
            class="movie"
            :ranksData="ranksMovie"
            rankSectionTitle="Phim lẻ"
            :viewAllPath="{
              path: `/ranks/detail`,
              query: {
                type: formFilterRank.type,
                sort_by: formFilterRank.sortBy
              }
            }"
          />

          <RankSection
            class="tv"
            :ranksData="ranksTV"
            rankSectionTitle="Phim bộ"
            :viewAllPath="{
              path: `/ranks/detail`,
              query: {
                type: formFilterRank.type,
                sort_by: formFilterRank.sortBy
              }
            }"
          />

          <RankSection
            class="animation"
            :ranksData="ranksAnimation"
            rankSectionTitle="Hoạt hình"
            :viewAllPath="{
              path: `/ranks/detail`,
              query: {
                type: formFilterRank.type,
                sort_by: formFilterRank.sortBy
              }
            }"
          />

          <RankSection
            class="action"
            :ranksData="ranksAction"
            rankSectionTitle="Hành động"
            :viewAllPath="{
              path: `/ranks/detail`,
              query: {
                type: formFilterRank.type,
                sort_by: formFilterRank.sortBy
              }
            }"
          />

          <RankSection
            class="horror"
            :ranksData="ranksHorror"
            rankSectionTitle="Kinh dị"
            :viewAllPath="{
              path: `/ranks/detail`,
              query: {
                type: formFilterRank.type,
                sort_by: formFilterRank.sortBy
              }
            }"
          />

          <RankSection
            class="drama"
            :ranksData="ranksDrama"
            rankSectionTitle="Drama"
            :viewAllPath="{
              path: `/ranks/detail`,
              query: {
                type: formFilterRank.type,
                sort_by: formFilterRank.sortBy
              }
            }"
          />

          <RankSection
            class="science-fiction"
            :ranksData="ranksScienceFiction"
            rankSectionTitle="Khoa học viễn tưởng"
            :viewAllPath="{
              path: `/ranks/detail`,
              query: {
                type: formFilterRank.type,
                sort_by: formFilterRank.sortBy
              }
            }"
          />

          <RankSection
            class="us-uk"
            :ranksData="ranksEN"
            rankSectionTitle="Âu Mỹ"
            :viewAllPath="{
              path: `/ranks/detail`,
              query: {
                type: formFilterRank.type,
                sort_by: formFilterRank.sortBy
              }
            }"
          />

          <RankSection
            class="china"
            :ranksData="ranksChina"
            rankSectionTitle="Trung quốc"
            :viewAllPath="{
              path: `/ranks/detail`,
              query: {
                type: formFilterRank.type,
                sort_by: formFilterRank.sortBy
              }
            }"
          />

          <RankSection
            class="japan"
            :ranksData="ranksJapan"
            rankSectionTitle="Nhật bản"
            :viewAllPath="{
              path: `/ranks/detail`,
              query: {
                type: formFilterRank.type,
                sort_by: formFilterRank.sortBy
              }
            }"
          />
        </div>
      </div>

      <LoadingSpinner
        v-else
        :width="40"
        class="loading-page"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
// import { LoadingSpinner } from '~/components/Loading';
// import { RankSection } from '~/components/RankSection';
// import LoadingSpinner from '~/components/Loading/LoadingSpinner/LoadingSpinner.vue';
// import RankSection from '~/components/RankSection/RankSection.vue';
import { filterRanks, getRankPlay } from '~/services/ranks';
import type { formfilterRank, rankSort, rankType } from '~/types';

definePageMeta({
  zoomOut: true
});

useHead({
  title: 'Bảng xếp hạng',
  htmlAttrs: { lang: 'vi' }
});

useSeoMeta({
  title: 'Bảng xếp hạng',
  description: 'Trending, bảng xếp hạng',
  ogTitle: 'Bảng xếp hạng',
  ogType: 'video.movie',
  // ogUrl: window.location.href,
  ogDescription: 'Trending, bảng xếp hạng',
  ogLocale: 'vi'
});

const utils = useUtils();
const router = useRouter();
const route = useRoute();
const ranksData = ref<any[]>([]);
const ranksMovie = ref<any[]>([]);
const ranksTV = ref<any[]>([]);
const ranksAnimation = ref<any[]>([]);
const ranksAction = ref<any[]>([]);
const ranksHorror = ref<any[]>([]);
const ranksDrama = ref<any[]>([]);
const ranksScienceFiction = ref<any[]>([]);
const ranksEN = ref<any[]>([]);
const ranksChina = ref<any[]>([]);
const ranksJapan = ref<any[]>([]);
const pageRank = ref<number>(+(route.query?.page as string) || 1);
const pageSize = ref<number>(10);
const loading = ref<boolean>(false);
const typeRankList = ref<
  {
    value: string;
    label: string;
  }[]
>([
  { label: 'D/S xem nhiều', value: 'hot-play' },
  { label: 'D/S tìm kiếm nhiều', value: 'hot-search' },
  { label: 'D/S đánh giá cao', value: 'high-rate' }
]);
const formFilterRank = computed<formfilterRank>(() => {
  return {
    type: route.query?.type || 'hot-play',
    mediaType: route.query?.media_type || 'all',
    sortBy: route.query?.sort_by || 'day',
    genre: route.query?.genre || '',
    country: route.query?.country || ''
  };
});
const rankSectionTitle = computed<string>(
  () =>
    [
      { title: 'Xem nhiều', value: 'hot-play' },
      { title: 'Tìm kiếm nhiều', value: 'hot-search' },
      { title: 'Đánh giá cao', value: 'high-rate' }
    ].find((item) => item.value == formFilterRank.value.type)?.title!
);
const nuxtLoadingIndicator = useLoadingIndicator();

const compareRanks = (ranks: any): any[] => {
  if (ranks?.results.length > 0 || ranks?.prev_results.length) {
    let step: number = 0;

    const rankCompared: any[] = ranks?.results.map((item: any, index: any) => {
      step = 0;

      const itemRank = ranks?.prev_results.find((item1: any, index1: any) => {
        if (item?.movie_id == item1?.movie_id) {
          step = index1 - index;

          return true;
        } else {
          return false;
        }
      });

      const stepText = step >= 0 ? `+${step}` : `-${Math.abs(step)}`;

      return {
        ...item,
        step,
        stepText,
        new: !itemRank
        // disabled: formFilterRank.value.sortBy == 'all',
      };
    });

    if (rankCompared?.length == 0) {
      // return ranks?.prev_results.map((item: any, index: any) => {
      //   return {
      //     ...item,
      //     step: 0,
      //     stepText: 0,
      //     new: false,
      //   };
      // });
      return rankCompared;
    } else {
      return rankCompared;
    }
  }

  return [];
};

const getData = async () => {
  loading.value = true;
  nuxtLoadingIndicator.start();

  useAsyncData(`ranks/filter/${JSON.stringify(formFilterRank.value)}`, () =>
    filterRanks(formFilterRank.value)
  )
    // filterRanks(formFilterRank.value)
    .then((response) => {
      ranksData.value = compareRanks(response.data.value);
      pageSize.value = response.data.value?.page_size;
    })
    .catch((e) => {})
    .finally(() => {});

  useAsyncData(
    `ranks/filter/${JSON.stringify({
      ...formFilterRank.value,
      mediaType: 'movie'
    })}`,
    () => filterRanks({ ...formFilterRank.value, mediaType: 'movie' })
  )
    // filterRanks({ ...formFilterRank.value, mediaType: 'movie' })
    .then((response) => {
      ranksMovie.value = compareRanks(response.data.value);
    })
    .catch((e) => {})
    .finally(() => {});

  useAsyncData(
    `ranks/filter/${JSON.stringify({
      ...formFilterRank.value,
      mediaType: 'tv'
    })}`,
    () => filterRanks({ ...formFilterRank.value, mediaType: 'tv' })
  )
    // filterRanks({ ...formFilterRank.value, mediaType: 'tv' })
    .then((response) => {
      ranksTV.value = compareRanks(response.data.value);
    })
    .catch((e) => {})
    .finally(() => {});

  // Hoạt hình

  useAsyncData(
    `ranks/filter/${JSON.stringify({
      ...formFilterRank.value,
      genre: 16
    })}`,
    () => filterRanks({ ...formFilterRank.value, genre: 16 }),
    {
      // transform: (data: any) => {
      //   return compareRanks(data);
      // },
    }
  )
    // filterRanks({ ...formFilterRank.value, genre: 16 })
    .then((response) => {
      ranksAnimation.value = compareRanks(response.data.value);
    })
    .catch((e) => {})
    .finally(() => {});

  // Hành động

  useAsyncData(
    `ranks/filter/${JSON.stringify({
      ...formFilterRank.value,
      genre: 28
    })}`,
    () => filterRanks({ ...formFilterRank.value, genre: 28 }),
    {
      // transform: (data: any) => {
      //   return compareRanks(data);
      // },
    }
  )
    // filterRanks({ ...formFilterRank.value, genre: 28 })
    .then((response) => {
      ranksAction.value = compareRanks(response.data.value);
    })
    .catch((e) => {})
    .finally(() => {});

  // Kinh dị

  useAsyncData(
    `ranks/filter/${JSON.stringify({
      ...formFilterRank.value,
      genre: 27
    })}`,
    () => filterRanks({ ...formFilterRank.value, genre: 27 }),
    {
      // transform: (data: any) => {
      //   return compareRanks(data);
      // },
    }
  )
    // filterRanks({ ...formFilterRank.value, genre: 27 })
    .then((response) => {
      ranksHorror.value = compareRanks(response.data.value);
    })
    .catch((e) => {})
    .finally(() => {});

  // Drama

  useAsyncData(
    `ranks/filter/${JSON.stringify({
      ...formFilterRank.value,
      genre: 18
    })}`,
    () => filterRanks({ ...formFilterRank.value, genre: 18 }),
    {
      // transform: (data: any) => {
      //   return compareRanks(data);
      // },
    }
  )
    // filterRanks({ ...formFilterRank.value, genre: 18 })
    .then((response) => {
      ranksDrama.value = compareRanks(response.data.value);
    })
    .catch((e) => {})
    .finally(() => {});

  // Khoa học viễn tưởng

  useAsyncData(
    `ranks/filter/${JSON.stringify({
      ...formFilterRank.value,
      genre: 18
    })}`,
    () => filterRanks({ ...formFilterRank.value, genre: 18 }),
    {
      // transform: (data: any) => {
      //   return compareRanks(data);
      // },
    }
  )
    // filterRanks({ ...formFilterRank.value, genre: 18 })
    .then((response) => {
      ranksScienceFiction.value = compareRanks(response.data.value);
    })
    .catch((e) => {})
    .finally(() => {});

  // Âu Mỹ

  useAsyncData(
    `ranks/filter/${JSON.stringify({
      ...formFilterRank.value,
      country: 'en'
    })}`,
    () => filterRanks({ ...formFilterRank.value, country: 'en' }),
    {
      // transform: (data: any) => {
      //   return compareRanks(data);
      // },
    }
  )
    // filterRanks({ ...formFilterRank.value, country: 'en' })
    .then((response) => {
      ranksEN.value = compareRanks(response.data.value);
    })
    .catch((e) => {})
    .finally(() => {});

  // Trung Quốc

  useAsyncData(
    `ranks/filter/${JSON.stringify({
      ...formFilterRank.value,
      country: 'cn'
    })}`,
    () => filterRanks({ ...formFilterRank.value, country: 'cn' }),
    {
      // transform: (data: any) => {
      //   return compareRanks(data);
      // },
    }
  )
    // filterRanks({ ...formFilterRank.value, country: 'cn' })
    .then((response) => {
      ranksChina.value = compareRanks(response.data.value);
    })
    .catch((e) => {})
    .finally(() => {});

  // Nhật Bản

  useAsyncData(
    `ranks/filter/${JSON.stringify({
      ...formFilterRank.value,
      country: 'ja'
    })}`,
    () => filterRanks({ ...formFilterRank.value, country: 'ja' }),
    {
      // transform: (data: any) => {
      //   return compareRanks(data);
      // },
    }
  )
    // filterRanks({ ...formFilterRank.value, country: 'ja' })
    .then((response) => {
      ranksJapan.value = compareRanks(response.data.value);
    })
    .catch((e) => {})
    .finally(() => {});

  loading.value = false;
  nuxtLoadingIndicator.finish();
};

getData();

// loading.value = true;

// const { data: ranksDataCache, pending } = await useAsyncData(
//   `ranks/filter/${JSON.stringify(formFilterRank.value)}`,
//   () => filterRanks(formFilterRank.value),
//   {
//     lazy: true
//     // transform: (data: any) => {
//     //   totalPage.value = data?.total;
//     //   pageSize.value = data?.page_size;
//     //   loading.value = false;
//     //   return data.results;
//     // },
//     // server: false,
//   }
// );

// ranksData.value = compareRanks(ranksDataCache.value);
// pageSize.value = ranksDataCache.value?.page_size;

// loading.value = false;

// // Phim lẻ

// const { data: ranksMovieCache } = await useAsyncData(
//   `ranks/filter/${JSON.stringify({
//     ...formFilterRank.value,
//     mediaType: 'movie'
//   })}`,
//   () => filterRanks({ ...formFilterRank.value, mediaType: 'movie' }),
//   {
//     lazy: true
//     // transform: (data: any) => {
//     //   return compareRanks(data);
//     // },
//   }
// );

// ranksMovie.value = compareRanks(ranksMovieCache.value);

// // Phim bộ

// const { data: ranksTVCache } = await useAsyncData(
//   `ranks/filter/${JSON.stringify({
//     ...formFilterRank.value,
//     mediaType: 'tv'
//   })}`,
//   () => filterRanks({ ...formFilterRank.value, mediaType: 'tv' }),
//   {
//     lazy: true
//     // transform: (data: any) => {
//     //   return compareRanks(data);
//     // },
//   }
// );

// ranksTV.value = compareRanks(ranksTVCache.value);

// // Hoạt hình

// const { data: ranksAnimationCache } = await useAsyncData(
//   `ranks/filter/${JSON.stringify({
//     ...formFilterRank.value,
//     genre: 16
//   })}`,
//   () => filterRanks({ ...formFilterRank.value, genre: 16 }),
//   {
//     lazy: true
//     // transform: (data: any) => {
//     //   return compareRanks(data);
//     // },
//   }
// );

// ranksAnimation.value = compareRanks(ranksAnimationCache.value);

// // Hành động

// const { data: ranksActionCache } = await useAsyncData(
//   `ranks/filter/${JSON.stringify({
//     ...formFilterRank.value,
//     genre: 28
//   })}`,
//   () => filterRanks({ ...formFilterRank.value, genre: 28 }),
//   {
//     lazy: true
//     // transform: (data: any) => {
//     //   return compareRanks(data);
//     // },
//   }
// );

// ranksAction.value = compareRanks(ranksActionCache.value);

// // Kinh dị

// const { data: ranksHorrorCache } = await useAsyncData(
//   `ranks/filter/${JSON.stringify({
//     ...formFilterRank.value,
//     genre: 27
//   })}`,
//   () => filterRanks({ ...formFilterRank.value, genre: 27 }),
//   {
//     lazy: true
//     // transform: (data: any) => {
//     //   return compareRanks(data);
//     // },
//   }
// );

// ranksHorror.value = compareRanks(ranksHorrorCache.value);

// // Drama

// const { data: ranksDramaCache } = await useAsyncData(
//   `ranks/filter/${JSON.stringify({
//     ...formFilterRank.value,
//     genre: 18
//   })}`,
//   () => filterRanks({ ...formFilterRank.value, genre: 18 }),
//   {
//     lazy: true
//     // transform: (data: any) => {
//     //   return compareRanks(data);
//     // },
//   }
// );

// ranksDrama.value = compareRanks(ranksDramaCache.value);

// // Khoa học viễn tưởng

// const { data: ranksScienceFictionCache } = await useAsyncData(
//   `ranks/filter/${JSON.stringify({
//     ...formFilterRank.value,
//     genre: 18
//   })}`,
//   () => filterRanks({ ...formFilterRank.value, genre: 18 }),
//   {
//     lazy: true
//     // transform: (data: any) => {
//     //   return compareRanks(data);
//     // },
//   }
// );

// ranksScienceFiction.value = compareRanks(ranksScienceFictionCache.value);

// // Âu Mỹ

// const { data: ranksENCache } = await useAsyncData(
//   `ranks/filter/${JSON.stringify({
//     ...formFilterRank.value,
//     country: 'en'
//   })}`,
//   () => filterRanks({ ...formFilterRank.value, country: 'en' }),
//   {
//     lazy: true
//     // transform: (data: any) => {
//     //   return compareRanks(data);
//     // },
//   }
// );

// ranksEN.value = compareRanks(ranksENCache.value);

// // Trung Quốc

// const { data: ranksChinaCache } = await useAsyncData(
//   `ranks/filter/${JSON.stringify({
//     ...formFilterRank.value,
//     country: 'cn'
//   })}`,
//   () => filterRanks({ ...formFilterRank.value, country: 'cn' }),
//   {
//     lazy: true
//     // transform: (data: any) => {
//     //   return compareRanks(data);
//     // },
//   }
// );

// ranksChina.value = compareRanks(ranksChinaCache.value);

// // Nhật Bản

// const { data: ranksJapanCache } = await useAsyncData(
//   `ranks/filter/${JSON.stringify({
//     ...formFilterRank.value,
//     country: 'ja'
//   })}`,
//   () => filterRanks({ ...formFilterRank.value, country: 'ja' }),
//   {
//     lazy: true
//     // transform: (data: any) => {
//     //   return compareRanks(data);
//     // },
//   }
// );

// ranksJapan.value = compareRanks(ranksJapanCache.value);

watch(
  () => formFilterRank.value,
  () => {
    getData();
  }
);

const handleChangeType = (activeKey: any) => {
  router.push({
    query: {
      ...route.query,
      sort_by: activeKey
    }
  });
};
</script>

<style lang="scss" src="./RankPage.scss"></style>
<!-- <style lang="scss">
@import url('./RankPage.scss');
</style> -->

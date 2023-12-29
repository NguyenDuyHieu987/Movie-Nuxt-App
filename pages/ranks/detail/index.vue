<template>
  <div class="detail-rank padding-content">
    <div class="detail-rank-container center-page">
      <div class="detail-rank-header">
        <BackPage
          class="backTo-ranksPage"
          @onclick="
            navigateTo(
              router.options.history.state?.back
                ?.toLowerCase()
                .includes('/ranks/detail')
                ? '/ranks'
                : router.options.history.state?.back || '/ranks'
            )
          "
        >
          Quay lại
        </BackPage>

        <h2 class="detail-rank-title">{{ rankDetailTitle }}</h2>

        <div class="rank-sortBy">
          <a-select
            v-model:value="formFilterRank.sortBy"
            style="width: 170px"
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

      <div class="detail-rank-body">
        <div class="detail-rank-section-header">
          <div class="info">Thông tin</div>
          <div class="popular-level">Mức dộ phổ biến</div>
          <div class="tendency">Xu hướng</div>
        </div>

        <section class="detail-rank-section">
          <div
            v-for="(item, index) in rankDetailData"
            :key="index"
            :index="index"
            class="detail-rank-section-item"
          >
            <div class="info">
              <NuxtLink
                :to="{
                  path:
                    item?.media_type == 'tv'
                      ? `/info-tv/${
                          item?.movie_id
                        }${utils.convertPath.toPathInfo_Play(item?.name)}`
                      : `/info-movie/${
                          item?.movie_id
                        }${utils.convertPath.toPathInfo_Play(item?.name)}`
                }"
                class="info-wrapper"
              >
                <span class="rank-number">{{ index + 1 }}</span>
                <div class="movie-title">{{ item?.name }}</div>
              </NuxtLink>
            </div>

            <div class="popular-level">
              <div
                class="progress-level"
                :style="{ '--width-percent': item?.count / top1Count }"
              ></div>
              <div class="count">{{ item?.count }}</div>
            </div>

            <div class="tendency">
              <div
                v-show="$route.query?.sort_by != 'all'"
                class="tendency-icon"
              >
                <svg
                  v-if="item?.step > 0"
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.5rem"
                  height="1.5rem"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="m4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8l-8 8z"
                  />
                </svg>

                <svg
                  v-else-if="item?.step < 0"
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.5rem"
                  height="1.5rem"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="m20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8l8-8z"
                  />
                </svg>

                <svg
                  v-else-if="item?.step == 0 && !item?.new"
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.5rem"
                  height="1.5rem"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20 14H4v-4h16" />
                </svg>

                <span
                  v-else-if="item?.step == 0 && item?.new"
                  class="new"
                >
                  New
                </span>
              </div>

              <span
                v-if="item?.step != 0"
                class="step-number"
              >
                {{ item?.stepText }}
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BackPage } from '~/components/BackPage';
import { LoadingSpinner } from '~/components/Loading';
import { RankSection } from '~/components/RankSection';
import { filterRanks, getRankPlay } from '~/services/ranks';
import type { formfilterRank, rankSort, rankType } from '~/types';

const utils = useUtils();
const route = useRoute();
const router = useRouter();
const rankDetailData = ref<any[]>([]);
const pageRank = ref<number>(+route?.query?.page || 1);
const pageSize = ref<number>(100);
const loading = ref<boolean>(false);
const formFilterRank = computed<formfilterRank>(() => {
  return {
    type: route.query?.type || 'hot-play',
    mediaType: route.query?.media_type || 'all',
    sortBy: route.query?.sort_by || 'day',
    genre: route.query?.genre || '',
    country: route.query?.country || '',
    limit: 100
  };
});
const rankDetailTitle = computed<string>(
  () =>
    [
      { title: 'Top xem nhiều', value: 'hot-play' },
      { title: 'Top tìm kiếm nhiều', value: 'hot-search' },
      { title: 'Top đánh giá cao', value: 'high-rate' }
    ].find((item) => item.value == formFilterRank.value.type)?.title!
);
const top1Count = computed<number>(
  () => Math.max(...rankDetailData.value.map((item) => item?.count)) || 1
);
const nuxtLoadingIndicator = useLoadingIndicator();

useHead({
  title: 'Chi tiết bảng xếp hạng - ' + rankDetailTitle,
  htmlAttrs: { lang: 'vi' }
});

useSeoMeta({
  title: 'Chi tiết bảng xếp hạng - ' + rankDetailTitle,
  description: 'Chi tiết bảng xếp hạng',
  ogTitle: 'Chi tiết bảng xếp hạng - ' + rankDetailTitle,
  ogType: 'video.movie',
  // ogUrl: window.location.href,
  ogDescription: 'Chi tiết bảng xếp hạng',
  ogLocale: 'vi'
});

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

  await useAsyncData(
    `ranks/filter/${JSON.stringify(formFilterRank.value)}`,
    () => filterRanks(formFilterRank.value)
  )
    .then((response) => {
      rankDetailData.value = compareRanks(response.data.value);
      pageSize.value = response.data.value?.page_size;
    })
    .catch((e) => {})
    .finally(() => {});

  loading.value = false;
  nuxtLoadingIndicator.finish();
};

loading.value = true;

const { data: rankDetailDataCache, pending } = await useAsyncData(
  `ranks/filter/${JSON.stringify(formFilterRank.value)}`,
  () => filterRanks(formFilterRank.value),
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

rankDetailData.value = compareRanks(rankDetailDataCache.value);
pageSize.value = rankDetailDataCache.value?.page_size;

loading.value = false;

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

<style lang="scss" src="./DetailRank.scss"></style>

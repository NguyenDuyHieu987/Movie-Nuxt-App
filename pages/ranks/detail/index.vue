<template>
  <div class="detail-rank padding-content">
    <div class="detail-rank-container center-page">
      <div class="detail-rank-header">
        <BackPage
          class="backTo-ranksPage"
          align-left
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
                  path: `/info-${item.movieData?.media_type}/${item?.movie_id}`
                }"
                class="info-wrapper"
              >
                <span class="rank-number">{{ index + 1 }}</span>
                <div class="movie-title">{{ item.movieData?.name }}</div>
              </NuxtLink>
            </div>

            <div class="popular-level">
              <div
                class="progress-level"
                :style="{ '--width-percent': item?.count / top1Count }"
              ></div>
              <div class="count">{{ item?.count }}</div>
            </div>

            <div
              class="tendency"
              :class="{
                up: item?.step > 0,
                down: item?.step < 0,
                balance: item?.step == 0 && !item?.new,
                new: item?.step == 0 && item?.new
              }"
            >
              <div
                v-show="route.query?.sort_by != 'all'"
                class="tendency-icon"
              >
                <SvgoTendencyUp
                  v-if="item?.step > 0"
                  width="1.5rem"
                  height="1.5rem"
                  fill="currentColor"
                />

                <SvgoTendencyDown
                  v-else-if="item?.step < 0"
                  width="1.5rem"
                  height="1.5rem"
                  fill="currentColor"
                />

                <SvgoDash
                  v-else-if="item?.step == 0 && !item?.new"
                  width="1.5rem"
                  height="1.5rem"
                  fill="currentColor"
                />

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
// import SvgoTendencyUp from '~/assets/svgs/icons/tendency-up.svg?component';
// import SvgoTendencyDown from '~/assets/svgs/icons/tendency-down.svg?component';
// import SvgoDash from '~/assets/svgs/icons/dash.svg?component';

// import { BackPage } from '~/components/BackPage';
// import BackPage from '~/components/BackPage/BackPage.vue';
import { filterRanks } from '~/services/ranks';
import type { formfilterRank, rankSort, rankType } from '~/types';

definePageMeta({
  zoomOut: true
});

const utils = useUtils();
const route = useRoute();
const router = useRouter();
const rankDetailData = ref<any[]>([]);
const pageRank = ref<number>(+(route?.query?.page as string) || 1);
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
<!-- <style lang="scss">
@import url('./DetailRank.scss');
</style> -->

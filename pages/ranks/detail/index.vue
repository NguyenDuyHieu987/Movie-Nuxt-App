<template>
  <div class="detail-rank padding-content">
    <div class="detail-rank-container center-page">
      <div class="detail-rank-header">
        <h2 class="detail-rank-title">trh</h2>
      </div>

      <div class="detail-rank-body">
        <section class="detail-rank-section">{{ rankDetailData }}</section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LoadingSpinner } from '~/components/Loading';
import { RankSection } from '~/components/RankSection';
import { filterRanks, getRankPlay } from '~/services/ranks';
import type { formfilterRank, rankSort, rankType } from '~/types';

const route = useRoute();
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

      const step_text = step >= 0 ? `+${step}` : `-${Math.abs(step)}`;

      return {
        ...item,
        step,
        step_text,
        new: !itemRank
        // disabled: formFilterRank.value.sortBy == 'all',
      };
    });

    if (rankCompared?.length == 0) {
      // return ranks?.prev_results.map((item: any, index: any) => {
      //   return {
      //     ...item,
      //     step: 0,
      //     step_text: 0,
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

loading.value = true;

const { data: ranksDataCache, pending } = await useAsyncData(
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

rankDetailData.value = compareRanks(ranksDataCache.value);
pageSize.value = ranksDataCache.value?.page_size;

loading.value = false;
</script>

<style lang="scss" src="./DetailRank.scss"></style>

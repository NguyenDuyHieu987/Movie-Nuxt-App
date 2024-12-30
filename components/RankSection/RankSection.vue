<template>
  <section
    v-show="ranksData?.length"
    class="rank-section"
    :class="{ main: main }"
  >
    <div class="rank-section-header">
      <h3 class="rank-section-title">{{ rankSectionTitle }}</h3>
      <NuxtLink
        :to="viewAllPath"
        class="view-all click-active"
      >
        Chi tiết
      </NuxtLink>
    </div>

    <div class="rank-section-body">
      <div class="rank-body-list">
        <NuxtLink
          v-for="(item, index) in ranksData"
          :key="index"
          :index="index"
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
          class="rank-body-item"
          :style="
            main
              ? {
                  backgroundImage:
                    'url(' +
                    getImage(item?.backdrop_path, 'backdrop', { w: 1000 }) +
                    ')'
                }
              : {}
          "
        >
          <div class="rank-number">{{ index + 1 }}</div>

          <div class="info">{{ item?.name }}</div>

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
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// import SvgoTendencyUp from '~/assets/svgs/icons/tendency-up.svg?component';
// import SvgoTendencyDown from '~/assets/svgs/icons/tendency-down.svg?component';
// import SvgoDash from '~/assets/svgs/icons/dash.svg?component';

import { getImage } from '~/services/image';

const props = withDefaults(
  defineProps<{
    rankSectionTitle: string;
    ranksData: any;
    viewAllPath: string;
    main?: boolean;
  }>(),
  {
    ranksData: [],
    viewAllPath: '/ranks',
    main: false
  }
);

const utils = useUtils();
const route = useRoute();
const activeTab = ref<string>('day');

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
      };
    });

    return rankCompared;
  }

  return [];
};
</script>

<style lang="scss" src="./RankSection.scss"></style>
<!-- <style lang="scss">
@import url('./RankSection.scss');
</style> -->

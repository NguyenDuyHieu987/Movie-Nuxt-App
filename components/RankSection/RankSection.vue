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
                ? `/info-tv/${item?.movie_id}__${utils
                  .removeVietnameseTones(item?.name)
                  ?.replaceAll(/\s/g, '-')
                  .toLowerCase()}`
                : `/info-movie/${item?.movie_id}__${utils
                  .removeVietnameseTones(item?.name)
                  ?.replaceAll(/\s/g, '-')
                  .toLowerCase()}`
          }"
          class="rank-body-item"
          :style="
            main
              ? {
                backgroundImage:
                  'url(' + getImage(item?.backdrop_path, 'backdrop', 'w-1000') + ')'
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
              v-show="$route.query?.sort_by != 'all'"
              class="tendency-icon"
            >
              <svg
                v-if="item?.step > 0"
                xmlns="http://www.w3.org/2000/svg"
                width="1.5rem"
                height="1.5rem"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="m4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8l-8 8z"
                />
              </svg>

              <svg
                v-else-if="item?.step < 0"
                xmlns="http://www.w3.org/2000/svg"
                width="1.5rem"
                height="1.5rem"
                viewBox="0 0 24 24"
              >
                <path d="m20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8l8-8z" />
              </svg>

              <svg
                v-else-if="item?.step == 0 && !item?.new"
                xmlns="http://www.w3.org/2000/svg"
                width="1.5rem"
                height="1.5rem"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M20 14H4v-4h16"
                />
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
              {{ item?.step_text }}
            </span>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
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

      const step_text = step >= 0 ? `+${step}` : `-${Math.abs(step)}`;

      return {
        ...item,
        step,
        step_text,
        new: !itemRank
      };
    });

    return rankCompared;
  }

  return [];
};
</script>

<style lang="scss" src="./RankSection.scss"></style>

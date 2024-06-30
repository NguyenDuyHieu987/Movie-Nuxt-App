<template>
  <section class="filter-section">
    <a-collapse
      class="filter-collapse"
      :bordered="false"
    >
      <template #expandIcon="{ isActive }">
        <CaretRightFilled :rotate="isActive ? 90 : 0" />
      </template>

      <a-collapse-panel
        key="1"
        header="Tìm kiếm nâng cao"
        force-render
      >
        <div class="filter-body">
          <div class="filter-row">
            <div class="filter-label">Danh sách</div>
            <ul class="filter-options">
              <li
                v-for="(item, index) in listFilter"
                :key="item.value"
                class="filter-option"
                :index="index"
                :class="{
                  active: route.query?.type
                    ? item.value == route.query?.type
                    : item.value == 'all'
                }"
              >
                <NuxtLink
                  :to="{
                    query: { ...route.query, type: item.value }
                  }"
                >
                  {{ item?.name }}
                </NuxtLink>
              </li>
            </ul>
          </div>
          <div class="filter-row">
            <div class="filter-label">Sắp xếp</div>
            <ul class="filter-options">
              <li
                v-for="(item, index) in listSortBy"
                :key="item.id"
                class="filter-option"
                :index="index"
                :class="{
                  active: item.id == route.query?.sort_by
                }"
              >
                <NuxtLink
                  :to="{
                    query: {
                      ...route.query,
                      sort_by:
                        item.id != route.query?.sort_by ? item.id : undefined
                    }
                  }"
                >
                  {{ item?.name }}
                </NuxtLink>
              </li>
            </ul>
          </div>
          <div class="filter-row">
            <div class="filter-label">Thể loại</div>
            <Swiper
              class="filter-options"
              :modules="[
                SwiperFreeMode,
                SwiperNavigation

                // Navigation,
                // FreeMode
              ]"
              :speed="500"
              :slides-per-view="'auto'"
              :slides-per-group="5"
              :space-between="10"
              :free-mode="true"
              :navigation="{
                prevEl: '.swiper-button-prev',
                nextEl: '.swiper-button-next'
              }"
              :initial-slide="
                genres.findIndex((item1) => item1.id == route.query?.genre)
              "
            >
              <SwiperSlide
                v-for="(item, index) in genres"
                :key="item?.id"
                class="filter-option"
                :index="index"
                :class="{
                  active: item.id == route.query?.genre
                }"
              >
                <NuxtLink
                  :to="{
                    query: {
                      ...route.query,
                      genre: item.id != route.query?.genre ? item.id : undefined
                    }
                  }"
                >
                  {{ item?.name_vietsub }}
                </NuxtLink>
              </SwiperSlide>
              <div class="swiper-button-prev">
                <ChevronLeftLight
                  width="2.8rem"
                  height="2.8rem"
                  fill="currentColor"
                />
              </div>
              <div class="swiper-button-next">
                <ChevronRightLight
                  width="2.8rem"
                  height="2.8rem"
                  fill="currentColor"
                />
              </div>
            </Swiper>
          </div>
          <div class="filter-row">
            <div class="filter-label">Năm</div>
            <Swiper
              class="filter-options"
              :modules="[
                SwiperFreeMode,
                SwiperNavigation

                // Navigation,
                // FreeMode
              ]"
              :speed="500"
              :slides-per-view="'auto'"
              :slides-per-group="5"
              :space-between="10"
              :free-mode="true"
              :navigation="{
                prevEl: '.swiper-button-prev',
                nextEl: '.swiper-button-next'
              }"
              :initial-slide="
                years.findIndex((item1) => item1.name == route.query?.year)
              "
            >
              <SwiperSlide
                v-for="(item, index) in years"
                :key="item?.name"
                class="filter-option"
                :index="index"
                :class="{
                  active: item.name == route.query?.year
                }"
              >
                <NuxtLink
                  :to="{
                    query: {
                      ...route.query,
                      year:
                        item.name != route.query?.year ? item.name : undefined
                    }
                  }"
                >
                  {{ item?.name }}
                </NuxtLink>
              </SwiperSlide>
              <div class="swiper-button-prev">
                <ChevronLeftLight
                  width="2.8rem"
                  height="2.8rem"
                  fill="currentColor"
                />
              </div>
              <div class="swiper-button-next">
                <ChevronRightLight
                  width="2.8rem"
                  height="2.8rem"
                  fill="currentColor"
                />
              </div>
            </Swiper>
          </div>
          <div class="filter-row">
            <div class="filter-label">Quốc gia</div>
            <Swiper
              class="filter-options"
              :modules="[
                SwiperFreeMode,
                SwiperNavigation

                // Navigation,
                // FreeMode
              ]"
              :slides-per-group="5"
              :speed="500"
              :slides-per-view="'auto'"
              :space-between="10"
              :free-mode="true"
              :navigation="{
                prevEl: '.swiper-button-prev',
                nextEl: '.swiper-button-next'
              }"
              :initial-slide="
                countries.findIndex(
                  (item1) => item1.iso_639_1 == route.query?.country
                )
              "
            >
              <SwiperSlide
                v-for="(item, index) in countries"
                :key="item?.iso_639_1"
                class="filter-option"
                :index="index"
                :class="{
                  active: item.iso_639_1 == route.query?.country
                }"
              >
                <NuxtLink
                  :to="{
                    query: {
                      ...route.query,
                      country:
                        item.iso_639_1 != route.query?.country
                          ? item.iso_639_1
                          : undefined
                    }
                  }"
                >
                  {{ item?.name }}
                </NuxtLink>
              </SwiperSlide>
              <div class="swiper-button-prev">
                <ChevronLeftLight
                  width="3.5rem"
                  height="3.5rem"
                  fill="currentColor"
                />
              </div>
              <div class="swiper-button-next">
                <ChevronRightLight
                  width="3.5rem"
                  height="3.5rem"
                  fill="currentColor"
                />
              </div>
            </Swiper>
          </div>
        </div>
        <template #extra>
          <FilterAlt
            width="1.6rem"
            height="1.6rem"
            fill="currentColor"
          />
        </template>
      </a-collapse-panel>
    </a-collapse>
  </section>
</template>

<script setup lang="ts">
import { CaretRightFilled } from '@ant-design/icons-vue';
import ChevronLeftLight from '~/assets/svgs/icons/chevron-left-light.svg?component';
import ChevronRightLight from '~/assets/svgs/icons/chevron-right-light.svg?component';
import FilterAlt from '~/assets/svgs/icons/filter-alt.svg?component';

// import { FreeMode, Navigation } from 'swiper/modules';

import type { country, formfilter, genre, sortby, year } from '@/types';
import { getAllSortBy } from '~/services/sortby';

const props = defineProps<{
  listFilter: any[];
  cancelFilter: () => void;
}>();

const emits = defineEmits<{
  onFilter: [];
}>();

const store = useStore();
const route = useRoute();
const listFilter = ref<any[]>(props.listFilter);
const genres = ref<genre[]>(store.allGenres);
const years = ref<year[]>(store.allYears);
const countries = ref<country[]>(store.allCountries);
// const listSortBy = ref<sortby[]>([]);
const loadingData = defineModel<boolean>('loading', {
  default: false
});

const { data: listSortBy } = await useAsyncData(
  'sortby/all',
  () => getAllSortBy(),
  {
    transform: (data: any) => {
      return data.results;
    }
  }
);

const onFilter = () => {
  emits('onFilter');
};
</script>

<!-- <style lang="scss" src="./FilterSection.scss"></style> -->
<style lang="scss">
@import url('./FilterSection.scss');
</style>

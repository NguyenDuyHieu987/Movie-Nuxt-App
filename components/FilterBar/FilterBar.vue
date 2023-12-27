<template>
  <div class="filter-bar">
    <a-collapse
      class="filter-collapse"
      :bordered="false"
    >
      <!-- ghost -->
      <template #expandIcon="{ isActive }">
        <CaretRightFilled :rotate="isActive ? 90 : 0" />
      </template>

      <a-collapse-panel
        key="1"
        header="Tìm kiếm nâng cao"
        force-render
      >
        <div class="filter-body">
          <div class="list-input-filter">
            <a-button
              class="filter-btn click-active"
              type="text"
              :disabled="disableBtnFilter"
              @click="handleFilterMovie"
            >
              Lọc phim
            </a-button>
            <!-- <ClientOnly>
              <el-select
                ref="select"
                v-model="formSelect.country"
                style="width: 150px"
                @change="handleChange"
                size="large"
                placeholder="Quốc gia"
              >
                <el-option
                  v-for="(item, index) in countries"
                  :index="index"
                  :key="item?.iso_639_1"
                  :value="item?.iso_639_1"
                  :label="item?.name"
                />
              </el-select>
  
              <el-select
                ref="select"
                v-model="formSelect.year"
                style="width: 170px"
                @change="handleChange"
                size="large"
                placeholder="Năm phát hành"
              >
                <el-option
                  v-for="(item, index) in years"
                  :index="index"
                  :key="item?.name"
                  :value="item?.name"
                  :label="item?.name"
                />
              </el-select>
  
              <el-select
                ref="select"
                v-model="formSelect.genre"
                style="width: 170px"
                @change="handleChange"
                size="large"
                placeholder="Thể loại"
              >
                <el-option
                  v-for="(item, index) in genres"
                  :index="index"
                  :key="item?.id"
                  :value="item?.id"
                  :label="item?.name_vietsub"
                />
              </el-select>
  
              <el-select
                ref="select"
                v-model="formSelect.sortBy"
                style="width: 170px"
                @change="handleChange"
                size="large"
                placeholder="Sắp xếp theo"
              >
                <el-option
                  v-for="(item, index) in listSortBy"
                  :index="index"
                  :key="item?.id"
                  :value="item?.id"
                  :label="item?.name"
                />
              </el-select>
  
              <el-select
                ref="select"
                v-model="formSelect.type"
                style="width: 170px"
                @change="handleChange"
                size="large"
              >
                <el-option value="all" label="Tất cả" />
                <el-option value="movieall" label="Phim lẻ" />
                <el-option value="tvall" label="Phim bộ" />
              </el-select>
            </ClientOnly> -->

            <a-select
              ref="select"
              v-model:value="formSelect.country"
              style="width: 150px"
              size="large"
              placeholder="Quốc gia"
              @change="handleChange"
            >
              <a-select-option
                v-if="formSelect.country == ''"
                value=""
              >
                Quốc gia
              </a-select-option>

              <a-select-option
                v-for="(item, index) in countries"
                :key="item?.iso_639_1"
                :index="index"
                :value="item?.iso_639_1"
              >
                {{ item?.name }}
              </a-select-option>
            </a-select>

            <a-select
              ref="select"
              v-model:value="formSelect.year"
              style="width: 170px"
              size="large"
              placeholder="Năm phát hành"
              @change="handleChange"
            >
              <a-select-option
                v-if="formSelect.year == ''"
                value=""
              >
                Năm phát hành
              </a-select-option>
              <a-select-option
                v-for="(item, index) in years"
                :key="item?.name"
                :index="index"
                :value="item?.name"
              >
                {{ item?.name }}
              </a-select-option>
            </a-select>

            <a-select
              ref="select"
              v-model:value="formSelect.genre"
              style="width: 170px"
              size="large"
              placeholder="Thể loại"
              @change="handleChange"
            >
              <a-select-option
                v-if="formSelect.genre == ''"
                value=""
              >
                Thể loại
              </a-select-option>
              <a-select-option
                v-for="(item, index) in genres"
                :key="item?.id"
                :index="index"
                :value="item?.id"
              >
                {{ item?.name_vietsub }}
              </a-select-option>
            </a-select>

            <a-select
              ref="select"
              v-model:value="formSelect.sortBy"
              style="width: 170px"
              size="large"
              placeholder="Sắp xếp theo"
              @change="handleChange"
            >
              <a-select-option
                v-if="formSelect.sortBy == ''"
                value=""
              >
                Sắp xếp theo
              </a-select-option>
              <a-select-option
                v-for="(item, index) in listSortBy"
                :key="item?.id"
                :index="index"
                :value="item?.id"
              >
                {{ item?.name }}
              </a-select-option>
            </a-select>

            <a-select
              ref="select"
              v-model:value="formSelect.type"
              style="width: 170px"
              size="large"
              placeholder="Tất cả"
              @change="handleChange"
            >
              <a-select-option value="all"> Tất cả </a-select-option>
              <a-select-option value="movie"> Phim lẻ </a-select-option>
              <a-select-option value="tv"> Phim bộ </a-select-option>
            </a-select>

            <a-button
              class="cancel-filter-btn click-active"
              :disabled="disableBtnFilter"
              danger
              @click="handleCancelFilter"
            >
              Hủy lọc
            </a-button>
          </div>
        </div>
        <template #extra>
          <!-- <Icon name="ic:sharp-filter-alt" /> -->

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.6rem"
            height="1.6rem"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M3 4c2.01 2.59 7 9 7 9v7h4v-7s4.98-6.41 7-9H3z" />
          </svg>
        </template>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>

<script setup lang="ts">
import { CaretRightFilled } from '@ant-design/icons-vue';

import type { country, formfilter, genre, sortby, year } from '@/types';
import { getAllCountry } from '~/services/country';
import { FilterMovie } from '~/services/discover';
import { getAllGenre } from '~/services/genres';
import { getAllSortBy } from '~/services/sortby';
import { getAllYear } from '~/services/year';

const emits = defineEmits<{
  dataFiltered: [data: any[], formSelect: any];
}>();

const props = defineProps<{
  cancelFilter: () => void;
}>();

const store = useStore();
const route = useRoute();
const genres = ref<genre[]>(store.allGenres);
const years = ref<year[]>(store.allYears);
const countries = ref<country[]>(store.allCountries);
// const listSortBy = ref<sortby[]>([]);
const loadingData = defineModel<boolean>('loading', {
  default: false
});

const movieType = computed(() => {
  if (route.params?.slug?.includes('movie')) {
    if (route.params?.slug2?.replace('/', '') == 'all') {
      return 'movie';
    } else {
      return 'movie';
    }
  } else if (route.params?.slug?.includes('tv')) {
    if (route.params?.slug2?.replace('/', '') == 'all') {
      return 'tv';
    } else {
      return 'tv';
    }
  } else if (route.params?.slug == 'search') {
    return 'all';
  } else {
    return 'all';
  }
});

const formSelect = reactive<formfilter>({
  type: movieType.value,
  sortBy: '',
  genre: '',
  year: '',
  country: '',
  page: 1
});

watch(route, () => {
  resetFilter();
});

const getData = async () => {
  Promise.all([
    await useAsyncData(`genre/all`, () => getAllGenre()),
    await useAsyncData(`year/all`, () => getAllYear()),
    await useAsyncData(`country/all`, () => getAllCountry()),
    await useAsyncData(`sortby/all`, () => getAllSortBy())
  ])
    .then((response) => {
      genres.value = response[0].data.value?.results;
      years.value = response[1].data.value?.results.sort(
        (a: year, b: year): number => {
          return +b.name.slice(-4) - +a.name.slice(-4);
        }
      );
      countries.value = response[2].data.value?.results;
      listSortBy.value = response[3].data.value?.results;
    })
    .catch((e) => {});
};

// getData();

const { data: listSortBy } = await useAsyncData(
  'sortby/all',
  () => getAllSortBy(),
  {
    // default: () => {
    //   return { results: trendingsCache.value || [] };
    // },
    transform: (data: any) => {
      return data.results;
    }
  }
);

const disableBtnFilter = computed(
  () =>
    formSelect.type == movieType.value &&
    formSelect.sortBy == '' &&
    formSelect.genre == '' &&
    formSelect.year == '' &&
    formSelect.country == ''
);

const handleFilterMovie = async () => {
  loadingData.value = true;
  await useAsyncData(`discover/${formSelect}`, () => FilterMovie(formSelect))
    .then((movieResponse) => {
      emits('dataFiltered', movieResponse?.data.value.results, formSelect);
    })
    .catch((e) => {})
    .finally(() => {
      loadingData.value = false;
    });
};

const resetFilter = () => {
  formSelect.type = movieType.value;
  formSelect.sortBy = '';
  formSelect.genre = '';
  formSelect.year = '';
  formSelect.country = '';
};

const handleCancelFilter = () => {
  resetFilter();
  props.cancelFilter();
};

const handleChange = () => {
  // console.log(formSelect);
};
</script>

<style lang="scss" src="./FilterBar.scss"></style>

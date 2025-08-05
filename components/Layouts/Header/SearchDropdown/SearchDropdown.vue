<template>
  <div
    class="search-dropdown background-app-blur"
    :class="{ show: isFocusSearchInput }"
    @pointerdown.prevent="handleMouseDownSearchDropdown"
  >
    <div class="search-dropdown-container">
      <div class="search-dropdown-wrapper">
        <div
          v-if="dataSearch?.length && isShowSearchResults"
          class="search-results"
        >
          <div class="search-dropdown-header search-results">
            <div class="left">Kết quả tìm kiếm</div>
            <div class="right click-active">
              <NuxtLink
                class="view-all"
                :to="`/search?q=${valueInput
                  ?.replaceAll(' ', '+')
                  .toLowerCase()}`"
                @click="isFocusSearchInput = false"
              >
                Tất cả
                <SvgoChevronRight
                  width="1.2rem"
                  height="1.2rem"
                  fill="currentColor"
                />
              </NuxtLink>
            </div>
          </div>

          <div class="search-results-list">
            <div
              v-for="(item, index) in dataSearch"
              :key="index"
              :index="index"
              class="search-results-item"
              :class="{
                'searched-history': item?.type == 'history' && item?.query
              }"
              @click="(e) => handleClickSearchResultsItem(e, item)"
            >
              <div class="search-query-suggested">
                <span v-if="item?.type == 'history' && item?.query"
                  >{{ item?.query }}
                </span>
                <span v-else> {{ item?.name }}</span>
              </div>

              <span
                v-if="item?.type == 'history' && item?.query"
                class="remove-search-history"
                @click.prevent="
                  handleRemoveSearchHistoryInSearchResults(item?.id)
                "
              >
                Xóa
              </span>
            </div>
          </div>
        </div>

        <div
          v-if="
            authStore.isLogin &&
            store.dataSearchHistory?.length &&
            !isShowSearchResults
          "
          class="search-history"
        >
          <div class="search-dropdown-header history">
            <div class="left">Lịch sử tìm kiếm</div>
            <div
              class="right click-active"
              @click="handleClearSearchHistory"
            >
              Xóa lịch sử
            </div>
          </div>

          <div class="search-history-list">
            <div
              v-for="(item, index) in store.dataSearchHistory"
              :key="index"
              :index="index"
              class="search-history-item"
              :title="item?.query"
              @click="(e) => handleClickSearchHistoryItem(e, item)"
            >
              <p class="search-query">{{ item?.query }}</p>
              <SvgoXCircle
                class="remove-icon"
                width="1.4rem"
                height="1.4rem"
                fill="currentColor"
                @click="handleRemoveSearchHistory(item?.id)"
              />
            </div>
          </div>
        </div>

        <ClientOnly>
          <div
            v-if="
              !loadingTopSearch && dataTopSearch?.length && !isShowSearchResults
            "
            class="top-search"
          >
            <div class="search-dropdown-header top-search">
              <div class="left">Tìm kiếm phố biến</div>
              <div class="right click-active">
                <NuxtLink
                  class="view-all"
                  to="/ranks?type=hot-search"
                  @click="isFocusSearchInput = false"
                >
                  Tất cả
                  <ChevronRight
                    width="1.2rem"
                    height="1.2rem"
                    fill="currentColor"
                  />
                </NuxtLink>
              </div>
            </div>

            <div class="top-search-list">
              <div
                v-for="(item, index) in dataTopSearch"
                :key="index"
                :index="index"
                class="top-search-item"
                @click="(e) => handleClickTopSearchItem(e, item)"
              >
                <span
                  class="rank-top-search"
                  :style="{ '--rank-opacity': Math.abs(index - 10) / 10 }"
                >
                  {{ index + 1 }}
                </span>
                <p class="search-query">
                  {{ item.movieData?.name || item?.query }}
                </p>
              </div>
            </div>
          </div>
        </ClientOnly>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import SvgoChevronRight from '~/assets/svgs/icons/chevron-right.svg?component';
// import SvgoXCircle from '~/assets/svgs/icons/x-circle.svg?component';

import reject from 'lodash/reject';
import { addRankSearch } from '~/services/ranks';
import {
  addSearch,
  clearSearchHistory,
  removeSearchHistory
} from '~/services/search';

const props = withDefaults(
  defineProps<{
    loadingSearch: boolean;
    loadingTopSearch: boolean;
  }>(),
  {
    loadingSearch: false,
    loadingTopSearch: false
  }
);

const store = useStore();
const authStore = useAuthStore();
const route = useRoute();
const dataSearch = defineModel<any[]>('dataSearch');
const dataTopSearch = defineModel<any[]>('dataTopSearch');
const dataSearchHistory = defineModel<any[]>('dataSearchHistory');
const isShowSearchResults = defineModel<boolean>('isShowSearchResults', {
  default: false
});
const isFocusSearchInput = defineModel<boolean>('isFocusSearchInput', {
  default: false
});
const valueInput = defineModel<string>('valueInput', { default: '' });

const handleMouseDownSearchDropdown = (e: any) => {
  e.preventDefault();
};

const handleRemoveSearchHistory = async (id: string) => {
  await removeSearchHistory(id)
    .then((response) => {
      if (response?.success) {
        dataSearchHistory.value = reject(dataSearchHistory.value, (x) => {
          return x.id === id;
        });

        store.dataSearchHistory = reject(store.dataSearchHistory, (x) => {
          return x.id === id;
        });
      }
    })
    .catch((e) => {});
};

const handleRemoveSearchHistoryInSearchResults = async (id: string) => {
  await removeSearchHistory(id)
    .then((response) => {
      if (response?.success) {
        dataSearch.value = reject(dataSearch.value, (x) => {
          return x?.type == 'history' && x.id === id;
        });

        dataSearchHistory.value = reject(dataSearchHistory.value, (x) => {
          return x.id === id;
        });

        store.dataSearchHistory = reject(store.dataSearchHistory, (x) => {
          return x.id === id;
        });
      }
    })
    .catch((e) => {});
};

const handleClearSearchHistory = async () => {
  await clearSearchHistory()
    .then((response) => {
      if (response?.success) {
        dataSearchHistory.value = [];
        store.dataSearchHistory = [];
      }
    })
    .catch((e) => {});
};

const handleClickSearchResultsItem = async (e: any, item: any) => {
  if (e.target?.closest('.remove-search-history')) {
    e.preventDefault();
    return;
  }

  if (item?.type == 'history' && item?.query) {
    valueInput.value = item?.query;

    await navigateTo(
      `/search?q=${item?.query?.replaceAll(' ', '+').toLowerCase()}`
    );
  } else {
    addSearch({
      movie_id: item?.id,
      media_type: item?.media_type,
      query: item?.name
    })
      .then((response) => {
        if (response?.added) {
          // Do something
        }
      })
      .catch((e) => {});

    addRankSearch({
      movie_id: item?.id,
      media_type: item?.media_type,
      query: item?.name
    })
      .then((response) => {
        if (response?.success) {
          // Do something
        }
      })
      .catch((e) => {});

    valueInput.value = item?.name;

    await navigateTo(
      `/search?q=${item?.name?.replaceAll(' ', '+').toLowerCase()}`
    );
  }

  isFocusSearchInput.value = false;
};

const handleClickTopSearchItem = async (e: any, item: any) => {
  addSearch({
    movie_id: item?.movie_id,
    media_type: item.movieData?.media_type,
    query: item.movieData?.name
  })
    .then((response) => {
      if (response?.added) {
        // Do something
      }
    })
    .catch((e) => {});

  addRankSearch({
    movie_id: item?.movie_id,
    media_type: item.movieData?.media_type,
    query: item.movieData?.name
  })
    .then((response) => {
      if (response?.success) {
        // Do something
      }
    })
    .catch((e) => {});

  valueInput.value = item?.name;

  await navigateTo(
    `/search?q=${item?.name?.replaceAll(' ', '+').toLowerCase()}`
  );

  isFocusSearchInput.value = false;
};

const handleClickSearchHistoryItem = async (e: any, item: any) => {
  if (e.target?.closest('.search-history-item .remove-icon')) {
    e.preventDefault();
    return;
  }

  valueInput.value = item?.query;

  await navigateTo(
    `/search?q=${item?.query?.replaceAll(' ', '+').toLowerCase()}`
  );

  isFocusSearchInput.value = false;
};
</script>

<style lang="scss" src="./SearchDropdown.scss"></style>
<!-- <style lang="scss">
@import url('./SearchDropdown.scss');
</style> -->

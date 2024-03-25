<template>
  <div
    class="search-dropdown"
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.2rem"
                  height="1.2rem"
                  viewBox="0 0 320 512"
                  fill="currentColor"
                >
                  <path
                    d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256L73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
                  />
                </svg>
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

              <svg
                class="remove-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="1.4rem"
                height="1.4rem"
                viewBox="0 0 16 16"
                fill="currentColor"
                @click="handleRemoveSearchHistory(item?.id)"
              >
                <path
                  d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div
          v-if="dataTopSearch?.length && !isShowSearchResults"
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.2rem"
                  height="1.2rem"
                  viewBox="0 0 320 512"
                  fill="currentColor"
                >
                  <path
                    d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256L73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
                  />
                </svg>
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
              <p class="search-query">{{ item?.name || item?.query }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { addRankSearch } from '~/services/ranks';
import {
  addSearch,
  clearSearchHistory,
  removeSearchHistory
} from '~/services/search';

const props = withDefaults(
  defineProps<{
    loadingSearch: boolean;
  }>(),
  {
    loadingSearch: false
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
        dataSearchHistory.value = _lodash_Reject(
          dataSearchHistory.value,
          (x) => {
            return x.id === id;
          }
        );

        store.dataSearchHistory = _lodash_Reject(
          store.dataSearchHistory,
          (x) => {
            return x.id === id;
          }
        );
      }
    })
    .catch((e) => {});
};

const handleRemoveSearchHistoryInSearchResults = async (id: string) => {
  await removeSearchHistory(id)
    .then((response) => {
      if (response?.success) {
        dataSearch.value = _lodash_Reject(dataSearch.value, (x) => {
          return x?.type == 'history' && x.id === id;
        });

        dataSearchHistory.value = _lodash_Reject(
          dataSearchHistory.value,
          (x) => {
            return x.id === id;
          }
        );

        store.dataSearchHistory = _lodash_Reject(
          store.dataSearchHistory,
          (x) => {
            return x.id === id;
          }
        );
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

    navigateTo(`/search?q=${item?.query?.replaceAll(' ', '+').toLowerCase()}`);
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

    navigateTo(`/search?q=${item?.name?.replaceAll(' ', '+').toLowerCase()}`);
  }

  isFocusSearchInput.value = false;
};

const handleClickTopSearchItem = (e: any, item: any) => {
  addSearch({
    movie_id: item?.movie_id,
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
    movie_id: item?.movie_id,
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

  navigateTo(`/search?q=${item?.name?.replaceAll(' ', '+').toLowerCase()}`);

  isFocusSearchInput.value = false;
};

const handleClickSearchHistoryItem = (e: any, item: any) => {
  if (e.target?.closest('.search-history-item .remove-icon')) {
    e.preventDefault();
    return;
  }

  valueInput.value = item?.query;

  navigateTo(`/search?q=${item?.query?.replaceAll(' ', '+').toLowerCase()}`);

  isFocusSearchInput.value = false;
};
</script>

<style lang="scss" src="./SearchDropdown.scss"></style>
<!-- <style lang="scss">
@import url('./SearchDropdown.scss');
</style> -->

<template>
  <header
    class="header-bar"
    :class="{ scrolled: store.headerScrolled }"
  >
    <div class="left-header">
      <button
        class="menu-btn mobile"
        @click="store.setOpendrawer()"
      >
        <MenuOutlined />
      </button>

      <div class="logo">
        <NuxtLink :to="{ path: '/' }">
          <NuxtImg
            :src="getImage('logo.png', 'logo', 'w-45')"
            alt=""
            :height="30"
            :width="30"
          />
          <span> PhimHay247 </span>
        </NuxtLink>
      </div>
    </div>

    <div class="search-header-box">
      <a-input-search
        v-model:value="valueInput"
        class="search-header"
        placeholder="Nhập tên phim để tìm kiếm..."
        size="large"
        allow-clear
        bordered
        :loading="loadingSearch"
        @change="handleChangeInput(valueInput)"
        @search="handleSearch"
        @focus="handleFoucusSearchInput"
        @blur="handleBlurSearchInput"
      >
        <template #enterButton>
          <el-tooltip
            content="Tìm kiếm"
            effect="dark"
            placement="bottom"
            popper-class="popper-tooltip"
            :offset="22"
          >
            <svg
              class="fa-magnifying-glass"
              xmlns="http://www.w3.org/2000/svg"
              width="1.8rem"
              height="1.8rem"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M416 208c0 45.9-14.9 88.3-40 122.7l126.6 126.7c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0s208 93.1 208 208zM208 352a144 144 0 1 0 0-288a144 144 0 1 0 0 288z"
              />
            </svg>
          </el-tooltip>
        </template>
      </a-input-search>

      <SearchDropdown
        v-model:dataSearch="dataSearch"
        v-model:dataTopSearch="dataTopSearch"
        v-model:dataSearchHistory="dataSearchHistory"
        v-model:isShowSearchResults="isShowSearchResults"
        v-model:isFocusSearchInput="isFocusSearchInput"
        v-model:valueInput="valueInput"
      />
    </div>

    <div class="right-header">
      <el-skeleton
        :loading="loadingUser"
        animated
      >
        <template #template>
          <el-skeleton-item
            v-for="(item, index) in 2"
            :key="index"
            class="menu-item skeleton"
            variant="button"
            :index="index"
          />
        </template>

        <template #default>
          <ul class="menu-header">
            <li class="menu-item search-mobile">
              <SearchMobile
                v-model:valueInput="valueInput"
                v-model:loading="loadingSearch"
                @change="handleChangeInput(valueInput)"
                @search="handleSearch"
              />
            </li>

            <li
              v-if="isLogin"
              class="menu-item notification"
              :show-timeout="0"
              :hide-timeout="0"
            >
              <Notification />
            </li>

            <li class="menu-item account">
              <DropdownAccount />
            </li>

            <!-- <li v-else class="menu-item login-header">
              <NuxtLink to="/login">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="2.3rem"
                  height="2.3rem"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zM7.35 18.5C8.66 17.56 10.26 17 12 17s3.34.56 4.65 1.5c-1.31.94-2.91 1.5-4.65 1.5s-3.34-.56-4.65-1.5zm10.79-1.38a9.947 9.947 0 0 0-12.28 0A7.957 7.957 0 0 1 4 12c0-4.42 3.58-8 8-8s8 3.58 8 8c0 1.95-.7 3.73-1.86 5.12z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 6c-1.93 0-3.5 1.57-3.5 3.5S10.07 13 12 13s3.5-1.57 3.5-3.5S13.93 6 12 6zm0 5c-.83 0-1.5-.67-1.5-1.5S11.17 8 12 8s1.5.67 1.5 1.5S12.83 11 12 11z"
                  />
                </svg>
                <span> Đăng Nhập</span>
              </NuxtLink>
            </li> -->
          </ul>
        </template>
      </el-skeleton>
    </div>
  </header>
</template>

<script setup lang="ts">
import { MenuOutlined } from '@ant-design/icons-vue';
// import SearchCard from '~/components/SearchCard/SearchCard.vue';
import { storeToRefs } from 'pinia';
import DropdownAccount from './DropdownAcount/DropdownAcount.vue';
import Notification from './Notification/Notification.vue';
import SearchDropdown from './SearchDropdown/SearchDropdown.vue';
import SearchMobile from './SearchMobile/SearchMobile.vue';

import { getImage } from '~/services/image';
import {
  getDaTaSearch,
  getDaTaSearchHistory,
  getDaTaSearchInHistory,
  getDaTaTopSearch
} from '~/services/search';

const store = useStore();
const { isLogin, loadingUser } = storeToRefs<any>(store);
const router = useRouter();
const route = useRoute();
const dataSearch = ref<any[]>([]);
const dataTopSearch = ref<any[]>([]);
const dataSearchHistory = ref<any[]>([]);
const dataSearchInHistory = ref<any[]>([]);
const dataSearchInTopSearch = ref<any[]>([]);
const page = ref<number>(1);
const loadingSearch = ref<boolean>(false);
const loadingSearchHistory = ref<boolean>(false);
const loadingTopSearch = ref<boolean>(false);
const isShowSearchResults = ref<boolean>(false);
const isShowSearch = ref<boolean>(false);
const debounce = ref<any>();
const valueInput = ref<string>(route.query?.q);
const isFocusSearchInput = ref<boolean>(false);

const getData = async () => {
  if (store.isLogin) {
    await getDaTaSearchHistory(1, 10)
      .then((response) => {
        dataSearchHistory.value = response?.results;
        store.dataSearchHistory = response?.results;
      })
      .catch((e) => {})
      .finally(() => {
        loadingSearchHistory.value = false;
      });
  }

  await useAsyncData(`search/top-search/1/10`, () => getDaTaTopSearch(1, 10))
    .then((response) => {
      dataTopSearch.value = response.data.value?.results;
    })
    .catch((e) => {})
    .finally(() => {
      loadingTopSearch.value = false;
    });
};

getData();

onMounted(() => {
  isShowSearch.value = true;

  let lastScrollTop = 0;

  window.addEventListener('scroll', () => {
    const billboardItem: HTMLElement | null = document.querySelector(
      '.billboard-animation-container'
    );

    const st = window.scrollY || document.documentElement.scrollTop;

    if (route.meta.name?.includes('home')) {
      if (st > lastScrollTop) {
        // downscroll code
        if (window.scrollY >= billboardItem!?.offsetHeight) {
          store.headerScrolled = true;
        } else if (window.scrollY == 0) {
          store.headerScrolled = false;
        }
      } else if (st < lastScrollTop) {
        // upscroll code
        if (
          window.scrollY <= billboardItem!?.offsetHeight ||
          window.scrollY == 0
        ) {
          store.headerScrolled = false;
        }
      }
    } else {
      if (st > lastScrollTop) {
        // downscroll code
        if (window.scrollY >= 65) {
          store.headerScrolled = true;
        } else if (window.scrollY == 0) {
          store.headerScrolled = false;
        }
      } else if (st < lastScrollTop) {
        // upscroll code
        if (window.scrollY == 0) {
          store.headerScrolled = false;
        }
      }
    }

    lastScrollTop = st <= 0 ? 0 : st;
  });
});

watchEffect(() => {
  valueInput.value = route.query?.q;
});

const handleChangeInput = (query: string) => {
  if (query?.length > 0) {
    // loadingSearch.value = true;

    clearTimeout(debounce.value);
    debounce.value = setTimeout(async () => {
      if (store.isLogin) {
        await getDaTaSearchInHistory(query, 1, 10)
          .then((response) => {
            dataSearchInHistory.value = response?.results;
          })
          .catch((e) => {})
          .finally(() => {});
      }

      await useAsyncData(`search/all/${query}/${page.value}/10`, () =>
        getDaTaSearch(query, page.value, 10)
      )
        .then((response) => {
          // dataSearch.value = response.data.value?.results;

          dataSearch.value = [
            ...dataSearchInHistory.value,
            ...response.data.value!.results
          ];

          if (
            dataSearch.value.length > 0 &&
            document.activeElement &&
            isFocusSearchInput.value == false
          ) {
            isFocusSearchInput.value = true;
          }
        })
        .catch((e) => {})
        .finally(() => {
          loadingSearch.value = false;
          isShowSearchResults.value = true;
        });

      // navigateTo(
      //   `/search?q=${query?.replaceAll(' ', '+').toLowerCase()}`
      //   // query: { q: query?.replaceAll(' ', '+').toLowerCase() },
      // );
    }, 50);
    // }, 700);
  } else {
    clearTimeout(debounce.value);

    // navigateTo({ path: '/' });

    dataSearch.value = [];
    isShowSearchResults.value = false;
  }
};

const handleSearch = (value: string) => {
  if (value.length > 0) {
    navigateTo(
      `/search?q=${value?.replaceAll(' ', '+').toLowerCase()}`
      // query: { q: value?.replaceAll(' ', '+').toLowerCase() },
    );

    // valueInput.value = '';
    isFocusSearchInput.value = false;
  }
};

const handleFoucusSearchInput = async (e: any) => {
  isFocusSearchInput.value = true;

  if (valueInput.value?.length > 0 && dataSearch.value.length == 0) {
    // loadingSearch.value = true;

    await useAsyncData(`search/all/${valueInput.value}/${page.value}/10`, () =>
      getDaTaSearch(valueInput.value, page.value, 10)
    )
      .then((response) => {
        dataSearch.value = response.data.value?.results;
      })
      .catch((e) => {})
      .finally(() => {
        loadingSearch.value = false;
        isShowSearchResults.value = true;
      });
  }
};

const handleBlurSearchInput = (e: any) => {
  isFocusSearchInput.value = false;
};
</script>

<style lang="scss" src="./Header.scss"></style>

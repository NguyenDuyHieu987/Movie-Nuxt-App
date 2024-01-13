<template>
  <div class="history-page">
    <div v-if="!authStore.loadingUser">
      <div
        v-if="authStore.isLogin"
        class="history-container"
      >
        <div v-if="!loading">
          <TopicRow
            v-show="responsive"
            v-model:dataRow="dataHistory"
            v-model:valueInput="valueInput"
            :title="title"
            :total="total"
            :topicImage="topicImage"
            :loadingSearch="loadingSearch"
            :searchRow="searchHistoryEvent"
            :deleteAll="removeAllHistoryList"
          />

          <!-- :disabled="loading" -->
          <!-- <Teleport to="#topic-history-column-teleport"> -->
          <section id="topic-history-column-teleport">
            <TopicColumn
              v-model:dataColumn="dataHistory"
              v-model:valueInput="valueInput"
              :title="title"
              :total="total"
              :topicImage="topicImage"
              :loadingSearch="loadingSearch"
              :searchRow="searchHistoryEvent"
              :deleteAll="removeAllHistoryList"
            />
          </section>
          <!-- </Teleport> -->

          <section
            ref="historyContent"
            class="history-main-content"
          >
            <div class="padding-content horizontal">
              <h2 class="gradient-title-default underline">
                <span>Lịch sử xem</span>
              </h2>
            </div>

            <div
              class="nav-action padding-content horizontal"
              :style="{
                '--width': historyContent?.offsetWidth + 'px'
              }"
              :class="{ fixed: isFixedNavActiom }"
            >
              <SortTab @onChangeTab="handleChangeTab" />
            </div>

            <Transition name="slide-top">
              <TransitionGroup
                v-show="showData"
                tag="div"
                class="movie-history padding-content horizontal"
                :duration="0.5"
              >
                <!-- @beforeEnter="beforeEnter"
                @enter="enter"
                @beforeLeave="beforeLeave"
                @leave="leave" -->
                <MovieCardHorizontalHistory
                  v-for="(item, index) in dataHistory"
                  :key="item.id"
                  :index="index"
                  :item="item"
                  :prevItem="dataHistory[index - 1]"
                  :type="item?.media_type"
                  :getDataWhenRemoveHistory="getDataWhenRemoveHistory"
                />
              </TransitionGroup>
            </Transition>

            <div
              v-show="loadMore"
              class="skeleton-loadmore padding-content"
            >
              <el-skeleton
                v-for="index in 2"
                :key="index"
                :loading="true"
                animated
              >
                <template #template>
                  <div class="img-box">
                    <el-skeleton-item class="skeleton-img" />
                  </div>
                  <div class="content-skeleton">
                    <el-skeleton-item
                      variant="text"
                      style="width: 40%"
                    />
                    <el-skeleton-item
                      variant="text"
                      style="width: 20%"
                    />
                    <el-skeleton-item
                      variant="text"
                      style="width: 30%"
                    />
                    <div class="overview">
                      <el-skeleton-item variant="text" />
                      <el-skeleton-item
                        variant="text"
                        style="width: 50%"
                      />
                    </div>
                  </div>
                </template>
              </el-skeleton>
            </div>
          </section>
        </div>
      </div>

      <RequireAuth v-else />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBreakpoints } from '@vueuse/core';
import gsap from 'gsap';
import _ from 'lodash';
import { storeToRefs } from 'pinia';

import { MovieCardHorizontalHistory } from '~/components/MovieCardHorizontalHistory';
import { RequireAuth } from '~/components/RequireAuth';
import { SortTab } from '~/components/SortTab';
import { TopicColumn } from '~/components/TopicColumn';
import { TopicRow } from '~/components/TopicRow';
import { getHistory, searchHistory } from '~/services/history';

definePageMeta({
  // middleware: ['require-auth'],
});

const store = useStore();
const authStore = useAuthStore();
const utils = useUtils();
const { isLogin } = storeToRefs<any>(authStore);
const route = useRoute();
const valueInput = ref<string>('');
const debounce = ref<any>();
const total = ref<number>(0);
const skip = ref<number>(1);
const limit = ref<number>(20);
const dataHistory = ref<any[]>([]);
const loading = ref<boolean>(false);
const loadingSearch = ref<boolean>(false);
const isFixedNavActiom = ref<boolean>(false);
const loadMore = ref<boolean>(false);
const topicImage = ref<string>('topic1.jpg');
const historyContent = ref<HTMLElement>();
const title = ref<string>('Phim đã xem');
const activeTab = ref<string>('all');
const showData = ref<boolean>(true);

const nuxtLoadingIndicator = useLoadingIndicator();

const breakpoints = useBreakpoints({
  responsive: 1200
});

const responsive = breakpoints.smallerOrEqual('responsive');

useHead({
  title: 'Lịch sử xem',
  htmlAttrs: { lang: 'vi' }
});

useSeoMeta({
  title: 'Lịch sử xem',
  description: 'Lịch sử xem dõi của bạn',
  ogTitle: 'Lịch sử xem',
  ogType: 'video.movie',
  // ogUrl: window.location.href,
  ogDescription: 'Lịch sử xem dõi của bạn',
  ogLocale: 'vi'
});

onMounted(() => {
  const headerHeight = +getComputedStyle(document.documentElement)
    .getPropertyValue('--header-height')
    .replace('px', '');

  window.addEventListener('scroll', async () => {
    if (dataHistory.value?.length == 0) {
      return;
    }

    if (historyContent?.value) {
      if (window.scrollY >= historyContent.value.offsetTop + headerHeight) {
        isFixedNavActiom.value = true;
      } else {
        isFixedNavActiom.value = false;
      }
    }

    if (
      utils.isScrollBottom() &&
      total.value > limit.value &&
      dataHistory.value?.length < total.value
    ) {
      loadMore.value = true;
      // await useAsyncData(
      //   `history/get/${store.userAccount?.id}/${activeTab.value}/${skip.value}`,
      //   () => getHistory(activeTab.value, skip.value)
      // )
      await getHistory(activeTab.value, skip.value)
        .then((response) => {
          if (response?.results?.length > 0) {
            dataHistory.value = dataHistory.value.concat(response?.results);
            skip.value++;
          }
        })
        .catch((e) => {})
        .finally(() => {
          loadMore.value = false;
        });
    }
  });
});

const getData = async () => {
  // await useAsyncData(
  //   `history/get/${store.userAccount?.id}/${activeTab.value}/1`,
  //   () => getHistory(activeTab.value, 1)
  // )
  await getHistory(activeTab.value, 1)
    .then((response) => {
      if (response?.results?.length > 0) {
        dataHistory.value = response?.results;
        limit.value = response?.limit;
        total.value = response?.total;
        topicImage.value = dataHistory.value[0]?.backdrop_path;
        skip.value = 2;
      }

      // if (dataHistory.value?.length == 0) {
      //   useAsyncData(`image/color/${topicImage.value}`, () =>
      //     getColorImage(topicImage.value)
      //   )
      //     .then((colorResponse) => {
      //       const color = colorResponse?.color;
      //       setBackgroundColor(color);
      //     })
      //     .catch((e) => {
      //     });
      // }
    })
    .catch((e) => {})
    .finally(async () => {
      loading.value = false;

      await wait(300);
      showData.value = true;
    });
};

loading.value = true;

showData.value = false;

getData();

const getDataWhenRemoveHistory = (data: number) => {
  // dataHistory.value = data;
  dataHistory.value = _.reject(dataHistory.value, (x) => {
    return x.movie_id === data;
  });
  total.value = dataHistory.value?.length;
  topicImage.value = dataHistory.value[0]?.backdrop_path;
};

const removeAllHistoryList = () => {
  if (total.value > 0) {
    utils.conrfirmMessageModal({
      title: 'Thông Báo',
      message: 'Bạn có muốn xóa toàn bộ Lịch sử xem không?',
      onOk: async function () {
        if (await utils.handleRemoveAllitemFromHistory()) {
          dataHistory.value = [];
        }
      },
      onCancel() {}
    });
  }
};

const searchHistoryEvent = (e: any) => {
  if (e.target.value.length > 0) {
    loadingSearch.value = true;
    nuxtLoadingIndicator.start();

    clearTimeout(debounce.value);

    debounce.value = setTimeout(async () => {
      //  await useAsyncData(
      //     `history/search/${store.userAccount?.id}/${activeTab.value}/${e.target.value}`,
      //     () => searchHistory(e.target.value, activeTab.value)
      //   )
      await searchHistory(e.target.value, activeTab.value)
        .then((response) => {
          dataHistory.value = response?.results;
        })
        .catch((e) => {})
        .finally(() => {
          loadingSearch.value = false;
          nuxtLoadingIndicator.finish();
        });
    }, 500);
  } else if (e.target.value.length == 0) {
    getData();
  }
};

const handleChangeTab = async (value: string) => {
  activeTab.value = value;
  nuxtLoadingIndicator.start();
  valueInput.value = '';

  // window.scrollTo({
  //   top: 0,
  //   left: 0,
  //   behavior: 'instant',
  // });

  showData.value = false;

  await wait(300);

  switch (value) {
    case 'all':
      // await useAsyncData(
      //   `history/get/${store.userAccount?.id}/${activeTab.value}/1`,
      //   () => getHistory(activeTab.value, 1)
      // )
      await getHistory(activeTab.value, 1)
        .then((response) => {
          dataHistory.value = response?.results;
          total.value = response?.total;

          if (response?.results?.length > 0) {
            topicImage.value = dataHistory.value[0]?.backdrop_path;
            skip.value = 2;
          }
        })
        .catch((e) => {})
        .finally(() => {
          nuxtLoadingIndicator.finish();
        });
      break;
    case 'movie':
      // await useAsyncData(
      //   `history/get/${store.userAccount?.id}/${activeTab.value}/1`,
      //   () => getHistory(activeTab.value, 1)
      // )
      await getHistory(activeTab.value, 1)
        .then((response) => {
          dataHistory.value = response?.results;
          total.value = response?.total;

          if (response?.results?.length > 0) {
            topicImage.value = dataHistory.value[0]?.backdrop_path;
            skip.value = 2;
          }
        })
        .catch((e) => {})
        .finally(() => {
          nuxtLoadingIndicator.finish();
        });
      break;
    case 'tv':
      // await useAsyncData(
      //   `history/get/${store.userAccount?.id}/${activeTab.value}/1`,
      //   () => getHistory(activeTab.value, 1)
      // )
      await getHistory(activeTab.value, 1)
        .then((response) => {
          dataHistory.value = response?.results;
          total.value = response?.total;

          if (response?.results?.length > 0) {
            topicImage.value = dataHistory.value[0]?.backdrop_path;
            skip.value = 2;
          }
        })
        .catch((e) => {})
        .finally(() => {
          nuxtLoadingIndicator.finish();
        });
      break;
  }

  showData.value = true;
};

const beforeEnter = (el: any) => {
  el.style.display = 'none';
};

const enter = (el: any, done: () => void) => {
  gsap.to(el, {
    display: 'flex',
    delay: 0.3,
    duration: 0,
    onComplete: done
  });
};

const beforeLeave = (el: any) => {
  if (!showData.value) {
    el.style.display = 'none';
    return;
  }

  el.style.transform = 'translateX(0)';
  el.style.opacity = '1';
};

const leave = (el: any, done: () => void) => {
  if (!showData.value) {
    gsap.to(el, {
      display: 'none',
      duration: 0,
      onComplete: done
    });
    return;
  }

  gsap.to(el, {
    x: '100%',
    opacity: 0,
    duration: 0.3,
    onComplete: done
  });
};
</script>

<style lang="scss" src="./HistoryPage.scss"></style>

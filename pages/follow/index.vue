<template>
  <div class="follow-page">
    <div v-if="!authStore.loadingUser">
      <div
        v-if="authStore.isLogin"
        class="follow-container"
      >
        <div v-if="!loading">
          <TopicRow
            v-show="responsive"
            v-model:dataRow="dataList"
            v-model:valueInput="valueInput"
            :title="title"
            :total="total"
            :topicImage="topicImage"
            :loadingSearch="loadingSearch"
            :searchRow="searchFollow"
            :deleteAll="removeAllFollowList"
          />

          <!-- :disabled="loading" -->
          <!-- <Teleport to="#topic-follow-column-teleport"> -->
          <section id="topic-follow-column-teleport">
            <TopicColumn
              v-model:dataColumn="dataList"
              v-model:valueInput="valueInput"
              :title="title"
              :total="total"
              :topicImage="topicImage"
              :loadingSearch="loadingSearch"
              :searchRow="searchFollow"
              :deleteAll="removeAllFollowList"
            />
          </section>
          <!-- </Teleport> -->

          <section
            ref="followContent"
            class="follow-main-content"
          >
            <div class="padding-content horizontal">
              <h2 class="gradient-title-default underline">
                <span>Danh sách phát</span>
              </h2>
            </div>

            <div
              class="nav-action padding-content horizontal"
              :style="{
                '--width': followContent?.offsetWidth + 'px'
              }"
              :class="{ fixed: isFixedNavActiom }"
            >
              <SortTab @onChangeTab="handleChangeTab" />
            </div>

            <Transition name="slide-bottom">
              <TransitionGroup
                v-show="showData"
                tag="div"
                class="movie-follow padding-content horizontal"
                :duration="0.3"
              >
                <!-- @beforeEnter="beforeEnter"
                @enter="enter"
                @beforeLeave="beforeLeave"
                @leave="leave" -->
                <MovieCardHorizontalFollow
                  v-for="(item, index) in dataList"
                  :key="item.id"
                  :index="index"
                  :item="item"
                  :type="item?.media_type"
                  :getDataWhenRemoveList="getDataWhenRemoveList"
                />
              </TransitionGroup>
            </Transition>

            <div
              v-show="loadMore"
              class="skeleton-loadmore"
            >
              <el-skeleton
                v-for="index in 2"
                :key="index"
                :loading="true"
                animated
              >
                <template #template>
                  <p class="index-item">{{ dataList?.length + index }}</p>
                  <div class="item-skeleton">
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

// import scrollBottom from 'scroll-bottom';
import { MovieCardHorizontalFollow } from '~/components/MovieCardHorizontalFollow';
import { RequireAuth } from '~/components/RequireAuth';
import { SortTab } from '~/components/SortTab';
import { TopicColumn } from '~/components/TopicColumn';
import { TopicRow } from '~/components/TopicRow';
import { getList, searchList } from '~/services/list';

definePageMeta({
  middleware: ['require-auth']
});

const store = useStore();
const authStore = useAuthStore();
const utils = useUtils();
const { isLogin } = storeToRefs<any>(authStore);
const route = useRoute();
const dataList = ref<any[]>([]);
const valueInput = ref<string>('');
const debounce = ref<any>();
const total = ref<number>(0);
const skip = ref<number>(1);
const limit = ref<number>(20);
const loading = ref<boolean>(false);
const loadingSearch = ref<boolean>(false);
const isFixedNavActiom = ref<boolean>(false);
const loadMore = ref<boolean>(false);
const topicImage = ref<string>('topic1.jpg');
const followContent = ref();
const title = ref<string>('Phim đã thêm vào danh sách phát');
const activeTab = ref<string>('all');
const showData = ref<boolean>(true);

const breakpoints = useBreakpoints({
  responsive: 1200
});

const responsive = breakpoints.smallerOrEqual('responsive');

const nuxtLoadingIndicator = useLoadingIndicator();

useHead({
  title: 'Danh sách theo dõi',
  htmlAttrs: { lang: 'vi' }
});

useSeoMeta({
  title: 'Danh sách theo dõi',
  description: 'Danh sách theo dõi của bạn',
  ogTitle: 'Danh sách theo dõi',
  ogType: 'video.movie',
  // ogUrl: window.location.href,
  ogDescription: 'Danh sách theo dõi của bạn',
  ogLocale: 'vi'
});

onMounted(() => {
  const headerHeight = +getComputedStyle(document.documentElement)
    .getPropertyValue('--header-height')
    .replace('px', '');

  window.addEventListener('scroll', async () => {
    if (dataList.value?.length == 0) {
      return;
    }

    if (followContent?.value) {
      if (window.scrollY >= followContent.value.offsetTop + headerHeight) {
        isFixedNavActiom.value = true;
      } else {
        isFixedNavActiom.value = false;
      }
    }

    const scrollHeight = Math.round(window.scrollY + window.innerHeight);

    if (
      scrollHeight == document.documentElement.scrollHeight &&
      // Math.floor(scrollBottom()) == 0 &&
      total.value > limit.value &&
      dataList.value?.length < total.value
    ) {
      loadMore.value = true;
      // await useAsyncData(
      //   `list/get/${store.userAccount?.id}/${activeTab.value}/${skip.value}`,
      //   () => getList(activeTab.value, skip.value)
      // )
      await getList(activeTab.value, skip.value)
        .then((response) => {
          if (response?.results?.length > 0) {
            dataList.value = dataList.value.concat(response?.results);
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
  //   `list/get/${store.userAccount?.id}/${activeTab.value}/1`,
  //   () => getList(activeTab.value, 1)
  // )
  await getList(activeTab.value, 1)
    .then((response) => {
      if (response?.results?.length > 0) {
        dataList.value = response?.results;
        limit.value = response?.limit;
        total.value = response?.total;
        topicImage.value = dataList.value[0]?.backdrop_path;
        skip.value++;
      }

      // if (dataList.value?.length == 0) {
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
    .finally(() => {
      loading.value = false;
    });
};

// onBeforeMount(async () => {
//   if (store.isLogin) {
//     await nextTick();

//     getData();
//   }
// });

loading.value = true;

getData();

const getDataWhenRemoveList = (data: number) => {
  // dataList.value = data;
  dataList.value = _.reject(dataList.value, (x) => {
    return x.movie_id === data;
  });
  total.value = dataList.value?.length;
  topicImage.value = dataList.value[0]?.backdrop_path;
};

const removeAllFollowList = () => {
  if (total.value > 0) {
    utils.conrfirmMessageModal({
      title: 'Thông Báo',
      message: 'Bạn có muốn xóa toàn bộ Danh sách phát không?',
      onOk: async function () {
        if (await utils.handleRemoveAllitemFromList()) {
          dataList.value = [];
        }
      },
      onCancel() {}
    });
  }
};

const searchFollow = (e: any) => {
  if (e.target.value.length > 0) {
    loadingSearch.value = true;
    nuxtLoadingIndicator.start();

    clearTimeout(debounce.value);

    debounce.value = setTimeout(async () => {
      // await useAsyncData(
      //   `list/search/${store.userAccount?.id}/${activeTab.value}/${e.target.value}`,
      //   () => searchList(e.target.value, activeTab.value)
      // )
      await searchList(e.target.value, activeTab.value)
        .then((response) => {
          dataList.value = response?.results;
        })
        .catch((e) => {
          loadingSearch.value = false;
        })
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

  setTimeout(() => {
    showData.value = true;
  }, 300);

  switch (value) {
    case 'all':
      // await useAsyncData(
      //   `list/get/${store.userAccount?.id}/${activeTab.value}/1`,
      //   () => getList(activeTab.value, 1)
      // )
      await getList(activeTab.value, 1)
        .then((response) => {
          dataList.value = response?.results;
          // title.value = 'Phim đã thêm vào danh sách phát';
          total.value = response?.total;

          if (response?.results?.length > 0) {
            topicImage.value = dataList.value[0]?.backdrop_path;
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
      //   `list/get/${store.userAccount?.id}/${activeTab.value}/1`,
      //   () => getList(activeTab.value, 1)
      // )
      await getList(activeTab.value, 1)
        .then((response) => {
          dataList.value = response?.results;
          // title.value = 'Phim lẻ';
          total.value = response?.total;

          if (response?.results?.length > 0) {
            topicImage.value = dataList.value[0]?.backdrop_path;
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
      //   `list/get/${store.userAccount?.id}/${activeTab.value}/1`,
      //   () => getList(activeTab.value, 1)
      // )
      await getList(activeTab.value, 1)
        .then((response) => {
          dataList.value = response?.results;
          // title.value = 'Phim bộ';
          total.value = response?.total;

          if (response?.results?.length > 0) {
            topicImage.value = dataList.value[0]?.backdrop_path;
            skip.value = 2;
          }
        })
        .catch((e) => {})
        .finally(() => {
          nuxtLoadingIndicator.finish();
        });
      break;
  }
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

<style lang="scss" src="./FollowPage.scss"></style>

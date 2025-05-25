<template>
  <section class="suggested">
    <div class="suggested-container">
      <h2 class="suggested-title title-default">
        <span>Có thể bạn muốn xem</span>
      </h2>
      <!-- <h2 class="suggested-title">
        <span>Có thể bạn muốn xem</span>
      </h2> -->

      <el-skeleton
        class="movie-group-suggested-skeleton"
        :loading="loading"
        animated
      >
        <template #template>
          <div
            v-for="(item, index) in 5"
            :key="index"
            class="movie-card-item-suggested"
            :index="index"
            :item="item"
          >
            <div class="img-box">
              <el-skeleton-item class="skeleton-img ratio-16-9" />
            </div>
            <div class="content-skeleton">
              <el-skeleton-item
                variant="text"
                style="width: 50%"
              />
              <el-skeleton-item
                variant="text"
                style="width: 65%"
              />
              <el-skeleton-item variant="text" />
            </div>
          </div>
        </template>

        <template #default>
          <div class="suggested-list">
            <MovieCardSuggested
              v-for="(item, index) in dataSuggested"
              :key="index"
              :index="index"
              :item="item"
              :type="item.media_type"
            />
          </div>

          <div
            v-show="loadMore"
            class="loading-suggested"
          >
            <LoadingSpinner :width="35" />
          </div>
        </template>
      </el-skeleton>
    </div>
  </section>
</template>

<script setup lang="ts">
// import { LoadingSpinner } from '~/components/Loading';
// import LoadingSpinner from '~/components/Loading/LoadingSpinner/LoadingSpinner.vue';
// import { MovieCardSuggested } from '~/components/MovieSuggested';
import { getSimilar } from '~/services/similar';

const props = withDefaults(
  defineProps<{
    dataMovie: any;
    windowScroll?: boolean;
  }>(),
  {
    windowScroll: false
  }
);

const utils = useUtils();
// const dataSuggested = ref<any[]>([]);
const page = ref<number>(1);
const loading = ref<boolean>(false);
const loadMore = ref<boolean>(false);

// watch(
//   () => props.dataMovie,
//   (newVal, oldVal) => {
//     if (newVal) {
//       loading.value = true;

//       getSimilar(
//         // props?.dataMovie?.media_type,
//         'all',
//         props?.dataMovie?.id,
//         page.value,
//         15
//       )
//         .then((response) => {
//           dataSuggested.value = response?.results;
//           page.value = 2;
//         })
//         .catch((e) => {})
//         .finally(() => {
//           loading.value = false;
//         });
//     }
//   },
//   { immediate: true }
// );

// const { data: dataSuggested } = await useAsyncData(
//   `similar/${props?.dataMovie?.media_type}/${props?.dataMovie?.id}/${page.value}`,
//   () =>
//     getSimilar(
//       props?.dataMovie?.media_type,
//       props?.dataMovie?.id,
//       page.value,
//       15
//     ),
//   {
//     // lazy: true,
//     // immediate: false,
//     // server: false,
//     transform: (data: any) => {
//       return data.results;
//     },
//   }
// );

loading.value = true;

const {
  data: dataSuggested,
  refresh,
  pending
} = await useAsyncData(
  `similar/all/${props?.dataMovie?.id}/${page.value}`,
  async () => {
    if (!props.dataMovie?.id) return { results: [] };

    return getSimilar('all', props.dataMovie?.id, page.value, 15);
  },
  {
    watch: [() => props.dataMovie],
    immediate: true
  }
);
page.value++;
loading.value = false;

onMounted(() => {
  if (props.windowScroll) {
    window.onscroll = async () => {
      if (dataSuggested.value?.length == 0) {
        return;
      }

      if (utils.isWindowScrollBottom()) {
        handleLoadmoreData();
      }
    };
  } else {
    const sideView = $('.play-container .side-view');

    // window.onscroll = async () => {
    sideView.on('scroll', async function () {
      if (dataSuggested.value?.length == 0) {
        return;
      }

      if (utils.isElementScrollBottom(sideView[0])) {
        handleLoadmoreData();
      }
    });
  }
});

const handleLoadmoreData = async () => {
  loadMore.value = true;
  await refresh();
  page.value++;
  loadMore.value = false;

  // await getSimilar(
  //   // props?.dataMovie?.media_type,
  //   'all',
  //   props?.dataMovie?.id,
  //   page.value,
  //   15
  // )
  //   .then((response) => {
  //     if (response?.results.length > 0) {
  //       dataSuggested.value = dataSuggested.value.concat(response?.results);
  //       page.value++;
  //     }
  //   })
  //   .catch((e) => {})
  //   .finally(() => {
  //     loadMore.value = false;
  //   });
};
</script>

<!-- <style lang="scss" src="./MovieSuggested.scss"></style> -->
<style lang="scss">
@import url('./MovieSuggested.scss');
</style>

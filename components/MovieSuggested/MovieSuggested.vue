<template>
  <section class="suggested">
    <div class="suggested-container">
      <h2 class="suggested-title title-default">
        <span>Có thể bạn muốn xem</span>
      </h2>

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
import LoadingSpinner from '~/components/LoadingSpinner/LoadingSpinner.vue';
import MovieCardSuggested from '~/components/MovieCardSuggested/MovieCardSuggested.vue';
import { getSimilar } from '~/services/similar';
import { getTrending } from '~/services/trending';

const props = defineProps<{
  dataMovie: any;
}>();

const dataSuggested = ref<any[]>([]);
const page = ref<number>(1);
const loading = ref<boolean>(false);
const loadMore = ref<boolean>(false);

onMounted(() => {
  window.onscroll = async () => {
    if (dataSuggested.value?.length == 0) {
      return;
    }

    const scrollHeight = Math.round(window.scrollY + window.innerHeight);

    if (scrollHeight == document.documentElement.scrollHeight) {
      loadMore.value = true;

      await getSimilar(
        props?.dataMovie.media_type,
        props?.dataMovie.id,
        page.value,
        15
      )
        .then((response) => {
          if (response?.results.length > 0) {
            dataSuggested.value = dataSuggested.value.concat(response?.results);
            page.value++;
          }
        })
        .catch((e) => {})
        .finally(() => {
          loadMore.value = false;
        });
    }
  };
});

loading.value = true;

getSimilar(props?.dataMovie.media_type, props?.dataMovie.id, page.value, 15)
  .then((response) => {
    dataSuggested.value = response?.results;
    page.value = 2;
  })
  .catch((e) => {})
  .finally(() => {
    loading.value = false;
  });

// const { data: dataSuggested } = await useAsyncData(
//   `similar/${props?.dataMovie.media_type}/${props?.dataMovie.id}/${page.value}`,
//   () =>
//     getSimilar(
//       props?.dataMovie.media_type,
//       props?.dataMovie.id,
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

// loading.value = false;
</script>

<style lang="scss" src="./MovieSuggested.scss"></style>

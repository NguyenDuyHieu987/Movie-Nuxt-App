<template>
  <div class="movie-related">
    <div class="similar-section">
      <h2
        v-show="loadingSimilar || dataSimilar?.length"
        class="gradient-title-default"
      >
        <span>Phim tương tự</span>
      </h2>

      <el-skeleton
        class="movie-group-related-skeleton"
        :loading="loadingSimilar"
        animated
      >
        <template #template>
          <div
            v-for="(item, index) in 10"
            :key="index"
            class="movie-card-item-related"
            :index="index"
            :item="item"
          >
            <div class="img-box ratio-16-9">
              <el-skeleton-item class="skeleton-img" />
            </div>
            <div class="content-skeleton">
              <div class="top">
                <div class="left">
                  <el-skeleton-item
                    variant="text"
                    style="width: 70%"
                  />
                  <el-skeleton-item
                    variant="text"
                    style="width: 100%"
                  />
                </div>
                <el-skeleton-item class="circle" />
              </div>

              <div class="bottom">
                <el-skeleton-item variant="text" />
                <el-skeleton-item variant="text" />
                <el-skeleton-item variant="text" />
                <el-skeleton-item variant="text" />
                <el-skeleton-item variant="text" />
              </div>
            </div>
          </div>
        </template>

        <template #default>
          <div
            class="movie-group related"
            :class="{ expand: viewMore }"
          >
            <MovieCardRelated
              v-for="(item, index) in dataSimilar"
              :key="item.id"
              :index="index"
              :item="item"
              :type="item.media_type"
            />
          </div>
          <ViewMoreBar
            v-show="dataSimilar?.length"
            :is-open="viewMore"
            @on-click="viewMore = !viewMore"
          />
        </template>
      </el-skeleton>
    </div>

    <div class="recommend-section">
      <h2
        v-show="loadingSimilar || dataRecommend?.length"
        class="gradient-title-default"
      >
        <span>Có thể bạn quan tâm</span>
      </h2>

      <el-skeleton
        class="movie-group-related-skeleton"
        :loading="loadingRecommend"
        animated
      >
        <template #template>
          <div
            v-for="(item, index) in 10"
            :key="index"
            class="movie-card-item-related"
            :index="index"
            :item="item"
          >
            <div class="img-box ratio-16-9">
              <el-skeleton-item class="skeleton-img" />
            </div>
            <div class="content-skeleton">
              <div class="top">
                <div class="left">
                  <el-skeleton-item
                    variant="text"
                    style="width: 70%"
                  />
                  <el-skeleton-item
                    variant="text"
                    style="width: 100%"
                  />
                </div>
                <el-skeleton-item class="circle" />
              </div>

              <div class="bottom">
                <el-skeleton-item variant="text" />
                <el-skeleton-item variant="text" />
                <el-skeleton-item variant="text" />
                <el-skeleton-item variant="text" />
                <el-skeleton-item variant="text" />
              </div>
            </div>
          </div>
        </template>

        <template #default>
          <div
            class="movie-group related"
            :class="{ expand: viewMore }"
          >
            <MovieCardRelated
              v-for="(item, index) in dataRecommend"
              :key="item.id"
              :index="index"
              :item="item"
              :type="item.media_type"
            />
          </div>
          <ViewMoreBar
            v-show="dataRecommend?.length"
            :is-open="viewMore"
            @on-click="viewMore = !viewMore"
          />
        </template>
      </el-skeleton>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { MovieCardRelated } from '~/components/MovieRelated';
// import MovieCardRelated from '~/components/MovieRelated/MovieCardRelated/MovieCardRelated.vue';
// import { ViewMoreBar } from '~/components/ViewMoreBar';
import { getSimilar } from '~/services/similar';
import { getTrending } from '~/services/trending';

const props = defineProps<{
  dataMovie: any;
  type?: string;
}>();

const dataSimilar = ref<any[]>([]);
const dataRecommend = ref<any[]>([]);
const pageSimilar = ref<number>(1);
const pageRecommend = ref<number>(Math.floor(Math.random() * 50) + 1);
const viewMore = ref<boolean>(false);
const loadingSimilar = ref<boolean>(false);
const loadingRecommend = ref<boolean>(false);

watch(
  () => props.dataMovie,
  (newVal, oldVal) => {
    if (!oldVal && newVal) {
      loadingSimilar.value = true;
      loadingRecommend.value = true;

      getSimilar(
        props?.dataMovie.media_type,
        props?.dataMovie.id,
        pageSimilar.value,
        20
      )
        .then((response) => {
          dataSimilar.value = response?.results;
        })
        .catch((e) => {})
        .finally(() => {
          loadingSimilar.value = false;
        });

      getTrending(pageRecommend.value, 20)
        .then((response) => {
          dataRecommend.value = response?.results;
        })
        .catch((e) => {})
        .finally(() => {
          loadingRecommend.value = false;
        });
    }
  },
  { immediate: true }
);

// const { data: dataSimilar } = await useAsyncData(
//   `similar/${props?.dataMovie.media_type}/${props?.dataMovie.id}/${pageSimilar.value}`,
//   () =>
//     getSimilar(
//       props?.dataMovie.media_type,
//       props?.dataMovie.id,
//       pageSimilar.value,
//       12
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

// loadingSimilar.value = false;

// const { data: dataRecommend } = await useAsyncData(
//   `trending/all/${pageRecommend.value}`,
//   () => getTrending(pageRecommend.value, 12),
//   {
//     // lazy: true,
//     // immediate: false,
//     // server: false,
//     transform: (data: any) => {
//       return data.results;
//     },
//   }
// );

// loadingRecommend.value = false;
</script>

<style lang="scss" src="./MovieRelated.scss"></style>
<!-- <style lang="scss">
@import url('./MovieRelated.scss');
</style> -->

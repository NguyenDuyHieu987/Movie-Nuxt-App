<template>
  <div class="lastest-episodes">
    <label class="label">Tập mới nhất: </label>

    <ul
      v-show="dataEpisode?.length"
      class="list-lastest-episodes"
    >
      <li
        v-for="(item, index) in dataEpisode?.slice(-7).reverse()"
        :key="index"
        :index="index"
      >
        <NuxtLink
          class="underline"
          :to="{
            path: `/play-tv/${dataMovie?.id}${utils.convertPath.toPathInfo_Play(
              dataMovie?.name
            )}/tap-${item?.episode_number}`
          }"
        >
          {{ 'Tập ' }}
          {{
            // item?.episode_number == dataEpisode.length
            //   ? item?.episode_number < 10
            //     ? '0' + item?.episode_number + ' - End'
            //     : item?.episode_number + ' - End'
            //   :
            +item?.episode_number < 10
              ? '0' + item?.episode_number
              : item?.episode_number
          }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { getListEpisode } from '~/services/episode';
// import { getSeason } from '~/services/season';

const props = defineProps<{
  dataMovie: any;
  loading: boolean;
}>();

const utils = useUtils();
const dataSeason = ref<any>(props.dataMovie?.seasons);
const dataEpisode = ref<any[]>(
  props.dataMovie?.episodes
    ? props.dataMovie?.episodes.filter((item: any) => item.air_date != null)
    : []
);
const loading = ref<boolean>(props.loading);

if (dataEpisode.value.length == 0) {
  loading.value = true;

  getListEpisode(props.dataMovie?.id, props?.dataMovie?.season_id)
    .then((response) => {
      dataEpisode.value = response?.results.filter(
        (item: any) => item.air_date != null
      );
    })
    .catch((e) => {})
    .finally(() => {
      loading.value = false;
    });
}

// // useAsyncData(
// //   `season/${props.dataMovie?.id}/${props?.dataMovie?.season_id}`,
// //   () => getSeason(props.dataMovie?.id, props?.dataMovie?.season_id)
// // )
// getSeason(props.dataMovie?.id, props?.dataMovie?.season_id)
//   .then((response) => {
//     dataSeason.value = response;

//     dataEpisode.value = dataSeason.value?.episodes.filter(
//       (item: any) => item.air_date != null
//     );
//   })
//   .catch((e) => {
//   })
//   .finally(() => {
//     loading.value = false;
//   });
</script>

<style lang="scss" src="./LastestEpisodes.scss" scoped></style>
<!-- <style lang="scss" scoped>
@import url('./LastestEpisodes.scss');
</style> -->

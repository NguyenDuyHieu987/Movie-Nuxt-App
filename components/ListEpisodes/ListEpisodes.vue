<template>
  <div class="list-episodes-section">
    <!-- <div class="control-episodes">
      <a-button
        type="text"
        plain
        :disabled="currentEpisode == 1"
        @click="handleChangeEpisode(--currentEpisode)"
      >
        Tập trước
      </a-button>
      <a-button
        type="text"
        plain
        :disabled="
          dataMovie?.last_episode_to_air?.season_number == selectedSeason
            ? currentEpisode == dataMovie?.last_episode_to_air?.episode_number
            : currentEpisode == dataEpisode?.length
        "
        @click="handleChangeEpisode(++currentEpisode)"
      >
        Tập tiếp
      </a-button>
    </div> -->

    <h2 class="movie-title title-default">
      Danh sách tập
      <!-- <span>
        {{ dataMovie?.name }}
        - Tập
        {{ currentEpisode }}
      </span> -->

      <!-- <a-select
        v-model:value="selectedSeasonId"
        style="width: 150px"
        @change="handleChangeSeason(selectedSeasonId)"
      >
        <a-select-option
          v-for="(item, index) in dataSeason"
          :key="item?.id"
          :index="index"
          :value="item?.season_id"
          >{{
            item.name?.split(' ')[0] === 'Phần' || item.name === 'Specials'
              ? item.name
              : item.name?.replace('Season', 'Phần')
          }}
        </a-select-option>
      </a-select> -->
    </h2>

    <div
      v-loading="loading && dataEpisode?.length != 0"
      class="list-episodes-wrapper"
      element-loading-text="Đang tải tập..."
      element-loading-background="rgba(0, 0, 0, 0.6)"
    >
      <el-skeleton
        :loading="loading"
        animated
      >
        <template #template>
          <el-skeleton-item
            v-for="(item, index) in dataEpisode?.length || 20"
            :key="index"
            :index="index"
            class="episode-item"
            variant="button"
          />
        </template>

        <template #default>
          <ul
            ref="listEpisodes"
            class="list-episodes"
          >
            <li
              v-for="(item, index) in dataEpisode"
              :id="`episode-${item?.episode_number}`"
              :key="item.id"
              :index="index"
              class="episode-item"
              :class="{ active: currentEpisode == item?.episode_number }"
            >
              <a
                :href="`/play-tv/${
                  dataMovie?.id
                }${utils.convertPath.toPathInfo_Play(dataMovie?.name)}/tap-${
                  item?.episode_number
                }`"
                replace
                force
                @click.prevent="handleChangeEpisode(item)"
              >
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
              </a>
            </li>
          </ul>
        </template>
      </el-skeleton>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { ElSkeleton, ElSkeletonItem } from 'element-plus';

import { getListEpisode } from '~/services/episode';
import { getListSeason, getSeason } from '~/services/season';

const props = defineProps<{
  dataMovie: any;
}>();

const emit = defineEmits<{
  changeUrlCode: [url: string];
  changeEpisode: [episode: any];
}>();

const route = useRoute();
const utils = useUtils();
const router = useRouter();
const listEpisodes = ref<HTMLUListElement>();
const dataSeason = ref<any>(props.dataMovie?.seasons);
const dataEpisode = ref<any[]>(
  props.dataMovie?.episodes
    ? props.dataMovie?.episodes
        .filter((item: any) => item.air_date != null)
        .reverse()
    : []
);
const selectedSeasonId = ref<string>(props.dataMovie?.season_id);
const currentEpisode = ref<number>(
  route.params?.ep?.replace('tap-', '')
    ? +route.params?.ep?.replace('tap-', '')
    : 1
);
const loading = ref<boolean>(false);

const emitUrlCode = () => {
  // const url_code_movie = dataSeason.episodes?.find(
  //   (item: any) => item.episode_number == currentEpisode.value
  // )?.url_code;

  let urlCode = `The_Witcher_S1_Ep1`;

  if (currentEpisode.value > 1 && currentEpisode.value <= 8) {
    urlCode = `The_Witcher_S1_Ep${currentEpisode.value}`;
  } else if (currentEpisode.value > 8) {
    urlCode = `The_Witcher_S1_Ep8`;
  }

  emit('changeUrlCode', urlCode);
};

const getData = async () => {
  loading.value = true;

  useAsyncData(`season/list/${props.dataMovie?.series_id}`, () =>
    getListSeason(props.dataMovie?.series_id)
  )
    // getListSeason(props.dataMovie?.series_id)
    .then((response) => {
      dataSeason.value = response.data.value?.results;
    })
    .catch((e) => {})
    .finally(() => {
      loading.value = false;
    });
};

// getData();

watch(
  () => props.dataMovie,
  (newVal, oldVal) => {
    if (!oldVal && newVal && dataEpisode.value.length == 0) {
      loading.value = true;

      getListEpisode(props.dataMovie?.id, props?.dataMovie?.season_id)
        .then((response) => {
          dataEpisode.value = response?.results
            .filter((item: any) => item.air_date != null)
            .reverse();
        })
        .catch((e) => {})
        .finally(() => {
          loading.value = false;
        });
    }
  },
  { immediate: true }
);

watchEffect(() => {
  if (dataEpisode.value?.length > 0) {
    emitUrlCode();

    emit(
      'changeEpisode',
      dataEpisode.value.find(
        (item) => item?.episode_number == currentEpisode.value
      )
    );

    const episode = document.getElementById(
      `episode-${currentEpisode.value}`
    ) as HTMLElement;

    listEpisodes.value?.scrollTo({
      top: episode?.offsetTop,
      behavior: 'smooth'
    });
  }
  // episode.scrollIntoView();
});

onMounted(() => {});

const handleChangeSeason = async (value: string) => {
  selectedSeasonId.value = value;

  loading.value = true;
  window.history.replaceState(null, '', 'tap-1');

  // await useAsyncData(
  //   `season/get/${props.dataMovie?.id}/${selectedSeasonId.value}`,
  //   () => getSeason(props.dataMovie?.id, selectedSeasonId.value)
  // )
  await getSeason(props.dataMovie?.id, selectedSeasonId.value)
    .then((response) => {
      dataEpisode.value = response?.episodes
        .filter((item: any) => item.air_date != null)
        .reverse();
    })
    .catch((e) => {
      loading.value = false;
    })
    .finally(() => {
      loading.value = false;
    });
};

const handleChangeEpisode = (item: any) => {
  if (currentEpisode.value == item?.episode_number) return;

  window.history.replaceState(null, '', 'tap-' + item?.episode_number);

  currentEpisode.value = item?.episode_number;

  emitUrlCode();

  emit('changeEpisode', item);

  const videoPlayer = document
    .getElementById('video-player')
    ?.closest('.video-player');

  videoPlayer!?.scrollIntoView({ block: 'end' });

  // window.scrollTo({
  //   top: 0,
  //   left: 0,
  //   behavior: 'smooth',
  // });
};
</script>

<style lang="scss" src="./ListEpisodes.scss"></style>
<!-- <style lang="scss">
@import url('./ListEpisodes.scss');
</style> -->

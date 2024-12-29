<template>
  <div class="list-episodes-section">
    <!-- <div class="control-episodes">
      <a-button
        type="text"
        plain
        :disabled="episodeNumber == 1"
        @click="handleChangeEpisode(--episodeNumber)"
      >
        Tập trước
      </a-button>
      <a-button
        type="text"
        plain
        :disabled="
          dataMovie?.last_episode_to_air?.season_number == selectedSeason
            ? episodeNumber == dataMovie?.last_episode_to_air?.episode_number
            : episodeNumber == dataEpisode?.length
        "
        @click="handleChangeEpisode(++episodeNumber)"
      >
        Tập tiếp
      </a-button>
    </div> -->

    <h2 class="movie-title title-default">
      Danh sách tập
      <!-- <span>
        {{ dataMovie?.name }}
        - Tập
        {{ episodeNumber }}
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

    <div class="list-episodes-wrapper">
      <el-skeleton
        :loading="loading && dataEpisode[0]?.length == 0"
        animated
      >
        <template #template>
          <el-skeleton-item
            v-for="(item, index) in dataEpisode[0]?.length || 27"
            :key="index"
            :index="index"
            class="episode-item"
            variant="button"
          />
        </template>

        <template #default>
          <!-- <div
                v-loading="loading && dataEpisode[indexTab]?.length != 0"
                element-loading-text="Đang tải tập..."
                element-loading-background="rgba(0, 0, 0, 0.6)"
              > -->
          <el-tabs
            v-model="selectedTabEpisode"
            class="episode-tabs"
            @tab-change="onChangeEpisodeTab"
            :stretch="false"
          >
            <el-tab-pane
              v-for="(item, indexTab) in numberTabsEpisode"
              :key="indexTab"
              :label="getLabelTabEpisode(item)"
              :name="item"
            >
              <ul
                ref="listEpisodes"
                class="list-episodes"
              >
                <li
                  v-for="(item, index) in dataEpisode[indexTab]"
                  :id="`episode-${item?.episode_number}`"
                  :key="item.id"
                  :index="index"
                  class="episode-item"
                  :class="{ active: item?.episode_number == episodeNumber }"
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
                    :title="`${props.dataMovie?.name} - Tập ${item?.episode_number}`"
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
                  <span
                    v-if="item?.vip > 0"
                    :class="`vip vip-${item?.vip}`"
                    :title="`VIP ${item?.vip}`"
                  >
                    VIP {{ item?.vip }}
                  </span>
                </li>
              </ul>
            </el-tab-pane>
          </el-tabs>
          <!-- </div> -->
        </template>
      </el-skeleton>
    </div>

    <!-- <a-tabs
      v-show="dataEpisode?.length"
      v-model:activeKey="selectedTabEpisode"
      class="episode-tabs"
    >
      <a-tab-pane
        v-for="(item, index) in numberTabsEpisode"
        :key="index"
        :tab="getLabelTabEpisode(item)"
      >
        {{ item }}
        User
      </a-tab-pane>
    </a-tabs> -->
  </div>
</template>

<script setup lang="ts">
// import { ElSkeleton, ElSkeletonItem } from 'element-plus';

import type { TabPaneName } from 'element-plus';
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
const totalEpisode = ref<number>(0);
const dataEpisode = ref<any[][]>(
  props.dataMovie?.episodes
    ? props.dataMovie?.episodes
        // .filter((item: any) => item.air_date != null)
        .reverse()
    : [[]]
);
const loading = ref<boolean>(false);
const skip = ref<number>(1);
const limit = ref<number>(50);
const from = ref<number>(1);
const to = ref<number>(50);
const selectedTabEpisode = ref<number>(1);
const numberTabsEpisode = computed<number>(() =>
  Math.ceil(totalEpisode.value / limit.value)
);
const selectedSeasonId = ref<string>(props.dataMovie?.season_id);
const episodeId = computed<string>(
  () => route.query?.ep || dataEpisode.value[0][0].id
);
const episodeNumber = ref<number>(1);

const emitUrlCode = () => {
  // const url_code_movie = dataSeason.episodes?.find(
  //   (item: any) => item.episode_number == episodeNumber.value
  // )?.url_code;

  let urlCode = `The_Witcher_S1_Ep1`;

  if (episodeNumber.value > 1 && episodeNumber.value <= 8) {
    urlCode = `The_Witcher_S1_Ep${episodeNumber.value}`;
  } else if (episodeNumber.value > 8) {
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
  (newVal: any, oldVal: any) => {
    if (dataEpisode.value[0]?.length > 0) {
      return;
    }

    if (newVal) {
      loading.value = true;

      if (episodeNumber.value > limit.value) {
        selectedTabEpisode.value = Math.ceil(episodeNumber.value / limit.value);
      }

      getListEpisode(
        props.dataMovie?.id,
        props?.dataMovie?.season_id,
        episodeNumber.value > limit.value
          ? (selectedTabEpisode.value - 1) * limit.value + 1
          : skip.value,
        limit.value
      )
        .then((response) => {
          dataEpisode.value[selectedTabEpisode.value - 1] = response?.results;
          // .filter((item: any) => item.air_date != null);
          // .reverse();
          episodeNumber.value = response?.results.find(
            (item: any) => item.id == episodeId.value
          )?.episode_number;
          totalEpisode.value = response?.total_episode;

          for (let i = 1; i < numberTabsEpisode.value; i++) {
            dataEpisode.value.push([]);
          }

          emitUrlCode();

          emit(
            'changeEpisode',
            dataEpisode.value[selectedTabEpisode.value - 1].find(
              (item: any) => item?.id == episodeId.value
            )
          );

          // const episode = document.getElementById(
          //   `episode-${episodeNumber.value}`
          // ) as HTMLElement;

          // listEpisodes.value?.scrollTo({
          //   top: episode?.offsetTop,
          //   behavior: 'smooth'
          // });

          // episode.scrollIntoView();
        })
        .catch((e) => {})
        .finally(() => {
          loading.value = false;
        });
    }
  },
  { immediate: true }
);

// watchEffect(() => {
//   if (dataEpisode.value[0]?.length > 0) {
//   }
// });

onMounted(() => {});

const handleChangeSeason = async (value: string) => {
  selectedSeasonId.value = value;

  loading.value = true;

  // await useAsyncData(
  //   `season/get/${props.dataMovie?.id}/${selectedSeasonId.value}`,
  //   () => getSeason(props.dataMovie?.id, selectedSeasonId.value)
  // )
  await getSeason(props.dataMovie?.id, selectedSeasonId.value)
    .then((response) => {
      dataEpisode.value = response?.episodes
        // .filter((item: any) => item.air_date != null)
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
  if (episodeNumber.value == item?.episode_number) return;

  // window.history.replaceState(null, '', 'tap-' + item?.episode_number);
  router.push({ query: { ep: item.id } });

  episodeNumber.value = item?.episode_number;

  emitUrlCode();

  emit('changeEpisode', item);

  // const videoPlayer = document
  //   .getElementById('video-player')
  //   ?.closest('.video-player');

  const videoPlayer = document.querySelector('.video-player');

  videoPlayer?.scrollIntoView({ block: 'end' });

  // window.scrollTo({
  //   top: 0,
  //   left: 0,
  //   behavior: 'smooth',
  // });
};

const getLabelTabEpisode = (tab: number): string => {
  if (tab == numberTabsEpisode.value) {
    if (totalEpisode.value % limit.value > 0) {
      return `${(tab - 1) * limit.value + 1} - ${totalEpisode.value}`;
    }
  }

  return `${(tab - 1) * limit.value + 1} - ${tab * limit.value}`;
};

const onChangeEpisodeTab = (tab: TabPaneName) => {
  if (
    dataEpisode.value[Number(tab) - 1] &&
    dataEpisode.value[Number(tab) - 1]?.length > 0
  )
    return;

  // loading.value = true;

  getListEpisode(
    props.dataMovie?.id,
    props?.dataMovie?.season_id,
    (Number(tab) - 1) * limit.value + 1,
    limit.value
  )
    .then((response) => {
      dataEpisode.value[Number(tab) - 1] = response?.results;
      // .filter(
      //   (item: any) => item.air_date != null
      // );
      // .reverse();
    })
    .catch((e) => {})
    .finally(() => {
      loading.value = false;
    });
};
</script>

<style lang="scss" src="./ListEpisodes.scss"></style>
<!-- <style lang="scss">
@import url('./ListEpisodes.scss');
</style> -->

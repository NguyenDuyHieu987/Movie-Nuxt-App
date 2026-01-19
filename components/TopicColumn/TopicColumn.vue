<template>
  <aside
    ref="topicColumn"
    class="topic-column"
  >
    <div class="column-container">
      <div class="backdrop">
        <NuxtLink
          v-if="dataColumn?.length"
          class="img-box ratio-16-9"
          :to="{
            path: `/play-${dataMovie?.media_type}/${dataMovie?.id}`
          }"
        >
          <VipRibbon
            v-if="dataMovie?.vip > 0"
            size="large"
            :vip="dataMovie?.vip"
          />

          <NuxtImg
            :src="getImage(topicImage, 'backdrop', { h: 300 })"
            loading="lazy"
            alt=""
          />

          <div class="play-now">
            <!-- <Icon name="ci:play-arrow" class="play" /> -->

            <SvgoPlay
              class="play"
              width="3rem"
              height="3rem"
              fill="currentColor"
            />
            <span> PHÁT NGAY </span>
          </div>
        </NuxtLink>

        <div
          v-else
          class="img-box"
        >
          <NuxtImg
            :src="getImage('topic1.jpg', 'misc', { h: 300 })"
            placeholder="/images/loading-img-16-9.webp"
            loading="lazy"
            alt=""
          />
        </div>
      </div>

      <NuxtImg
        class="overlay-image"
        :src="topicImageUrl"
        loading="lazy"
        alt=""
      />
      <div class="info">
        <h2 class="title">
          <strong>{{ title }}</strong>
        </h2>
        <div class="user-info">
          <p>
            <strong>
              {{ authStore.userAccount?.username }}
            </strong>
          </p>
          <p class="count-video">
            {{ total }} phim
            <span> Cập nhật hôm nay </span>
          </p>

          <el-dropdown
            trigger="click"
            placement="bottom-end"
            popper-class="dropdown-viewmore background-app-blur"
            class="dropdown-viewmore"
            :show-timeout="0"
          >
            <a-button
              class="viewmore-btn click-active"
              type="text"
            >
              <template #icon>
                <SvgoEllipsisVertical
                  width="1.9rem"
                  height="1.9rem"
                  fill="currentColor"
                />
              </template>
            </a-button>

            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item key="info">
                  <!-- <template #icon> -->
                  <SvgoInfoCircle
                    class="info"
                    width="1.5rem"
                    height="1.5rem"
                    fill="currentColor"
                  />
                  <!-- </template> -->
                  <span>Thông tin chi tiết</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>

      <div class="widget">
        <a-input
          v-model:value="valueSearch"
          class="search-row"
          placeholder="Tìm kiếm trong danh sách..."
          size="large"
          allow-clear
          :loading="loadingSearch"
          @change="searchRow"
        >
          <template #prefix>
            <!-- <Icon name="fa6-solid:magnifying-glass" /> -->

            <SvgoMagnifyingGlass
              width="1.5rem"
              height="1.5rem"
              fill="currentColor"
            />
          </template>
        </a-input>

        <a-button
          type="text"
          shape="round"
          class="remove-all-btn"
          @click="deleteAll"
        >
          <template #icon>
            <!-- <span class="material-icons-outlined"> delete_sweep </span> -->
            <!-- <Icon name="ic:sharp-delete-sweep" /> -->

            <SvgoDeleteSweep
              width="1.5rem"
              height="1.5rem"
              fill="currentColor"
            />
          </template>
          Xóa tất cả Danh sách phát
        </a-button>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
// import SvgoPlay from '~/assets/svgs/icons/play.svg?component';
// import SvgoEllipsisVertical from '~/assets/svgs/icons/ellipsis-vertical.svg?component';
// import SvgoInfoCircle from '~/assets/svgs/icons/info-circle.svg?component';
// import SvgoMagnifyingGlass from '~/assets/svgs/icons/magnifying-glass.svg?component';
// import SvgoDeleteSweep from '~/assets/svgs/icons/delete-sweep.svg?component';

import { getImage } from '~/services/image';

const props = defineProps<{
  // dataColumn: any[];
  topicImage: string;
  title?: string;
  total?: number;
  // valueInput: string;
  loadingSearch?: boolean;
  searchRow: (e: any) => void;
  deleteAll: () => void;
}>();

const authStore = useAuthStore();
const utils = useUtils();
const topicColumn = ref<HTMLElement>();
const valueSearch = defineModel<string>('valueInput');
const dataColumn = defineModel<any>('dataColumn');
const dataMovie = ref<any>(dataColumn.value[0]?.movieData || {});
const topicImageUrl = computed<string>(() =>
  getImage(
    props.topicImage || 'topic1.jpg',
    props.topicImage == 'topic1.jpg' || props.topicImage == undefined ? 'misc' : 'backdrop',
    { h: 300 }
  )
);

watch(dataColumn, (newVal, oldVal) => {
  if (newVal?.length > 0) {
    const color = newVal[0]?.dominant_backdrop_color;
    setBackgroundColor(color);
  } else {
    setBackgroundColor(['16', '68', '128']);
  }
});

const setBackgroundColor = (color: string[]) => {
  const main_color = `linear-gradient(to bottom, rgba(${color?.join(', ')}, 1), rgba(${color?.join(', ')}, 0.5), rgba(0, 0, 0, 1));`;

  // const topic_column = document.getElementsByClassName(
  //   'topic-column'
  // )[0] as HTMLElement;

  topicColumn.value!.setAttribute('style', `background-image: ${main_color}`);

  const ant_input_affix_wrapper = topicColumn.value!.getElementsByClassName(
    'ant-input-affix-wrapper'
  )[0] as HTMLElement;
  ant_input_affix_wrapper.setAttribute('style', `border-bottom: 2px solid rgb(${color[0]}, ${color[1]}, ${color[2]});`);
};

onMounted(() => {
  if (dataColumn.value?.length > 0) {
    const color = dataColumn.value[0]?.dominant_backdrop_color;
    setBackgroundColor(color);
  } else {
    setBackgroundColor(['16', '68', '128']);
  }
});
</script>

<style src="./TopicColumn.scss" lang="scss"></style>
<!-- <style lang="scss">
@import url('./TopicColumn.scss');
</style> -->

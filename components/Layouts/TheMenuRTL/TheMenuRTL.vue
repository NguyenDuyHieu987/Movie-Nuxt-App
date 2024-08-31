<template>
  <el-menu
    :collapse="openSiderBarFixed || props.noCollapse ? false : collapsed"
    :default-openeds="state.openKeys"
    :default-active="state.selectedKeys"
    class="menu-sider-bar-rtl"
    theme="dark"
    popper-effect="dark"
    background-color="transparent"
    text-color="var(--menu-text-color)"
    active-text-color="var(--menu-active-text-color)"
    :collapseTransition="false"
    :router="true"
    :unique-opened="true"
    :show-timeout="0"
    :hide-timeout="0"
  >
    <el-menu-item index="/">
      <el-icon> <HomeOutlined /></el-icon>

      <template #title>
        <NuxtLink to="/">Trang chủ</NuxtLink>
      </template>
    </el-menu-item>

    <el-menu-item index="/feature">
      <el-icon>
        <VideoCamera
          width="1.5rem"
          height="1.5rem"
          fill="currentColor"
        />
      </el-icon>

      <template #title>
        <NuxtLink to="/feature">Phim lẻ</NuxtLink>
      </template>
    </el-menu-item>

    <el-menu-item index="/television">
      <el-icon>
        <MovieReel
          width="1.5rem"
          height="1.5rem"
          fill="currentColor"
        />
      </el-icon>

      <template #title>
        <NuxtLink to="/television">Phim bộ</NuxtLink>
      </template>
    </el-menu-item>

    <el-menu-item index="/discover">
      <el-icon>
        <Light
          width="1.6rem"
          height="1.6rem"
          fill="currentColor"
        />
      </el-icon>

      <template #title>
        <NuxtLink to="/discover">Khám phá</NuxtLink>
      </template>
    </el-menu-item>

    <!-- <el-sub-menu index="/discover/movie" popperClass="sub-menu-popper">
        <template #title>
          <el-icon>
            <VideoCamera
              width="1.5rem"
              height="1.5rem"
              fill="currentColor"
            />
          </el-icon>
          <span>Phim lẻ</span>
        </template>
  
        <el-menu-item index="/discover/movie/all">
          <NuxtLink
            :to="{
              path: `/discover/movie/all`,
            }"
          >
            Tất cả
          </NuxtLink>
        </el-menu-item>
  
        <el-menu-item index="/discover/movie/nowplaying">
          <NuxtLink
            :to="{
              path: `/discover/movie/nowplaying`,
            }"
          >
            Now playing
          </NuxtLink>
        </el-menu-item>
  
        <el-menu-item index="/discover/movie/popular">
          <NuxtLink
            :to="{
              path: `/discover/movie/popular`,
            }"
          >
            Phổ biến
          </NuxtLink>
        </el-menu-item>
  
        <el-menu-item index="/discover/movie/toprated">
          <NuxtLink
            :to="{
              path: `/discover/movie/toprated`,
            }"
          >
            Top đánh giá
          </NuxtLink>
        </el-menu-item>
  
        <el-menu-item index="/discover/movie/upcoming">
          <NuxtLink
            :to="{
              path: `/discover/movie/upcoming`,
            }"
          >
            Sắp công chiếu
          </NuxtLink>
        </el-menu-item>
      </el-sub-menu> -->

    <!-- <el-sub-menu index="tv" popperClass="sub-menu-popper">
        <template #title>
          <el-icon>
            <MovieReel
              width="1.5rem"
              height="1.5rem"
              fill="currentColor"
            />
          </el-icon>
          <span>Phim bộ</span>
        </template>
  
        <el-menu-item index="/discover/tv/all">
          <NuxtLink
            :to="{
              path: `/discover/tv/all`,
            }"
          >
            Tất cả
          </NuxtLink>
        </el-menu-item>
  
        <el-menu-item index="/discover/tv/airingtoday">
          <NuxtLink
            :to="{
              path: `/discover/tv/airingtoday`,
            }"
          >
            Airing today
          </NuxtLink>
        </el-menu-item>
  
        <el-menu-item index="/discover/tv/ontheair">
          <NuxtLink
            :to="{
              path: `/discover/tv/ontheair`,
            }"
          >
            On the air
          </NuxtLink>
        </el-menu-item>
  
        <el-menu-item index="/discover/tv/popular">
          <NuxtLink
            :to="{
              path: `/discover/tv/popular`,
            }"
          >
            Phổ biến
          </NuxtLink>
        </el-menu-item>
  
        <el-menu-item index="/discover/tv/toprated">
          <NuxtLink
            :to="{
              path: `/discover/tv/toprated`,
            }"
          >
            Top đánh giá
          </NuxtLink>
        </el-menu-item>
      </el-sub-menu> -->

    <el-sub-menu
      index="genres"
      popper-class="sub-menu-popper"
    >
      <template #title>
        <el-icon>
          <!-- <Icon name="fa6-solid:list"></Icon> -->
          <ListIcon
            width="1.5rem"
            height="1.5rem"
            fill="currentColor"
          />
        </el-icon>
        <span>Thể loại</span>
      </template>

      <el-menu-item
        v-for="(item, index) in genres"
        :key="item?.id"
        :index="`/discover/genre/${item?.short_name}`"
      >
        <a-tooltip
          v-if="item?.name_vietsub?.length > 30"
          :title="item?.name_vietsub"
          placement="right"
        >
          <NuxtLink
            :to="{
              path: `/discover/genre/${item?.short_name}`
            }"
          >
            {{ item?.name_vietsub }}
          </NuxtLink>
        </a-tooltip>

        <NuxtLink
          v-else
          :to="{
            path: `/discover/genre/${item?.short_name}`
          }"
        >
          {{ item?.name_vietsub }}
        </NuxtLink>
      </el-menu-item>
    </el-sub-menu>

    <el-sub-menu
      index="years"
      popper-class="sub-menu-popper"
    >
      <template #title>
        <el-icon>
          <!-- <Icon name="fa6-regular:calendar-days" />  -->
          <CalendarDays
            width="1.5rem"
            height="1.5rem"
            fill="currentColor"
          />
        </el-icon>
        <span>Năm phát hành</span>
      </template>

      <el-menu-item
        v-for="(item, index) in years"
        :key="item?.name"
        :index="`/discover/year/${
          utils.isNumber(item?.name) || utils.isStringNumber(item?.name)
            ? item?.name
            : utils.convertPath.toPath(item?.name)
        }`"
      >
        <NuxtLink
          :to="{
            path: `/discover/year/${
              utils.isNumber(item?.name) || utils.isStringNumber(item?.name)
                ? item?.name
                : utils.convertPath.toPath(item?.name)
            }`
          }"
        >
          {{ item?.name }}
        </NuxtLink>
      </el-menu-item>
    </el-sub-menu>

    <el-sub-menu
      index="countries"
      popper-class="sub-menu-popper"
    >
      <template #title>
        <el-icon>
          <!-- <Icon name="fa6-solid:globe" /> -->
          <Globe
            width="1.5rem"
            height="1.5rem"
            fill="currentColor"
          />
        </el-icon>
        <span>Quốc gia</span>
      </template>

      <el-menu-item
        v-for="(item, index) in countries"
        :key="item?.short_name"
        :index="`/discover/country/${item?.short_name}`"
      >
        <NuxtLink
          :to="{
            path: `/discover/country/${item?.short_name}`
          }"
        >
          <!-- @click="$store.breadCrumbValue = item?.name" -->

          {{ item?.name }}
        </NuxtLink>
      </el-menu-item>
    </el-sub-menu>

    <el-menu-item index="/follow">
      <el-icon>
        <!-- <span class="material-icons-outlined"> playlist_play </span> -->
        <!-- <Icon
            class="material-icons-outlined playlist"
            name="ic:baseline-playlist-play"
          /> -->
        <PlaylistPlay
          class="material-icons-outlined playlist"
          height="2.6rem"
          width="2.6rem"
          fill="currentColor"
        />
      </el-icon>
      <template #title>
        <NuxtLink to="/follow"> Theo dõi</NuxtLink>
      </template>
    </el-menu-item>

    <el-menu-item index="/history">
      <el-icon>
        <!-- <Icon name="fa6-solid:clock-rotate-left" /> -->
        <ClockRotateLeft
          width="1.5rem"
          height="1.5rem"
          fill="currentColor"
        />
      </el-icon>
      <template #title>
        <NuxtLink to="/history"> Lịch sử Xem </NuxtLink>
      </template>
    </el-menu-item>

    <el-menu-item index="/ranks">
      <el-icon>
        <!-- <Icon name="fa6-solid:ranking-star" /> -->
        <RankingStar
          width="1.5rem"
          height="1.5rem"
          fill="currentColor"
        />
      </el-icon>
      <template #title>
        <NuxtLink to="/ranks"> Xếp hạng</NuxtLink>
      </template>
    </el-menu-item>

    <div class="separate"></div>

    <el-menu-item
      class="upgrade-account"
      index="/upgrade/plans"
    >
      <el-icon>
        <!-- <NuxtImg :src="getImage('king.png', 'misc', { h: 16 })" alt="" /> -->
        <VipPrivilege
          height="1.6rem"
          width="1.6rem"
        />
      </el-icon>
      <template #title>
        <NuxtLink
          class="click-active"
          to="/upgrade/plans"
        >
          Nâng cấp tài khoản
        </NuxtLink>
      </template>
    </el-menu-item>
  </el-menu>
</template>

<script setup lang="ts">
import { HomeOutlined } from '@ant-design/icons-vue';
import VideoCamera from '~/assets/svgs/icons/video-camera.svg?component';
import MovieReel from '~/assets/svgs/icons/movie-reel.svg?component';
import Light from '~/assets/svgs/icons/light.svg?component';
import ListIcon from '~/assets/svgs/icons/list.svg?component';
import CalendarDays from '~/assets/svgs/icons/calendar-days.svg?component';
import Globe from '~/assets/svgs/icons/globe.svg?component';
import ClockRotateLeft from '~/assets/svgs/icons/clock-rotate-left.svg?component';
import PlaylistPlay from '~/assets/svgs/icons/playlist-play.svg?component';
import RankingStar from '~/assets/svgs/icons/ranking-star.svg?component';
import VipPrivilege from '~/assets/svgs/icons/vip-privilege.svg?component';

import { storeToRefs } from 'pinia';

import type { country, genre, year } from '@/types';
import { getAllCountry } from '~/services/country';
import { getAllGenre } from '~/services/genres';
import { getAllYear } from '~/services/year';

const props = defineProps<{
  noCollapse?: boolean | false;
}>();

const route = useRoute();
const utils = useUtils();
const store = useStore();
const { collapsed, openSiderBarFixed } = storeToRefs(store);

const state = reactive<{
  selectedKeys: string;
  openKeys: string[];
}>({
  selectedKeys: route.path,
  openKeys: [route.path]
});
// const genres = ref<genre[]>([]);
// const years = ref<year[]>([]);
// const countries = ref<country[]>([]);

const getData = async () => {
  Promise.all([
    await useAsyncData(`genre/all`, () => getAllGenre()),
    await useAsyncData(`year/all`, () => getAllYear()),
    await useAsyncData(`country/all`, () => getAllCountry())
  ])
    .then((response) => {
      genres.value = response[0].data.value?.results;

      years.value = response[1].data.value?.results.sort((a: year, b: year) => {
        return +b.name.slice(-4) - +a.name.slice(-4);
      });

      countries.value = response[2].data.value?.results;

      store.allGenres = response[0].data.value?.results;
      store.allYears = response[1].data.value?.results.sort(
        (a: year, b: year) => {
          return +b.name.slice(-4) - +a.name.slice(-4);
        }
      );
      store.allCountries = response[2].data.value?.results;
    })
    .catch((e) => {});
};

// onBeforeMount(async () => {
//   await nextTick();

//   getData();
// });

const { data: genres } = await useAsyncData('genre/all', () => getAllGenre(), {
  // default: () => {
  //   return { results: trendingsCache.value || [] };
  // },
  transform: (data: any) => {
    store.allGenres = data.results;

    return data.results;
  }
});

const { data: years } = await useAsyncData('year/all', () => getAllYear(), {
  transform: (data: any) => {
    const dataResponse = data.results.sort((a: year, b: year) => {
      return +b.name.slice(-4) - +a.name.slice(-4);
    });

    store.allYears = dataResponse;

    return dataResponse;
  }
});

const { data: countries } = await useAsyncData(
  'country/all',
  () => getAllCountry(),
  {
    transform: (data: any) => {
      store.allCountries = data.results;

      return data.results;
    }
  }
);

watchEffect(() => {
  if (route.path) {
    state.selectedKeys = route.path;
    state.openKeys = [route.path];
  }
});
</script>

<style lang="scss" src="./TheMenuRTL.scss"></style>

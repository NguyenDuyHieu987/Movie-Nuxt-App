<template>
  <a-breadcrumb style="">
    <a-breadcrumb-item>
      <NuxtLink :to="{ path: '/' }"> Trang chủ </NuxtLink>
    </a-breadcrumb-item>
    <a-breadcrumb-item v-if="!path.length">{{ '' }}</a-breadcrumb-item>

    <!-- <a-breadcrumb-item>
      <a :href="this.$route.path"
        >{{ $route.params.name?.replaceAll('+', ' ') }}
      </a>
      <a :href="this.$route.path" v-if="this.$route.path == '/'"> </a>
      <a :href="this.$route.path" v-else>{{
        this.$route.path.charAt(1).toUpperCase() + this.$route.path.slice(2)
      }}</a>
    </a-breadcrumb-item> -->
    <a-breadcrumb-item
      v-for="(item, index) in path"
      :key="index"
      :index="index"
      style="text-transform: capitalize"
    >
      <NuxtLink
        v-if="index != path.length - 1"
        :to="{ path: $route.path }"
      >
        {{ item?.name?.replaceAll('+', ' ') }}
      </NuxtLink>
      <span v-else>
        {{ item?.name?.replaceAll('+', ' ') }}
      </span>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script setup lang="ts">
import type { country } from '@/types';
import { getGenreByShortName } from '~/services/genres';

const route = useRoute();
const store = useStore();

const getParamsRoute = () => {
  const breadList = [];

  switch (
    route.path
      .replaceAll(route.params?.slug ? route.params?.slug : '', '')
      .replaceAll(route.params?.slug2 ? route.params?.slug2 : '', '')
      .replaceAll(route.params?.id ? route.params?.id : '', '')
      .replaceAll(route.params?.name ? route.params?.name : '', '')
      .replaceAll(route.params?.tap ? route.params?.tap : '', '')
      .replaceAll('/', '')
  ) {
    case 'discover':
      breadList.push({ params: 'discover', name: 'Khám phá' });
      break;
    case 'infomovie':
      breadList.push({ params: 'info', name: 'Thông tin' });
      break;
    case 'infotv':
      breadList.push({ params: 'infoTV', name: 'Thông tin' });
      break;
    case 'playmovie':
      breadList.push({ params: 'play', name: 'Xem phim' });
      break;
    case 'playtv':
      breadList.push({ params: 'playTV', name: 'Xem phim' });
      break;
    case 'follow':
      breadList.push({ params: 'follow', name: 'Theo dõi' });
      break;
    case 'history':
      breadList.push({ params: 'history', name: 'Lịch sử xem' });
      break;
    case 'ranking':
      breadList.push({ params: 'ranking', name: 'Xếp hạng' });
      break;
    case 'pricing':
      breadList.push({ params: 'pricing', name: 'Pricing' });
      break;
    default:
      break;
  }

  switch (route.params?.slug) {
    case 'movie':
      breadList.push({ params: 'movie', name: 'Phim lẻ' });
      break;
    case 'tv':
      breadList.push({ params: 'tv', name: 'Phim bộ' });
      break;
    case 'genre':
      breadList.push({
        params: 'genre',
        // name: route.params?.slug2
        name: getGenreByShortName(route.params?.slug2, store?.allGenres)
          ?.name_vietsub
      });
      break;
    case 'year':
      breadList.push({ params: 'year', name: route.params?.slug2 });
      break;
    case 'countrie':
      breadList.push({
        params: 'countrie',
        // name: store.state.breadCrumbValue,
        name: store.allCountries.find(
          (country: country) => country.short_name === route.params?.slug2
        )?.name
      });
      break;
    default:
      break;
  }

  if (route.params?.id && route.params?.name) {
    breadList.push({ params: '', name: route.params.name });
  }

  return breadList;
};

const path = computed<any[]>(() => {
  return getParamsRoute();
});

// watch(route, () => {
//   path.value = getParamsRoute();
// });
</script>

<style lang="scss" src="./BreadCrumb.scss"></style>

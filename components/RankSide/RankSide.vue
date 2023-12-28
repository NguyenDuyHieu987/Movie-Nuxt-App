<template>
  <a-layout-sider
    ref="siderRank"
    :width="450"
    class="sider-rank"
    :class="{ fixed: isFixedNavActiom }"
  >
    <div class="sider-rank-wrapper">
      <div class="rank-side-header">
        <h2 class="gradient-title-default underline">
          <span> Top xem phim</span>
        </h2>
        <ul class="tabs-rank">
          <li
            v-for="(item, index) in allTabs"
            :key="item.key"
            :index="index"
            :class="[activeTab == item.key ? 'active' : '', item.key]"
            @click="handleTabClick(item.key)"
          >
            <span> {{ item.tabName }} </span>
          </li>
        </ul>

        <!-- <el-radio-group
              v-model="activeTab"
              @change="handleTabClick"
              class="rank"
            >
              <el-radio-button size="large" label="day" border
                >Top ngày</el-radio-button
              >
              <el-radio-button size="large" label="week" border
                >Top tuần</el-radio-button
              >
              <el-radio-button size="large" label="month" border
                >Top tháng</el-radio-button
              >
              <el-radio-button size="large" label="all" border
                >Tất cả</el-radio-button
              >
            </el-radio-group> -->
      </div>
      <div
        ref="rankSideContent"
        v-loading="loading"
        class="rank-side-content"
        element-loading-text="Đang tải..."
        element-loading-background="rgba(0, 0, 0, 0.75)"
      >
        <RankCard
          v-for="(item, index) in rankData"
          :key="item.id"
          :index="index"
          :item="item"
          :type="item?.media_type"
        />
      </div>
    </div>
  </a-layout-sider>
</template>

<script setup lang="ts">
import { RankCard } from '~/components/RankSide';
import { getRanking } from '~/services/ranks';

interface tab {
  key: string;
  tabName: string;
}

const siderRank = ref();
const rankSideContent = ref();
const activeTab = ref<string>('day');
const loading = ref<boolean>(false);
const rankData = ref<any[]>([]);
const allTabs = ref<tab[]>([
  {
    key: 'day',
    tabName: 'Top ngày'
  },
  {
    key: 'week',
    tabName: 'Top tuần'
  },
  {
    key: 'month',
    tabName: 'Top tháng'
  },
  {
    key: 'all',
    tabName: 'Tất cả'
  }
]);
const isFixedNavActiom = ref<boolean>(false);
const nuxtLoadingIndicator = useLoadingIndicator();

const getData = async (activeKey: string) => {
  if (activeTab.value == activeKey) return;

  activeTab.value = activeKey;

  loading.value = true;

  nuxtLoadingIndicator.start();

  switch (activeKey) {
    case 'day':
      // await useAsyncData(`ranking/all/1`, () => getRanking(1, 10))
      await getRanking(1, 10)
        .then((response) => {
          rankData.value = response?.results;
        })
        .catch((e) => {})
        .finally(() => {
          loading.value = false;
          nuxtLoadingIndicator.finish();
        });

      // refreshNuxtData('ranking/all/1');
      loading.value = false;
      nuxtLoadingIndicator.finish();
      break;
    case 'week':
      // useAsyncData(`ranking/all/2`, () => getRanking(2, 10))
      getRanking(2, 10)
        .then((response) => {
          rankData.value = response?.results;
        })
        .catch((e) => {})
        .finally(() => {
          loading.value = false;
          nuxtLoadingIndicator.finish();
        });

      break;
    case 'month':
      // useAsyncData(`ranking/all/3`, () => getRanking(3, 10))
      getRanking(3, 10)
        .then((response) => {
          rankData.value = response?.results;
        })
        .catch((e) => {})
        .finally(() => {
          loading.value = false;
          nuxtLoadingIndicator.finish();
        });

      break;
    case 'all':
      // useAsyncData(`ranking/all/4`, () => getRanking(4, 10))
      getRanking(4, 10)
        .then((response) => {
          rankData.value = response?.results;
        })
        .catch((e) => {})
        .finally(() => {
          loading.value = false;
          nuxtLoadingIndicator.finish();
        });

      break;
  }
};

// useAsyncData(`ranking/all/1`, () => getRanking(1))
await getRanking(1)
  .then((response) => {
    rankData.value = response?.results;
  })
  .catch((e) => {})
  .finally(() => {
    loading.value = false;
  });

// const { data: rankData, pending } = useAsyncData(
//   'ranking/all/1',
//   () => getRanking(1, 10),
//   {
//     transform: (data: any) => {
//       return data.results;
//     },
//   }
// );

onMounted(() => {
  // window.addEventListener('scroll', () => {
  //   const headerHeight = +getComputedStyle(document.documentElement)
  //     .getPropertyValue('--header-height')
  //     .replace('px', '');
  //   if (headerHeight) {
  //     isFixedNavActiom.value = true;
  //   } else {
  //     isFixedNavActiom.value = false;
  //   }
  // });
});

const handleTabClick = (activeKey: any) => {
  rankSideContent.value.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
  getData(activeKey);
};
</script>

<style lang="scss" src="./RankSide.scss"></style>

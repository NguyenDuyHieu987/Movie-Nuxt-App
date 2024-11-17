<template>
  <div class="cast-crew">
    <!-- <a-tabs class="cast-crew-tabs" v-model:activeKey="activeTabCast">
      <a-tab-pane key="cast" tab="Diễn viên">
        <SliderGroup
          v-if="dataCredit?.cast"
          :data="dataCredit?.cast?.slice(0, 20)"
          :responsive="responsiveCarousel"
        >
          <template #content>
            <swiper-slide
              v-for="(item, index) in dataCredit?.cast?.slice(0, 20)"
            >
              <CastCard
                :item="item"
                :index="index"
                :key="item.id"
                type="cast"
              />
            </swiper-slide>
          </template>
        </SliderGroup>
      </a-tab-pane>
      <a-tab-pane key="crew" tab="Đội ngũ" force-render>
        <SliderGroup
          v-if="dataCredit?.crew"
          :data="dataCredit?.crew?.slice(0, 20)"
          :responsive="responsiveCarousel"
        >
          <template #content>
            <swiper-slide
              v-for="(item, index) in dataCredit?.crew?.slice(0, 20)"
            >
              <CastCard
                :item="item"
                :index="index"
                :key="item.id"
                type="crew"
              />
            </swiper-slide>
          </template>
        </SliderGroup>
      </a-tab-pane>
    </a-tabs> -->

    <el-tabs
      v-model="activeTabCast"
      class="cast-crew-tabs"
    >
      <el-tab-pane
        name="cast"
        label="Diễn viên"
      >
        <el-skeleton
          :loading="loading"
          animated
        >
          <template #template>
            <div
              v-for="(item, index) in 10"
              :key="index"
              :index="index"
            >
              <el-skeleton-item class="skeleton-img" />
              <div class="content-skeleton">
                <el-skeleton-item
                  variant="text"
                  style="width: 70%"
                />
                <el-skeleton-item
                  variant="text"
                  style="width: 100%"
                />
              </div>
            </div>
          </template>
          <template #default>
            <SliderGroup :data="dataCredit?.cast?.slice(0, 20)">
              <template #content>
                <div
                  v-for="(item, index) in dataCredit?.cast?.slice(0, 20)"
                  :key="item.id"
                  :index="index"
                  class="slider-item"
                >
                  <CastCard
                    :item="item"
                    type="cast"
                  />
                </div>
              </template>
            </SliderGroup>
          </template>
        </el-skeleton>
      </el-tab-pane>
      <el-tab-pane
        name="crew"
        label="Đội ngũ"
      >
        <el-skeleton
          :loading="loading"
          animated
        >
          <template #template>
            <el-skeleton-item
              v-for="(item, index) in 10"
              :key="index"
              :index="index"
              class="skeleton-img"
            />
          </template>
          <template #default>
            <SliderGroup :data="dataCredit?.crew?.slice(0, 20)">
              <template #content>
                <div
                  v-for="(item, index) in dataCredit?.crew?.slice(0, 20)"
                  :key="item.id"
                  :index="index"
                  class="slider-item"
                >
                  <CastCard
                    :item="item"
                    type="crew"
                  />
                </div>
              </template>
            </SliderGroup>
          </template>
        </el-skeleton>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
// import { CastCard } from '~/components/CastCrew';
// import CastCard from '~/components/CastCrew/CastCard/CastCard.vue';
// import { SliderGroup } from '~/components/SliderGroup';
import { getCredits } from '~/services/credit';

const props = defineProps<{
  dataMovie: any;
}>();

const dataCredit = ref<any>(props.dataMovie?.credits);
const loading = ref<boolean>(false);
const activeTabCast = ref<string>('cast');

watch(
  () => props.dataMovie,
  (newVal, oldVal) => {
    if (!oldVal && newVal) {
      loading.value = true;

      getCredits(props.dataMovie?.id)
        .then((response) => {
          dataCredit.value = response;
        })
        .finally(() => {
          loading.value = false;
        });
    }
  },
  { immediate: true }
);

// const { data: dataCredit, pending } = await useAsyncData(
//   `credits/${props.dataMovie?.id}`,
//   () => getCredits(props.dataMovie?.id),
//   {
//     // lazy: true,
//     // immediate: false,
//     // server: false,
//     transform: (data: any) => {
//       return data.items;
//     },
//   }
// );
</script>

<!-- <style lang="scss" src="./CastCrew.scss"></style> -->
<style lang="scss">
@import url('./CastCrew.scss');
</style>

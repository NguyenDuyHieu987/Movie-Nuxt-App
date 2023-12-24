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
            <SwiperSlide
              v-for="(item, index) in dataCredit?.cast?.slice(0, 20)"
            >
              <CastCard
                :item="item"
                :index="index"
                :key="item.id"
                type="cast"
              />
            </SwiperSlide>
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
            <SwiperSlide
              v-for="(item, index) in dataCredit?.crew?.slice(0, 20)"
            >
              <CastCard
                :item="item"
                :index="index"
                :key="item.id"
                type="crew"
              />
            </SwiperSlide>
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
            <el-skeleton-item
              v-for="(item, index) in 10"
              :key="index"
              class="skeleton-img"
              :index="index"
            />
          </template>
          <template #default>
            <SliderGroup
              :data="dataCredit?.cast?.slice(0, 20)"
              :responsive="responsiveCarousel"
            >
              <template #content>
                <SwiperSlide
                  v-for="(item, index) in dataCredit?.cast?.slice(0, 20)"
                  :key="item.id"
                  :index="index"
                >
                  <CastCard
                    :item="item"
                    type="cast"
                  />
                </SwiperSlide>
              </template>
            </SliderGroup>
          </template>
        </el-skeleton>
      </el-tab-pane>
      <el-tab-pane
        name="crew"
        label="Đội ngũ"
        force-render
      >
        <el-skeleton
          :loading="loading"
          animated
        >
          <template #template>
            <el-skeleton-item
              v-for="(item, index) in 10"
              :key="index"
              class="skeleton-img"
              :index="index"
            />
          </template>
          <template #default>
            <SliderGroup
              :data="dataCredit?.crew?.slice(0, 20)"
              :responsive="responsiveCarousel"
            >
              <template #content>
                <SwiperSlide
                  v-for="(item, index) in dataCredit?.crew?.slice(0, 20)"
                  :key="item.id"
                  :index="index"
                >
                  <CastCard
                    :item="item"
                    type="crew"
                  />
                </SwiperSlide>
              </template>
            </SliderGroup>
          </template>
        </el-skeleton>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { CastCard } from '~/components/CastCrew';
import { SliderGroup } from '~/components/SliderGroup';
import { getCredits } from '~/services/credit';

const props = defineProps<{
  dataMovie: any;
}>();

const dataCredit = ref<any>(props.dataMovie?.credits);
const loading = ref<boolean>(false);
const activeTabCast = ref<string>('cast');
const responsiveCarousel = ref<any>({
  0: {
    slidesPerView: 2
    // slidesPerGroup: 2,
  },
  450: {
    slidesPerView: 3
    // slidesPerGroup: 3,
  },
  600: {
    slidesPerView: 4
    // slidesPerGroup: 4,
  },
  700: {
    slidesPerView: 5
    // slidesPerGroup: 5,
  },
  900: {
    slidesPerView: 4,
    // slidesPerGroup: 4,
    spaceBetween: 3
  },
  1000: {
    slidesPerView: 5
    // slidesPerGroup: 5,
  },
  1100: {
    slidesPerView: 6
    // slidesPerGroup: 6,
  },
  1300: {
    slidesPerView: 7
    // slidesPerGroup: 7,
  },
  1550: {
    slidesPerView: 8,
    // slidesPerGroup: 8,
    spaceBetween: 5
  },
  1700: {
    slidesPerView: 9
    // slidesPerGroup: 9,
  },
  2000: {
    slidesPerView: 10
    // slidesPerGroup: 10,
  }
});

loading.value = true;

useAsyncData(`credits/${props.dataMovie?.id}`, () =>
  getCredits(props.dataMovie?.id)
)
  .then((response) => {
    dataCredit.value = response.data.value;
  })
  .finally(() => {
    loading.value = false;
  });

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

<style lang="scss" src="./CastCrew.scss"></style>

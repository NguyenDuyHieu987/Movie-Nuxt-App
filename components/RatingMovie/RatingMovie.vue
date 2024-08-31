<template>
  <div class="rating-movie">
    <div class="rate-bar">
      <label class="label">
        {{ disabledRate ? 'Đã đánh giá: ' : 'Đánh giá: ' }}
      </label>
      <a-rate
        v-model:value="myRate"
        :class="{ rated: disabledRate }"
        allow-half
        :count="10"
        :tooltips="tooltipRating"
        :disabled="disabledRate"
        @change="handleRating"
      >
        <template #character>
          <StarIcon
            class="icon star"
            width="2.2rem"
            height="2.2rem"
            fill="currentColor"
          />
          <!-- <Icon class="star" name="ant-design:star-filled" /> -->
          <!-- <StarFilled /> -->
        </template>
      </a-rate>
      <span class="ant-rate-text">
        {{ tooltipRating[Math.round(vote_Average) - 1] }}
      </span>
    </div>
    <span class="rate-info">
      <span>(</span>
      <span
        class="rate-score"
        :class="{
          low: vote_Average <= 4,
          medium: vote_Average > 4 && vote_Average <= 7,
          high: vote_Average > 7
        }"
      >
        {{ vote_Average?.toFixed(2) }}
      </span>
      {{ ' điểm' }}
      <span class="separate">/</span>
      {{ `${vote_Count} lượt)` }}
    </span>
  </div>
</template>

<script setup lang="ts">
import StarIcon from '~/assets/svgs/icons/star.svg?component';

import { ElNotification } from 'element-plus';
import { addRankRate } from '~/services/ranks';
import { rating } from '~/services/rating';

const props = defineProps<{
  dataMovie: any;
  ratedValue: number | undefined;
}>();

const authStore = useAuthStore();
const disabledRate = ref<boolean>(!!props.ratedValue);
const myRate = ref<number>(props?.ratedValue || props.dataMovie?.vote_average);
const vote_Average = ref<number>(props.dataMovie?.vote_average);
const vote_Count = ref<number>(props.dataMovie?.vote_count);

const tooltipRating = ref<string[]>([
  'Dở tệ',
  'Dở',
  'Không hay',
  'Không hay lắm',
  'Bình thường',
  'Xem được',
  'Có vẻ hay',
  'Hay',
  'Rất hay',
  'Tuyệt hay'
]);

watch(
  () => props.dataMovie,
  (newVal, oldVal) => {
    // if (!oldVal && newVal) {
    if (newVal) {
      myRate.value = props.dataMovie?.vote_average;
      vote_Average.value = props.dataMovie?.vote_average;
      vote_Count.value = props.dataMovie?.vote_count;
    }
  },
  { immediate: true }
);

watchEffect(() => {
  if (props.ratedValue) {
    disabledRate.value = true;
    myRate.value = props.ratedValue;
  }
});

const handleRating = (value: number) => {
  if (!authStore.isLogin) {
    authStore.isOpenRequireAuthDialog = true;
    return;
  }

  if (props.ratedValue) {
    return;
  }

  rating({
    movie_id: props.dataMovie?.id,
    media_type: props.dataMovie?.media_type,
    value
  })
    .then((response) => {
      if (response?.success == true) {
        ElNotification.success({
          title: MESSAGE.STATUS.SUCCESS,
          message: `Đánh giá ${props.dataMovie.name} thành công: ${value} điểm.`,
          position: 'bottom-right',
          duration: MESSAGE.DURATION.FAST
        });

        vote_Average.value = response?.vote_average;
        vote_Count.value = response?.vote_count;
        disabledRate.value = true;
      }
    })
    .catch((e) => {
      ElNotification.error({
        title: MESSAGE.STATUS.FAILED,
        message: 'Đánh giá phim thất bại.',
        position: 'bottom-right',
        duration: MESSAGE.DURATION.FAST
      });
    });

  addRankRate({
    movie_id: props.dataMovie?.id,
    media_type: props.dataMovie?.media_type,
    rate_value: value
  })
    .then((response) => {
      if (response?.success) {
        // Do something
      }
    })
    .catch((e) => {});
};
</script>

<style lang="scss" src="./RatingMovie.scss"></style>
<!-- <style lang="scss">
@import url('./RatingMovie.scss');
</style> -->

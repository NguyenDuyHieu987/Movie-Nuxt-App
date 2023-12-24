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
          <svg
            class="icon star"
            xmlns="http://www.w3.org/2000/svg"
            width="2.2rem"
            height="2.2rem"
            viewBox="0 0 1024 1024"
          >
            <path
              d="m908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5c-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1l-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2c17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9l183.7-179.1c5-4.9 8.3-11.3 9.3-18.3c2.7-17.5-9.5-33.7-27-36.3z"
            />
          </svg>
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
import { ElNotification } from 'element-plus';

import { addRankRate } from '~/services/ranks';
import { rating } from '~/services/rating';

const props = defineProps<{
  dataMovie: any;
  ratedValue: number | undefined;
}>();

const store = useStore();
const disabledRate = ref<boolean>(!!props.ratedValue);
const myRate = ref<number>(props.ratedValue || props.dataMovie?.vote_average);
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

watchEffect(() => {
  if (props.ratedValue) {
    disabledRate.value = true;
    myRate.value = props.ratedValue;
  }
});

const handleRating = (value: number) => {
  if (!store.isLogin) {
    store.openRequireAuthDialog = true;
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

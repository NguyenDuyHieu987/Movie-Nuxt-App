<template>
  <div
    id="comment"
    class="comment"
  >
    <h2 class="comment-title title-default">
      Bình luận
      <span class="total-comments">{{ `(${total})` }}</span>
    </h2>
    <div class="comment-body">
      <FormComment
        v-model:commentsList="commentsList"
        :movie-id="dataMovie?.id"
        :movie-type="dataMovie?.media_type"
        action="post"
      />

      <!-- <LoadingCircle v-show="loading" class="loading-comment" /> -->

      <!-- <LoadingSpinner v-show="loading" class="loading-comment" :width="35" /> -->

      <div
        v-show="!loading"
        class="list-comment"
      >
        <LazyCommentItem
          v-for="(item, index) in commentsList"
          :key="item?.id"
          v-model:commentsList="commentsList"
          :index="index"
          :item="item"
          :movie-id="dataMovie?.id"
          :movie-type="dataMovie?.media_type"
        />
      </div>

      <!-- <LoadingCircle
        v-show="loadMore "
        class="loading-comment"
      /> -->

      <LazyLoadingSpinner
        v-show="loading || loadMore"
        class="loading-comment"
        :width="35"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
// import { FormComment, CommentItem } from '~/components/Comment';
// import {
//   // LoadingCircle,
//   LoadingSpinner
// } from '~/components/Loading';
import FormComment from '~/components/Comment/FormComment/FormComment.vue';
// import CommentItem from '~/components/Comment/CommentItem/CommentItem.vue';
// import LoadingSpinner from '~/components/Loading/LoadingSpinner/LoadingSpinner.vue';
import { getCommentParent } from '~/services/comment';
import type { commentForm } from '~/types';

const props = defineProps<{
  dataMovie: any;
}>();

const utils = useUtils();
const commentsList = ref<commentForm[]>([]);
const loading = ref<boolean>(false);
const skip = ref<number>(1);
const total = ref<number>(0);
const loadMore = ref<boolean>(false);

onMounted(() => {
  window.onscroll = async () => {
    if (commentsList.value?.length == 0) {
      return;
    }

    if (
      utils.isScrollBottom() &&
      total.value > 20 &&
      commentsList.value?.length < total.value
    ) {
      loadMore.value = true;

      await getCommentParent(
        props.dataMovie?.id,
        props.dataMovie?.media_type,
        skip.value
      )
        .then((response) => {
          if (response?.results.length > 0) {
            commentsList.value = commentsList.value.concat(response?.results);
            skip.value++;
          }
        })
        .catch((e) => {})
        .finally(() => {
          loadMore.value = false;
        });
    }
  };
});

loading.value = true;

// useAsyncData(
//   `${props.dataMovie?.media_type}/${props.dataMovie?.id}`,
//   () =>
//     getCommentParent(
//       props.dataMovie?.id,
//       props.dataMovie?.media_type,
//       skip.value
//     )
// )
getCommentParent(props.dataMovie?.id, props.dataMovie?.media_type, skip.value)
  .then((response) => {
    commentsList.value = response?.results;
    total.value = response?.total;
    skip.value = 2;
  })
  .catch((e) => {})
  .finally(() => {
    loading.value = false;
  });
</script>

<!-- <style lang="scss" src="./Comment.scss"></style> -->
<style lang="scss">
@import url('./Comment.scss');
</style>

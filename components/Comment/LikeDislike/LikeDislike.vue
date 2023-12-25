<template>
  <div class="like-dislike-comment">
    <!-- <Icon name="ph:thumbs-up" />
         <Icon name="ph:thumbs-down" /> -->
    <div
      class="like"
      :class="{
        active: true
      }"
    >
      <LikeFilled
        v-if="isLike"
        @click="handleLikeComment"
      />
      <LikeOutlined
        v-else
        @click="handleLikeComment"
      />

      <span
        v-if="like > 0"
        class="total"
        >{{ like }}</span
      >
    </div>

    <div class="dislike">
      <DislikeFilled
        v-if="isDisLike"
        @click="handleDisLikeComment"
      />
      <DislikeOutlined
        v-else
        @click="handleDisLikeComment"
      />
      <span
        v-if="dislike > 0"
        class="total"
        >{{ dislike }}</span
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  DislikeFilled,
  DislikeOutlined,
  LikeFilled,
  LikeOutlined
} from '@ant-design/icons-vue';
import { ElNotification } from 'element-plus';

import {
  CheckLikeDislike,
  DisLikeComment,
  LikeComment
} from '~/services/comment';

const props = defineProps<{
  comment: any;
}>();

const store = useStore();
const like = ref<number>(props.comment?.like || 0);
const dislike = ref<number>(props.comment?.dislike || 0);
const isLike = ref<boolean>(false);
const isDisLike = ref<boolean>(false);

onBeforeMount(async () => {
  if (store.isLogin) {
    if (props.comment.is_like) {
      isLike.value = true;
      return;
    }

    if (props.comment.is_dislike) {
      isDisLike.value = true;
    }

    // await useAsyncData(`check-like-dislike/${props.comment?.id}`, () =>
    //   CheckLikeDislike(props.comment?.id)
    // ).then((response) => {
    //   if (response.data.value?.success) {
    //     switch (response.data.value?.type) {
    //       case 'like':
    //         isLike.value = true;
    //         break;
    //       case 'dislike':
    //         isDisLike.value = true;
    //         break;
    //     }
    //   }
    // });
  }
});

const handleLikeComment = () => {
  if (!store.isLogin) {
    store.openRequireAuthDialog = true;
    return;
  }

  const tempDisLide = isDisLike.value;

  if (tempDisLide) {
    isDisLike.value = false;
    dislike.value--;
  }

  if (isLike.value == false) {
    isLike.value = true;
    like.value++;
  } else {
    isLike.value = false;
    like.value--;
  }

  LikeComment({ id: props.comment.id })
    .then((response) => {
      if (response?.success) {
        // Do something
      }
    })
    .catch((e) => {
      if (tempDisLide) {
        isDisLike.value = true;
        dislike.value++;
      }

      if (isLike.value == true) {
        isLike.value = false;
        like.value--;
      } else {
        isLike.value = true;
        like.value++;
      }
      ElNotification.error({
        title: MESSAGE.STATUS.FAILED,
        message: 'Thích bình luận thất bại',
        position: 'bottom-right',
        duration: MESSAGE.DURATION.FAST
      });
    });
};

const handleDisLikeComment = () => {
  if (!store.isLogin) {
    store.openRequireAuthDialog = true;
    return;
  }

  const tempLide = isLike.value;

  if (tempLide) {
    isLike.value = false;
    like.value--;
  }

  if (isDisLike.value == false) {
    isDisLike.value = true;
    dislike.value++;
  } else {
    isDisLike.value = false;
    dislike.value--;
  }

  DisLikeComment({ id: props.comment.id })
    .then((response) => {
      if (response?.success) {
        // Do something
      }
    })
    .catch((e) => {
      if (tempLide) {
        isLike.value = true;
        like.value++;
      }

      if (isDisLike.value == true) {
        isDisLike.value = false;
        dislike.value--;
      } else {
        isDisLike.value = true;
        dislike.value++;
      }
      ElNotification.error({
        title: MESSAGE.STATUS.FAILED,
        message: 'Dislike bình luận thất bại',
        position: 'bottom-right',
        duration: MESSAGE.DURATION.FAST
      });
    });
};
</script>

<style lang="scss" src="./LikeDislike.scss"></style>

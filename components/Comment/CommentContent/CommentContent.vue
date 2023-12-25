<template>
  <div
    ref="commentContentEl"
    class="comment-content"
    :class="{
      collapse: !isShowMore && commentContent.length > 8000,
      'show-more': isShowMore && commentContent.length > 8000
    }"
  >
    <div class="comment-content-box">
      <slot name="replyTo" />

      <!-- <p>{{ commentContent }}</p> -->

      <div
        class="formatted-comment"
        v-html="sanitizedHtmlComment"
      ></div>
    </div>

    <span
      v-if="!isShowMore && commentContent.length > 8000"
      class="show-more"
      @click="isShowMore = true"
    >
      Đọc thêm
    </span>
    <span
      v-else-if="isShowMore && commentContent.length > 8000"
      class="collapse"
      @click="handleClickCollapse"
    >
      Thu gọn
    </span>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    sanitizedHtmlComment: string;
    commentContent: string;
  }>(),
  {
    sanitizedHtmlComment: '',
    commentContent: ''
  }
);

const commentContentEl = ref<HTMLElement>();
const isShowMore = ref<boolean>(false);

const handleClickCollapse = () => {
  isShowMore.value = false;
  commentContentEl.value?.scrollIntoView();
};
</script>

<style lang="scss" src="./CommentContent.scss"></style>

<template>
  <div
    :id="item?.id"
    ref="commentItemChild"
    class="comment-item-child"
  >
    <div class="comment-item-child-container">
      <div class="author">
        <div class="author-image">
          <NuxtImg
            class="avatar"
            :src="
              !isNaN(+item?.user_avatar!)
                ? getImage(`account${item?.user_avatar}.jpg`, 'user_avatar', {
                    w: 50
                  })
                : item?.user_avatar
            "
            loading="lazy"
            alt=""
          />
        </div>
      </div>
      <div class="right-side">
        <div class="top">
          <span class="author-username">{{ item?.username }}</span>
          <span class="created-at">
            {{ utils.dateTimeFormater.fromNow(item?.created_at!) }}
          </span>
          <span
            v-if="isUpdated"
            class="updated-text"
          >
            (Đã chỉnh sửa)
          </span>
        </div>

        <CommentContent
          :sanitized-html-comment="sanitizedHtmlComment"
          :commentContent="commentContent"
        >
          <!-- <template #replyTo>
            <div v-if="item?.reply_to" class="reply-to" @click="onClickReplyTo">
              <span> @{{ commentReplyTo?.username || 'Đi tới' }} </span>
            </div>
          </template> -->
        </CommentContent>

        <div class="actions-comment">
          <LikeDislike :comment="item" />

          <a-button
            class="reply click-active"
            type="text"
            @click="isShowFormComment = !isShowFormComment"
          >
            <!-- :disabled="userAccount?.id == item?.user_id" -->
            Phản hồi
          </a-button>
        </div>

        <FormComment
          v-show="isShowFormComment"
          v-model:commentsList="listReplies"
          v-model:commentContent="commentContent"
          :movie-id="item?.movie_id!"
          :movie-type="item?.movie_type!"
          :showActions="true"
          :parent="parent"
          :comment="item"
          :is-show-form-comment="isShowFormComment"
          comment-type="children"
          :action="commentAction"
          :reply-to="item"
          @on-click-cancel="isShowFormComment = false"
          @on-success-comment-child="handleSuccessCommentChild"
          @on-success-edit-comment="handleSuccessEditComment"
        />
      </div>

      <div class="more-actions">
        <el-dropdown
          v-if="userAccount?.id == item?.user_id"
          trigger="click"
          class="dropdown-viewmore"
          popper-class="dropdown-viewmore"
          placement="bottom-end"
          :show-timeout="0"
        >
          <a-button
            class="viewmore-btn click-active"
            type="text"
            aria-label="dropdown-comment"
          >
            <template #icon>
              <EllipsisVertical
                width="2rem"
                height="2rem"
                fill="currentColor"
              />
            </template>
          </a-button>

          <template #dropdown>
            <el-dropdown-menu class="dropdown-viewmore">
              <div class="main-action">
                <el-dropdown-item
                  key="edit-comment"
                  class="edit-item"
                  @click="handleEditComment"
                >
                  <Pencil
                    width="1.8rem"
                    height="1.8rem"
                    fill="currentColor"
                  />
                  <span>Chỉnh sửa</span>
                </el-dropdown-item>
              </div>

              <div class="separate"></div>

              <div class="danger-zone">
                <el-dropdown-item
                  key="remove-comment"
                  class="remove-item"
                  @click="handleRemoveComment"
                >
                  <TrashCan
                    width="1.5rem"
                    height="1.5rem"
                    fill="currentColor"
                  />
                  <span>Xóa bình luận</span>
                </el-dropdown-item>
              </div>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import EllipsisVertical from '~/assets/svgs/icons/ellipsis-vertical.svg?component';
import Pencil from '~/assets/svgs/icons/pencil.svg?component';
import TrashCan from '~/assets/svgs/icons/trash-can.svg?component';

// import { FormComment, CommentContent, LikeDislike } from '~/components/Comment';
import FormComment from '~/components/Comment/FormComment/FormComment.vue';
import CommentContent from '~/components/Comment/CommentContent/CommentContent.vue';
import LikeDislike from '~/components/Comment/LikeDislike/LikeDislike.vue';
import { DeleteComment } from '~/services/comment';
import { getImage } from '~/services/image';
import { ElNotification } from 'element-plus';
import DOMPurify from 'dompurify';
import reject from 'lodash/reject';
import { storeToRefs } from 'pinia';
import type { commentForm } from '~/types';

const props = defineProps<{
  // movieId: string;
  // movieType: string;
  item: commentForm;
  parent: commentForm;
  onLoadMoreReplies: () => void;
}>();

const emits = defineEmits<{
  onSuccessCommentChild: [data: commentForm];
  omSuccessRemoveCommentChild: [];
}>();

const utils = useUtils();
const authStore = useAuthStore();
const { userAccount } = storeToRefs<any>(authStore);
const commentItemChild = ref<HTMLElement>();
const listReplies = defineModel<any[]>('listReplies');
const isShowFormComment = ref<boolean>(false);
const commentAction = ref<string>('post');
const commentContent = ref<string>(props.item?.content || '');
const isUpdated = ref<boolean>(props.item?.updated || false);
const commentReplyTo = computed<commentForm>(() =>
  props.item?.reply_to
    ? listReplies.value!.find((x: commentForm) => x!.id == props.item?.reply_to)
    : null
);
const sanitizedHtmlComment = computed<string>(() => {
  // Sử dụng DOMPurify để loại bỏ HTML độc hại
  return DOMPurify.sanitize(commentContent.value, {
    USE_PROFILES: { html: true }
  });
});

onMounted(() => {
  window.onclick = (e: any) => {
    if (!e.target.closest('.comment-item-child .formatted-comment .reply-to')) {
      const listRepliesEl = document.querySelectorAll(
        `.comment-item-child`
      ) as NodeListOf<Element>;

      listRepliesEl.forEach((el) => el.classList.remove('focused'));
    }
  };

  const replyToEl = commentItemChild.value!.querySelector(
    '.formatted-comment .reply-to'
  ) as HTMLElement;

  if (replyToEl) {
    replyToEl.addEventListener('click', onClickReplyTo);
  }
});

const handleSuccessCommentChild = (data: commentForm) => {
  emits('onSuccessCommentChild', data);
};

const handleEditComment = () => {
  isShowFormComment.value = !isShowFormComment.value;
  if (isShowFormComment.value) {
    commentAction.value = 'edit';
  }
};

const handleSuccessEditComment = (data: string) => {
  isUpdated.value = true;
  isShowFormComment.value = false;
  commentContent.value = data;
};

const handleRemoveComment = () => {
  DeleteComment({
    id: props.item!?.id,
    movieId: props.item!?.movie_id,
    parentId: props.parent!?.id,
    movieType: props.item!?.movie_type,
    commentType: 'children'
  })
    .then((response) => {
      if (response?.success) {
        listReplies.value = reject(listReplies.value, (x) => {
          return x.id === props.item?.id;
        });

        ElNotification.success({
          title: MESSAGE.STATUS.SUCCESS,
          message: 'Xóa bình luận thành công.',
          position: 'bottom-right',
          duration: MESSAGE.DURATION.FAST
        });

        emits('omSuccessRemoveCommentChild');
      }
    })
    .catch((e) => {
      ElNotification.error({
        title: MESSAGE.STATUS.FAILED,
        message: 'Xóa bình luận thất bại',
        position: 'bottom-right',
        duration: MESSAGE.DURATION.FAST
      });
    })
    .finally(() => {});
};

const onClickReplyTo = async () => {
  if (commentReplyTo.value) {
    const replyToEl = document.getElementById(
      props.item?.reply_to!
    ) as HTMLElement;

    // const listRepliesEl = document.querySelectorAll(
    //   `.comment-item-child[data-parent-id='${props.parent?.id}']`
    // ) as NodeListOf<Element>;

    const listRepliesEl = document.querySelectorAll(
      `.comment-item-child`
    ) as NodeListOf<Element>;

    // console.log(listRepliesEl);

    listRepliesEl.forEach((el) => el.classList.remove('focused'));

    replyToEl.classList.toggle('focused');

    replyToEl.scrollIntoView({ block: 'center' });
  } else {
    props.onLoadMoreReplies();
  }
};
</script>

<style lang="scss" src="./CommentItemChild.scss"></style>
<!-- <style lang="scss">
@import url('./CommentItemChild.scss');
</style> -->

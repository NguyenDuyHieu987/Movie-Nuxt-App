<template>
  <a-form
    class="comment-form"
    :class="{
      small: props.commentType == 'children'
    }"
    @submit="onSubmit"
  >
    <div class="author">
      <div class="author-image">
        <NuxtImg
          v-if="isLogin && userAccount?.avatar && !store.loadingUser"
          class="avatar"
          :src="
            !isNaN(+userAccount?.avatar)
              ? getImage(
                  `account${userAccount?.avatar}.jpg`,
                  'user_avatar',
                  'w-50'
                )
              : userAccount?.avatar
          "
          loading="lazy"
          alt=""
        />

        <NuxtImg
          v-else
          :src="getImage(`user.png`, 'comment_avatar')"
          loading="lazy"
          alt=""
        />
      </div>
    </div>
    <div
      class="comment-input"
      :class="{
        focus: isFocus
      }"
    >
      <div
        v-if="replyTo"
        class="reply-to"
      >
        <span>
          @{{ commentsList!.find((x: any) => x!.id == replyTo)?.username }}
        </span>
      </div>

      <!-- allowClear -->
      <a-textarea
        ref="commentTextAreaField"
        v-model:value="content"
        class="comment-input-field"
        show-count
        :maxlength="3000"
        :auto-size="{ minRows: 1, maxRows: 10 }"
        placeholder="Viết bình luận..."
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      />

      <!-- <el-input
        class="comment-input-field"
        v-model="comment"
        :maxlength="3000"
        show-word-limit
        type="textarea"
        :autosize="{ minRows: 1, maxRows: 4 }"
        placeholder="Please input"
      /> -->

      <div
        class="actions"
        :class="{
          active: isShowActions || showActions
        }"
      >
        <div class="actions-container">
          <div class="left">
            <!-- <Icon name="ic:baseline-insert-emoticon" class="emoticon" /> -->

            <svg
              class="emoticon"
              xmlns="http://www.w3.org/2000/svg"
              width="2.2rem"
              height="2.2rem"
              viewBox="0 0 24 24"
              @click="isShowEmoji = !isShowEmoji"
            >
              <path
                fill="currentColor"
                d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8s8 3.58 8 8s-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8S14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8S7 8.67 7 9.5S7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"
              />
            </svg>

            <ClientOnly>
              <EmojiPicker
                v-if="isShowEmoji"
                :class="'emoji-picker-' + comment?.id"
                :native="true"
                :display-recent="true"
                :static-texts="{
                  placeholder: 'Tìm kiếm biểu tượng cảm xúc'
                }"
                :hide-group-names="true"
                :disable-sticky-group-names="true"
                :disable-skin-tones="true"
                @select="onSelectEmoji"
              />
            </ClientOnly>
          </div>
          <div class="right">
            <a-button
              class="cancel click-active"
              type="text"
              @click="handleClickCanel"
            >
              Hủy
            </a-button>
            <a-button
              class="comment-btn click-active"
              type="text"
              html-type="submit"
              :disabled="disabledButton"
              :loading="loading"
            >
              {{ action == 'edit' ? 'Lưu' : 'Bình luận' }}
            </a-button>
          </div>
        </div>
      </div>
    </div>
  </a-form>
</template>

<script setup lang="ts">
import 'vue3-emoji-picker/css';
import EmojiPicker from 'vue3-emoji-picker';
import DOMPurify from 'dompurify';
import { ElNotification } from 'element-plus';
import { storeToRefs } from 'pinia';

import { CommentMovie, EditComment } from '~/services/comment';
import { getImage } from '~/services/image';
import type { commentForm } from '~/types';

// const props = defineProps({
//   movieId: { type: String },
//   parent: { type: Object },
//   comment: { type: commentForm },
//   movieType: { type: String },
//   replyTo: { type: String, default: '' },
//   commentType: { type: String, default: 'parent' },
//   action: { type: String, default: 'post' },
//   showActions: { type: Boolean, default: false },
//   isShowFormComment: { type: Boolean, default: false },
// });

const props = withDefaults(
  defineProps<{
    movieId: string;
    movieType: string;
    parent?: commentForm;
    comment?: commentForm;
    replyTo?: commentForm;
    commentType?: string;
    action?: 'post' | 'edit' | string;
    showActions?: boolean;
    isShowFormComment?: boolean;
  }>(),
  {
    parent: null,
    comment: null,
    replyTo: null,
    commentType: 'parent',
    action: 'post',
    showActions: false,
    isShowFormComment: false
  }
);

const emits = defineEmits<{
  onClickCancel: [];
  onSuccessCommentChild: [data: commentForm];
  onSuccessEditComment: [data: string];
}>();

const store = useStore();
const { isLogin, userAccount } = storeToRefs<any>(store);
const content = ref<string>('');
const commentTextAreaField = ref<HTMLTextAreaElement>();
const isFocus = ref<boolean>(false);
const isShowActions = ref<boolean>(false);
const disabledButton = ref<boolean>(true);
const loading = ref<boolean>(false);
const isShowEmoji = ref<boolean>(false);
const commentsList = defineModel<commentForm[]>('commentsList');
const formattedComment = computed(() => {
  // Sử dụng DOMPurify để loại bỏ HTML độc hại
  return DOMPurify.sanitize(content.value, { USE_PROFILES: { html: true } });
});

onMounted(() => {
  // window.addEventListener('click', (e: any) => {
  //   if (
  //     !e.target.closest('.emoji-picker-' + props.comment?.id) &&
  //     !e.target.closest('.comment-form .actions-container .left .emoticon')
  //   ) {
  //     console.log(isShowEmoji.value);
  //     if (isShowEmoji.value) {
  //       isShowEmoji.value = false;
  //     }
  //   }
  // });
});

watchEffect(async () => {
  if (props.isShowFormComment) {
    switch (props.action) {
      case 'post':
        content.value = '';
        break;
      case 'edit':
        content.value = props.comment?.content!;
        break;
    }

    await wait(10);

    commentTextAreaField.value!.focus();
  }
});

const handleChange = (e: any) => {
  switch (props.action) {
    case 'post':
      disabledButton.value = content.value.length == 0;
      break;
    case 'edit':
      disabledButton.value =
        content.value.length == 0 || content.value == props.comment?.content;
      break;
  }
};

const handleFocus = (e: any) => {
  if (!store.isLogin) {
    store.openRequireAuthDialog = true;
    e.target.blur();
    return;
  }

  isFocus.value = true;
  isShowActions.value = true;
};

const handleBlur = (e: any) => {
  isFocus.value = false;
};

const onSubmit = () => {
  loading.value = true;

  switch (props.action) {
    case 'post':
      CommentMovie({
        // content: content.value,
        content: formattedComment.value,
        movieId: props.movieId!,
        parentId:
          props.commentType == 'children' ? props.parent?.id : undefined,
        replyTo:
          props.commentType == 'children' && props?.replyTo
            ? props.replyTo.id
            : undefined,
        movieType: props.movieType!,
        commentType: props.commentType!
      })
        .then((response) => {
          if (response?.success) {
            if (props.commentType == 'parent') {
              commentsList.value?.unshift(response?.result);
            } else if (props.commentType == 'children') {
              emits('onClickCancel');
              emits('onSuccessCommentChild', response?.result);
            }

            content.value = '';
            disabledButton.value = true;
            isShowEmoji.value = false;
          }
        })
        .catch((e) => {})
        .finally(async () => {
          await wait(500);

          loading.value = false;
        });
      break;
    case 'edit':
      EditComment({
        id: props.comment!?.id,
        movieId: props.movieId!,
        movieType: props.movieType!,
        commentType: props.commentType,
        // content: content.value,
        content: formattedComment.value
      })
        .then((response) => {
          if (response?.success) {
            ElNotification.success({
              title: MESSAGE.STATUS.SUCCESS,
              message: 'Chỉnh sửa bình luận thành công.',
              position: 'bottom-right',
              duration: MESSAGE.DURATION.FAST
            });

            content.value = '';
            disabledButton.value = true;
            isShowEmoji.value = false;

            emits('onSuccessEditComment', response?.content);
          }
        })
        .catch((e) => {
          ElNotification.error({
            title: MESSAGE.STATUS.FAILED,
            message: 'Chỉnh sửa bình luận thất bại',
            position: 'bottom-right',
            duration: MESSAGE.DURATION.FAST
          });
        })
        .finally(() => {
          loading.value = false;
        });
      break;
  }
};

const handleClickCanel = () => {
  isShowEmoji.value = false;
  isShowActions.value = false;
  content.value = '';
  emits('onClickCancel');
};

const onSelectEmoji = (emoji: any) => {
  // console.log(emoji);
  content.value += emoji.i;
  disabledButton.value = content.value.length == 0;
};
</script>

<style lang="scss" src="./FormComment.scss"></style>

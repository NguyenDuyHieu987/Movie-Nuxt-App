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
          v-if="isLogin && userAccount?.avatar && !authStore.loadingUser"
          class="avatar"
          :src="getUserAvatar(userAccount?.avatar)"
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
      <div class="contenteditable-input-field">
        <div
          id="contenteditable-root"
          ref="contenteditableInputField"
          :class="{
            changed:
              contenteditableInputField!?.innerText.length > 0 || isChanged
          }"
          contenteditable
          aria-label="Viết bình luận..."
          @change="handleChange"
          @input="handleChange"
          @focus="handleFocus"
          @blur="handleBlur"
        ></div>
      </div>

      <div
        class="actions-comment"
        :class="{
          active: isShowActions || showActions
        }"
      >
        <div class="actions-container">
          <div class="left">
            <!-- <Icon name="ic:baseline-insert-emoticon" class="emoticon" /> -->

            <SvgoEmoticon
              class="emoticon"
              width="2.2rem"
              height="2.2rem"
              fill="currentColor"
              @click="isShowEmoji = !isShowEmoji"
            />

            <LazyEmojiPicker
              v-if="isShowEmoji"
              @select="onSelectEmoji"
            />
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
// import SvgoEmoticon from '~/assets/svgs/icons/emoticon.svg?component';

// import EmojiPicker from '~/components/Comment/EmojiPicker/EmojiPicker.vue';
import { CommentMovie, EditComment } from '~/services/comment';
import { getImage, getUserAvatar } from '~/services/image';
import { ElNotification } from 'element-plus';
import DOMPurify from 'dompurify';
import { storeToRefs } from 'pinia';
import type { commentForm } from '~/types';

// const props = defineProps({
//   movieId: { type: String },
//   movieType: { type: String },
//   parent: { type: commentForm },
//   comment: { type: commentForm },
//   replyTo: { type: commentForm },
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

const utils = useUtils();
const store = useStore();
const authStore = useAuthStore();
const { isLogin, userAccount } = storeToRefs(authStore);
const contenteditableInputField = ref<HTMLDivElement>();
const content = ref<string>('');
const isFocus = ref<boolean>(false);
const isShowActions = ref<boolean>(false);
const disabledButton = ref<boolean>(true);
const loading = ref<boolean>(false);
const isShowEmoji = ref<boolean>(false);
const commentsList = defineModel<commentForm[]>('commentsList');
const commentContent = defineModel<string>('commentContent', { default: '' });
const sanitizedHtmlComment = ref<string>(
  props.commentType == 'children' && props?.replyTo
    ? DOMPurify.sanitize(
        `<span class="reply-to">@${props.replyTo!.username}&nbsp;</span>`,
        {
          USE_PROFILES: { html: true }
        }
      )
    : ''
);
const replyToFirstEl = computed<string>(() =>
  DOMPurify.sanitize(
    `<span class="reply-to">@${props.replyTo!.username}&nbsp;</span>`,
    {
      USE_PROFILES: { html: true }
    }
  )
);
const isChanged = ref<boolean>(false);

onMounted(() => {
  window.onclick = (e: any) => {
    if (e.target?.closest('.emoticon')) return;

    const v3EmojiPicker = document.body.querySelector(
      '.v3-emoji-picker.emoji-picker'
    );

    if (!e.target?.closest('.v3-emoji-picker.emoji-picker') && v3EmojiPicker)
      isShowEmoji.value = false;
  };
});

watchEffect(async () => {
  if (props.isShowFormComment) {
    switch (props.action) {
      case 'post':
        if (contenteditableInputField.value) {
          contenteditableInputField.value!.innerHTML = '';
        }
        break;
      case 'edit':
        contenteditableInputField.value!.innerHTML = commentContent.value;
        break;
    }

    if (
      props.action == 'post' &&
      props.commentType == 'children' &&
      props?.replyTo
    ) {
      contenteditableInputField.value!.insertAdjacentHTML(
        'afterbegin',
        replyToFirstEl.value
      );

      const replyToEl = contenteditableInputField.value?.querySelector(
        '.reply-to'
      ) as HTMLElement;
      replyToEl.setAttribute('contenteditable', 'false');
    }

    await wait(10);

    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(contenteditableInputField.value!);
    range.collapse(false);
    selection!.removeAllRanges();
    selection!.addRange(range);

    contenteditableInputField.value!.focus();
  }
});

const handleChange = async (e: any) => {
  const actualValueInput =
    contenteditableInputField.value!?.innerText == '\n'
      ? contenteditableInputField.value!?.innerText.replace('\n', '')
      : contenteditableInputField.value!?.innerText;

  if (actualValueInput.length >= 3000) {
    contenteditableInputField.value!.innerHTML =
      contenteditableInputField.value!.innerHTML.slice(0, 3000);
    e.preventDefault();
    return;
  }

  if (actualValueInput.length > 0) {
    isChanged.value = true;
  } else {
    contenteditableInputField.value!.innerHTML = '';
    isChanged.value = false;
  }

  if (props.commentType == 'children' && props?.replyTo) {
    if (
      e.inputType == 'deleteContentBackward' ||
      e.inputType == 'deleteContentForward'
    ) {
      const replyToEl = contenteditableInputField.value?.querySelector(
        '.reply-to'
      ) as HTMLElement;

      if (
        replyToEl?.innerText.trim().length <
        ('@' + props?.replyTo.username).length
      ) {
        replyToEl.remove();
      }
    } else {
      if (
        contenteditableInputField.value?.innerText.toLocaleLowerCase().trim() ==
        '@' + props?.replyTo!.username.toLocaleLowerCase()
      ) {
        contenteditableInputField.value!.innerHTML = '';

        contenteditableInputField.value!.insertAdjacentHTML(
          'afterbegin',
          replyToFirstEl.value
        );

        const replyToEl = contenteditableInputField.value?.querySelector(
          '.reply-to'
        ) as HTMLElement;
        replyToEl.setAttribute('contenteditable', 'false');

        const range = document.createRange();
        const selection = window.getSelection();
        range.selectNodeContents(contenteditableInputField.value!);
        range.collapse(false);
        selection!.removeAllRanges();
        selection!.addRange(range);
      }
    }
  }

  sanitizedHtmlComment.value = DOMPurify.sanitize(
    contenteditableInputField.value!.innerHTML,
    {
      USE_PROFILES: { html: true }
    }
  );
  // .replaceAll(/&nbsp;/g, ' ');

  switch (props.action) {
    case 'post':
      disabledButton.value = actualValueInput.length == 0;
      break;
    case 'edit':
      disabledButton.value =
        actualValueInput.length == 0 ||
        contenteditableInputField.value?.innerHTML == commentContent.value;
      break;
  }
};

const handleFocus = (e: any) => {
  if (!authStore.isLogin) {
    authStore.isOpenRequireAuthDialog = true;
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
        content: sanitizedHtmlComment.value,
        movieId: props.movieId!,
        parentId:
          props.commentType == 'children' ? props.parent?.id : undefined,
        replyTo:
          props.commentType == 'children' && props?.replyTo
            ? props.replyTo.id
            : undefined,
        movieType: props.movieType!,
        commentType: props.commentType
      })
        .then((response) => {
          if (response?.success) {
            if (props.commentType == 'parent') {
              commentsList.value?.unshift(response?.result);
            } else if (props.commentType == 'children') {
              emits('onClickCancel');
              emits('onSuccessCommentChild', response?.result);
            }

            isChanged.value = false;
            disabledButton.value = true;
            isShowEmoji.value = false;
            contenteditableInputField.value!.innerHTML = '';
          }
        })
        .catch((e) => {})
        .finally(() => {
          loading.value = false;
        });
      break;
    case 'edit':
      EditComment({
        id: props.comment!?.id,
        movieId: props.movieId!,
        movieType: props.movieType!,
        commentType: props.commentType!,
        // content: content.value,
        content: sanitizedHtmlComment.value
      })
        .then((response) => {
          if (response?.success) {
            ElNotification.success({
              title: MESSAGE.STATUS.SUCCESS,
              message: 'Chỉnh sửa bình luận thành công.',
              position: 'bottom-right',
              duration: MESSAGE.DURATION.FAST
            });

            isChanged.value = false;
            disabledButton.value = true;
            isShowEmoji.value = false;
            contenteditableInputField.value!.innerHTML = '';

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
  isChanged.value = false;
  isShowEmoji.value = false;
  isShowActions.value = false;
  disabledButton.value = true;
  contenteditableInputField.value!.innerHTML = '';
  emits('onClickCancel');
};

const onSelectEmoji = (emoji: any) => {
  contenteditableInputField.value!.innerHTML += emoji.i;

  const actualValueInput =
    contenteditableInputField.value!?.innerText == '\n'
      ? contenteditableInputField.value!?.innerText.replace('\n', '')
      : contenteditableInputField.value!?.innerText;

  // console.log(emoji);
  if (utils.isStringEmpty(actualValueInput)) {
    contenteditableInputField.value!.innerHTML += emoji.i;
  }

  sanitizedHtmlComment.value = DOMPurify.sanitize(
    contenteditableInputField.value!.innerHTML,
    {
      USE_PROFILES: { html: true }
    }
  );

  isChanged.value = true;

  // disabledButton.value = content.value.length == 0;
  disabledButton.value = actualValueInput.length == 0;
};
</script>

<style lang="scss" src="./FormComment.scss"></style>
<!-- <style lang="scss">
@import url('./FormComment.scss');
</style> -->

<template>
  <div class="live-comments">
    <div class="live-comments-container">
      <div class="comments-header">
        <h3>Bình luận trực tiếp</h3>
      </div>
      <div
        class="comments-list"
        ref="commentsList"
      >
        <div
          class="comment-item"
          v-for="comment in comments"
          :key="comment.id"
        >
          <div class="comment-author">
            <div
              class="comment-author-wrapper"
              :title="
                authStore.isLogin &&
                comment.author.id == authStore.userAccount!.id
                  ? 'Bạn'
                  : comment.author?.username
              "
            >
              <NuxtImg
                class="avatar"
                :src="
                  !isNaN(+comment.author?.avatar!)
                    ? getImage(
                        `account${comment.author?.avatar}.jpg`,
                        'user_avatar',
                        {
                          w: 50
                        }
                      )
                    : comment.author?.avatar
                "
                loading="lazy"
                alt=""
              />
              <!-- <span class="user-name">
                {{
                  comment.author.id == authStore.userAccount!.id
                    ? 'Bạn'
                    : authStore.userAccount?.username
                }}
              </span> -->
            </div>
          </div>
          <div class="timestamp">
            {{
              new Date(comment.timestamp).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
              })
            }}
          </div>
          <div class="live-comment-content">
            {{ comment.content }}
          </div>
          <!-- <div
            class="live-comment-content"
            v-html="comment.content"
          ></div> -->
        </div>
      </div>
      <div class="comments-input">
        <!-- <input
          v-model="newComment"
          type="text"
          placeholder="Trò chuyện..."
          @keyup.enter="sendComment"
        /> -->

        <div class="contenteditable-input-field">
          <div
            ref="contenteditableInputField"
            id="contenteditable-root"
            :class="{
              changed: isChanged
            }"
            contenteditable
            aria-label="Trò chuyện..."
            @change="handleChange"
            @input="handleChange"
            @focus="handleFocus"
            @blur="handleBlur"
            @keydown="handleKeyDown"
          ></div>
        </div>

        <div class="live-comment-actions">
          <Emoticon
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

          <a-button
            v-if="isChanged"
            class="btn-send-comment click-active"
            type="text"
            @click="sendComment"
          >
            Gửi
          </a-button>

          <div
            class="heart-emoji"
            v-else
          >
            <el-dropdown
              popper-class="heart-emoji-dropdown"
              placement="top"
            >
              <HeartIcon
                class="heart-icon"
                width="2.2rem"
                height="2.2rem"
                fill="currentColor"
              />
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="sendEmoji('smile')">
                    <NotoSmilingFace
                      class="NotoSmilingFace-icon"
                      :class="{ animate: isAnimateEmoji }"
                      width="2.2rem"
                      height="2.2rem"
                    />
                  </el-dropdown-item>
                  <el-dropdown-item @click="sendEmoji('smile-sweat')">
                    <NotoSmilingFaceSweat
                      class="NotoSmilingFaceSweat-icon"
                      width="2.2rem"
                      height="2.2rem"
                    />
                  </el-dropdown-item>

                  <el-dropdown-item @click="sendEmoji('heart')">
                    <NotoRedHeart
                      class="NotoRedHeart-icon"
                      width="2.2rem"
                      height="2.2rem"
                    />
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <div
              class="animate-emoji"
              :class="{ animate: isAnimateEmoji }"
            >
              <NotoSmilingFace
                v-if="animateEmojiType == 'smile'"
                class="NotoSmilingFace-icon"
                width="2.2rem"
                height="2.2rem"
              />
              <NotoSmilingFaceSweat
                v-else-if="animateEmojiType == 'smile-sweat'"
                class="NotoSmilingFaceSweat-icon"
                width="2.2rem"
                height="2.2rem"
              />
              <NotoRedHeart
                v-else-if="animateEmojiType == 'heart'"
                class="NotoRedHeart-icon"
                width="2.2rem"
                height="2.2rem"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Emoticon from '~/assets/svgs/icons/emoticon.svg?component';
import HeartIcon from '~/assets/svgs/icons/heart.svg?component';
import NotoRedHeart from '~/assets/svgs/icons/NotoRedHeart.svg?component';
import NotoSmilingFace from '~/assets/svgs/icons/NotoSmilingFace.svg?component';
import NotoSmilingFaceSweat from '~/assets/svgs/icons/NotoSmilingFaceSweat.svg?component';

import { getImage } from '~/services/image';

import { Socket, io } from 'socket.io-client';
import DOMPurify from 'dompurify';

const props = defineProps<{
  roomID: any;
}>();

const nuxtConfig = useRuntimeConfig();
const utils = useUtils();
const authStore = useAuthStore();
const socket = ref<Socket>();
const commentsList = ref<HTMLDivElement>();
const comments = ref<any[]>([]);
const contenteditableInputField = ref<HTMLDivElement>();
const sanitizedHtmlComment = ref<string>('');
const isChanged = ref<boolean>(false);
const isFocus = ref<boolean>(false);
const isShowActions = ref<boolean>(false);
const isShowEmoji = ref<boolean>(false);
const isAnimateEmoji = ref<boolean>(false);
const animateEmojiType = ref<string>('heart');

onBeforeMount(() => {
  socket.value = io(
    import.meta.env.PROD
      ? nuxtConfig.app.apiGateway
      : nuxtConfig.app.apiGatewayDev
  );

  socket.value.emit('joinMovie', props.roomID);

  socket.value.on('initialComments', (initialComments: any) => {
    comments.value = initialComments;
  });

  socket.value.on('newComment', (comment: any) => {
    // console.log(comment);
    comments.value.push(comment);
  });

  socket.value.on('interactEmoji', async (interact: any) => {
    if (interact?.emoji_type) {
      animateEmojiType.value = interact.emoji_type;
      isAnimateEmoji.value = true;
      await wait(2000);
      isAnimateEmoji.value = false;
    }
  });
});

const sendComment = async () => {
  if (sanitizedHtmlComment.value.trim()) {
    const comment = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      author: authStore.userAccount,
      content: sanitizedHtmlComment.value.trim()
    };

    // socket.value!.emit('newComment', { roomID: props.roomID, comment });
    socket.value!.emit('newComment', {
      user_id: authStore.userAccount!.id,
      broadcast_id: props.roomID,
      movie_id: props.roomID,
      content: sanitizedHtmlComment.value.trim(),
      timestamp: new Date().toISOString()
    });

    // comments.value.push(comment);

    contenteditableInputField.value!.innerText = '';
    isChanged.value = false;
    await scrollToBottom();
  }
};

const scrollToBottom = async () => {
  await wait(50);
  if (commentsList.value)
    commentsList.value.scrollTop = commentsList.value.scrollHeight;
};

const sendEmoji = (emoji_type: string) => {
  if (isAnimateEmoji.value) return;

  socket.value!.emit('interactEmoji', {
    roomID: props.roomID,
    emoji_type: emoji_type
  });
};

onUnmounted(() => {
  socket.value!.disconnect();
});

const handleChange = async (e: any) => {
  const actualValueInput =
    contenteditableInputField.value!?.innerText == '\n'
      ? contenteditableInputField.value!?.innerText.replace('\n', '')
      : contenteditableInputField.value!?.innerText;

  if (actualValueInput.length >= 1000) {
    contenteditableInputField.value!.innerHTML =
      contenteditableInputField.value!.innerHTML.slice(0, 1000);
    e.preventDefault();
    return;
  }

  if (actualValueInput.length > 0) {
    isChanged.value = true;
  } else {
    contenteditableInputField.value!.innerHTML = '';
    isChanged.value = false;
  }

  sanitizedHtmlComment.value = DOMPurify.sanitize(
    contenteditableInputField.value!.innerHTML,
    {
      USE_PROFILES: { html: true }
    }
  );
  // .replaceAll(/&nbsp;/g, ' ');
};

const handleFocus = (e: any) => {
  // if (!authStore.isLogin) {
  //   authStore.isOpenRequireAuthDialog = true;
  //   e.target.blur();
  //   return;
  // }

  isFocus.value = true;
  isShowActions.value = true;
};

const handleBlur = (e: any) => {
  isFocus.value = false;
};

const handleKeyDown = (event: any) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    sendComment();
  }
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
};
</script>

<style lang="scss" src="./LiveComment.scss"></style>
<!-- <style lang="scss">
@import url('./LiveComment.scss');
</style> -->

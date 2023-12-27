<template>
  <div class="comment-item">
    <div class="comment-item-container">
      <div class="author">
        <div class="author-image">
          <NuxtImg
            class="avatar"
            :src="
              !isNaN(+item?.user_avatar!)
                ? getImage(
                    `account${item?.user_avatar}.jpg`,
                    'user_avatar',
                    'w-50'
                  )
                : item?.user_avatar
            "
            loading="lazy"
            alt=""
          />
        </div>
      </div>
      <div class="right-side">
        <div class="right-side-wrapper">
          <div class="content-comment-box">
            <div class="main-comment-content">
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
              />

              <div class="actions">
                <LikeDislike :comment="item" />

                <a-button
                  class="reply click-active"
                  type="text"
                  @click="
                    commentAction = 'post';
                    isShowFormComment = !isShowFormComment;
                  "
                >
                  <!-- :disabled="userAccount?.id == item?.user_id" -->
                  Phản hồi
                </a-button>
              </div>
            </div>

            <FormComment
              v-show="isShowFormComment"
              v-model:commentsList="listReplies"
              v-model:commentContent="commentContent"
              :movie-id="movieId"
              :movie-type="movieType"
              :showActions="true"
              :parent="item"
              :comment="item"
              :is-show-form-comment="isShowFormComment"
              comment-type="children"
              :action="commentAction"
              @on-click-cancel="isShowFormComment = false"
              @on-success-comment-child="handleSuccessCommentChild"
              @on-success-edit-comment="handleSuccessEditComment"
            />
          </div>

          <div class="more-actions">
            <el-dropdown
              v-if="userAccount?.id == item?.user_id"
              trigger="click"
              popper-class="dropdown-viewmore"
              placement="bottom-end"
              :show-timeout="0"
            >
              <a-button
                class="el-dropdown-link comment"
                aria-label="dropdown-comment"
              >
                <template #icon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="2rem"
                    height="2rem"
                    viewBox="0 0 512 512"
                    fill="currentColor"
                  >
                    <circle
                      cx="256"
                      cy="256"
                      r="48"
                    />
                    <circle
                      cx="256"
                      cy="416"
                      r="48"
                    />
                    <circle
                      cx="256"
                      cy="96"
                      r="48"
                    />
                  </svg>
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
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1.5rem"
                        height="1.5rem"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path
                          d="m14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83l3.75 3.75l1.83-1.83a.996.996 0 0 0 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z"
                        />
                      </svg>
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
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1.5rem"
                        height="1.5rem"
                        viewBox="0 0 448 512"
                        fill="currentColor"
                      >
                        <path
                          d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0h120.4c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64s14.3-32 32-32h96l7.2-14.3zM32 128h384v320c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"
                        />
                      </svg>
                      <span>Xóa bình luận</span>
                    </el-dropdown-item>
                  </div>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>

        <div class="replies">
          <a-button
            v-show="numberReplies > 0"
            class="reply click-active"
            type="text"
            @click="onClickShowReplies"
          >
            <template #icon>
              <!-- <Icon
                name="ic:baseline-arrow-drop-down"
                class="caret"
                :class="{ active: isShowReplies }"
              /> -->
              <svg
                class="caret"
                :class="{ active: isShowReplies }"
                xmlns="http://www.w3.org/2000/svg"
                width="2.5rem"
                height="2.5rem"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="m7 10l5 5l5-5z" />
              </svg>
            </template>
            {{ numberReplies != 0 && numberReplies + ' phản hồi' }}
          </a-button>

          <div
            v-show="isShowReplies && !loadingReplies"
            :id="item?.id"
            class="list-replies"
          >
            <CommentItemChild
              v-for="(item1, index) in listReplies"
              :key="item1?.id"
              v-model:listReplies="listReplies"
              :index="index"
              :item="item1"
              :parent="item"
              :onLoadMoreReplies="onLoadMoreReplies"
              @on-success-comment-child="handleSuccessCommentChild"
              @om-success-remove-comment-child="handleSuccessRemoveCommentChild"
            />

            <div
              v-show="numberReplies > listReplies?.length && !isLoadmoreReplies"
              class="load-more"
            >
              <a-button
                v-show="numberReplies > 0"
                class="reply click-active"
                type="text"
                @click="onLoadMoreReplies"
              >
                <template #icon>
                  <!-- <Icon name="material-symbols:subdirectory-arrow-right" /> -->

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="2.2rem"
                    height="2.2rem"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      d="m14 21l-1.4-1.425L16.175 16H5V4h2v10h9.175l-3.6-3.6L14 8.975L20 15l-6 6Z"
                    />
                  </svg>
                </template>
                Hiện thêm phản hồi
              </a-button>
            </div>
          </div>

          <!-- <LoadingCircle
            v-show="loadingReplies || isLoadmoreReplies"
            class="loading-replies"
          /> -->

          <LoadingSpinner
            v-show="loadingReplies || isLoadmoreReplies"
            class="loading-replies"
            :width="25"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DOMPurify from 'dompurify';
import { ElNotification } from 'element-plus';
import _ from 'lodash';
import { storeToRefs } from 'pinia';

import type { commentForm } from '@/types';
import {
  CommentContent,
  CommentItemChild,
  FormComment,
  LikeDislike
} from '~/components/Comment';
import { LoadingCircle, LoadingSpinner } from '~/components/Loading';
import {
  DeleteComment,
  getCommentByMovidId_ParentId
} from '~/services/comment';
import { getImage } from '~/services/image';

const props = defineProps<{
  movieId: string;
  movieType: string;
  item: commentForm;
}>();

const utils = useUtils();
const store = useStore();
const { userAccount } = storeToRefs<any>(store);
const commentsList = defineModel<commentForm[]>('commentsList');
const isShowFormComment = ref<boolean>(false);
const isShowReplies = ref<boolean>(false);
const listReplies = ref<commentForm[]>([]);
const loading = ref<boolean>(false);
const isUpdated = ref<boolean>(props.item?.updated || false);
const loadingReplies = ref<boolean>(false);
const numberReplies = ref<number>(Number(props.item?.childrens || 0));
const skip = ref<number>(1);
const isLoadmoreReplies = ref<boolean>(false);
const commentAction = ref<string>('post');
const commentContent = ref<string>(props.item?.content || '');
const sanitizedHtmlComment = computed<string>(() => {
  // Sử dụng DOMPurify để loại bỏ HTML độc hại
  return DOMPurify.sanitize(commentContent.value, {
    USE_PROFILES: { html: true }
  });
});

const onClickShowReplies = async () => {
  isShowReplies.value = !isShowReplies.value;

  if (listReplies.value.length == 0) {
    loadingReplies.value = true;

    await getCommentByMovidId_ParentId(
      props.movieId,
      props.item?.id!,
      props.movieType
    )
      .then((response) => {
        listReplies.value = response?.results;
        skip.value++;
      })
      .catch((e) => {})
      .finally(async () => {
        await wait(300);

        loadingReplies.value = false;
      });
  }
};

const onLoadMoreReplies = async () => {
  isLoadmoreReplies.value = true;

  await getCommentByMovidId_ParentId(
    props.movieId,
    props.item?.id!,
    props.movieType,
    skip.value,
    10
  )
    .then((response) => {
      listReplies.value = listReplies.value.concat(response?.results);
      skip.value++;
    })
    .catch((e) => {})
    .finally(async () => {
      await wait(300);

      isLoadmoreReplies.value = false;
    });
};

const handleSuccessCommentChild = (data: any) => {
  if (!isShowReplies.value) {
    isShowReplies.value = true;
  }
  listReplies.value.push(data);
  numberReplies.value++;
};

const handleSuccessRemoveCommentChild = () => {
  numberReplies.value--;
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
    movieId: props.movieId,
    movieType: props.movieType,
    commentType: 'parent'
  })
    .then((response) => {
      if (response?.success) {
        commentsList.value = _.reject(commentsList.value, (x: commentForm) => {
          return x!.id === props.item?.id;
        });

        ElNotification.success({
          title: MESSAGE.STATUS.SUCCESS,
          message: 'Xóa bình luận thành công.',
          position: 'bottom-right',
          duration: MESSAGE.DURATION.FAST
        });
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
</script>

<style lang="scss" src="./CommentItem.scss"></style>

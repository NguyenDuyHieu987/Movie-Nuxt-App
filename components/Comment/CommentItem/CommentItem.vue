<template>
  <div class="comment-item">
    <div class="comment-item-container">
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

              <div class="actions-comment">
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
                        width="1.5rem"
                        height="1.5rem"
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

              <ArrowDropDown
                class="caret"
                :class="{ active: isShowReplies }"
                width="2.5rem"
                height="2.5rem"
                fill="currentColor"
              />
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

                  <SubdirectoryArrowRight
                    width="2.2rem"
                    height="2.2rem"
                    fill="currentColor"
                  />
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
import './CommentItem.scss';
import EllipsisVertical from '~/assets/svgs/icons/ellipsis-vertical.svg?component';
import Pencil from '~/assets/svgs/icons/pencil.svg?component';
import TrashCan from '~/assets/svgs/icons/trash-can.svg?component';
import ArrowDropDown from '~/assets/svgs/icons/arrow-drop-down.svg?component';
import SubdirectoryArrowRight from '~/assets/svgs/icons/subdirectory-arrow-right.svg?component';

// import {
//   FormComment,
//   CommentContent,
//   CommentItemChild,
//   LikeDislike
// } from '~/components/Comment';
// import {
//   // LoadingCircle,
//   LoadingSpinner
// } from '~/components/Loading';
import FormComment from '~/components/Comment/FormComment/FormComment.vue';
import CommentContent from '~/components/Comment/CommentContent/CommentContent.vue';
import CommentItemChild from '~/components/Comment/CommentItemChild/CommentItemChild.vue';
import LikeDislike from '~/components/Comment/LikeDislike/LikeDislike.vue';
import LoadingSpinner from '~/components/Loading/LoadingSpinner/LoadingSpinner.vue';
import { DeleteComment, getCommentChild } from '~/services/comment';
import { ElNotification } from 'element-plus';
import { getImage } from '~/services/image';
import DOMPurify from 'dompurify';
import { storeToRefs } from 'pinia';
import type { commentForm } from '@/types';

const props = defineProps<{
  movieId: string;
  movieType: string;
  item: commentForm;
}>();

const utils = useUtils();
const authStore = useAuthStore();
const { userAccount } = storeToRefs(authStore);
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

    await getCommentChild(props.movieId, props.item?.id!, props.movieType)
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

  await getCommentChild(
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
        commentsList.value = _lodash_Reject(
          commentsList.value,
          (x: commentForm) => {
            return x!.id === props.item?.id;
          }
        );

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

<!-- <style lang="scss" src="./CommentItem.scss"></style> -->
<!-- <style lang="scss">
@import url('./CommentItem.scss');
</style> -->

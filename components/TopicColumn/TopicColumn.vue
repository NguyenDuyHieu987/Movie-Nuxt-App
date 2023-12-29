<template>
  <aside
    ref="topicColumn"
    class="topic-column"
  >
    <div class="column-container">
      <div class="backdrop">
        <NuxtLink
          v-if="dataColumn[0]?.media_type == 'tv' && dataColumn[0]?.movie_id"
          class="img-box ratio-16-9"
          :to="{
            path: `/play-tv/${
              dataColumn[0]?.movie_id
            }${utils.convertPath.toPathInfo_Play(dataColumn[0]?.name)}/tap-1`
          }"
        >
          <NuxtImg
            :src="getImage(topicImage, 'backdrop', 'h-300')"
            format="avif"
            loading="lazy"
            alt=""
          />

          <div class="play-now">
            <!-- <Icon name="ci:play-arrow" class="play" /> -->

            <svg
              class="play"
              xmlns="http://www.w3.org/2000/svg"
              width="3rem"
              height="3rem"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
            <span> PHÁT NGAY </span>
          </div>
        </NuxtLink>

        <NuxtLink
          v-else-if="
            dataColumn[0]?.media_type == 'movie' && dataColumn[0]?.movie_id
          "
          class="img-box"
          :to="{
            path: `/play-movie/${
              dataColumn[0]?.movie_id
            }${utils.convertPath.toPathInfo_Play(dataColumn[0]?.name)}`
          }"
        >
          <NuxtImg
            :src="getImage(topicImage, 'backdrop', 'h-300')"
            placeholder="/imgs/loading-img-16-9.webp"
            format="avif"
            loading="lazy"
            alt=""
          />

          <div class="play-now">
            <!-- <Icon name="ci:play-arrow" class="play" /> -->

            <svg
              class="play"
              xmlns="http://www.w3.org/2000/svg"
              width="3rem"
              height="3rem"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
            <span>PHÁT NGAY</span>
          </div>
        </NuxtLink>

        <div
          v-if="!dataColumn?.length"
          class="img-box"
        >
          <NuxtImg
            :src="getImage('topic1.jpg', 'misc', 'h-300')"
            placeholder="/imgs/loading-img-16-9.webp"
            format="avif"
            loading="lazy"
            alt=""
          />
        </div>
      </div>

      <NuxtImg
        class="overlay-image"
        :src="
          getImage(
            topicImage || 'topic1.jpg',
            topicImage == 'topic1.jpg' || topicImage == undefined
              ? 'misc'
              : 'backdrop',
            'h-300'
          )
        "
        format="avif"
        loading="lazy"
        alt=""
      />
      <div class="info">
        <h2 class="title">
          <strong>{{ title }}</strong>
        </h2>
        <div class="user-info">
          <p>
            <strong>
              {{ authStore.userAccount?.username }}
            </strong>
          </p>
          <p class="count-video">
            {{ total }} phim
            <span> Cập nhật hôm nay </span>
          </p>

          <el-dropdown
            trigger="click"
            placement="bottom-end"
            popper-class="dropdown-viewmore"
            class="dropdown-viewmore"
            :show-timeout="0"
          >
            <a-button
              class="viewmore-btn click-active"
              size="large"
              type="text"
            >
              <template #icon>
                <!-- <Icon name="fa6-solid:ellipsis-vertical" /> -->

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.9rem"
                  height="1.9rem"
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
              <el-dropdown-menu>
                <el-dropdown-item key="info">
                  <template #icon>
                    <!-- <InfoCircleOutlined /> -->

                    <!-- <Icon name="bi:info-circle" class="info" /> -->

                    <svg
                      class="info"
                      xmlns="http://www.w3.org/2000/svg"
                      width="1.5rem"
                      height="1.5rem"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                    >
                      <g>
                        <path
                          d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                        />
                        <path
                          d="m8.93 6.588l-2.29.287l-.082.38l.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319c.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246c-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0a1 1 0 0 1 2 0z"
                        />
                      </g>
                    </svg>
                  </template>
                  <span>Thông tin chi tiết</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>

      <div class="widget">
        <a-input
          v-model:value="valueSearch"
          class="search-row"
          placeholder="Tìm kiếm trong danh sách..."
          size="large"
          allow-clear
          :loading="loadingSearch"
          @change="searchRow"
        >
          <template #prefix>
            <!-- <Icon name="fa6-solid:magnifying-glass" /> -->

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.5rem"
              height="1.5rem"
              viewBox="0 0 512 512"
              fill="currentColor"
            >
              <path
                d="M416 208c0 45.9-14.9 88.3-40 122.7l126.6 126.7c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0s208 93.1 208 208zM208 352a144 144 0 1 0 0-288a144 144 0 1 0 0 288z"
              />
            </svg>
          </template>
        </a-input>

        <el-button
          round
          type="primary"
          class="remove-all-btn"
          @click="deleteAll"
        >
          <template #icon>
            <!-- <span class="material-icons-outlined"> delete_sweep </span> -->
            <!-- <Icon name="ic:sharp-delete-sweep" /> -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.5rem"
              height="1.5rem"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M15 16h4v2h-4v-2zm0-8h7v2h-7V8zm0 4h6v2h-6v-2zM3 20h10V8H3v12zM14 5h-3l-1-1H6L5 5H2v2h12V5z"
              />
            </svg>
          </template>
          Xóa tất cả Danh sách phát
        </el-button>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
// import { ElButton } from 'element-plus';
import { getImage } from '~/services/image';

const props = defineProps<{
  // dataColumn: any[];
  topicImage: string;
  title?: string;
  total?: number;
  // valueInput: string;
  loadingSearch?: boolean;
  searchRow: (e: any) => void;
  deleteAll: () => void;
}>();

const authStore = useAuthStore();
const utils = useUtils();
const topicColumn = ref();
const valueSearch = defineModel<string>('valueInput');
const dataColumn = defineModel<any>('dataColumn');

watch(dataColumn, (newVal, oldVal) => {
  if (newVal?.length > 0) {
    const color = newVal[0]?.dominant_backdrop_color;
    setBackgroundColor(color);
  } else {
    setBackgroundColor(['16', '68', '128']);
  }
});

const setBackgroundColor = (color: string[]) => {
  const main_color = `linear-gradient(to bottom, rgba(${color[0]}, ${color[1]}, ${color[2]}, 1), rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.5), rgba(0, 0, 0, 1));`;

  // const topic_column = document.getElementsByClassName(
  //   'topic-column'
  // )[0] as HTMLElement;

  topicColumn.value.setAttribute('style', `background-image: ${main_color}`);

  const ant_input_affix_wrapper = topicColumn.value.getElementsByClassName(
    'ant-input-affix-wrapper'
  )[0] as HTMLElement;
  ant_input_affix_wrapper.setAttribute(
    'style',
    `border-bottom: 2px solid rgb(${color[0]}, ${color[1]}, ${color[2]});`
  );
};

onMounted(() => {
  if (dataColumn.value?.length > 0) {
    const color = dataColumn.value[0]?.dominant_backdrop_color;
    setBackgroundColor(color);
  } else {
    setBackgroundColor(['16', '68', '128']);
  }
});
</script>

<style src="./TopicColumn.scss" lang="scss"></style>

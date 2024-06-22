<template>
  <div class="like-share">
    <div :class="buttonClass">
      <a-button
        class="modern click-active"
        type="text"
        size="large"
        @click="openModal = !openModal"
      >
        <template #icon>
          <svg
            class="share"
            xmlns="http://www.w3.org/2000/svg"
            width="2.2rem"
            height="2.2rem"
            viewBox="0 0 256 256"
            fill="currentColor"
          >
            <path
              d="m237.66 106.35l-80-80A8 8 0 0 0 144 32v40.35c-25.94 2.22-54.59 14.92-78.16 34.91c-28.38 24.08-46.05 55.11-49.76 87.37a12 12 0 0 0 20.68 9.58c11-11.71 50.14-48.74 107.24-52V192a8 8 0 0 0 13.66 5.65l80-80a8 8 0 0 0 0-11.3ZM160 172.69V144a8 8 0 0 0-8-8c-28.08 0-55.43 7.33-81.29 21.8a196.17 196.17 0 0 0-36.57 26.52c5.8-23.84 20.42-46.51 42.05-64.86C99.41 99.77 127.75 88 152 88a8 8 0 0 0 8-8V51.32L220.69 112Z"
            />
          </svg>
        </template>
        <span> Chia sẻ</span>
      </a-button>
    </div>

    <!-- <Teleport to="#append-to"> -->
    <el-dialog
      v-model="openModal"
      class="social-sharing-dialog"
      :width="740"
      align-center
      center
      append-to="#append-to"
      :show-close="false"
    >
      <template #header>
        <h2 class="social-sharing-dialog-title">Chia sẻ với</h2>
        <CloseBtn
          class="transparent"
          @click="openModal = false"
        />
      </template>

      <div class="list-network">
        <ShareNetwork
          class="share-network facebook"
          network="facebook"
          :url="urlShare"
          :title="dataMovie?.name"
          :description="dataMovie?.overview"
          :quote="'Xem phim thỏa thích cùng Phimhay247'"
          hashtags="phimhay247,phimoi,phimhay"
        >
          <a-button
            class="click-active"
            type="text"
          >
            <template #icon>
              <svg
                class="fa-facebook-f"
                xmlns="http://www.w3.org/2000/svg"
                width="1.6rem"
                height="1.6rem"
                viewBox="0 0 320 512"
                fill="currentColor"
              >
                <path
                  d="m279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
                />
              </svg>
            </template>
            <span> Facebook</span>
          </a-button>
        </ShareNetwork>

        <ShareNetwork
          class="share-network linkedIn"
          network="linkedIn"
          :url="urlShare"
        >
          <a-button
            class="click-active"
            type="text"
          >
            <template #icon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.6rem"
                height="1.6rem"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path
                  d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248c-.015-.709-.52-1.248-1.342-1.248c-.822 0-1.359.54-1.359 1.248c0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586c.173-.431.568-.878 1.232-.878c.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252c-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"
                />
              </svg>
            </template>
            <span> LinkedIn</span>
          </a-button>
        </ShareNetwork>

        <ShareNetwork
          class="share-network email"
          network="email"
          :url="urlShare"
          :title="dataMovie?.name"
          :description="dataMovie?.overview"
        >
          <a-button
            class="click-active"
            type="text"
          >
            <template #icon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2rem"
                height="2rem"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5l8-5v10zm-8-7L4 6h16l-8 5z"
                />
              </svg>
            </template>
            <span> Email</span>
          </a-button>
        </ShareNetwork>

        <ShareNetwork
          class="share-network messenger"
          network="messenger"
          :url="urlShare"
          :title="dataMovie?.name"
          :description="dataMovie?.overview"
        >
          <a-button
            class="click-active"
            type="text"
          >
            <template #icon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2rem"
                height="2rem"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M12 2C6.36 2 2 6.13 2 11.7c0 2.91 1.19 5.44 3.14 7.17c.16.13.26.35.27.57l.05 1.78c.04.57.61.94 1.13.71l1.98-.87c.17-.06.36-.09.53-.06c.9.27 1.9.4 2.9.4c5.64 0 10-4.13 10-9.7C22 6.13 17.64 2 12 2m6 7.46l-2.93 4.67c-.47.73-1.47.92-2.17.37l-2.34-1.73a.6.6 0 0 0-.72 0l-3.16 2.4c-.42.33-.97-.17-.68-.63l2.93-4.67c.47-.73 1.47-.92 2.17-.4l2.34 1.76a.6.6 0 0 0 .72 0l3.16-2.4c.42-.33.97.17.68.63Z"
                />
              </svg>
            </template>
            <span> Messenger</span>
          </a-button>
        </ShareNetwork>

        <ShareNetwork
          class="share-network pinterest"
          network="pinterest"
          :url="urlShare"
          :title="dataMovie?.name"
          :media="
            getImage(
              dataMovie?.backdrop_path,
              'backdrop',
              // 'w-' + windowWidth.toString()
              {w: windowWidth}

            )
          "
        >
          <a-button
            class="click-active"
            type="text"
          >
            <template #icon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2rem"
                height="2rem"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M9.04 21.54c.96.29 1.93.46 2.96.46a10 10 0 0 0 10-10A10 10 0 0 0 12 2A10 10 0 0 0 2 12c0 4.25 2.67 7.9 6.44 9.34c-.09-.78-.18-2.07 0-2.96l1.15-4.94s-.29-.58-.29-1.5c0-1.38.86-2.41 1.84-2.41c.86 0 1.26.63 1.26 1.44c0 .86-.57 2.09-.86 3.27c-.17.98.52 1.84 1.52 1.84c1.78 0 3.16-1.9 3.16-4.58c0-2.4-1.72-4.04-4.19-4.04c-2.82 0-4.48 2.1-4.48 4.31c0 .86.28 1.73.74 2.3c.09.06.09.14.06.29l-.29 1.09c0 .17-.11.23-.28.11c-1.28-.56-2.02-2.38-2.02-3.85c0-3.16 2.24-6.03 6.56-6.03c3.44 0 6.12 2.47 6.12 5.75c0 3.44-2.13 6.2-5.18 6.2c-.97 0-1.92-.52-2.26-1.13l-.67 2.37c-.23.86-.86 2.01-1.29 2.7v-.03Z"
                />
              </svg>
            </template>
            <span> Pinterest</span>
          </a-button>
        </ShareNetwork>

        <ShareNetwork
          class="share-network reddit"
          network="reddit"
          :url="urlShare"
          :title="dataMovie?.name"
        >
          <a-button
            class="click-active"
            type="text"
          >
            <template #icon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2rem"
                height="2rem"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M10.75 13.04c0-.57-.47-1.04-1.04-1.04c-.57 0-1.04.47-1.04 1.04a1.04 1.04 0 1 0 2.08 0zm3.34 2.37c-.45.45-1.41.61-2.09.61s-1.64-.16-2.09-.61a.26.26 0 0 0-.38 0a.26.26 0 0 0 0 .38c.71.71 2.07.77 2.47.77c.4 0 1.76-.06 2.47-.77a.26.26 0 0 0 0-.38c-.1-.1-.27-.1-.38 0zm.2-3.41c-.57 0-1.04.47-1.04 1.04c0 .57.47 1.04 1.04 1.04s1.04-.47 1.04-1.04c0-.57-.46-1.04-1.04-1.04z"
                />
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm5.8 11.33c.02.14.03.29.03.44c0 2.24-2.61 4.06-5.83 4.06s-5.83-1.82-5.83-4.06c0-.15.01-.3.03-.44c-.51-.23-.86-.74-.86-1.33a1.455 1.455 0 0 1 2.47-1.05c1.01-.73 2.41-1.19 3.96-1.24l.74-3.49c.01-.07.05-.13.11-.16c.06-.04.13-.05.2-.04l2.42.52a1.04 1.04 0 1 1 .93 1.5c-.56 0-1.01-.44-1.04-.99l-2.17-.46l-.66 3.12c1.53.05 2.9.52 3.9 1.24a1.455 1.455 0 1 1 1.6 2.38z"
                />
              </svg>
            </template>
            <span> Reddit</span>
          </a-button>
        </ShareNetwork>

        <ShareNetwork
          class="share-network skype"
          network="skype"
          :url="urlShare"
          :title="dataMovie?.name"
          :description="dataMovie?.overview"
        >
          <a-button
            class="click-active"
            type="text"
          >
            <template #icon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2rem"
                height="2rem"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M18 6c2.07 2.04 2.85 4.89 2.36 7.55c.41.72.64 1.56.64 2.45a5 5 0 0 1-5 5c-.89 0-1.73-.23-2.45-.64c-2.66.49-5.51-.29-7.55-2.36c-2.07-2.04-2.85-4.89-2.36-7.55C3.23 9.73 3 8.89 3 8a5 5 0 0 1 5-5c.89 0 1.73.23 2.45.64c2.66-.49 5.51.29 7.55 2.36m-5.96 11.16c2.87 0 4.3-1.38 4.3-3.24c0-1.19-.56-2.46-2.73-2.95l-1.99-.44c-.76-.17-1.62-.4-1.62-1.11c0-.72.6-1.22 1.7-1.22c2.23 0 2.02 1.53 3.13 1.53c.58 0 1.08-.34 1.08-.93c0-1.37-2.19-2.4-4.05-2.4c-2.01 0-4.16.86-4.16 3.14c0 1.1.39 2.27 2.55 2.81l2.69.68c.81.2 1.01.65 1.01 1.07c0 .68-.68 1.35-1.91 1.35c-2.41 0-2.08-1.85-3.37-1.85c-.58 0-1 .4-1 .97c0 1.11 1.33 2.59 4.37 2.59Z"
                />
              </svg>
            </template>
            <span> Skype</span>
          </a-button>
        </ShareNetwork>

        <ShareNetwork
          class="share-network telegram"
          network="telegram"
          :url="urlShare"
          :title="dataMovie?.name"
          :description="dataMovie?.overview"
        >
          <a-button
            class="click-active"
            type="text"
          >
            <template #icon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2rem"
                height="2rem"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19c-.14.75-.42 1-.68 1.03c-.58.05-1.02-.38-1.58-.75c-.88-.58-1.38-.94-2.23-1.5c-.99-.65-.35-1.01.22-1.59c.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02c-.09.02-1.49.95-4.22 2.79c-.4.27-.76.41-1.08.4c-.36-.01-1.04-.2-1.55-.37c-.63-.2-1.12-.31-1.08-.66c.02-.18.27-.36.74-.55c2.92-1.27 4.86-2.11 5.83-2.51c2.78-1.16 3.35-1.36 3.73-1.36c.08 0 .27.02.39.12c.1.08.13.19.14.27c-.01.06.01.24 0 .38z"
                />
              </svg>
            </template>
            <span> Telegram</span>
          </a-button>
        </ShareNetwork>

        <ShareNetwork
          class="share-network twitter"
          network="twitter"
          :url="urlShare"
          :title="dataMovie?.name"
          hashtags="phimhay247,phimoi,phimhay"
        >
          <a-button
            class="click-active"
            type="text"
          >
            <template #icon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2rem"
                height="2rem"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M22.46 6c-.77.35-1.6.58-2.46.69c.88-.53 1.56-1.37 1.88-2.38c-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29c0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15c0 1.49.75 2.81 1.91 3.56c-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07a4.28 4.28 0 0 0 4 2.98a8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21C16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56c.84-.6 1.56-1.36 2.14-2.23Z"
                />
              </svg>
            </template>
            <span> Twitter</span>
          </a-button>
        </ShareNetwork>

        <ShareNetwork
          class="share-network whatsapp"
          network="whatsapp"
          :url="urlShare"
          :title="dataMovie?.name"
          :description="dataMovie?.overview"
        >
          <a-button
            class="click-active"
            type="text"
          >
            <template #icon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2rem"
                height="2rem"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M19.05 4.91A9.816 9.816 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01zm-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18l-3.12.82l.83-3.04l-.2-.31a8.264 8.264 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24c2.2 0 4.27.86 5.82 2.42a8.183 8.183 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81c-.23-.08-.39-.12-.56.12c-.17.25-.64.81-.78.97c-.14.17-.29.19-.54.06c-.25-.12-1.05-.39-1.99-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.14-.25-.02-.38.11-.51c.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31c-.22.25-.86.85-.86 2.07c0 1.22.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74c.59.26 1.05.41 1.41.52c.59.19 1.13.16 1.56.1c.48-.07 1.47-.6 1.67-1.18c.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28z"
                />
              </svg>
            </template>
            <span> WhatsApp</span>
          </a-button>
        </ShareNetwork>

        <ShareNetwork
          class="share-network baidu"
          network="baidu"
          :url="urlShare"
          :title="dataMovie?.name"
        >
          <a-button
            class="click-active"
            type="text"
          >
            <template #icon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2rem"
                height="2rem"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M5.926 12.496c2.063-.443 1.782-2.908 1.72-3.447c-.1-.83-1.078-2.282-2.404-2.167c-1.67.15-1.914 2.561-1.914 2.561c-.226 1.115.54 3.497 2.598 3.053Zm2.191 4.289c-.06.173-.195.616-.079 1.002c.23.866.982.905.982.905h1.08v-2.64H8.944c-.52.154-.77.559-.827.733Zm1.638-8.422c1.14 0 2.06-1.312 2.06-2.933c0-1.62-.92-2.93-2.06-2.93c-1.138 0-2.06 1.31-2.06 2.93c0 1.621.923 2.933 2.06 2.933Zm4.907.193c1.523.198 2.502-1.427 2.697-2.659c.198-1.23-.784-2.658-1.862-2.904c-1.08-.248-2.43 1.483-2.552 2.61c-.147 1.38.197 2.758 1.717 2.953Zm0 3.448c-1.865-2.905-4.513-1.723-5.399-.245c-.882 1.477-2.256 2.41-2.452 2.658c-.198.244-2.846 1.673-2.258 4.284c.588 2.609 2.653 2.56 2.653 2.56s1.521.15 3.286-.246c1.766-.391 3.286.098 3.286.098s4.124 1.38 5.253-1.278c1.127-2.66-.638-4.038-.638-4.038s-2.356-1.823-3.731-3.793Zm-6.007 7.75c-1.158-.231-1.62-1.021-1.677-1.156c-.057-.137-.386-.772-.212-1.853c.5-1.619 1.927-1.735 1.927-1.735h1.427v-1.755l1.216.02v6.479H8.655Zm4.59-.019c-1.196-.308-1.252-1.158-1.252-1.158v-3.412l1.252-.02v3.066c.076.328.482.387.482.387H15v-3.433h1.331v4.57h-3.085Zm7.453-9.11c0-.59-.49-2.364-2.305-2.364c-1.818 0-2.061 1.675-2.061 2.859c0 1.13.095 2.707 2.354 2.657c2.26-.05 2.012-2.56 2.012-3.152Z"
                />
              </svg>
            </template>
            <span> Baidu</span>
          </a-button>
        </ShareNetwork>

        <ShareNetwork
          class="share-network weibo"
          network="weibo"
          :url="urlShare"
          :title="dataMovie?.name"
          :media="
            getImage(
              dataMovie?.backdrop_path,
              'backdrop',
              // 'w-' + windowWidth.toString()
              {w: windowWidth}

            )
          "
        >
          <a-button
            class="click-active"
            type="text"
          >
            <template #icon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2rem"
                height="2rem"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M9.82 13.87c1.07 0 1.95.87 1.95 1.95a1.95 1.95 0 0 1-1.95 1.95c-1.08 0-1.95-.88-1.95-1.95c0-1.08.87-1.95 1.95-1.95M14.5 3.34l.68-.03c3.76 0 6.82 3.06 6.82 6.82l-.05.82l-1.19-.37l.02-.45c0-3.09-2.51-5.6-5.6-5.6l-.35.01l-.33-1.2m.82 2.89c2.06.07 3.73 1.77 3.76 3.83l-1.24-.38c-.19-1.12-1.06-2-2.17-2.18l-.35-1.27M2 15.41c-.03-.61.07-2.77 2.95-5.44c3.4-3.16 4.87-2.92 4.87-2.92s3.18-.3 1.24 3.41h.07c.47-.5 1.49-1.25 3.56-1.46c2.08-.21 2.08 1.5 1.81 2.7c1.88.94 3.06 2.33 3.06 3.88c0 2.82-3.93 5.11-8.78 5.11h-.28c-3.5 0-6.5-1.27-7.79-3.1c-.46-.62-.71-1.3-.71-2.01v-.17m7.82-3.49c-3.23 0-5.85 1.75-5.85 3.9s2.62 3.9 5.85 3.9c3.23 0 5.85-1.75 5.85-3.9s-2.62-3.9-5.85-3.9Z"
                />
              </svg>
            </template>
            <span> Weibo</span>
          </a-button>
        </ShareNetwork>
      </div>
    </el-dialog>
    <!-- </Teleport> -->
  </div>
</template>

<script setup lang="ts">
// import { CloseBtn } from '~/components/Button';
import CloseBtn from '~/components/Button/CloseBtn/CloseBtn.vue';
import { getImage } from '~/services/image';

const props = withDefaults(
  defineProps<{ buttonClass: string; dataMovie: any }>(),
  {
    buttonClass: ''
  }
);

const openModal = ref<boolean>(false);
const urlShare = ref<string>('');
const windowWidth = ref<number>(1000);

onBeforeMount(() => {
  urlShare.value = window.location.href;
  windowWidth.value = window.innerWidth;
});
</script>

<style lang="scss" src="./Interaction.scss"></style>
<!-- <style lang="scss">
@import url('./Interaction.scss');
</style> -->

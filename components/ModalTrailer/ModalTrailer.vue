<template>
  <!-- :disabled="!isTeleport" -->
  <Teleport to="#append-to">
    <div class="modal-trailer-wrapper">
      <!-- v-model:visible="isTeleport" -->
      <!-- <a-modal
      v-model:open="isTeleport"
      class="modal-trailer"
      :width="1300"
      centered
      :closable="false"
    >
      <template #title>
        <h3 class="title">
          <strong>
            {{ dataMovie.name }}
          </strong>
        </h3>
        <CloseBtn @click="isTeleport = false" />
      </template>

      <iframe
        height="100%"
        width="100%"
        :src="
          dataMovie?.videos?.length > 0
            ? `https://www.youtube.com/embed/${dataMovie?.videos[0]?.key}`
            : 'https://www.youtube.com/embed/ndl1W4ltcmg'
        "
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media;
            gyroscope; picture-in-picture"
        allowFullScreen
        frameBorder="{0}"
      />
      <template #footer>
        <div class="content">
          <div class="info">
            <p class="overview">
              <span>Nội dung: </span>
              {{ dataMovie.overview }}
            </p>
          </div>
          <div class="action">
            <a-button
              class="default"
              size="large"
              type="text"
              @click="isTeleport = false"
            >
              Đóng
            </a-button>
            <NuxtLink
              v-if="isEpisodes"
              :to="{
                path: `/play-tv/${dataMovie.id}/${dataMovie.name
                  ?.replace(/\s/g, '+')
                  .toLowerCase()}/tap-1`,
              }"
              class="btn-play-now"
            >
              Xem ngay
            </NuxtLink>
            <NuxtLink
              v-else-if="!isEpisodes"
              :to="{
                path: `/play-movie/${dataMovie.id}/${dataMovie.name
                  ?.replace(/\s/g, '+')
                  .toLowerCase()}`,
              }"
              class="btn-play-now"
            >
              Xem ngay
            </NuxtLink>
          </div>
        </div>
      </template>
    </a-modal> -->

      <el-dialog
        v-model="isTeleport"
        class="modal-trailer"
        :width="1300"
        align-center
        center
        append-to="#append-to"
        :show-close="false"
      >
        <template #header>
          <h3 class="title">
            <strong v-if="isEpisodes">
              {{ dataMovie.name }}
              <!-- {{ ' - Phần ' + dataMovie?.last_episode_to_air?.season_number }} -->
            </strong>
            <strong v-else>
              {{ dataMovie.name }}
            </strong>
          </h3>

          <CloseBtn @click="isTeleport = false" />
        </template>

        <!-- Math.floor(Math.random() * dataMovie?.videos?.length)
        : 'https://www.youtube.com/embed/ndl1W4ltcmg' -->
        <iframe
          height="100%"
          width="100%"
          :src="`https://www.youtube.com/embed/${
            dataVideos[0]?.key || 'ndl1W4ltcmg'
          }`"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media;
            gyroscope; picture-in-picture"
          allowFullScreen
          frameBorder="{0}"
        />

        <template #footer>
          <div class="content">
            <div class="info">
              <!-- <h3 class="title">
              <strong v-if="isEpisodes">
                {{ dataMovie.name }}
              </strong>
              <strong v-else>
                {{ dataMovie.name }}
              </strong>
            </h3> -->

              <p class="overview">
                <span>Nội dung: </span>
                {{
                  dataMovie.overview ||
                  'Sorry! This movie has not been updated overview content.'
                }}
              </p>
            </div>
            <div class="action">
              <a-button
                class="default"
                size="large"
                type="text"
                @click="isTeleport = false"
              >
                Đóng
              </a-button>
              <NuxtLink
                :to="{
                  path: `/play-${dataMovie.media_type}/${dataMovie.id}`
                }"
                class="btn-play-now"
                @click="isTeleport = false"
              >
                <a-button
                  class="default"
                  size="large"
                  type="text"
                >
                  Xem ngay
                </a-button>
              </NuxtLink>
            </div>
          </div>
        </template>
      </el-dialog>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
// import { CloseBtn } from '~/components/Button';
import CloseBtn from '~/components/Button/CloseBtn/CloseBtn.vue';
// import { getMovieById } from '~/services/movie';
// import { getTvById } from '~/services/tv';
import { getVideos } from '~/services/video';

const props = defineProps<{
  isOpenModalTrailer: boolean;
  item: any;
  isEpisodes: boolean;
}>();

const utils = useUtils();
const dataMovie = ref<any>(props.item || {});
const dataVideos = ref<any[]>([]);
const loading = ref<boolean>(false);
const isTeleport = defineModel<boolean>('isTeleport', { default: false });

watch(isTeleport, async () => {
  if (props.isOpenModalTrailer == true) {
    loading.value = true;

    if (dataVideos.value.length == 0) {
      await useAsyncData(`videos/${dataMovie.value.id}`, () =>
        getVideos(dataMovie.value.id)
      )
        .then((response) => {
          dataVideos.value = response.data.value;
        })
        .catch((e) => {})
        .finally(() => {
          loading.value = false;
        });
    }

    // if (props.isEpisodes) {
    //   await useAsyncData(`tv/short/${dataMovie.value.id}`, () =>
    //     getTvById(dataMovie.value.id, 'videos')
    //   )
    //     .then((response) => {
    //       dataMovie.value = response.data.value;
    //     })
    //     .catch((e) => {
    //     })
    //     .finally(() => {
    //       loading.value = false;
    //     });
    // } else {
    //   await useAsyncData(`movie/short/${dataMovie.value.id}`, () =>
    //     getMovieById(dataMovie.value.id, 'videos')
    //   )
    //     .then((response) => {
    //       dataMovie.value = response.data.value;
    //     })
    //     .catch((e) => {
    //     })
    //     .finally(() => {
    //       loading.value = false;
    //     });
    // }
  }
});
</script>

<style lang="scss" src="./ModalTrailer.scss"></style>
<!-- <style lang="scss">
@import url('./ModalTrailer.scss');
</style> -->

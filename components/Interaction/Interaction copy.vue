<template>
  <div class="like-share">
    <!-- <iframe
      :src="`https://www.facebook.com/plugins/like.php?href=${urlShare}&layout&action&size&share=true&height=35&appId=820070179113499`"
      width="100%"
      height="35"
      style="border: none; overflow: hidden"
      scrolling="no"
      frameborder="0"
      allowfullscreen="true"
      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
    ></iframe> -->

    <ShareNetwork
      class="share-network"
      :class="buttonClass"
      network="facebook"
      :url="urlShare"
      :title="dataMovie?.name"
      :description="dataMovie?.overview"
      :quote="'Xem phim thỏa thích cùng Phimhay247'"
      hashtags="phimhay247z.org"
    >
      <a-button
        class="modern click-active"
        type="text"
        size="large"
      >
        <template #icon>
          <!-- <Icon name="ph:share-fat" class="share" /> -->
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
    </ShareNetwork>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{ buttonClass: string; dataMovie: any }>(),
  {
    buttonClass: ''
  }
);

// const route = useRoute();

// alert(window.location.href);
// const urlShare = computed<string>((): string => window.location.href);
const urlShare = ref<string>('');
// alert(encodeURIComponent(urlShare.value));

onBeforeMount(() => {
  urlShare.value = window.location.href;
});
</script>

<style lang="scss" scoped src="./Interaction.scss"></style>

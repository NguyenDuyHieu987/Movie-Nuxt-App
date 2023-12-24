<template>
  <div class="auth-layout">
    <HeaderAuth />
    <div class="background-auth">
      <div class="image-auth desktop">
        <NuxtImg
          :src="
            // getImage(`Background_Auth${image}.jpg`, '/background/auth')
            // 'https://ik.imagekit.io/8toa5f2rp/images/background/1/Background_1.jpg'
            getImage(
              'Background_1.jpg',
              'background/1',
              'w-' + windowWidth?.toString()
            )
          "
          loading="lazy"
          format="avif"
          alt=""
        />
      </div>

      <!-- <div class="image-auth responsive">
          <nuxt-img
            :src="
              getImage(
                `Background_Auth${image_mobile}.jpg`,
                '/background/auth_mobile'
              )
            "
            loading="lazy"
          />
        </div> -->
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { HeaderAuth } from '~/components/Layouts';
import { getImage } from '~/services/image';

const image = ref<number>(Math.floor(Math.random() * 3) + 1);
const image_mobile = ref<number>(Math.floor(Math.random() * 3) + 1);
const windowWidth = ref<number>(1500);

onBeforeMount(() => {
  windowWidth.value = window.innerWidth;
});
</script>

<style lang="scss" scoped src="~/assets/style/authLayout.scss"></style>

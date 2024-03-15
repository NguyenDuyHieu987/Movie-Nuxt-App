<template>
  <div class="cast-item">
    <!-- <el-skeleton :loading="loading" animated class="cast-item">
      <template #template>
        <el-skeleton-item class="skeleton-img" />
        <div class="content-skeleton">
          <el-skeleton-item variant="text" style="width: 70%" />
          <el-skeleton-item variant="text" style="width: 100%" />
        </div>
      </template>

      <template #default> </template>
    </el-skeleton> -->

    <div class="img-box">
      <div class="ant-image">
        <img
          :src="getPosterCast(item?.profile_path)"
          loading="lazy"
          alt=""
        />
      </div>
    </div>

    <div class="info">
      <p class="name">
        {{ item?.name }}
      </p>
      <p
        v-if="type == 'cast'"
        class="character"
      >
        {{ item?.character }}
      </p>
      <p
        v-else-if="type == 'crew'"
        class="job"
      >
        {{ item?.job }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getPosterCast } from '~/services/image';

const props = defineProps<{
  item: any;
  type: string;
}>();

const loading = ref<boolean>(false);

onBeforeMount(async () => {
  loading.value = true;

  await wait(300);

  loading.value = false;
});
</script>

<style lang="scss" src="./CastCard.scss"></style>
<!-- <style lang="scss">
@import url('./CastCard.scss');
</style> -->

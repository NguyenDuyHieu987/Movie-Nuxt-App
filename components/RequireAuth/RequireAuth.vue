<template>
  <div class="require-auth">
    <a-result
      class="result-view"
      title="Bạn cần đăng nhập để sử dụng chức năng này"
      status="403"
    >
      <template #extra>
        <a-button
          type="text"
          size="large"
          class="default"
          @click="$router.back()"
        >
          Quay lại
        </a-button>

        <NuxtLink to="/login">
          <a-button
            class="gradient"
            size="large"
            type="text"
          >
            Đăng nhập ngay
          </a-button>
        </NuxtLink>
      </template>
    </a-result>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" src="./RequireAuth.scss"></style>
<!-- <style lang="scss">
@import url('./RequireAuth.scss');
</style> -->

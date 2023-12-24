<template>
  <!-- :disabled="!store.openRequireAuthDialog"  -->
  <!-- <Teleport to="#append-to"> -->
  <div class="require-auth">
    <el-dialog
      v-model="store.openRequireAuthDialog"
      class="require-auth-dialog"
      :width="600"
      align-center
      center
      append-to="#append-to"
      :show-close="false"
    >
      <template #header>
        <CloseBtn
          class="transparent"
          @click="store.setCloseRequireAuthDialog()"
        />
      </template>

      <a-result
        title="Bạn cần đăng nhập để sử dụng chức năng này"
        status="403"
      >
      </a-result>

      <template #footer>
        <NuxtLink
          :to="{ path: '/signup' }"
          @click="store.setCloseRequireAuthDialog()"
        >
          <a-button
            type="text"
            size="large"
            class="default"
          >
            Đăng ký
          </a-button>
        </NuxtLink>
        <NuxtLink
          :to="{ path: '/login' }"
          @click="store.setCloseRequireAuthDialog()"
        >
          <a-button
            type="text"
            size="large"
            class="default gradient"
          >
            Đăng nhập
          </a-button>
        </NuxtLink>
      </template>
    </el-dialog>

    <!-- <a-modal
        class="require-auth-dialog"
        v-model:visible="store.openRequireAuthDialog"
        :width="600"
        centered
        :closable="true"
      >
        <template #closeIcon>
          <CloseBtn
            class="transparent"
            @click="store.setCloseRequireAuthDialog()"
          />
        </template>
  
        <a-result title="Bạn cần đăng nhập để sử dụng chức năng này" status="403">
        </a-result>
  
        <template #footer>
          <NuxtLink
            :to="{ path: '/signup' }"
            @click="store.setCloseRequireAuthDialog()"
          >
            <a-button type="text" size="large" class="default">
              Đăng ký
            </a-button>
          </NuxtLink>
          <NuxtLink
            :to="{ path: '/login' }"
            @click="store.setCloseRequireAuthDialog()"
          >
            <a-button type="text" size="large" class="default gradient">
              Đăng nhập
            </a-button>
          </NuxtLink>
        </template>
      </a-modal> -->
  </div>
  <!-- </Teleport> -->
</template>

<script setup lang="ts">
import { CloseBtn } from '~/components/ButtonTemplate';

const store = useStore();
</script>

<style lang="scss" src="./RequireAuthDialog.scss"></style>

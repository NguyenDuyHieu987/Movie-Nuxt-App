<template>
  <header class="header-bar-service">
    <div class="header-bar-service-container">
      <div class="left-header">
        <button
          class="menu-btn"
          @click="store.toogleDrawer()"
        >
          <MenuOutlined />
        </button>

        <div class="logo">
          <NuxtLink :to="{ path: '/' }">
            <NuxtImg
              :src="getImage('logo.png', 'logo', { w: 45 })"
              alt=""
              :height="30"
              :width="30"
              preload
            />
            <span> PhimHay247 </span>
          </NuxtLink>
        </div>
      </div>

      <div class="right-header">
        <ClientOnly>
          <el-skeleton
            :loading="loadingUser"
            animated
          >
            <template #template>
              <el-skeleton-item
                v-for="(item, index) in 2"
                :key="index"
                class="menu-item skeleton"
                variant="button"
                :index="index"
              />
            </template>

            <template #default>
              <ul class="menu-header">
                <li
                  v-if="isLogin"
                  class="menu-item notification"
                  :show-timeout="0"
                  :hide-timeout="0"
                >
                  <Notification />
                </li>

                <li class="menu-item account">
                  <DropdownAccount />
                </li>
              </ul>
            </template>
          </el-skeleton>
          <template #fallback>
            <el-skeleton
              :loading="true"
              animated
            >
              <template #template>
                <el-skeleton-item
                  v-for="(item, index) in 2"
                  :key="index"
                  class="menu-item skeleton"
                  variant="button"
                  :index="index"
                />
              </template>
            </el-skeleton>
          </template>
        </ClientOnly>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
// import { Notification, DropdownAccount } from '~/components/Layouts/Header';
import Notification from '~/components/Layouts/Header/Notification/Notification.vue';
import DropdownAccount from '~/components/Layouts/Header/DropdownAccount/DropdownAccount.vue';
import { getImage } from '~/services/image';
import { MenuOutlined } from '@ant-design/icons-vue';
import { storeToRefs } from 'pinia';

const store = useStore();
const authStore = useAuthStore();
const utils = useUtils();
const { isLogin, loadingUser } = storeToRefs<any>(authStore);

onMounted(() => {});

const handleLogout = () => {
  if (isLogin) {
    authStore.logOut();
  }
};
</script>

<style lang="scss" src="./HeaderService.scss"></style>
<!-- <style lang="scss">
@import url('./HeaderService.scss');
</style> -->

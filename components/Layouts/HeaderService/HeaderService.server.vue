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
            <nuxt-img
              :src="getImage('logo.png', 'logo')"
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
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { MenuOutlined } from '@ant-design/icons-vue';
import _ from 'lodash';
import { storeToRefs } from 'pinia';

import { DropdownAccount, Notification } from '~/components/Layouts/Header';
import { getImage } from '~/services/image';

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

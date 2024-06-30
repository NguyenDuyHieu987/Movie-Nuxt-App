<template>
  <header class="header-bar-center-page">
    <div class="header-bar-center-page-container">
      <div class="left-header">
        <button
          class="menu-btn"
          :class="{
            show: true
          }"
          @click="store.toogleDrawer()"
        >
          <MenuOutlined />
        </button>

        <div class="logo">
          <NuxtLink :to="{ path: '/' }">
            <NuxtImg
              :src="getImage('logo.png', 'logo')"
              alt=""
              :height="30"
              :width="30"
              preload
            />
            <span> PhimHay247 </span>
          </NuxtLink>
        </div>

        <NuxtLink
          v-if="$route.path == '/contact'"
          class="helpcenter-logo"
          to="/help"
        >
          Trung tâm trợ giúp
        </NuxtLink>
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

                <li
                  v-if="isLogin"
                  class="menu-item account"
                >
                  <DropdownAccount />
                </li>

                <li
                  v-else
                  class="menu-item login-header"
                >
                  <NuxtLink to="/login">
                    <UserCircle
                      width="2.3rem"
                      height="2.3rem"
                      fill="currentColor"
                    />
                    <span> Đăng Nhập</span>
                  </NuxtLink>
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
                  :index="index"
                  class="menu-item skeleton"
                  variant="button"
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
import UserCircle from '~/assets/svgs/icons/user-circle.svg?component';

import { MenuOutlined } from '@ant-design/icons-vue';
// import { Notification, DropdownAccount } from '~/components/Layouts/Header';
// import Notification from '~/components/Layouts/Header/Notification/Notification.vue';
// import DropdownAccount from '~/components/Layouts/Header/DropdownAccount/DropdownAccount.vue';
import { getImage } from '~/services/image';
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

<style lang="scss" src="./HeaderCenterPage.scss"></style>
<!-- <style lang="scss">
@import url('./HeaderCenterPage.scss');
</style> -->

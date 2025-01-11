<template>
  <el-dropdown
    trigger="hover"
    popper-class="header account background-app-blur"
    placement="bottom-end"
    :show-timeout="0"
  >
    <span
      class="el-dropdown-link account"
      aria-label="dropdown-account"
    >
      <!-- class="el-icon--right" -->
      <!-- <el-icon>
        <SvgoUserOutlined
          class="user-outlined"
          width="1.5rem"
          height="1.5rem"
          fill="currentColor"
        />

        <SvgoCaret
          width="1.5rem"
          height="1.5rem"
          fill="currentColor"
        />
      </el-icon> -->

      <div class="user-avatar">
        <NuxtImg
          v-if="isLogin"
          class="avatar"
          :src="getUserAvatar(userAccount?.avatar)"
          alt=""
          preload
        />
        <NuxtImg
          v-else
          class="avatar"
          :src="getImage(`common_user_avatar.png`, 'user_avatar', { w: 50 })"
          alt=""
          preload
        />
      </div>
    </span>

    <template #dropdown>
      <el-dropdown-menu class="dropdown-account">
        <el-dropdown-item v-if="isLogin">
          <NuxtLink
            class="your-account"
            to="/YourAccount"
          >
            <span class="account-username">Tài khoản</span>
            <br />
            <span class="account-email">
              {{ userAccount?.email }}
            </span>
          </NuxtLink>
        </el-dropdown-item>

        <el-dropdown-item v-if="isLogin && role == 'admin'">
          <NuxtLink
            :to="runtimeConfig.app.adminWebsiteUrl"
            target="_blank"
          >
            Bảng điều khiển
          </NuxtLink>
        </el-dropdown-item>

        <el-dropdown-item v-if="!isLogin">
          <NuxtLink to="/login"> Đăng nhập</NuxtLink>
        </el-dropdown-item>

        <el-dropdown-item
          v-else
          @click="handleLogout"
        >
          <span>Đăng xuất</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
// import SvgoUserOutlined from '~/assets/svgs/icons/user-outlined.svg?component';
// import SvgoCaret from '~/assets/svgs/icons/caret.svg?component';

import { getImage, getUserAvatar } from '~/services/image';
import { storeToRefs } from 'pinia';

const utils = useUtils();
const authStore = useAuthStore();
const runtimeConfig = useRuntimeConfig();
const { isLogin, userAccount, role } = storeToRefs(authStore);

const handleLogout = () => {
  authStore.logOut();
};
</script>

<style lang="scss" src="./DropdownAccount.scss"></style>
<!-- <style lang="scss">
@import url('./DropdownAccount.scss');
</style> -->

<template>
  <el-dropdown
    trigger="hover"
    popper-class="header account"
    placement="bottom-end"
    :show-timeout="0"
  >
    <span
      class="el-dropdown-link account"
      aria-label="dropdown-account"
    >
      <!-- class="el-icon--right" -->
      <!-- <el-icon>
        <UserOutlined
          class="user-outlined"
          width="1.5rem"
          height="1.5rem"
          fill="currentColor"
        />

        <Caret
          width="1.5rem"
          height="1.5rem"
          fill="currentColor"
        />
      </el-icon> -->

      <div class="user-avatar">
        <NuxtImg
          v-if="isLogin"
          class="avatar"
          :src="
            !isNaN(+userAccount?.avatar)
              ? getImage(`account${userAccount?.avatar}.jpg`, 'user_avatar', {
                  w: 50
                })
              : userAccount?.avatar
          "
          loading="lazy"
          alt=""
          preload
        />
        <NuxtImg
          v-else
          class="avatar"
          :src="getImage(`common_user_avatar.png`, 'user_avatar', { w: 50 })"
          loading="lazy"
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
            :to="$config.app.adminWebsiteUrl"
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
// import Caret from '~/assets/svgs/icons/caret.svg?component';
// import UserOutlined from '~/assets/svgs/icons/user-outlined.svg?component';

import { getImage } from '~/services/image';
import { storeToRefs } from 'pinia';

const utils = useUtils();
const authStore = useAuthStore();
const { isLogin, userAccount, role } = storeToRefs<any>(authStore);

const handleLogout = () => {
  authStore.logOut();
};
</script>

<style lang="scss" src="./DropdownAccount.scss"></style>
<!-- <style lang="scss">
@import url('./DropdownAccount.scss');
</style> -->

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
      <el-icon class="el-icon--right">
        <svg
          class="user-outlined"
          xmlns="http://www.w3.org/2000/svg"
          width="1.5rem"
          height="1.5rem"
          viewBox="0 0 1024 1024"
          fill="currentColor"
        >
          <path
            d="M858.5 763.6a374 374 0 0 0-80.6-119.5a375.63 375.63 0 0 0-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1c-.4.2-.8.3-1.2.5c-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 0 0-80.6 119.5A371.7 371.7 0 0 0 136 901.8a8 8 0 0 0 8 8.2h60c4.4 0 7.9-3.5 8-7.8c2-77.2 33-149.5 87.8-204.3c56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 0 0 8-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z"
          />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.5rem"
          height="1.5rem"
          viewBox="0 0 1024 1024"
          fill="currentColor"
        >
          <path
            d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"
          />
        </svg>
      </el-icon>
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
import { storeToRefs } from 'pinia';

const utils = useUtils();
const store = useStore();
const { isLogin, userAccount, role } = storeToRefs<any>(store);

const handleLogout = () => {
  store.logOut();
};
</script>

<style lang="scss" src="./DropdownAccount.scss"></style>

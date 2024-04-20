<template>
  <!-- v-model:visible="openDrawer" -->
  <a-drawer
    v-model:open="openDrawer"
    class="menu-drawer"
    placement="left"
    :closable="false"
    width="var(--drawer-width)"
    :autofocus="false"
    :force-render="false"
  >
    <template #title>
      <svg
        class="close-drawer"
        xmlns="http://www.w3.org/2000/svg"
        width="2.5rem"
        height="2.5rem"
        viewBox="0 0 24 24"
        fill="currentColor"
        @click="store.toogleDrawer()"
      >
        <path
          d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"
        />
      </svg>

      <div class="logo">
        <NuxtLink :to="{ path: '/' }"> PhimHay247 </NuxtLink>
      </div>
    </template>

    <header class="user-header">
      <div
        v-if="isLogin"
        class="avatar-box"
      >
        <NuxtImg
          class="avatar"
          :src="
            !isNaN(+userAccount?.avatar)
              ? getImage(
                  `account${userAccount?.avatar}.jpg`,
                  'user_avatar',
                  'w-50'
                )
              : userAccount?.avatar
          "
          loading="lazy"
          alt=""
          preload
        />
      </div>

      <h4 class="user-name-text">
        {{ userAccount?.username }}
      </h4>
    </header>

    <div class="drawer-menu">
      <TheMenu :no-collapse="true" />
    </div>
  </a-drawer>

  <!-- <ClientOnly>
    <el-drawer
      class="menu-drawer"
      v-model="openDrawer"
      direction="ltr"
      placement="left"
      size="var{--drawer-width}"
      :show-close="false"
    >
      <template #title>
        <div class="drawer-header">
          <svg
            class="close"
            @click="store.toogleDrawer()"
            xmlns="http://www.w3.org/2000/svg"
            width="2.5rem"
            height="2.5rem"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"
            />
          </svg>

          <div class="logo">
            <NuxtLink :to="{ path: '/' }"> PhimHay247 </NuxtLink>
          </div>
        </div>
      </template>

      <header class="user-header">
        <div class="avatar-box" v-if="!collapsed && isLogin">
          <NuxtImg
            class="avatar"
            :src="
              !isNaN(+userAccount?.avatar)
                ? getImage(`account${userAccount?.avatar}.jpg`, 'user_avatar')
                : userAccount?.avatar
            "
            alt=""
          />
        </div>

        <h4>
          {{ userAccount?.username }}
        </h4>
      </header>

      <TheMenu :noCollapse="true" />
    </el-drawer>
  </ClientOnly> -->
</template>

<script setup lang="ts">
// import { TheMenu } from '~/components/Layouts';
import TheMenu from '~/components/Layouts/TheMenu/TheMenu.server.vue';
import { storeToRefs } from 'pinia';
import { getImage } from '~/services/image';

const store = useStore();
const authStore = useAuthStore();
const { collapsed, openDrawer } = storeToRefs<any>(store);
const { isLogin, userAccount } = storeToRefs<any>(authStore);
const route = useRoute();
const router = useRouter();

onMounted(() => {
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) {
      store.openDrawer = false;
    }
  });
});

router.beforeResolve(() => {
  if (store.openDrawer) {
    store.openDrawer = false;
  }
});
</script>

<style lang="scss" src="./Drawer.scss"></style>
<!-- <style lang="scss">
@import url('./Drawer.scss');
</style> -->

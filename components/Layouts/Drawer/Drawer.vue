<template>
  <!-- v-model:visible="openDrawer" -->
  <a-drawer
    v-model:open="openDrawer"
    class="menu-drawer"
    placement="left"
    :closable="false"
    width="var(--drawer-width)"
    :autofocus="true"
    :force-render="false"
  >
    <template #title>
      <SvgoMenu
        class="close-drawer"
        width="2.5rem"
        height="2.5rem"
        fill="currentColor"
        @click="store.toogleDrawer()"
      />

      <div class="logo">
        <NuxtLink to="/"><span>PhimHay247</span></NuxtLink>
      </div>
    </template>

    <header class="user-header">
      <div
        v-if="isLogin"
        class="avatar-box"
      >
        <NuxtImg
          class="avatar"
          :src="getUserAvatar(userAccount?.avatar)"
          alt=""
          preload
        />
      </div>

      <h4 class="user-name-text">
        {{ userAccount?.username }}
      </h4>
    </header>

    <div class="drawer-menu">
      <Suspense>
        <TheMenu :no-collapse="true" />

        <template #fallback>
          <div class="loading-menu">
            <LoadingSpinner
              class="loading-app-color center"
              :width="35"
            />
          </div>
        </template>
      </Suspense>
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
          <Menu
            class="close"
            width="2.5rem"
            height="2.5rem"
            fill="currentColor"
            @click="store.toogleDrawer()"
          />

          <div class="logo">
            <NuxtLink :to="{ path: '/' }"> PhimHay247 </NuxtLink>
          </div>
        </div>
      </template>

      <header class="user-header">
        <div
          class="avatar-box"
          v-if="!collapsed && isLogin"
        >
          <NuxtImg
            class="avatar"
            :src="getUserAvatar(userAccount?.avatar)"
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
// import SvgoMenu from '~/assets/svgs/icons/menu.svg?component';

// import { TheMenu } from '~/components/Layouts';
// import TheMenu from '~/components/Layouts/TheMenu/TheMenu.vue';
import { storeToRefs } from 'pinia';
import { getImage, getUserAvatar } from '~/services/image';

const store = useStore();
const authStore = useAuthStore();
const { collapsed, openDrawer } = storeToRefs(store);
const { isLogin, userAccount } = storeToRefs(authStore);
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

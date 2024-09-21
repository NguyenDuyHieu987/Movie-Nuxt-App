<template>
  <a-layout-sider
    v-model:collapsed="collapsed"
    width="var(--sider-width)"
    collapsed-width="var(--sider-collapsed-width)"
    class="sider-bar"
    :class="{ 'open-fixed': openSiderBarFixed, scrolled: siderScrolled }"
    collapsible
    :default-collapsed="true"
    @collapse="handleCollapse"
  >
    <header class="sider-header">
      <div
        v-if="isLogin"
        class="user-header"
      >
        <div
          v-if="!collapsed || openSiderBarFixed"
          class="avatar-box"
        >
          <NuxtImg
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
        </div>

        <div>
          <h4 v-if="!collapsed || openSiderBarFixed">
            {{ userAccount?.username }}
          </h4>

          <el-tooltip
            v-else
            :title="userAccount?.username"
            :content="userAccount?.username"
            popper-class="popper-tooltip"
            placement="right"
          >
            <div class="user-name-short">
              <h4>
                {{ userAccount?.username?.slice(0, 2).toUpperCase() }}
              </h4>
            </div>
          </el-tooltip>
        </div>
      </div>
    </header>

    <TheMenuRTL />

    <template #trigger>
      <footer
        :title="collapsed ? 'Mở sidebar' : 'Đóng sidebar'"
        class="sider-footer click-active"
      >
        <div :class="['trigger-collapse', { collapsed: collapsed }]">
          <ChevronRightDouble
            v-if="collapsed"
            width="2rem"
            height="2rem"
            fill="currentColor"
          />

          <ChevronLeftDouble
            v-else
            width="2rem"
            height="2rem"
            fill="currentColor"
          />

          <span
            v-if="collapsed && openSiderBarFixed"
            class="title-trigger-collapse open"
          >
            Mở
          </span>
          <span
            v-else-if="!collapsed"
            class="title-trigger-collapse collapsed"
          >
            Đóng
          </span>
        </div>
      </footer>
    </template>
  </a-layout-sider>
</template>

<script setup lang="ts">
import ChevronLeftDouble from '~/assets/svgs/icons/chevron-left-double.svg?component';
import ChevronRightDouble from '~/assets/svgs/icons/chevron-right-double.svg?component';

// import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons-vue';
// import { TheMenu } from '~/components/Layouts';
// import TheMenu from '~/components/Layouts/TheMenu/TheMenu.vue';
import { getImage } from '~/services/image';
import { storeToRefs } from 'pinia';
import { useLocalStorage } from '@vueuse/core';

const store = useStore();
const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();
const { collapsed, openSiderBarFixed } = storeToRefs(store);
const { isLogin, userAccount } = storeToRefs(authStore);
const siderScrolled = ref<boolean>(false);
// const isCollapsed = computed<boolean>(
//   () =>
//     collapsed.value ||
//     APP.PAGES_COLLAPSED_SIDEBAR.includes(route.meta.key as string)
// );

const appStorageStates = useLocalStorage(STORAGE.APP_STATES.KEY, {
  [STORAGE.APP_STATES.COLLAPSED_SIDEBAR]: false
});

onMounted(() => {
  if (
    appStorageStates.value[STORAGE.APP_STATES.COLLAPSED_SIDEBAR] == true ||
    window.innerWidth < APP.COLLAPSED_SIDEBAR_WIDTH
  ) {
    store.collapsed = true;
  }

  const menu: HTMLElement | null = document.querySelector(
    '.sider-bar .ant-layout-sider-children'
  );
  const siderHeader = document.querySelector(
    '.sider-bar .sider-header'
  ) as HTMLElement;

  menu!.addEventListener('scroll', (e: any) => {
    if (e.target.scrollTop > 0) {
      siderScrolled.value = true;
    } else {
      siderScrolled.value = false;
    }
  });

  const siderBar = document.querySelector('.sider-bar');

  siderBar?.addEventListener('mouseover', (e: any) => {
    if (route.meta?.preventOpenFixedSidebar) return;

    if (store.collapsed == true && store.openSiderBarFixed == false) {
      store.openSiderBarFixed = true;
    }

    siderBar?.addEventListener('mouseleave', () => {
      if (store.collapsed == true && store.openSiderBarFixed == true) {
        store.openSiderBarFixed = false;
      }
    });
  });
});

router.afterEach((to: any, from: any, next: any) => {
  if (
    APP.PAGES_COLLAPSED_SIDEBAR.includes(to.meta.key as string) &&
    !store.collapsed
  ) {
    store.collapsed = true;
  }
  // next();
});

const handleCollapse = () => {
  // if (store.collapsed == true) {
  //   store.collapsed = false;
  //   store.openSiderBarFixed = false;
  // } else {
  //   store.collapsed = true;
  //   store.openSiderBarFixed = false;
  // }
};
</script>

<style lang="scss" src="./Sider.scss"></style>
<!-- <style lang="scss">
@import url('./Sider.scss');
</style> -->

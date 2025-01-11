<template>
  <el-dropdown
    trigger="click"
    popper-class="header notification background-app-blur"
    placement="bottom-start"
    :show-timeout="0"
  >
    <span class="el-dropdown-link notification">
      <!-- class="el-icon--right" -->
      <el-icon>
        <a-badge
          :count="3"
          :overflow-count="9"
        >
          <div class="show-notify-btn">
            <SvgoBellRegular
              class="fa-bell fa-regular"
              width="2.2rem"
              height="2.2rem"
              fill="currentColor"
            />

            <SvgoBellSolid
              class="fa-bell fa-solid"
              width="2.2rem"
              height="2.2rem"
              fill="currentColor"
            />
          </div>
        </a-badge>
      </el-icon>
    </span>

    <template #dropdown>
      <el-dropdown-menu class="dropdown-notification">
        <div class="notification-header">
          <span> Thông báo</span>
        </div>

        <el-menu-item-group class="public">
          <template #title>
            <span>Thông báo chung</span>
            <span class="count-message">1</span>
          </template>
          <el-dropdown-item>Chào mừng bạn đến với Phimhay247 </el-dropdown-item>
        </el-menu-item-group>

        <div class="separate" />

        <el-menu-item-group class="private">
          <template #title>
            <span>Thông báo cá nhân</span>
            <span class="count-message">2</span>
          </template>
          <el-dropdown-item>Message 1</el-dropdown-item>
          <el-dropdown-item>Message 2</el-dropdown-item>
        </el-menu-item-group>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
// import SvgoBellRegular from '~/assets/svgs/icons/bell-regular.svg?component';
// import SvgoBellSolid from '~/assets/svgs/icons/bell-solid.svg?component';
</script>

<style lang="scss" src="./Notification.scss"></style>
<!-- <style lang="scss">
@import url('./Notification.scss');
</style> -->

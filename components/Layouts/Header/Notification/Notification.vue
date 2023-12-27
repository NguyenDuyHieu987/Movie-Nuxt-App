<template>
  <el-dropdown
    trigger="click"
    popper-class="header notification"
    placement="bottom-start"
    :show-timeout="0"
  >
    <span class="el-dropdown-link notification">
      <el-icon class="el-icon--right">
        <a-badge
          :count="3"
          :overflow-count="9"
        >
          <div class="show-notify-btn">
            <svg
              class="fa-bell fa-regular"
              xmlns="http://www.w3.org/2000/svg"
              width="2.2rem"
              height="2.2rem"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M12 1.996a7.49 7.49 0 0 1 7.496 7.25l.004.25v4.097l1.38 3.156a1.249 1.249 0 0 1-1.145 1.75L15 18.502a3 3 0 0 1-5.995.177L9 18.499H4.275a1.251 1.251 0 0 1-1.147-1.747L4.5 13.594V9.496c0-4.155 3.352-7.5 7.5-7.5ZM13.5 18.5l-3 .002a1.5 1.5 0 0 0 2.993.145l.007-.147ZM12 3.496c-3.32 0-6 2.674-6 6v4.41L4.656 17h14.697L18 13.907V9.509l-.003-.225A5.988 5.988 0 0 0 12 3.496Z"
              />
            </svg>

            <svg
              class="fa-bell fa-solid"
              xmlns="http://www.w3.org/2000/svg"
              width="2.2rem"
              height="2.2rem"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M9.042 19.003h5.916a3 3 0 0 1-5.916 0Zm2.958-17a7.5 7.5 0 0 1 7.5 7.5v4l1.418 3.16A.95.95 0 0 1 20.052 18h-16.1a.95.95 0 0 1-.867-1.338l1.415-3.16V9.49l.005-.25A7.5 7.5 0 0 1 12 2.004Z"
              />
            </svg>
          </div>
        </a-badge>
      </el-icon>
    </span>

    <template #dropdown>
      <el-dropdown-menu class="dropdown-notification">
        <div class="notification-header">
          <span> Thông báo</span>
        </div>

        <el-menu-item-group
          key="public"
          class="public"
        >
          <template #title>
            <span>Thông báo chung</span>
            <span class="count-message">1</span>
          </template>
          <el-dropdown-item>Chào mừng bạn đến với Phimhay247 </el-dropdown-item>
        </el-menu-item-group>

        <div class="separate" />

        <el-menu-item-group
          key="private"
          class="private"
        >
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

<script setup lang="ts"></script>

<style lang="scss" src="./Notification.scss"></style>

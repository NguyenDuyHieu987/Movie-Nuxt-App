<template>
  <el-dropdown :class="`${APP.CSS_CLASS}-dropdown`">
    <slot />
  </el-dropdown>
</template>

<script setup lang="ts"></script>

<style lang="scss" src="./Dropdown.scss"></style>

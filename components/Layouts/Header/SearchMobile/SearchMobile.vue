<template>
  <el-popover
    trigger="click"
    placement="bottom"
    overlay-class-name="header popover-search"
    popper-class="popper-search"
    effect="dark"
    :hide-after="0"
  >
    <template #reference>
      <div class="search-btn">
        <svg
          class="fa-magnifying-glass"
          xmlns="http://www.w3.org/2000/svg"
          width="1.8rem"
          height="1.8rem"
          viewBox="0 0 512 512"
          fill="currentColor"
        >
          <path
            d="M416 208c0 45.9-14.9 88.3-40 122.7l126.6 126.7c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0s208 93.1 208 208zM208 352a144 144 0 1 0 0-288a144 144 0 1 0 0 288z"
          />
        </svg>
      </div>
    </template>

    <template #default>
      <h3 class="section-title search">
        <span> Tìm kiếm </span>
      </h3>

      <a-input-search
        v-model:value="valueInput"
        class="search-popover"
        placeholder="Nhập tên phim để tìm kiếm..."
        size="large"
        allow-clear
        bordered
        :loading="loadingSearch"
        @search="handleSearch"
        @change="handleChangeInput(valueInput!)"
      >
        <template #enterButton>
          <svg
            class="fa-magnifying-glass"
            xmlns="http://www.w3.org/2000/svg"
            width="1.8rem"
            height="1.8rem"
            viewBox="0 0 512 512"
            fill="currentColor"
          >
            <path
              d="M416 208c0 45.9-14.9 88.3-40 122.7l126.6 126.7c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0s208 93.1 208 208zM208 352a144 144 0 1 0 0-288a144 144 0 1 0 0 288z"
            />
          </svg>
        </template>
      </a-input-search>
    </template>
  </el-popover>
</template>

<script setup lang="ts">
const emits = defineEmits<{
  change: [value: string];
  search: [value: string];
}>();

const valueInput = defineModel<string>('valueInput');
const loadingSearch = defineModel<boolean>('loadingSearch');

const handleChangeInput = (value: string) => {
  emits('change', value);
};

const handleSearch = (value: string) => {
  emits('search', value);
};
</script>

<style lang="scss" src="./SearchMobile.scss"></style>
<!-- <style lang="scss">
@import url('./SearchMobile.scss');
</style> -->

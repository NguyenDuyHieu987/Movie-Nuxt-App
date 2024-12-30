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
        <SvgoMagnifyingGlass
          class="fa-magnifying-glass"
          width="1.8rem"
          height="1.8rem"
          fill="currentColor"
        />
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
          <MagnifyingGlass
            class="fa-magnifying-glass"
            width="1.8rem"
            height="1.8rem"
            fill="currentColor"
          />
        </template>
      </a-input-search>
    </template>
  </el-popover>
</template>

<script setup lang="ts">
// import SvgoMagnifyingGlass from '~/assets/svgs/icons/magnifying-glass.svg?component';

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

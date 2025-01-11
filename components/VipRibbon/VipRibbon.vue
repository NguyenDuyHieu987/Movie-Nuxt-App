<template>
  <div
    class="vip-ribbon"
    :class="[`vip-${vip}`, `vip-ribbon-${size}`, `placement-${placement}`]"
  >
    <span class="vip-ribbon-text"> {{ 'VIP ' + vip }}</span>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    size?: 'small' | 'default' | 'large';
    placement?: 'end' | 'start';
    vip: number;
  }>(),
  {
    size: 'default',
    placement: 'end',
    vip: 0
  }
);

onBeforeMount(async () => {});
</script>

<style lang="scss" src="./VipRibbon.scss"></style>

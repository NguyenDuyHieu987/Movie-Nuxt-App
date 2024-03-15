<template>
  <a-progress
    class="progress-history"
    :stroke-color="{
      from: '#108ee9',
      to: '#87d068'
    }"
    :percent="
      historyProgress == 1
        ? +historyProgress * 100
        : +(historyProgress * 100).toFixed(2)
    "
    status="active"
  >
    <template #format="percent">
      <!-- <span>Xem được</span> -->
      <!-- <div :class="{ success: percent == 100 }">
                    {{ percent == 100 ? 'Hoàn thành' : percent + ' %' }}
                  </div> -->
      <div>
        {{ percent + ' %' }}
      </div>
    </template>
  </a-progress>
</template>

<script setup lang="ts">
const props = defineProps<{
  historyProgress: number;
}>();
</script>

<style lang="scss" src="./HistoryProgressBar.scss"></style>
<!-- <style lang="scss">
@import url('./HistoryProgressBar.scss');
</style> -->

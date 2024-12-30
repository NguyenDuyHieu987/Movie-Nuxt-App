<template>
  <div
    class="network-checker-notification"
    :class="{ online: showOnline, offline: showOffline, closed: isClose }"
  >
    <div class="network-checker-container">
      <div class="left">
        <div class="network-status">
          <!-- <i
                  v-if="isOnline"
                  style="
                    background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yL/r/TzNExlPStE_.png?_nc_eui2=AeGKRA6S_tleHRp0eRJP1pyUkvdItA4UBeOS90i0DhQF49qrFYVM-X648y84vUT4n4TuaLlY51VXP5PC4HPSk9oA');
                    background-position: 0px -226px;
                    background-size: 38px 442px;
                    width: 2.4rem;
                    height: 2.4rem;
                    background-repeat: no-repeat;
                    display: inline-block;
                    color: #009c49;
                  "
                ></i> -->

          <SvgoOnline
            v-if="isOnline"
            class="online-icon"
            width="2.4rem"
            height="2.4rem"
            fill="currentColor"
          />

          <SvgoOffline
            v-else
            class="offline-icon"
            alt=""
            height="2.4rem"
            width="2.4rem"
            fill="currentColor"
          />

          <span class="message">{{
            isOnline
              ? 'Đã khôi phục kết nối Internet.'
              : 'Không có kết nối Internet.'
          }}</span>
        </div>
      </div>
      <div class="right">
        <SvgoXMark
          class="close click-active"
          width="2.3rem"
          height="2.3rem"
          fill="currentColor"
          @click="handleClose"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import SvgoOnline from '~/assets/svgs/icons/online.svg?component';
// import SvgoOffline from '~/assets/svgs/icons/offline.svg?component';
// import SvgoXMark from '~/assets/svgs/icons/x-mark.svg?component';

import { useOnline } from '@vueuse/core';

const isOnline = useOnline();
const isClose = ref<boolean>(false);
const showOnline = ref<boolean>(false);
const showOffline = ref<boolean>(false);

onErrorCaptured((err) => {
  console.log(err);
});

watch(
  isOnline,
  async (newVal, oldVal) => {
    // if (isOnline.value == false) {
    //   console.log(isOnline.value);
    //   throw showError({
    //     fatal: true,
    //     statusCode: 500,
    //     data: {
    //       networkError: true
    //     }
    //   });
    // }

    if (oldVal == true && newVal == false) {
      showOffline.value = true;
      showOnline.value = false;

      // await wait(5000);
      // showOffline.value = false;
    } else if (oldVal == false && newVal == true) {
      showOnline.value = true;
      showOffline.value = false;

      await wait(5000);
      showOnline.value = false;
    }
  },
  {
    immediate: true
  }
);

const handleClose = async () => {
  isClose.value = true;
  showOnline.value = false;
  showOffline.value = false;

  await wait(200);

  isClose.value = false;
};
</script>

<style lang="scss" src="./NetworkChecker.scss"></style>
<!-- <style lang="scss" scoped>
@import url('./NetworkChecker.scss');
</style> -->

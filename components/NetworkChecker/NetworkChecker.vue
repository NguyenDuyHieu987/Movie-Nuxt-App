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

          <svg
            v-if="isOnline"
            class="online-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="2.4rem"
            height="2.4rem"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <circle
              cx="10"
              cy="15"
              r="2"
            />
            <path
              d="M1 7.4a12 13 0 0 1 18 0l-1.5 1.4a10 11.1 0 0 0-15 0zm3.7 3.2a7 7.3 0 0 1 10.7 0L14 12a5 5.3 0 0 0-7.8 0z"
            />
          </svg>

          <svg
            v-else
            class="offline-icon"
            viewBox="0 0 24 24"
            alt=""
            height="2.4rem"
            width="2.4rem"
            fill="currentColor"
          >
            <path
              d="M23.7805.2195c.2925.293.2925.768 0 1.061l-22.5 22.5C1.134 23.927.942 24 .75 24c-.192 0-.384-.073-.5305-.2195-.2925-.293-.2925-.768 0-1.061l12.1967947-12.1971509c-2.3773758-.1150468-4.79162015.7286756-6.6038447 2.5401009-.3905.3905-1.0235.3905-1.414 0-.3905-.3905-.3905-1.024 0-1.414 2.65728981-2.65728981 6.3696459-3.62280965 9.8005664-2.90852144l2.430738-2.43186193C11.7816792 4.58111626 6.15198938 5.65271062 2.27735 9.52735c-.3905.3905-1.0235.3905-1.414 0-.3905-.3905-.3905-1.0235 0-1.414 4.6714534-4.67191574 11.571522-5.78608437 17.3096457-3.34843552L22.7195.2195c.293-.2925.768-.2925 1.061 0zM12 18.5c.6905 0 1.25.5595 1.25 1.25S12.6905 21 12 21s-1.25-.5595-1.25-1.25.5595-1.25 1.25-1.25zm1.4175-4.81495c.9705.2455 1.8905.741 2.6485 1.499.3905.3905.3905 1.0235 0 1.414-.1955.1955-.451.293-.707.293-.256 0-.512-.0975-.707-.293-.7835333-.7835333-1.8301422-1.1445778-2.8581093-1.0880116L11.574 15.52855l1.8435-1.8435zm3.8154-3.8154c.848.4725 1.649 1.059 2.3685 1.779.391.39.391 1.023 0 1.414-.195.195-.451.293-.707.293-.2555 0-.5115-.098-.707-.293-.7285-.728-1.5575-1.291-2.439-1.7085zm2.1908-2.1908l1.4425-1.4425c.8.545 1.5615 1.168 2.2705 1.877.3905.3905.3905 1.0235 0 1.414-.1955.1955-.451.293-.707.293-.256 0-.5115-.0975-.707-.293-.5933333-.59333333-1.2283333-1.11861111-1.895162-1.57959491L19.4237 7.67885l1.4425-1.4425z"
            ></path>
          </svg>

          <span class="message">{{
            isOnline
              ? 'Đã khôi phục kết nối Internet.'
              : 'Không có kết nối Internet.'
          }}</span>
        </div>
      </div>
      <div class="right">
        <svg
          class="close click-active"
          xmlns="http://www.w3.org/2000/svg"
          width="2.3rem"
          height="2.3rem"
          viewBox="0 0 24 24"
          fill="currentColor"
          @click="handleClose"
        >
          <path
            d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41z"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
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
  (newVal, oldVal) => {
    if (isOnline.value == false) {
      throw createError({
        fatal: true,
        statusCode: 500,
        data: {
          networkError: true
        }
      });
    }

    if (oldVal == true && newVal == false) {
      showOffline.value = true;
      showOnline.value = false;
    } else if (oldVal == false && newVal == true) {
      showOffline.value = false;
      showOnline.value = true;
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

<style lang="scss" src="./NetworkChecker.scss" scoped></style>

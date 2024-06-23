<template>
  <el-menu
    :collapse="openSiderBarFixed || props.noCollapse ? false : collapsed"
    :default-openeds="state.openKeys"
    :default-active="state.selectedKeys"
    class="menu-sider-bar"
    theme="dark"
    popper-effect="dark"
    background-color="transparent"
    text-color="var(--menu-text-color)"
    active-text-color="var(--menu-active-text-color)"
    :collapseTransition="false"
    :router="true"
    :unique-opened="true"
    :show-timeout="0"
    :hide-timeout="0"
  >
    <el-menu-item index="/">
      <el-icon> <HomeOutlined /></el-icon>

      <template #title>
        <NuxtLink to="/">Trang chủ</NuxtLink>
      </template>
    </el-menu-item>

    <el-menu-item index="/feature">
      <el-icon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.5rem"
          height="1.5rem"
          viewBox="0 0 576 512"
          fill="currentColor"
        >
          <path
            d="M0 128c0-35.3 28.7-64 64-64h256c35.3 0 64 28.7 64 64v256c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zm559.1-28.2c10.4 5.6 16.9 16.4 16.9 28.2v256c0 11.8-6.5 22.6-16.9 28.2s-23 5-32.9-1.6l-96-64l-14.2-9.5V174.9l14.2-9.5l96-64c9.8-6.5 22.4-7.2 32.9-1.6z"
          />
        </svg>
      </el-icon>

      <template #title>
        <NuxtLink to="/feature">Phim lẻ</NuxtLink>
      </template>
    </el-menu-item>

    <el-menu-item index="/television">
      <el-icon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.5rem"
          height="1.5rem"
          viewBox="0 0 512 512"
          fill="currentColor"
        >
          <path
            d="M0 96c0-35.3 28.7-64 64-64h384c35.3 0 64 28.7 64 64v320c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zm48 272v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16zm368-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16h-32zM48 240v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16zm368-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16h-32zM48 112v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16zm368-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16h-32zm-256 32v64c0 17.7 14.3 32 32 32h128c17.7 0 32-14.3 32-32v-64c0-17.7-14.3-32-32-32H192c-17.7 0-32 14.3-32 32zm32 160c-17.7 0-32 14.3-32 32v64c0 17.7 14.3 32 32 32h128c17.7 0 32-14.3 32-32v-64c0-17.7-14.3-32-32-32H192z"
          />
        </svg>
      </el-icon>

      <template #title>
        <NuxtLink to="/television">Phim bộ</NuxtLink>
      </template>
    </el-menu-item>

    <el-menu-item index="/discover">
      <el-icon>
        <svg
          role="presentation"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          aria-hidden="true"
          focusable="false"
          width="1.6rem"
          height="1.6rem"
          fill="currentColor"
        >
          <path
            d="M10.005 15.005h-4.01v.982h4.01v-.982ZM8.47 0h-.982v2.12h.981V0Zm4.491 2.026-1.498 1.499.694.694 1.498-1.499-.694-.694ZM15.528 7.2H13.41v.981h2.12V7.2ZM2.59 7.243H.473v.981H2.59v-.981Zm.418-5.186-.693.694 1.498 1.498.694-.694-1.499-1.498Z"
          ></path>
          <path
            d="M8 3.055a4.657 4.657 0 0 0-2.49 8.593v1.847l.49.493h4l.49-.493v-1.847A4.657 4.657 0 0 0 8 3.055Zm1.765 7.883-.255.14v1.927H6.49v-1.928l-.255-.14a3.677 3.677 0 1 1 3.53 0Z"
          ></path>
        </svg>
      </el-icon>

      <template #title>
        <NuxtLink to="/discover">Khám phá</NuxtLink>
      </template>
    </el-menu-item>

    <!-- <el-sub-menu index="/discover/movie" popperClass="sub-menu-popper">
        <template #title>
          <el-icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.5rem"
              height="1.5rem"
              viewBox="0 0 576 512"
              fill="currentColor"
            >
              <path
                d="M0 128c0-35.3 28.7-64 64-64h256c35.3 0 64 28.7 64 64v256c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zm559.1-28.2c10.4 5.6 16.9 16.4 16.9 28.2v256c0 11.8-6.5 22.6-16.9 28.2s-23 5-32.9-1.6l-96-64l-14.2-9.5V174.9l14.2-9.5l96-64c9.8-6.5 22.4-7.2 32.9-1.6z"
              />
            </svg>
          </el-icon>
          <span>Phim lẻ</span>
        </template>
  
        <el-menu-item index="/discover/movie/all">
          <NuxtLink
            :to="{
              path: `/discover/movie/all`,
            }"
          >
            Tất cả
          </NuxtLink>
        </el-menu-item>
  
        <el-menu-item index="/discover/movie/nowplaying">
          <NuxtLink
            :to="{
              path: `/discover/movie/nowplaying`,
            }"
          >
            Now playing
          </NuxtLink>
        </el-menu-item>
  
        <el-menu-item index="/discover/movie/popular">
          <NuxtLink
            :to="{
              path: `/discover/movie/popular`,
            }"
          >
            Phổ biến
          </NuxtLink>
        </el-menu-item>
  
        <el-menu-item index="/discover/movie/toprated">
          <NuxtLink
            :to="{
              path: `/discover/movie/toprated`,
            }"
          >
            Top đánh giá
          </NuxtLink>
        </el-menu-item>
  
        <el-menu-item index="/discover/movie/upcoming">
          <NuxtLink
            :to="{
              path: `/discover/movie/upcoming`,
            }"
          >
            Sắp công chiếu
          </NuxtLink>
        </el-menu-item>
      </el-sub-menu> -->

    <!-- <el-sub-menu index="tv" popperClass="sub-menu-popper">
        <template #title>
          <el-icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.5rem"
              height="1.5rem"
              viewBox="0 0 512 512"
              fill="currentColor"
            >
              <path
                d="M0 96c0-35.3 28.7-64 64-64h384c35.3 0 64 28.7 64 64v320c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zm48 272v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16zm368-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16h-32zM48 240v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16zm368-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16h-32zM48 112v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16zm368-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16h-32zm-256 32v64c0 17.7 14.3 32 32 32h128c17.7 0 32-14.3 32-32v-64c0-17.7-14.3-32-32-32H192c-17.7 0-32 14.3-32 32zm32 160c-17.7 0-32 14.3-32 32v64c0 17.7 14.3 32 32 32h128c17.7 0 32-14.3 32-32v-64c0-17.7-14.3-32-32-32H192z"
              />
            </svg>
          </el-icon>
          <span>Phim bộ</span>
        </template>
  
        <el-menu-item index="/discover/tv/all">
          <NuxtLink
            :to="{
              path: `/discover/tv/all`,
            }"
          >
            Tất cả
          </NuxtLink>
        </el-menu-item>
  
        <el-menu-item index="/discover/tv/airingtoday">
          <NuxtLink
            :to="{
              path: `/discover/tv/airingtoday`,
            }"
          >
            Airing today
          </NuxtLink>
        </el-menu-item>
  
        <el-menu-item index="/discover/tv/ontheair">
          <NuxtLink
            :to="{
              path: `/discover/tv/ontheair`,
            }"
          >
            On the air
          </NuxtLink>
        </el-menu-item>
  
        <el-menu-item index="/discover/tv/popular">
          <NuxtLink
            :to="{
              path: `/discover/tv/popular`,
            }"
          >
            Phổ biến
          </NuxtLink>
        </el-menu-item>
  
        <el-menu-item index="/discover/tv/toprated">
          <NuxtLink
            :to="{
              path: `/discover/tv/toprated`,
            }"
          >
            Top đánh giá
          </NuxtLink>
        </el-menu-item>
      </el-sub-menu> -->

    <el-sub-menu
      index="genres"
      popper-class="sub-menu-popper"
    >
      <template #title>
        <el-icon>
          <!-- <Icon name="fa6-solid:list"></Icon> -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.5rem"
            height="1.5rem"
            viewBox="0 0 512 512"
            fill="currentColor"
          >
            <path
              d="M80 48h-64C7.156 48 0 55.16 0 64v64c0 8.844 7.156 16 16 16h64C88.84 144 96 136.8 96 128V64C96 55.16 88.84 48 80 48zM80 208h-64C7.156 208 0 215.2 0 224v64c0 8.844 7.156 16 16 16h64C88.84 304 96 296.8 96 288V224C96 215.2 88.84 208 80 208zM80 368h-64C7.156 368 0 375.2 0 384v64c0 8.844 7.156 16 16 16h64C88.84 464 96 456.8 96 448v-64C96 375.2 88.84 368 80 368zM192 128h288c17.67 0 32-14.33 32-31.1S497.7 64 480 64H192C174.3 64 160 78.33 160 95.1S174.3 128 192 128zM480 384H192c-17.67 0-32 14.33-32 32s14.33 32 32 32h288c17.67 0 32-14.33 32-32S497.7 384 480 384zM480 224H192C174.3 224 160 238.3 160 256s14.33 32 32 32h288c17.67 0 32-14.33 32-32S497.7 224 480 224z"
            />
          </svg>
        </el-icon>
        <span>Thể loại</span>
      </template>

      <el-menu-item
        v-for="(item, index) in genres"
        :key="item?.id"
        :index="`/discover/genre/${item?.short_name}`"
      >
        <a-tooltip
          v-if="item?.name_vietsub?.length > 30"
          :title="item?.name_vietsub"
          placement="right"
        >
          <NuxtLink
            :to="{
              path: `/discover/genre/${item?.short_name}`
            }"
          >
            {{ item?.name_vietsub }}
          </NuxtLink>
        </a-tooltip>

        <NuxtLink
          v-else
          :to="{
            path: `/discover/genre/${item?.short_name}`
          }"
        >
          {{ item?.name_vietsub }}
        </NuxtLink>
      </el-menu-item>
    </el-sub-menu>

    <el-sub-menu
      index="years"
      popper-class="sub-menu-popper"
    >
      <template #title>
        <el-icon>
          <!-- <Icon name="fa6-regular:calendar-days" />  -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.5rem"
            height="1.5rem"
            viewBox="0 0 448 512"
            fill="currentColor"
          >
            <path
              d="M128 0c17.7 0 32 14.3 32 32v32h128V32c0-17.7 14.3-32 32-32s32 14.3 32 32v32h48c26.5 0 48 21.5 48 48v48H0v-48c0-26.5 21.5-48 48-48h48V32c0-17.7 14.3-32 32-32zM0 192h448v272c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16h-32zM64 400v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16h-32zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16z"
            />
          </svg>
        </el-icon>
        <span>Năm phát hành</span>
      </template>

      <el-menu-item
        v-for="(item, index) in years"
        :key="item?.name"
        :index="`/discover/year/${
          utils.isNumber(item?.name) || utils.isStringNumber(item?.name)
            ? item?.name
            : utils.convertPath.toPath(item?.name)
        }`"
      >
        <NuxtLink
          :to="{
            path: `/discover/year/${
              utils.isNumber(item?.name) || utils.isStringNumber(item?.name)
                ? item?.name
                : utils.convertPath.toPath(item?.name)
            }`
          }"
        >
          {{ item?.name }}
        </NuxtLink>
      </el-menu-item>
    </el-sub-menu>

    <el-sub-menu
      index="countries"
      popper-class="sub-menu-popper"
    >
      <template #title>
        <el-icon>
          <!-- <Icon name="fa6-solid:globe" /> -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.5rem"
            height="1.5rem"
            viewBox="0 0 512 512"
            fill="currentColor"
          >
            <path
              d="M256 16C123.5 16 16 123.5 16 256s107.5 240 240 240s239.1-107.5 239.1-240S388.5 16 256 16zM422 160H373.3c-6.391-27.41-15.39-52.18-26.48-73.1C378.2 103.8 404.2 129.2 422 160zM336 256c0 16.98-1.295 32.82-3.176 48H179.2C177.3 288.8 176 272.1 176 256s1.295-32.82 3.176-48h153.6C334.7 223.2 336 239 336 256zM256 448c-21.79 0-50.87-36.42-67.28-96h134.6C306.9 411.6 277.8 448 256 448zM188.7 160C205.1 100.4 234.2 64 256 64s50.87 36.42 67.28 96H188.7zM165.2 86.9C154.1 107.8 145.1 132.6 138.7 160H89.98C107.8 129.2 133.8 103.8 165.2 86.9zM70.32 208h60.25C128.9 223.5 128 239.6 128 256S128.9 288.5 130.6 304H70.32C66.34 288.6 64 272.6 64 256S66.34 223.4 70.32 208zM89.98 352H138.7c6.391 27.41 15.39 52.18 26.48 73.1C133.8 408.2 107.8 382.8 89.98 352zM346.8 425.1C357.9 404.2 366.9 379.4 373.3 352h48.74C404.2 382.8 378.2 408.2 346.8 425.1zM441.7 304h-60.25c1.68-15.51 2.57-31.56 2.57-48s-.8907-32.49-2.57-48h60.25C445.7 223.4 448 239.4 448 256S445.7 288.6 441.7 304z"
            />
          </svg>
        </el-icon>
        <span>Quốc gia</span>
      </template>

      <el-menu-item
        v-for="(item, index) in countries"
        :key="item?.short_name"
        :index="`/discover/country/${item?.short_name}`"
      >
        <NuxtLink
          :to="{
            path: `/discover/country/${item?.short_name}`
          }"
        >
          <!-- @click="$store.breadCrumbValue = item?.name" -->

          {{ item?.name }}
        </NuxtLink>
      </el-menu-item>
    </el-sub-menu>

    <el-menu-item index="/follow">
      <el-icon>
        <!-- <span class="material-icons-outlined"> playlist_play </span> -->
        <!-- <Icon
            class="material-icons-outlined playlist"
            name="ic:baseline-playlist-play"
          /> -->
        <svg
          class="material-icons-outlined playlist"
          xmlns="http://www.w3.org/2000/svg"
          enable-background="new 0 0 24 24"
          height="2.6rem"
          width="2.6rem"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <g>
            <rect
              fill="none"
              height="24"
              width="24"
            />
          </g>
          <g>
            <g>
              <rect
                height="2"
                width="11"
                x="3"
                y="10"
              />
              <rect
                height="2"
                width="11"
                x="3"
                y="6"
              />
              <rect
                height="2"
                width="7"
                x="3"
                y="14"
              />
              <polygon points="16,13 16,21 22,17" />
            </g>
          </g>
        </svg>
      </el-icon>
      <template #title>
        <NuxtLink to="/follow"> Theo dõi</NuxtLink>
      </template>
    </el-menu-item>

    <el-menu-item index="/history">
      <el-icon>
        <!-- <Icon name="fa6-solid:clock-rotate-left" /> -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.5rem"
          height="1.5rem"
          viewBox="0 0 512 512"
          fill="currentColor"
        >
          <path
            d="M75 75L41 41C25.9 25.9 0 36.6 0 57.9V168c0 13.3 10.7 24 24 24h110.1c21.4 0 32.1-25.9 17-41l-30.8-30.8C155 85.5 203 64 256 64c106 0 192 86 192 192s-86 192-192 192c-40.8 0-78.6-12.7-109.7-34.4c-14.5-10.1-34.4-6.6-44.6 7.9s-6.6 34.4 7.9 44.6C151.2 495 201.7 512 256 512c141.4 0 256-114.6 256-256S397.4 0 256 0C185.3 0 121.3 28.7 75 75zm181 53c-13.3 0-24 10.7-24 24v104c0 6.4 2.5 12.5 7 17l72 72c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-65-65V152c0-13.3-10.7-24-24-24z"
          />
        </svg>
      </el-icon>
      <template #title>
        <NuxtLink to="/history"> Lịch sử Xem </NuxtLink>
      </template>
    </el-menu-item>

    <el-menu-item index="/ranks">
      <el-icon>
        <!-- <Icon name="fa6-solid:ranking-star" /> -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.5rem"
          height="1.5rem"
          viewBox="0 0 640 512"
          fill="currentColor"
        >
          <path
            d="M353.8 54.1L330.2 6.3c-3.9-8.3-16.1-8.6-20.4 0l-23.6 47.8l-52.3 7.5c-9.3 1.4-13.3 12.9-6.4 19.8l38 37l-9 52.1c-1.4 9.3 8.2 16.5 16.8 12.2l46.9-24.8l46.6 24.4c8.6 4.3 18.3-2.9 16.8-12.2l-9-52.1l38-36.6c6.8-6.8 2.9-18.3-6.4-19.8l-52.3-7.5zM256 256c-17.7 0-32 14.3-32 32v192c0 17.7 14.3 32 32 32h128c17.7 0 32-14.3 32-32V288c0-17.7-14.3-32-32-32H256zM32 320c-17.7 0-32 14.3-32 32v128c0 17.7 14.3 32 32 32h128c17.7 0 32-14.3 32-32V352c0-17.7-14.3-32-32-32H32zm416 96v64c0 17.7 14.3 32 32 32h128c17.7 0 32-14.3 32-32v-64c0-17.7-14.3-32-32-32H480c-17.7 0-32 14.3-32 32z"
          />
        </svg>
      </el-icon>
      <template #title>
        <NuxtLink to="/ranks"> Xếp hạng</NuxtLink>
      </template>
    </el-menu-item>

    <div class="separate"></div>

    <el-menu-item
      class="upgrade-account"
      index="/upgrade/plans"
    >
      <el-icon>
        <!-- <NuxtImg :src="getImage('king.png', 'misc', { h: 16 })" alt="" /> -->

        <svg
          viewBox="0 0 192 192"
          height="1.6rem"
          width="1.6rem"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <linearGradient
            id="New_Gradient_Swatch_1"
            gradientUnits="userSpaceOnUse"
            x1="36.343"
            x2="155.657"
            y1="175.657"
            y2="56.343"
          >
            <stop
              offset="0"
              stop-color="#34cdfa"
            />
            <stop
              offset="1"
              stop-color="#ccbcd6"
            />
          </linearGradient>
          <path
            d="m180.521 81.4a8 8 0 0 0 -8.959-.056l-40.462 26.972-27.945-55.894a8 8 0 0 0 -14.31 0l-27.945 55.894-40.463-26.972a8 8 0 0 0 -12.247 8.391l16 72a8 8 0 0 0 7.81 6.265h128a8 8 0 0 0 7.81-6.265l16-72a8 8 0 0 0 -3.289-8.335z"
            fill="url(#New_Gradient_Swatch_1)"
          />
          <path
            d="m24 160v24a8 8 0 0 0 8 8h128a8 8 0 0 0 8-8v-24"
            fill="#99e6fd"
          />
          <path
            d="m40 184v-24h-16v24a8 8 0 0 0 8 8h16a8 8 0 0 1 -8-8z"
            fill="#67d9fb"
          />
          <g fill="#ccf2fe">
            <circle
              cx="96"
              cy="32"
              r="8"
            />
            <circle
              cx="184"
              cy="72"
              r="8"
            />
            <circle
              cx="8"
              cy="72"
              r="8"
            />
          </g>
        </svg>
      </el-icon>
      <template #title>
        <NuxtLink
          class="click-active"
          to="/upgrade/plans"
        >
          Nâng cấp tài khoản
        </NuxtLink>
      </template>
    </el-menu-item>
  </el-menu>
</template>

<script setup lang="ts">
import { HomeOutlined } from '@ant-design/icons-vue';
import { storeToRefs } from 'pinia';

import type { country, genre, year } from '@/types';
import { getAllCountry } from '~/services/country';
import { getAllGenre } from '~/services/genres';
import { getAllYear } from '~/services/year';

const props = defineProps<{
  noCollapse?: boolean | false;
}>();

const route = useRoute();
const utils = useUtils();
const store = useStore();
const { collapsed, openSiderBarFixed } = storeToRefs<any>(store);

const state = reactive<{
  selectedKeys: string;
  openKeys: string[];
}>({
  selectedKeys: route.path,
  openKeys: [route.path]
});
// const genres = ref<genre[]>([]);
// const years = ref<year[]>([]);
// const countries = ref<country[]>([]);

const getData = async () => {
  Promise.all([
    await useAsyncData(`genre/all`, () => getAllGenre()),
    await useAsyncData(`year/all`, () => getAllYear()),
    await useAsyncData(`country/all`, () => getAllCountry())
  ])
    .then((response) => {
      genres.value = response[0].data.value?.results;

      years.value = response[1].data.value?.results.sort((a: year, b: year) => {
        return +b.name.slice(-4) - +a.name.slice(-4);
      });

      countries.value = response[2].data.value?.results;

      store.allGenres = response[0].data.value?.results;
      store.allYears = response[1].data.value?.results.sort(
        (a: year, b: year) => {
          return +b.name.slice(-4) - +a.name.slice(-4);
        }
      );
      store.allCountries = response[2].data.value?.results;
    })
    .catch((e) => {});
};

// getData();

if (store.allGenres?.length == 0) {
  const { data: genres } = await useAsyncData(
    'genre/all',
    () => getAllGenre(),
    {
      // default: () => {
      //   return { results: trendingsCache.value || [] };
      // },
      transform: (data: any) => {
        store.allGenres = data.results;

        return data.results;
      }
    }
  );
}

if (store.allYears?.length == 0) {
  const { data: years } = await useAsyncData('year/all', () => getAllYear(), {
    transform: (data: any) => {
      const dataResponse = data.results.sort((a: year, b: year) => {
        return +b.name.slice(-4) - +a.name.slice(-4);
      });

      store.allYears = dataResponse;

      return dataResponse;
    }
  });
}

if (store.allCountries?.length == 0) {
  const { data: countries } = await useAsyncData(
    'country/all',
    () => getAllCountry(),
    {
      transform: (data: any) => {
        store.allCountries = data.results;

        return data.results;
      }
    }
  );
}

watchEffect(() => {
  if (route.path) {
    state.selectedKeys = route.path;
    state.openKeys = [route.path];
  }
});
</script>

<style lang="scss" src="./TheMenu.scss"></style>
<!-- <style lang="scss">
@import url('./TheMenu.scss');
</style> -->

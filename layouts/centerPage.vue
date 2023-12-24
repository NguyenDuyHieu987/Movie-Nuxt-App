<template>
  <div class="body-content-center-page">
    <HeaderCenterPage />

    <div
      id="body-wrapper"
      class="body-wrapper"
    >
      <Drawer />

      <main class="main-content">
        <!-- <BreadCrumb /> -->
        <div class="container">
          <slot />
        </div>

        <Footer />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Drawer, Footer, HeaderCenterPage } from '~/components/layouts';
</script>

<style lang="scss" src="~/assets/style/centerPageLayout.scss"></style>

<template>
  <div class="center-layout">
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
  </div>
</template>

<script setup lang="ts">
// import { Drawer, Footer, HeaderCenterPage } from '~/components/Layouts';
// import Drawer from '~/components/Layouts/Drawer/Drawer.vue';
// import Footer from '~/components/Layouts/Footer/Footer.vue';
// import HeaderCenterPage from '~/components/Layouts/HeaderCenterPage/HeaderCenterPage.vue';
</script>

<style lang="scss" src="~/assets/style/centerPageLayout.scss"></style>

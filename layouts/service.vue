<template>
  <div class="service-layout">
    <div class="body-content-service">
      <Header layout="service" />

      <div
        id="body-wrapper"
        class="body-wrapper"
      >
        <Drawer />

        <main class="main-content">
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
// import { Drawer, Footer, HeaderService } from '~/components/Layouts';
// import Drawer from '~/components/Layouts/Drawer/Drawer.vue';
// import Footer from '~/components/Layouts/Footer/Footer.vue';
// import HeaderService from '~/components/Layouts/HeaderService/HeaderService.vue';
</script>

<style lang="scss" src="~/assets/style/serviceLayout.scss"></style>

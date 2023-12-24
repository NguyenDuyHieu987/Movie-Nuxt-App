<template>
  <div class="body-content-service">
    <HeaderService />

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
import Drawer from '~/components/layouts/Drawer/Drawer.server.vue';
import Footer from '~/components/layouts/Footer/Footer.server.vue';
import HeaderService from '~/components/layouts/HeaderService/HeaderService.server.vue';
</script>

<style lang="scss" src="~/assets/style/serviceLayout.scss"></style>

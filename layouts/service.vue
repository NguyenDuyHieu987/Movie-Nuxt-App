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
import { Drawer, Footer, HeaderService } from '~/components/Layouts';
</script>

<style lang="scss" src="~/assets/style/serviceLayout.scss"></style>

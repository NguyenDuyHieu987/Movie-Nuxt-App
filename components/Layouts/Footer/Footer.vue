<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-header">
        <div
          v-if="$route.path != '/contact'"
          class="contactus-section"
        >
          <h2 class="help-title">Bạn cần thêm trợ giúp?</h2>

          <NuxtLink
            class="contact-us-button"
            to="/contact"
          >
            <a-button
              class="click-active"
              size="large"
              type="text"
            >
              Liên hệ với chúng tôi
            </a-button>
          </NuxtLink>
        </div>

        <div v-if="$route.path == '/contact'">
          <NuxtLink
            class="helpcenter-logo"
            to="/help"
          >
            Trung tâm trợ giúp
          </NuxtLink>
        </div>
      </div>

      <div class="footer-body">
        <div class="footer-section default">
          <div class="logo">
            <NuxtLink :to="{ path: '/' }">
              <NuxtImg
                :src="getImage('logo.png', 'logo', { w: 60 })"
                loading="lazy"
                alt=""
                :height="45"
                :width="45"
              />
              Phimhay247
            </NuxtLink>
          </div>

          <p class="note">
            Mọi thông tin, hình ảnh, video trên website đều được sưu tầm trên
            Internet. Chúng tôi không sở hữu hay chịu trách nhiệm bất kỳ thông
            tin nào trên web này. Nếu làm ảnh hưởng đến cá nhân hay tổ chức nào,
            khi được yêu cầu, chúng tôi sẽ xem xét và gỡ bỏ ngay lập tức.
          </p>
        </div>

        <div class="footer-section support">
          <p class="footer-section-title">Thông tin liên hệ</p>
          <div class="support-social">
            <NuxtLink
              class="facebook click-active"
              target="blank"
              to="https://www.facebook.com/nguyen.d.hieu.355"
            >
              <div class="support-icon">
                <Facebook
                  class="fa-facebook-f"
                  width="1.6rem"
                  height="1.6rem"
                  fill="currentColor"
                />
              </div>

              Hiếu Duy Nguyễn
            </NuxtLink>
            <NuxtLink
              class="email click-active"
              to="mailto:vaicut6941@gmail.com"
            >
              <div class="support-icon">
                <Email
                  class="email-icon"
                  width="2rem"
                  height="2rem"
                  fill="currentColor"
                />
              </div>

              duyhieu631015@gmail.com
            </NuxtLink>
          </div>
        </div>
      </div>
      <p class="copyright">
        © Copyright by 2024 Phimhay247 All Right Reserved
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import Facebook from '~/assets/svgs/icons/facebook.svg?component';
import Email from '~/assets/svgs/icons/email.svg?component';

import { getImage } from '~/services/image';
</script>

<style lang="scss" src="./Footer.scss"></style>
<!-- <style lang="scss" scoped>
@import url('./Footer.scss');
</style> -->

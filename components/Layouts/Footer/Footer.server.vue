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
              <nuxt-img
                :src="getImage('logo.png', 'logo', 'w-60')"
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
                <svg
                  class="fa-facebook-f"
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.6rem"
                  height="1.6rem"
                  viewBox="0 0 320 512"
                  fill="currentColor"
                >
                  <path
                    d="m279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
                  />
                </svg>
              </div>

              Hiếu Duy Nguyễn
            </NuxtLink>
            <NuxtLink
              class="email click-active"
              to="mailto:vaicut6941@gmail.com"
            >
              <div class="support-icon">
                <svg
                  class="email-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="2rem"
                  height="2rem"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5l8-5v10zm-8-7L4 6h16l-8 5z"
                  />
                </svg>
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
import { getImage } from '~/services/image';
</script>

<style lang="scss" scoped src="./Footer.scss"></style>

<template>
  <div class="like-share">
    <div :class="buttonClass">
      <a-button
        class="modern click-active"
        type="text"
        size="large"
        @click="openModal = !openModal"
      >
        <template #icon>
          <Share
            class="share"
            width="2.2rem"
            height="2.2rem"
            fill="currentColor"
          />
        </template>
        <span> Chia sẻ</span>
      </a-button>
    </div>

    <!-- <Teleport to="#append-to"> -->
    <ClientOnly>
      <el-dialog
        v-model="openModal"
        class="social-sharing-dialog"
        :width="740"
        align-center
        center
        append-to="#append-to"
        :show-close="false"
      >
        <template #header>
          <h2 class="social-sharing-dialog-title">Chia sẻ với</h2>
          <CloseBtn
            class="transparent"
            @click="openModal = false"
          />
        </template>

        <div class="list-network">
          <ShareNetwork
            class="share-network facebook"
            network="facebook"
            :url="urlShare"
            :title="dataMovie?.name"
            :description="dataMovie?.overview"
            :quote="'Xem phim thỏa thích cùng Phimhay247'"
            hashtags="phimhay247,phimoi,phimhay"
          >
            <a-button
              class="click-active"
              type="text"
            >
              <template #icon>
                <Facebook
                  class="fa-facebook-f"
                  width="1.6rem"
                  height="1.6rem"
                  fill="currentColor"
                />
              </template>
              <span> Facebook</span>
            </a-button>
          </ShareNetwork>

          <ShareNetwork
            class="share-network linkedIn"
            network="linkedIn"
            :url="urlShare"
          >
            <a-button
              class="click-active"
              type="text"
            >
              <template #icon>
                <LinkedIn
                  width="1.6rem"
                  height="1.6rem"
                  fill="currentColor"
                />
              </template>
              <span> LinkedIn</span>
            </a-button>
          </ShareNetwork>

          <ShareNetwork
            class="share-network email"
            network="email"
            :url="urlShare"
            :title="dataMovie?.name"
            :description="dataMovie?.overview"
          >
            <a-button
              class="click-active"
              type="text"
            >
              <template #icon>
                <Email
                  width="2rem"
                  height="2rem"
                  fill="currentColor"
                />
              </template>
              <span> Email</span>
            </a-button>
          </ShareNetwork>

          <ShareNetwork
            class="share-network messenger"
            network="messenger"
            :url="urlShare"
            :title="dataMovie?.name"
            :description="dataMovie?.overview"
          >
            <a-button
              class="click-active"
              type="text"
            >
              <template #icon>
                <Messenger
                  width="2rem"
                  height="2rem"
                  fill="currentColor"
                />
              </template>
              <span> Messenger</span>
            </a-button>
          </ShareNetwork>

          <ShareNetwork
            class="share-network pinterest"
            network="pinterest"
            :url="urlShare"
            :title="dataMovie?.name"
            :media="
              getImage(
                dataMovie?.backdrop_path,
                'backdrop',
                // 'w-' + windowWidth.toString()
                { w: windowWidth }
              )
            "
          >
            <a-button
              class="click-active"
              type="text"
            >
              <template #icon>
                <Pinterest
                  width="2rem"
                  height="2rem"
                  fill="currentColor"
                />
              </template>
              <span> Pinterest</span>
            </a-button>
          </ShareNetwork>

          <ShareNetwork
            class="share-network reddit"
            network="reddit"
            :url="urlShare"
            :title="dataMovie?.name"
          >
            <a-button
              class="click-active"
              type="text"
            >
              <template #icon>
                <Reddit
                  width="2rem"
                  height="2rem"
                  fill="currentColor"
                />
              </template>
              <span> Reddit</span>
            </a-button>
          </ShareNetwork>

          <ShareNetwork
            class="share-network skype"
            network="skype"
            :url="urlShare"
            :title="dataMovie?.name"
            :description="dataMovie?.overview"
          >
            <a-button
              class="click-active"
              type="text"
            >
              <template #icon>
                <Skype
                  width="2rem"
                  height="2rem"
                  fill="currentColor"
                />
              </template>
              <span> Skype</span>
            </a-button>
          </ShareNetwork>

          <ShareNetwork
            class="share-network telegram"
            network="telegram"
            :url="urlShare"
            :title="dataMovie?.name"
            :description="dataMovie?.overview"
          >
            <a-button
              class="click-active"
              type="text"
            >
              <template #icon>
                <Telegram
                  width="2rem"
                  height="2rem"
                  fill="currentColor"
                />
              </template>
              <span> Telegram</span>
            </a-button>
          </ShareNetwork>

          <ShareNetwork
            class="share-network twitter"
            network="twitter"
            :url="urlShare"
            :title="dataMovie?.name"
            hashtags="phimhay247,phimoi,phimhay"
          >
            <a-button
              class="click-active"
              type="text"
            >
              <template #icon>
                <Twitter
                  width="2rem"
                  height="2rem"
                  fill="currentColor"
                />
              </template>
              <span> Twitter</span>
            </a-button>
          </ShareNetwork>

          <ShareNetwork
            class="share-network whatsapp"
            network="whatsapp"
            :url="urlShare"
            :title="dataMovie?.name"
            :description="dataMovie?.overview"
          >
            <a-button
              class="click-active"
              type="text"
            >
              <template #icon>
                <WhatsApp
                  width="2rem"
                  height="2rem"
                  fill="currentColor"
                />
              </template>
              <span> WhatsApp</span>
            </a-button>
          </ShareNetwork>

          <ShareNetwork
            class="share-network baidu"
            network="baidu"
            :url="urlShare"
            :title="dataMovie?.name"
          >
            <a-button
              class="click-active"
              type="text"
            >
              <template #icon>
                <Baidu
                  width="2rem"
                  height="2rem"
                  fill="currentColor"
                />
              </template>
              <span> Baidu</span>
            </a-button>
          </ShareNetwork>

          <ShareNetwork
            class="share-network weibo"
            network="weibo"
            :url="urlShare"
            :title="dataMovie?.name"
            :media="
              getImage(
                dataMovie?.backdrop_path,
                'backdrop',
                // 'w-' + windowWidth.toString()
                { w: windowWidth }
              )
            "
          >
            <a-button
              class="click-active"
              type="text"
            >
              <template #icon>
                <Weibo
                  width="2rem"
                  height="2rem"
                  fill="currentColor"
                />
              </template>
              <span> Weibo</span>
            </a-button>
          </ShareNetwork>
        </div>
      </el-dialog>
    </ClientOnly>
    <!-- </Teleport> -->
  </div>
</template>

<script setup lang="ts">
import Share from '~/assets/svgs/icons/share.svg?component';
import Facebook from '~/assets/svgs/icons/facebook.svg?component';
import LinkedIn from '~/assets/svgs/icons/linkedin.svg?component';
import Email from '~/assets/svgs/icons/email.svg?component';
import Messenger from '~/assets/svgs/icons/messenger.svg?component';
import Pinterest from '~/assets/svgs/icons/pinterest.svg?component';
import Reddit from '~/assets/svgs/icons/reddit.svg?component';
import Skype from '~/assets/svgs/icons/skype.svg?component';
import Telegram from '~/assets/svgs/icons/telegram.svg?component';
import Twitter from '~/assets/svgs/icons/twitter.svg?component';
import WhatsApp from '~/assets/svgs/icons/whatsapp.svg?component';
import Baidu from '~/assets/svgs/icons/baidu.svg?component';
import Weibo from '~/assets/svgs/icons/weibo.svg?component';

// import { CloseBtn } from '~/components/Button';
import CloseBtn from '~/components/Button/CloseBtn/CloseBtn.vue';
import { getImage } from '~/services/image';

const props = withDefaults(
  defineProps<{ buttonClass: string; dataMovie: any }>(),
  {
    buttonClass: ''
  }
);

const openModal = ref<boolean>(false);
const urlShare = ref<string>('');
const windowWidth = ref<number>(1000);

onBeforeMount(() => {
  urlShare.value = window.location.href;
  windowWidth.value = window.innerWidth;
});
</script>

<style lang="scss" src="./Interaction.scss"></style>
<!-- <style lang="scss">
@import url('./Interaction.scss');
</style> -->

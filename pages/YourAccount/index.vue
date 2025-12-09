<template>
  <div class="service-page account-page padding-content">
    <div class="center-page">
      <div v-if="!authStore.loadingUser">
        <div
          v-if="isLogin"
          class="account-page-container"
        >
          <!-- <Transition
            appear
            name="slide-bottom"
          >
            <div v-show="showAnimation"> -->
          <div class="account-page-header">
            <h1>Tài khoản của bạn</h1>
            <div class="join-since">
              <span>{{ 'Tham gia từ ' + joinSince }} </span>
            </div>
          </div>

          <section class="account-grid">
            <div class="account-grid-row info-account">
              <div class="row-label">
                <span>Thông tin tài khoản</span>

                <div
                  class="avatar-box"
                  @click="onClickUploadAvatar"
                >
                  <NuxtImg
                    class="avatar"
                    :src="getUserAvatar(userAccount?.avatar)"
                    loading="lazy"
                    alt=""
                    preload
                  />

                  <div class="updload-avatar">
                    <SvgoUpload
                      class="updload-avatar-icon"
                      width="2rem"
                      height="2rem"
                      fill="currentColor"
                    />
                  </div>
                </div>
              </div>
              <div class="row-content">
                <div class="row-content-item username">
                  <div class="left">
                    <span class="label">Tài khoản: </span>
                    <span> {{ userAccount?.username }}</span>
                  </div>
                </div>

                <div class="row-content-item full-name">
                  <div class="left">
                    <span class="label">Họ và tên: </span>
                    <span> {{ userAccount?.full_name }}</span>

                    <SvgoPencil
                      v-if="!isFullNameditable"
                      class="edit-icon"
                      width="1.7rem"
                      height="1.7rem"
                      fill="currentColor"
                      @click="handleClickEditRowItem"
                    />
                    <SvgoCheck
                      v-else
                      width="1.7rem"
                      height="1.7rem"
                      fill="currentColor"
                      @click="handleClickSaveRowItem"
                    />
                  </div>
                </div>

                <div class="row-content-item">
                  <div class="left">
                    <span class="label">Email: </span>
                    <span>{{ userAccount?.email }}</span>
                  </div>
                  <div
                    v-if="userAccount?.auth_type == 'email'"
                    class="right"
                  >
                    <NuxtLink
                      class="click-active"
                      to="/YourAccount/ChangeEmail"
                    >
                      Thay đổi email
                    </NuxtLink>
                  </div>
                </div>

                <div
                  v-if="userAccount?.auth_type == 'email'"
                  class="row-content-item password"
                >
                  <div class="left">
                    <span class="label">Mật khẩu: </span>
                    <span>**********</span>
                  </div>
                  <div class="right">
                    <NuxtLink
                      class="click-active"
                      to="/YourAccount/ChangePassword"
                    >
                      Thay đổi mật khẩu
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>

            <div class="account-grid-row">
              <div class="row-label">Thông tin gói dịch vụ</div>
              <div class="row-content">
                <div class="row-content-item">
                  <div class="left">
                    <span>
                      {{
                        authStore.isVipMember
                          ? authStore.subscription?.plan.name
                          : 'Miên phí'
                      }}
                    </span>
                  </div>
                  <div class="right">
                    <a-button
                      v-if="!authStore.isVipMember"
                      class="upgrade-btn click-active"
                      type="text"
                      @click="navigateTo('/upgrade/plans')"
                    >
                      Nâng cấp
                    </a-button>
                    <NuxtLink
                      v-else
                      to="/YourAccount/subscription"
                    >
                      Chi tiết
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>

            <div class="account-grid-row">
              <div class="row-label">Lịch sử giao dịch</div>
              <div class="row-content">
                <div class="row-content-item">
                  <div class="left">
                    <ul
                      v-if="bills?.length"
                      class="bills-list"
                    >
                      <li
                        v-for="(item, index) in bills"
                        :key="index"
                        :index="index"
                        class="bill-item"
                      >
                        <span class="index">{{ index + 1 }}</span>
                        <div class="info">
                          <NuxtLink
                            class="description underline click-active"
                            :title="item?.description"
                            :to="`/YourAccount/invoices/${item?.id}`"
                          >
                            {{ item?.description }}
                          </NuxtLink>

                          <!-- <span
                                class="status"
                                :class="item?.status"
                              >
                                {{
                                  billLístStatus.find(
                                    (status) => status.value == item?.status
                                  )?.label
                                }}
                              </span> -->

                          <!-- <a-tag color="success">
                                <template #icon>
                                  <check-circle-outlined />
                                </template>
                              </a-tag> -->

                          <el-tag
                            :type="getBillStatus(item)?.type || 'primary'"
                            effect="light"
                          >
                            {{ getBillStatus(item)?.label }}
                          </el-tag>
                        </div>
                      </li>
                    </ul>
                    <span v-else> Không có giao dịch nào gần đây </span>
                  </div>

                  <div class="right">
                    <NuxtLink
                      class="click-active"
                      to="/YourAccount/invoices"
                    >
                      Xem thêm
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div
            id="bottom-zone"
            class="bottom-zone"
          >
            <div class="left">
              <!-- <Teleport to="#bottom-zone" :disabled="!responesive"> -->
              <!-- <a-button
                          class="delete-account-btn"
                          type="text"
                          @click="deleteAccount"
                        >
                          Xóa tài khoản
                        </a-button> -->

              <a-button
                class="switch-account-btn click-active not-focusable"
                type="text"
                @click="navigateTo('/login')"
              >
                Chuyển tài khoản
              </a-button>
              <!-- </Teleport> -->
            </div>

            <div class="right">
              <a-button
                class="logout-btn click-active"
                type="text"
                @click="handleLogout"
              >
                <span>Đăng xuất</span>
              </a-button>
            </div>
          </div>
          <!-- </div>
          </Transition> -->
        </div>

        <RequireAuth v-else />
      </div>
    </div>

    <el-dialog
      class="upload-avatar-dialog"
      v-model="modalUploadAvatarVisible"
      title="Đổi avatar"
      align-center
      style="max-width: 500px"
      :before-close="onBeforeCloseModalUploadAvatar"
    >
      <input
        ref="inputFileAvatar"
        type="file"
        accept="image/*"
        @change="(e) => changeFileUploadAvatar(e, 'still')"
      />
      <NuxtImg
        v-if="formUploadAvatar.avatar_path"
        :src="formUploadAvatar.avatar_path"
        class="avatar-image"
        :height="100"
      />
      <template #footer>
        <div class="dialog-footer">
          <a-button
            @click="modalUploadAvatarVisible = false"
            :disabled="loadingUploadAvatar"
          >
            Đóng
          </a-button>
          <a-button
            type="primary"
            @click="onUploadAvatar"
            :loading="loadingUploadAvatar"
          >
            Đổi
          </a-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
// import SvgoUpload from '~/assets/svgs/icons/upload.svg?component';
// import SvgoPencil from '~/assets/svgs/icons/pencil.svg?component';
// import SvgoCheck from '~/assets/svgs/icons/check.svg?component';

// import { RequireAuth } from '~/components/RequireAuth';
// import RequireAuth from '~/components/RequireAuth/RequireAuth.vue';
import { ChangeFullname, UpdateAvartar } from '~/services/account';
import { getBills } from '~/services/bill';
import { getImage, uploadImage, getUserAvatar } from '~/services/image';
import { useBreakpoints } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import type { Invoice, InvoiceStatus } from '~/types';

definePageMeta({
  layout: 'service',
  pageTransition: {
    name: 'slide-bottom',
    appear: true
  },
  keepalive: false
});

const breakPoints = useBreakpoints({
  responesive: 650
});

const authStore = useAuthStore();
const utils = useUtils();
const { isLogin, userAccount } = storeToRefs(authStore);
const bills = ref<Invoice[]>([]);
const billLístStatus = reactive<InvoiceStatus[]>([
  {
    value: 'complete',
    type: 'success',
    label: 'Thành công'
  },
  {
    value: 'incomplete',
    type: 'danger',
    label: 'Không thành công'
  },
  {
    value: 'pending',
    type: 'warning',
    label: 'Chờ xử lý'
  },
  {
    value: 'canceled',
    type: 'info',
    label: 'Hủy'
  },
  {
    value: 'expired',
    type: 'info',
    label: 'Hết hạn'
  }
]);
const showAnimation = ref<boolean>(false);
const loadingBills = ref<boolean>(false);
const isFullNameditable = ref<boolean>(false);
const loadingEditRowItem = ref<boolean>(false);
const inputFileAvatar = ref<HTMLInputElement | null>();
const modalUploadAvatarVisible = ref<boolean>(false);
const loadingUploadAvatar = ref<boolean>(false);
const formUploadAvatar = reactive({
  avatar_path: '',
  file_upload: null
});
const responesive = breakPoints.smallerOrEqual('responesive');

const joinSince = computed<string>(() =>
  utils.dateTimeFormater.format(authStore.userAccount?.created_at!, 'LLL')
);

useHead({
  title: 'Tài khoản',
  htmlAttrs: { lang: 'vi' }
});

useSeoMeta({
  title: 'Tài khoản',
  description: 'Tài khoản của bạn',
  ogTitle: 'Tài khoản',
  ogType: 'video.movie',
  // ogUrl: window.location.href,
  ogDescription: 'Tài khoản của bạn',
  ogLocale: 'vi'
});

const getData = () => {
  getBills(1, 10)
    .then((response) => {
      bills.value = response?.results;
    })
    .catch(() => {})
    .finally(() => {
      loadingBills.value = false;
    });
};

loadingBills.value = true;

getData();

onBeforeMount(async () => {
  await nextTick();

  showAnimation.value = true;
});

const deleteAccount = () => {
  utils.conrfirmMessageModal({
    title: 'Thông Báo',
    message: 'Bạn có muốn chắc muốn xóa tài khoản này?',
    okText: 'Có, Tôi chắc',
    onOk: async function () {
      // if (await ) {
      // }
    },
    onCancel() {}
  });
};

const handleLogout = () => {
  authStore.logOut();
};

const handleClickEditRowItem = (e: any) => {
  const rowItem: HTMLElement = e.target?.closest('.row-content-item');
  const rowItemLabel: HTMLElement | null = rowItem?.querySelector(
    '.row-content-item span+span'
  );

  const isContenteditable = rowItemLabel?.getAttribute('contenteditable');

  if (isContenteditable == null || isContenteditable == 'false') {
    rowItemLabel?.setAttribute('contenteditable', 'true');
    rowItemLabel?.focus();
    isFullNameditable.value = true;
  } else {
    rowItemLabel?.setAttribute('contenteditable', 'false');
    isFullNameditable.value = false;
  }
};

const handleClickSaveRowItem = (e: any) => {
  const rowItem: HTMLElement = e.target?.closest('.row-content-item');
  const rowItemLabel: HTMLElement | null = rowItem?.querySelector(
    '.row-content-item span+span'
  );

  if (loadingEditRowItem.value) return;

  const newFullName: string = rowItemLabel?.innerText.trim()!;

  if (utils.isStringEmpty(newFullName)) {
    ElNotification.warning({
      title: MESSAGE.STATUS.INFO,
      message: 'Họ và tên không được bỏ trống.',
      duration: MESSAGE.DURATION.DEFAULT,
      position: 'bottom-right'
    });

    rowItemLabel!.innerText = authStore.userAccount!.full_name;

    isFullNameditable.value = false;
    rowItemLabel?.setAttribute('contenteditable', 'false');

    return;
  }

  if (newFullName == authStore.userAccount!.full_name) {
    isFullNameditable.value = false;
    rowItemLabel?.setAttribute('contenteditable', 'false');
    rowItemLabel!.innerText = newFullName;

    return;
  }

  loadingEditRowItem.value = true;

  ChangeFullname(newFullName)
    .then((response) => {
      // console.log(response);
      if (response?.success == true) {
        ElNotification.success({
          title: MESSAGE.STATUS.SUCCESS,
          message: 'Thay đổi họ và tên thành công.',
          duration: MESSAGE.DURATION.DEFAULT
        });

        rowItemLabel!.innerText = newFullName;

        authStore.userAccount!.full_name = newFullName;

        utils.localStorage.setWithExpiry(
          TOKEN.NAME.USER_TOKEN,
          response.headers.get('Authorization'),
          TOKEN.OFFSET.USER_TOKEN
        );
      } else {
        rowItemLabel!.innerText = authStore.userAccount!.full_name;

        ElNotification.error({
          title: MESSAGE.STATUS.FAILED,
          message: 'Thay đổi họ và tên thất bại.',
          duration: MESSAGE.DURATION.DEFAULT
        });
      }
    })
    .catch((e) => {
      rowItemLabel!.innerText = authStore.userAccount!.full_name;

      ElNotification.error({
        title: MESSAGE.STATUS.BROKE,
        message: MESSAGE.STATUS.BROKE_MESSAGE,
        duration: MESSAGE.DURATION.DEFAULT
      });
    })
    .finally(() => {
      isFullNameditable.value = false;
      rowItemLabel?.setAttribute('contenteditable', 'false');

      loadingEditRowItem.value = false;
    });
};

const getBillStatus = (invoice: Invoice): InvoiceStatus | undefined => {
  return billLístStatus.find((item) => item.value == invoice?.status);
};

const changeFileUploadAvatar = async (e: any, type: string) => {
  const rawFile = e.target.files[0]!;

  const isJpgOrPng =
    rawFile.type === 'image/jpeg' || rawFile.type === 'image/png';

  if (!isJpgOrPng) {
    ElNotification.error({
      title: MESSAGE.STATUS.FAILED,
      message: 'Bạn chỉ có thể upload JPG, PNG file!',
      duration: MESSAGE.DURATION.DEFAULT
    });
    return false;
  }

  if (rawFile.size / 1024 / 1024 > 2) {
    ElNotification.error({
      title: MESSAGE.STATUS.FAILED,
      message: 'Ảnh phải có dung lượng nhỏ hơn 5MB!',
      duration: MESSAGE.DURATION.DEFAULT
    });
    return false;
  }

  formUploadAvatar.avatar_path = URL.createObjectURL(rawFile!);
  formUploadAvatar.file_upload = rawFile;
  return true;
};

const onBeforeCloseModalUploadAvatar = (done: () => void) => {
  if (loadingUploadAvatar.value) {
    ElMessageBox.confirm(
      'Bạn đang trong quá trình upload avatar bạn có chắc muốn đóng không?',
      {
        title: 'Cảnh báo!',
        confirmButtonText: 'Có',
        cancelButtonText: 'Không'
      }
    )
      .then(() => {
        done();
      })
      .catch(() => {
        // catch error
      });
  } else {
    done();
  }
};

const onClickUploadAvatar = () => {
  if (inputFileAvatar.value) {
    inputFileAvatar.value.value = '';
  }
  formUploadAvatar.file_upload = null;
  formUploadAvatar.avatar_path = '';

  modalUploadAvatarVisible.value = true;
};

const onUploadAvatar = async () => {
  loadingUploadAvatar.value = true;

  const fileUploadResponse = await uploadImage(
    'user_avatar/upload',
    formUploadAvatar.file_upload!
  ).catch((e) => {
    loadingUploadAvatar.value = false;
  });
  if (!fileUploadResponse?.success) {
    ElNotification.error({
      title: MESSAGE.STATUS.FAILED,
      message: 'Upload avatar thất bại!',
      duration: MESSAGE.DURATION.DEFAULT
    });
    return;
  }

  var avatar = fileUploadResponse.file.filename;

  if (fileUploadResponse?.success) {
    UpdateAvartar(avatar)
      .then((response) => {
        if (response?.success) {
          authStore.userAccount!.avatar = avatar;

          utils.localStorage.setWithExpiry(
            TOKEN.NAME.USER_TOKEN,
            response.headers.get('Authorization'),
            TOKEN.OFFSET.USER_TOKEN
          );

          ElNotification.success({
            title: MESSAGE.STATUS.SUCCESS,
            message: 'Upload avatar thành công!',
            duration: MESSAGE.DURATION.DEFAULT
          });
        } else {
          ElNotification.error({
            title: MESSAGE.STATUS.FAILED,
            message: 'Upload avatar thất bại!',
            duration: MESSAGE.DURATION.DEFAULT
          });
        }
      })
      .catch((e) => {
        ElNotification.error({
          title: MESSAGE.STATUS.FAILED,
          message: 'Upload avatar thất bại!',
          duration: MESSAGE.DURATION.DEFAULT
        });
      })
      .finally(() => {
        loadingUploadAvatar.value = false;
        modalUploadAvatarVisible.value = false;
      });
  } else {
    loadingUploadAvatar.value = false;

    ElNotification.error({
      title: MESSAGE.STATUS.FAILED,
      message: 'Upload avatar thất bại!',
      duration: MESSAGE.DURATION.DEFAULT
    });
    return;
  }
};
</script>

<style lang="scss" src="./AccountPage.scss"></style>
<!-- <style lang="scss">
@import url('./AccountPage.scss');
</style> -->

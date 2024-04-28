<template>
  <div class="service-page detail-invoice-page padding-content">
    <div class="center-page">
      <div v-if="!authStore.loadingUser">
        <div
          v-if="isLogin"
          class="detail-invoice-page-container"
        >
          <NuxtLink
            class="back-page-btn"
            to="/YourAccount/invoices"
          >
            <BackPage align-left> Danh sách hóa đơn</BackPage>
          </NuxtLink>

          <div class="detail-invoice-page-header">
            <h2>Chi tiết hóa đơn</h2>
          </div>

          <div
            v-if="!loading"
            class="detail-invoice-info-list"
          >
            <div class="detail-invoice-info-item">
              <label>Mô tả</label>
              <span class="detail-invoice-info"
                >{{ invoice?.description }}
              </span>
            </div>
            <div class="detail-invoice-info-item">
              <label>Đơn giá</label>
              <span class="detail-invoice-info">
                {{
                  new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: invoice?.currency.toUpperCase()
                  }).format(invoice?.unit_amount!)
                }}
              </span>
            </div>
            <div class="detail-invoice-info-item">
              <label>Số lượng</label>
              <span class="detail-invoice-info">
                {{ invoice?.quantity }}
              </span>
            </div>
            <div class="detail-invoice-info-item">
              <label>Giảm giá</label>
              <span class="detail-invoice-info">
                {{
                  new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: invoice?.currency.toUpperCase()
                  }).format(invoice?.amount_discount!)
                }}
              </span>
            </div>
            <div class="detail-invoice-info-item">
              <label>Thuế</label>
              <span class="detail-invoice-info">
                {{
                  new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: invoice?.currency.toUpperCase()
                  }).format(invoice?.amount_tax!)
                }}
              </span>
            </div>
            <div class="detail-invoice-info-item">
              <label>Tổng tiền thanh toán</label>
              <span class="detail-invoice-info">
                {{
                  new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: invoice?.currency.toUpperCase()
                  }).format(invoice?.amount_total!)
                }}
              </span>
            </div>
            <div class="detail-invoice-info-item">
              <label>Tổng tiền đã thanh toán</label>
              <span class="detail-invoice-info">
                {{
                  new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: invoice?.currency.toUpperCase()
                  }).format(invoice?.amount_paid || 0)
                }}
              </span>
            </div>
            <div class="detail-invoice-info-item">
              <label>Trạng thái</label>
              <span class="detail-invoice-info">
                <el-tag
                  :type="invoiceStatus?.type || 'primary'"
                  effect="light"
                >
                  {{ invoiceStatus?.label }}
                </el-tag>
              </span>
            </div>
            <div class="detail-invoice-info-item">
              <label>Trạng thái thanh toán</label>
              <span class="detail-invoice-info">
                <el-tag
                  :type="invoicePaymentStatus?.type || 'primary'"
                  effect="light"
                >
                  {{ invoicePaymentStatus?.label }}
                </el-tag>
              </span>
            </div>
            <div class="detail-invoice-info-item">
              <label>Phương thanh toán</label>
              <span class="detail-invoice-info">
                {{ invoice?.payment_method.toUpperCase() }}
              </span>
            </div>
            <div class="detail-invoice-info-item">
              <label>Liên kết thanh toán</label>
              <div class="detail-invoice-info">
                <NuxtLink
                  class="invoice-url underline"
                  :to="invoice?.url"
                  target="_blank"
                >
                  {{ invoice?.url }}
                </NuxtLink>
              </div>
            </div>
            <div class="detail-invoice-info-item">
              <label>Đơn vị tiền tệ</label>
              <span class="detail-invoice-info">
                {{ invoice?.currency.toUpperCase() + ` - ${currencyName}` }}
              </span>
            </div>
            <div class="detail-invoice-info-item">
              <label>Ngày tạo</label>
              <span class="detail-invoice-info">
                {{ utils.dateTimeFormater.format(invoice?.created_at!, 'LLL') }}
              </span>
            </div>
          </div>
        </div>
        <RequireAuth v-else />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { RequireAuth } from '~/components/RequireAuth';
// import RequireAuth from '~/components/RequireAuth/RequireAuth.vue';
import { getInvoice } from '~/services/invoice';
import { storeToRefs } from 'pinia';
import type { Invoice, InvoiceStatus } from '~/types';

definePageMeta({
  layout: 'service',
  pageTransition: {
    name: 'slide-left',
    appear: true
  },
  keepalive: false
});

const utils = useUtils();
const store = useStore();
const authStore = useAuthStore();
const { isLogin } = storeToRefs<any>(authStore);
const route = useRoute();
const invoice = ref<Invoice>();
const currencyName = computed<string>(() => {
  switch (invoice.value?.currency) {
    case 'vnd':
      return 'Việt Nam đồng';
    case 'usd':
      return 'đô la Mỹ';
    default:
      return 'Việt Nam đồng';
  }
});
const invoiceListStatus = reactive<InvoiceStatus[]>([
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
    type: 'danger',
    label: 'Hết hạn'
  }
]);
const invoiceListPaymentStatus = reactive<InvoiceStatus[]>([
  {
    value: 'paid',
    type: 'success',
    label: 'Đã thanh toán'
  },
  {
    value: 'unpaid',
    type: 'warning',
    label: 'Chưa thanh toán'
  },
  {
    value: 'error',
    type: 'danger',
    label: 'Lỗi'
  }
]);
const invoiceStatus = computed<InvoiceStatus | undefined>(() =>
  invoiceListStatus.find((item) => item.value == invoice.value?.status)
);
const invoicePaymentStatus = computed<InvoiceStatus | undefined>(() =>
  invoiceListPaymentStatus.find(
    (item) => item.value == invoice.value?.payment_status
  )
);
const loading = ref<boolean>(false);

useHead({
  title: 'Chi tiết đơn',
  htmlAttrs: { lang: 'vi' }
});

useSeoMeta({
  title: 'Chi tiết đơn',
  description: 'Hóa đơn của bạn. Chi tiết đơn',
  ogTitle: 'Chi tiết đơn',
  ogType: 'video.movie',
  // ogUrl: window.location.href,
  ogDescription: 'Hóa đơn của bạn. Chi tiết đơn',
  ogLocale: 'vi'
});

onBeforeMount(async () => {
  loading.value = true;

  await getInvoice(route.params?.id)
    .then((response) => {
      if (response?.result) {
        invoice.value = response?.result;
      }
    })
    .catch(() => {})
    .finally(() => {
      loading.value = false;
    });
});
</script>

<style lang="scss" src="./DetailInvoicePage.scss"></style>

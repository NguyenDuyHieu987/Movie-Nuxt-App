<template>
  <div class="service-page invoices-page padding-content">
    <div class="center-page">
      <div v-if="!authStore.loadingUser">
        <div
          v-if="isLogin"
          class="invoices-page-container"
        >
          <NuxtLink
            class="back-page-btn"
            to="/YourAccount"
          >
            <BackPage align-left>Tài khoản</BackPage>
          </NuxtLink>
          <div class="invoices-page-header">
            <h2>Danh sách hóa đơn</h2>
          </div>
          <div class="table-invoice">
            <a-table
              :data-source="invoices"
              :columns="columns"
              :row-key="(record) => record.id"
              :loading="loading"
              :scroll="{
                // y: 500,
                x: 900
              }"
              :pagination="{ pageSize: 20, onChange: onChangePage }"
              bordered
              sticky
              @change="onChangeTable"
            >
              <template #bodyCell="{ column, text, value, record }">
                <template v-if="column.dataIndex === 'status'">
                  <el-tag
                    :type="getInvoiceStatus(value)?.type || 'primary'"
                    effect="light"
                  >
                    {{ getInvoiceStatus(value)?.label }}
                  </el-tag>
                </template>
                <template v-if="column.dataIndex === 'payment_status'">
                  <el-tag
                    :type="getInvoicePaymentStatus(value)?.type || 'primary'"
                    effect="light"
                  >
                    {{ getInvoicePaymentStatus(value)?.label }}
                  </el-tag>
                </template>
                <template v-if="column.dataIndex === 'amount_total'">
                  {{
                    new Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: record?.currency.toUpperCase()
                    }).format(value!)
                  }}
                </template>
                <template v-if="column.dataIndex === 'action'">
                  <NuxtLink
                    class="underline"
                    :to="`/YourAccount/invoices/${record?.id}`"
                  >
                    Chi tiết
                  </NuxtLink>
                </template>
              </template>
            </a-table>
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
import { storeToRefs } from 'pinia';
import { getInvoices } from '~/services/invoice';
import type { Invoice, InvoiceStatus } from '~/types';
import type { TableColumnType } from 'ant-design-vue';

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
const invoices = ref<Invoice[]>([]);
const loading = ref<boolean>(false);
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

const columns: TableColumnType[] = [
  {
    title: 'STT',
    dataIndex: 'no',
    sorter: true,
    width: '100px'
  },
  {
    title: 'Mô tả',
    dataIndex: 'description',
    width: 300
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    width: 150
  },
  {
    title: 'Trạng thái thanh toán',
    dataIndex: 'payment_status',
    width: 200
  },
  {
    title: 'Tổng tiền thanh toán',
    dataIndex: 'amount_total',
    width: 200
  },
  {
    title: 'Ngày tạo',
    dataIndex: 'createdAt',
    sorter: true,
    width: 200
  },
  {
    title: 'Hành động',
    dataIndex: 'action',
    width: 200
  }
];

useHead({
  title: 'Lịch sử giao dịch, Hóa đơn',
  htmlAttrs: { lang: 'vi' }
});

useSeoMeta({
  title: 'Lịch sử giao dịch, Hóa đơn',
  description: 'Hóa đơn của bạn. Lịch sử giao dịch',
  ogTitle: 'Lịch sử giao dịch, Hóa đơn',
  ogType: 'video.movie',
  // ogUrl: window.location.href,
  ogDescription: 'Hóa đơn của bạn. Lịch sử giao dịch',
  ogLocale: 'vi'
});

onBeforeMount(() => {
  loading.value = true;

  getInvoices(1, 20)
    .then((response) => {
      invoices.value = response?.results.map((item, index) => {
        return {
          no: index + 1,
          ...item,
          createdAt: utils.dateTimeFormater.format(item?.created_at!, 'L', {
            dateOnly: false
          })
        };
      });
    })
    .catch(() => {})
    .finally(() => {
      loading.value = false;
    });
});

const getInvoiceStatus = (status: string): InvoiceStatus | undefined => {
  return invoiceListStatus.find((item) => item.value == status);
};

const getInvoicePaymentStatus = (
  payment_status: string
): InvoiceStatus | undefined => {
  return invoiceListPaymentStatus.find((item) => item.value == payment_status);
};

const onChangeTable = (
  pagination,
  filters,
  sorter,
  { action, currentDataSource }
) => {};

const onChangePage = (page, pageSize) => {
  console.log(page);
};
</script>

<style lang="scss" src="./InvoicesPage.scss"></style>
<!-- <style lang="scss">
@import url('./InvoicesPage.scss');
</style> -->

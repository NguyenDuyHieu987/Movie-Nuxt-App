import { makeRequest } from './makeRequest';

import type { plan } from '@/types';

const PREFIX_ROUTE = 'plan';

export function getAllPlan() {
  return makeRequest(`/${PREFIX_ROUTE}/get-all`);
}

export function registerPlan(
  id: string,
  payment_method: 'VNPAY' | 'MOMO' | 'ZALOPAY' | 'STRIPE'
) {
  const bodyFormData = new FormData();
  bodyFormData.append('method', payment_method);

  return makeRequest(`/${PREFIX_ROUTE}/register/${id}`, null, {
    method: 'POST',
    data: bodyFormData
  });
}

import { makeRequest } from './makeRequest';

import type { plan } from '@/types';

export function getAllPlan() {
  return makeRequest('/plan/get');
}

export function registerPlan(
  id: string,
  payment_method: 'VNPAY' | 'MOMO' | 'ZALOPAY' | 'STRIPE'
) {
  const bodyFormData = new FormData();
  bodyFormData.append('method', payment_method);

  return makeRequest(`/plan/register/${id}`, {
    method: 'POST',
    data: bodyFormData
  });
}

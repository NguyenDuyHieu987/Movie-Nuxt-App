import { makeRequest } from './makeRequest';

const PREFIX_ROUTE = 'recommend';

export function getMyRecommend(page: number = 1, limit: number = 20) {
  const authStore = useAuthStore();

  if (!authStore.isLogin) return new Promise(() => {});

  return makeRequest(`/${PREFIX_ROUTE}/get-all?page=${page}&limit=${limit}`);
}

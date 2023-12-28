import { makeRequest } from './makeRequest';

const PREFIX_ROUTE = 'subscription';

export function getMySubscription(params: { user_token: string }) {
  return makeRequest(`/${PREFIX_ROUTE}/get`);
}

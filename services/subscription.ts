import { makeRequest } from './makeRequest';

const PREFIX_ROUTE = 'subscription';

export function getMySubscription() {
  return makeRequest(`/${PREFIX_ROUTE}/get`);
}

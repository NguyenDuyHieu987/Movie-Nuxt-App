import { makeRequest } from './makeRequest';

const PREFIX_ROUTE = 'subscription';

export function getMySubscription(params: { userToken: string }) {
  const headers = { Authorization: `Bearer ${params.userToken}` };

  return makeRequest(`/${PREFIX_ROUTE}/get`, {
    headers
  });
}

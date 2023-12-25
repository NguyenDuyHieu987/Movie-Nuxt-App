import { makeRequest } from './makeRequest';

export function getNotifications() {
  return makeRequest('/notification/get');
}

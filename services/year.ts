import { makeRequest } from './makeRequest';

export function getAllYear() {
  return makeRequest('/year/all');
}

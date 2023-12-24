import { makeRequest } from './makeRequest'

export function getAllSortBy() {
  return makeRequest('/sortby/all')
}

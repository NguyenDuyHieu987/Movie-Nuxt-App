import { makeRequest } from './makeRequest';

const PREFIX_ROUTE = 'invoice';

export function getInvoices(skip: number = 1, limit: number = 20) {
  return makeRequest(`/${PREFIX_ROUTE}/get-all`, {
    skip,
    limit
  });
}

export function getInvoice(id: string) {
  return makeRequest(`/${PREFIX_ROUTE}/get/${id}`);
}

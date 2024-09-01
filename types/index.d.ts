export declare type AppLayout =
  | 'default'
  | 'center-page'
  | 'auth'
  | 'error'
  | 'home'
  | 'oauth'
  | 'service';

export declare interface mod {
  id: string;
  media_type: string;
  name: string;
}

export declare interface genre {
  id: number;
  name_vietsub: string;
  name: string;
  short_name: string;
}

export declare interface country {
  iso_639_1: string;
  english_name: string;
  name: string;
  short_name: string;
}

export declare interface year {
  name: string;
}

export declare interface sortby {
  id: string;
  name: string;
}

export declare type typeMovie =
  | 'all'
  | 'nowplaying'
  | 'popular'
  | 'toprated'
  | 'upcoming';

export declare type typeTv =
  | 'all'
  | 'airingtoday'
  | 'ontheair'
  | 'popular'
  | 'toprated';

export declare type rankType = 'hot-play' | 'hot-search' | 'high-rate';

export declare type rankSort = 'day' | 'week' | 'month' | 'year' | 'all';

export declare interface formfilterRank {
  type: rankType;
  sortBy: rankSort;
  mediaType: 'all' | 'movie' | 'tv';
  genre: string | number;
  country: string;
  page?: number | 1;
  limit?: number | 10;
}

export declare interface formfilter {
  type: string;
  slug?: string;
  sortBy?: string;
  genre: string | number;
  year: string | number;
  country: string;
  page?: number | 1;
  limit?: number | 20;
}

export declare interface plan {
  id: string;
  order: number;
  name: string;
  price: number;
  video_quality: string;
  resolution: string;
  support_devices: ['phone', 'tablet', 'desktop', 'tv'];
  ads: boolean;
  order: number;
  vip: number;
}

export declare type user = {
  id: string;
  username: string;
  full_name: string;
  email: string;
  role: string;
  avatar: string | number;
  auth_type: string | 'email' | 'facebook' | 'google';
  created_at: string;
  updated_at: string;
  createdAt?: string;
  updatedAt?: string;
} | null;

export declare type subscription = {
  id: string;
  account_id: string;
  subscription_id: string;
  customer_id: string;
  subscription: any;
  latest_invoice: string;
  plan_id: string;
  start_date: string;
  ended_date: string;
  current_period_start: string;
  current_period_end: string;
  trial_start: string;
  trial_end: string;
  billing_cycle_anchor: string;
  interval: 'day' | 'week' | 'month' | 'year';
  interval_count: number | 1;
  plan: plan;
  status:
    | 'trialing'
    | 'active'
    | 'inactive'
    | 'paused'
    | 'past_due'
    | 'canceled'
    | 'unpaid';
  created_at: string;
  updated_at: string;
  createdAt?: string;
  updatedAt?: string;
} | null;

export declare type Invoice = {
  id: string;
  account_id: string;
  session_id: string;
  customer_id: string;
  subscription_id: string;
  invoice_id: string;
  description: string;
  session: object;
  subscription: object;
  invoice: object;
  customer_details: object;
  unit_amount: number;
  quantity: number;
  amount_total: number;
  amount_due: number;
  amount_paid: number;
  amount_remaining: number;
  amount_discount: number;
  amount_tax: number;
  currency: 'vnd' | 'usd';
  items: any[];
  status: 'complete' | 'pending' | 'incomplete' | 'canceled' | 'expired';
  payment_status: 'paid' | 'unpaid' | 'error';
  payment_method: 'momo' | 'zalopay' | 'vnpay' | 'stripe';
  period_start: string;
  period_end: string;
  url: string;
  success_url: string;
  created_at: string;
  updated_at: string;
  createdAt?: string;
  updatedAt?: string;
};

export declare type InvoiceStatus = {
  value: string;
  type: string;
  label: string;
};

export declare type commentForm = {
  id: string;
  user_id: string;
  movie_id: string;
  content: string;
  username: string;
  user_avatar: string;
  movie_type: string;
  parent_id?: string | null;
  reply_to?: string | null;
  type: 'children' | 'parent';
  like: number;
  dislike: number;
  childrens?: number;
  updated: boolean | false;
  created_at: string;
  updated_at: string;
  createdAt?: string;
  updatedAt?: string;
} | null;

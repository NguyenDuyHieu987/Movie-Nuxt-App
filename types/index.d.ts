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
  sortBy?: string;
  genre: string | number;
  year: string;
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
  support_devices: string;
}

export declare type user = {
  id: string;
  username: string;
  full_name: string;
  email: string;
  role: string;
  avatar: string | number;
  auth_type: string;
  created_at: string;
  updated_at: string;
  createdAt?: string;
  updatedAt?: string;
} | null;

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

import { commonDataResponseWrapper } from './common';

export type Filter = {
  id: number;
  name: string;
  hex?: string;
};

export type GetFiltersParams = {
  apikey: string | undefined;
  size: number;
  q: string;
  sort: string;
  sortorder: string;
};

export type FiltersKeys =
  | 'color'
  | 'culture'
  | 'technique'
  | 'century'
  | 'period'
  | 'place'
  | 'classification'
  | 'worktype';

export type SetFilterPayload = {
  key: FiltersKeys;
  value: string | number | null;
};

export type FiltersState = {
  [K in FiltersKeys]: string | number | null;
};

export type FiltersResponse = commonDataResponseWrapper<Filter>;

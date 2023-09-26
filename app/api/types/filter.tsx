import { commonDataResponseWrapper } from './common';

export type Filter = {
  id: number;
  name: string;
};

export type GetFiltersParams = {
  apikey: string | undefined;
  size: number;
  q: string;
};

export type FiltersResponse = commonDataResponseWrapper<Filter>;

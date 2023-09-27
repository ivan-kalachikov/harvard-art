import { commonDataResponseWrapper } from '@/types/common';
import { FiltersKeys } from '@/types/filter';

export type ArtObject = {
  id: number;
  title: string;
  description: string | null;
  primaryimageurl: string | null;
};

type FiltersParams = {
  [K in FiltersKeys]: string | number | null;
};

type CommonGetObjectParams = {
  apikey: string | undefined;
  hasimage: number;
  size: number;
  page: number;
  q: string;
  title: string;
};

export type GetObjectsParams = CommonGetObjectParams & FiltersParams;

export type ObjectsResponse = commonDataResponseWrapper<ArtObject>;

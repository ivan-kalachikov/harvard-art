import { commonDataResponseWrapper } from '@/types/common';
import { FiltersKeys } from '@/types/filter';

export type ArtObject = {
  id: number;
  title: string;
  description: string | null;
  primaryimageurl: string | null;
  imagecount: number;
};

export type ArtObjectDetails = {
  title: string;
  description: string | null;
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
  sort: string;
  sortorder: string;
};

export type GetObjectsParams = CommonGetObjectParams & FiltersParams;
export type GetObjectDetailsParams = { apikey: string | undefined };

export type ObjectsResponse = commonDataResponseWrapper<ArtObject>;

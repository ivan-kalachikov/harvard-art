import { commonDataResponseWrapper } from './common';

export type ArtObject = {
  id: number;
  title: string;
  description: string | null;
  primaryimageurl: string | null;
};

export type GetObjectsParams = {
  apikey: string | undefined;
  hasimage: number;
  size: number;
  page: number;
  q: string;
  title: string;
  culture: number | null;
  technique: number | null;
};

export type ObjectsResponse = commonDataResponseWrapper<ArtObject>;

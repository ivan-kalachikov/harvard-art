export type commonDataResponseWrapper<RecordsType> = {
  info: {
    page: number;
    pages: number;
  };
  records: RecordsType[];
};

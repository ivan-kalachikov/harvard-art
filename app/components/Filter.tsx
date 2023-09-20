import { useState, useRef, useEffect } from 'react';
import Select, { InputActionMeta } from 'react-select';
import debounce from 'lodash/debounce';
import upperFirst from 'lodash/upperFirst';
import axios, { AxiosResponse } from 'axios';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { setFilter } from '@/features/slices/filtersSlice';
import { useDispatch } from 'react-redux';

export default function Filters({ endpoint }: { endpoint: string }) {
  const [inputText, setInputText] = useState<string>('');
  const [searchText, setSearchText] = useState<string>('');
  const dispatch = useDispatch();

  type FilterDataType = {
    data: {
      id: number;
      name: string;
    };
  };

  const {
    isLoading,
    error,
    data,
  }: UseQueryResult<AxiosResponse<FilterDataType>> = useQuery(
    searchText ? [endpoint, searchText] : [endpoint],
    () => {
      return axios.get(`https://api.harvardartmuseums.org/${endpoint}`, {
        params: {
          apikey: process.env.NEXT_PUBLIC_API_KEY,
          size: 10,
          q: `name:${searchText}* OR ${upperFirst(searchText)}*`,
          usedby: endpoint === 'technique' ? 'culture:37528515' : null,
        },
      });
    },
    {
      refetchOnWindowFocus: false,
    },
  );

  useEffect(() => {
    console.log('data', data);
  }, [data]);

  const handleSearchDebounced = useRef(
    debounce((searchText) => setSearchText(searchText), 300),
  ).current;

  const handleInputChange = (inputText: string, meta: InputActionMeta) => {
    if (meta.action !== 'input-blur' && meta.action !== 'menu-close') {
      setInputText(inputText);
      handleSearchDebounced(inputText);
    }
  };

  if (error) {
    return <div>Something went wrong</div>;
  }

  return (
    <Select
      options={data?.data?.records || []}
      isClearable={true}
      inputValue={inputText}
      getOptionValue={(option) => option.id}
      getOptionLabel={(option) => option.name}
      onInputChange={handleInputChange}
      isLoading={!!searchText && isLoading}
      onChange={({ id }) => {
        dispatch(setFilter({ key: endpoint, value: id }));
      }}
    />
  );
}

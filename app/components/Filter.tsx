import { useState, useRef, useEffect } from 'react';
import Select, { InputActionMeta } from 'react-select';
import debounce from 'lodash/debounce';
import upperFirst from 'lodash/upperFirst';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { setFilter } from '@/features/slices/filtersSlice';
import { useDispatch } from 'react-redux';
import { getFilter } from '@/api';
import { Filter, FiltersResponse } from '@/api/types/filter';
import style from './filter.module.scss';

export default function Filters({ endpoint }: { endpoint: string }) {
  const [inputText, setInputText] = useState<string>('');
  const [searchText, setSearchText] = useState<string>('');
  const dispatch = useDispatch();

  const { isLoading, error, data }: UseQueryResult<FiltersResponse> = useQuery(
    searchText ? [endpoint, searchText] : [endpoint],
    () => {
      return getFilter(endpoint, {
        params: {
          apikey: process.env.NEXT_PUBLIC_API_KEY,
          size: 10,
          q: `name:${searchText}* OR ${upperFirst(searchText)}*`,
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
    debounce((searchText: string) => setSearchText(searchText), 300),
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
      options={data?.records}
      isClearable={true}
      inputValue={inputText}
      getOptionValue={(option: Filter): number => option.id}
      getOptionLabel={(option: Filter): string => option.name}
      onInputChange={handleInputChange}
      isLoading={!!searchText && isLoading}
      onChange={(option: Filter) => {
        dispatch(setFilter({ key: endpoint, value: option?.id || null }));
      }}
    />
  );
}

import { useState, useRef, useEffect } from 'react';
import Select, { InputActionMeta, SingleValue } from 'react-select';
import debounce from 'lodash/debounce';
import upperFirst from 'lodash/upperFirst';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { setFilter } from '@/features/slices/filtersSlice';
import { useDispatch } from 'react-redux';
import { getFilter } from '@/api';
import { FiltersKeys, Filter, FiltersResponse } from '@/types/filter';

export default function Filters({
  filter,
  sort,
  getOptionValue,
}: {
  filter: FiltersKeys;
  sort?: string;
  getOptionValue?: (option: SingleValue<Filter>) => string | number | null;
}) {
  const [inputText, setInputText] = useState<string>('');
  const [searchText, setSearchText] = useState<string>('');
  const dispatch = useDispatch();

  const { isLoading, error, data }: UseQueryResult<FiltersResponse> = useQuery(
    searchText ? [filter, searchText] : [filter],
    () => {
      return getFilter(filter, {
        params: {
          apikey: process.env.NEXT_PUBLIC_API_KEY,
          size: 10,
          q: `name:${searchText}* OR ${upperFirst(searchText)}*`,
          sort: sort || 'objectcount',
          sortorder: 'desc',
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

  const getDefaultOptionValue = (option: SingleValue<Filter>): number | null =>
    option?.id || null;

  return (
    <Select<Filter>
      options={data?.records}
      isClearable={true}
      inputValue={inputText}
      getOptionValue={(option) => option.id.toString()}
      getOptionLabel={(option) => option.name}
      onInputChange={handleInputChange}
      isLoading={!!searchText && isLoading}
      onChange={(option) => {
        dispatch(
          setFilter({
            key: filter,
            value:
              typeof getOptionValue === 'function'
                ? getOptionValue(option)
                : getDefaultOptionValue(option),
          }),
        );
      }}
    />
  );
}

import { useState, useRef, useEffect } from 'react';
import Select, { InputActionMeta } from 'react-select';
import debounce from 'lodash/debounce';
import upperFirst from 'lodash/upperFirst';
import axios, { AxiosResponse } from 'axios';
import { UseQueryResult, useQuery } from '@tanstack/react-query';

export default function Filters({ endpoint }) {
  const [inputText, setInputText] = useState<string>('');
  const [searchText, setSearchText] = useState<string>('');

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
    />
  );
}

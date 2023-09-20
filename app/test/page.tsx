'use client';

import {
  UseInfiniteQueryResult,
  useInfiniteQuery,
} from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { AxiosResponse } from 'axios';
import Filters from '../components/Filters';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import ArtObject, { TArtObject } from '@/components/artObject/ArtObject';

type ArtObjectsResponse = {
  info: {
    page: number;
    pages: number;
  };
  records: TArtObject[];
};

export default function Test() {
  const observerTarget = useRef(null);
  const [searchValue, setSearchValue] = useState('');
  const [searchInputValue, setSearchInputValue] = useState('');
  const filters = useSelector((state: RootState) => state.filters);

  const onChangeSearchInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(e.target.value);
  };

  const onSearch = () => {
    setSearchValue(searchInputValue);
  };

  const {
    isLoading: isObjectsLoading,
    data: objectsData,
    isFetchingNextPage: isFetchingNextObjectsPage,
    fetchNextPage: fetchNextObjectsPage,
    error: objectsError,
  }: UseInfiniteQueryResult<
    AxiosResponse<ArtObjectsResponse>
  > = useInfiniteQuery(
    ['objects', searchValue, filters],
    ({ pageParam = 1 }) => {
      return axios.get<ArtObjectsResponse>(
        'https://api.harvardartmuseums.org/object',
        {
          params: {
            apikey: process.env.NEXT_PUBLIC_API_KEY,
            hasimage: 1,
            size: 10,
            page: pageParam,
            q: `imagepermissionlevel:0 AND primaryimageurl:*`,
            title: searchValue,
            culture: filters.culture,
            technique: filters.technique,
            // fields: 'description,primaryimageurl,title,id',
          },
        },
      );
    },
    {
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage: AxiosResponse<ArtObjectsResponse>) => {
        console.log('lastPage', lastPage);
        const page = lastPage?.data?.info?.page;
        const pages = lastPage?.data?.info?.pages;
        return page !== undefined && page < pages ? page + 1 : undefined;
      },
    },
  );

  // useEffect(() => {
  //   console.log(objectsData?.data?.records);
  // }, [objectsData]);

  useEffect(() => {
    console.log(filters);
  }, [filters]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextObjectsPage();
        }
      },
      { threshold: 1 },
    );
    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }
    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget]);

  return (
    <div className='objects'>
      <div className='search-form'>
        <Filters />
        <input
          value={searchInputValue}
          onChange={onChangeSearchInputValue}
        ></input>
        <button onClick={onSearch}>Search</button>
      </div>
      <hr />
      {objectsError !== null && !isObjectsLoading && (
        <div>
          Something went wrong, please try again {JSON.stringify(objectsError)}
        </div>
      )}
      {objectsData?.pages?.[0]?.data?.records?.length === 0 &&
        objectsError === null && <div>Nothing found</div>}
      <ul>
        {objectsError === null &&
          (objectsData?.pages || []).map(({ data: { records } }) =>
            records.map((object: TArtObject) => (
              <ArtObject key={object.id} object={object} />
            )),
          )}
        <li ref={observerTarget}></li>
      </ul>
      {(isObjectsLoading || isFetchingNextObjectsPage) && <div>Loading...</div>}
    </div>
  );
}

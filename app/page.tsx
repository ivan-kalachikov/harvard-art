'use client';

import {
  UseInfiniteQueryResult,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import Filters from '@/components/filters/Filters';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import ArtObject from '@/components/artObject/ArtObject';
import Footer from '@/components/footer/Footer';
import { ArtObject as ArtObjectType, ObjectsResponse } from '@/types/object';
import { getObjects } from '@/api';
import styles from './page.module.scss';

export default function Index() {
  const observerTarget = useRef(null);
  const [searchValue, setSearchValue] = useState('');
  const [searchInputValue, setSearchInputValue] = useState('');
  const [filtersOpened, setFiltersOpened] = useState(false);
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
  }: UseInfiniteQueryResult<ObjectsResponse> = useInfiniteQuery(
    ['objects', searchValue, filters],
    async ({ pageParam = 1 }: { pageParam?: number }) => {
      return getObjects({
        params: {
          apikey: process.env.NEXT_PUBLIC_API_KEY,
          hasimage: 1,
          size: 10,
          century: filters.century,
          page: pageParam,
          q: `imagepermissionlevel:0 AND primaryimageurl:*`,
          title: searchValue,
          culture: filters.culture,
          color: filters.color,
          technique: filters.technique,
          period: filters.period,
          place: filters.place,
          worktype: filters.worktype,
          classification: filters.classification,
          sort: 'rank',
          sortorder: 'desc',
          // fields: 'description,primaryimageurl,title,id',
        },
      });
    },
    {
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage: ObjectsResponse) => {
        const page = lastPage?.info?.page;
        const pages = lastPage?.info?.pages;
        return page !== undefined && page < pages ? page + 1 : undefined;
      },
    },
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextObjectsPage().catch((e) => console.log(e));
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
    <div className={styles.objects}>
      <div
        className={styles.filtersButton}
        onClick={() => setFiltersOpened(!filtersOpened)}
      >
        Filters {filtersOpened ? '-' : '+'}
      </div>
      {filtersOpened && (
        <div className={styles.filters}>
          <Filters />
          <input
            className={styles.searchInput}
            value={searchInputValue}
            onChange={onChangeSearchInputValue}
          ></input>
          <button className={styles.searchButton} onClick={onSearch}>
            Search
          </button>
        </div>
      )}
      {objectsError !== null && !isObjectsLoading && (
        <div>
          Something went wrong, please try again {JSON.stringify(objectsError)}
        </div>
      )}
      {objectsData?.pages?.[0]?.records?.length === 0 &&
        objectsError === null && <div>Nothing found</div>}
      <ul className={styles.gallery}>
        {objectsError === null &&
          (objectsData?.pages || []).map(({ records }) =>
            records.map((object: ArtObjectType) => (
              <li key={object.id}>
                <ArtObject object={object} className={styles.artObject} />
              </li>
            )),
          )}
        <li ref={observerTarget}></li>
      </ul>
      {(isObjectsLoading || isFetchingNextObjectsPage) && <div>Loading...</div>}
      <Footer />
    </div>
  );
}

'use client';

import { UseQueryResult, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import Image from 'next/image';
import styles from './page.module.scss';
import Filters from '../components/Filters';

type ArtObject = {
  id: number;
  title: string;
  description: string | null;
  primaryimageurl: string | null;
};

type ArtObjectsResponse = {
  records: ArtObject[];
};

export default function Test() {
  const [searchValue, setSearchValue] = useState('');
  const [searchInputValue, setSearchInputValue] = useState('');

  const onChangeSearchInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(e.target.value);
  };

  const onSearch = () => {
    setSearchValue(searchInputValue);
  };

  const {
    isLoading: isObjectsLoading,
    status: objectsStatus,
    data: objectsData,
    error: objectsError,
  }: UseQueryResult<AxiosResponse<ArtObjectsResponse>> = useQuery(
    ['objects', searchValue],
    () => {
      return axios.get('https://api.harvardartmuseums.org/object', {
        params: {
          apikey: process.env.NEXT_PUBLIC_API_KEY,
          hasimage: 1,
          size: 10,
          q: `imagepermissionlevel:0 AND primaryimageurl:*`,
          title: searchValue,
          // fields: 'description,primaryimageurl,title,id',
        },
      });
    },
    {
      refetchOnWindowFocus: false,
    },
  );

  useEffect(() => {
    console.log(objectsData?.data?.records);
  }, [objectsData]);

  const renderObject = (object: ArtObject) => (
    <li key={object.id}>
      <div className={styles.image}>
        {object.primaryimageurl && (
          <Image
            fill
            src={object.primaryimageurl}
            alt={object.title}
            sizes='(300px)'
          ></Image>
        )}
      </div>
      {object.description !== undefined ? (
        <>
          <strong>{object.title}</strong>
          <p>{object.description}</p>
        </>
      ) : (
        ''
      )}
    </li>
  );

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
      <hr></hr>
      {isObjectsLoading && <div>Loading...</div>}
      {objectsError !== null && !isObjectsLoading && (
        <div>
          Something went wrong, please try again {JSON.stringify(objectsError)}
        </div>
      )}
      {objectsData?.data?.records?.length === 0 && objectsError === null && (
        <div>Nothing found</div>
      )}
      <ul>
        {objectsError === null &&
          (objectsData?.data?.records || []).map(renderObject)}
      </ul>
    </div>
  );
}

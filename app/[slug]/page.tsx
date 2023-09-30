'use client';

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { ArtObjectDetails } from '@/types/object';
import { getObjectDetails } from '@/api';
import Image from 'next/image';
import styles from './page.module.scss';
import sortBy from 'lodash/sortBy';

export default function Details({ params }: { params: { slug: string } }) {
  const {
    // isLoading,
    data, // error,
  }: UseQueryResult<ArtObjectDetails> = useQuery(
    ['objects', params.slug],
    async () => {
      return getObjectDetails(params.slug, {
        apikey: process.env.NEXT_PUBLIC_API_KEY,
      });
    },
    {
      refetchOnWindowFocus: false,
    },
  );

  const getPrevailingColor = () => {
    return sortBy(data?.colors, 'percent')?.[0]?.color || '#fff';
  };

  return (
    <div
      className='object-details'
      style={{
        padding: '50px',
        backgroundColor: getPrevailingColor(),
      }}
    >
      <h1>{data?.title}</h1>
      <p>{data?.description}</p>
      {data?.images.map((image) => (
        <div className={styles.image}>
          <Image
            key={image.imageid}
            fill
            src={image.baseimageurl}
            alt={image.copyright}
            sizes='(300px)'
          ></Image>
        </div>
      ))}
    </div>
  );
}

'use client';

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { ArtObjectDetails } from '@/types/object';
import { getObjectDetails } from '@/api';
import Lightbox from 'yet-another-react-lightbox';
import { Captions, Counter, Zoom } from 'yet-another-react-lightbox/plugins';
import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.scss';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';
import 'yet-another-react-lightbox/plugins/counter.css';

export default function Details({ params }: { params: { slug: string } }) {
  const [openLightbox, setOpenLightbox] = useState(false);
  const [lightboxImageIndex, setLightboxImageIndex] = useState(0);
  const captionsRef = useRef(null);

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

  const handleImageClick = (index: number) => {
    setOpenLightbox(true);
    setLightboxImageIndex(index);
  };

  return (
    <div className='object-details'>
      <h1>{data?.title}</h1>
      <p>{data?.description}</p>
      <Link href='/'>Back</Link>
      <Lightbox
        plugins={[Captions, Counter, Zoom]}
        captions={{ ref: captionsRef }}
        open={openLightbox}
        close={() => setOpenLightbox(false)}
        counter={{ container: { style: { top: '30px' } } }}
        slides={data?.images.map((image) => ({
          src: image.baseimageurl,
          width: image.width,
          height: image.height,
          alt: image.publiccaption,
          title: image.publiccaption,
        }))}
        index={lightboxImageIndex}
        on={{
          click: () => {
            (captionsRef.current?.visible
              ? captionsRef.current?.hide
              : captionsRef.current?.show)?.();
          },
        }}
        zoom={{
          scrollToZoom: true,
        }}
      />
      {data?.images.map((image, index) => (
        <div className={styles.image}>
          <Image
            key={image.imageid}
            fill
            src={image.baseimageurl}
            alt={image.copyright}
            sizes='(300px)'
            alt={image.publiccaption}
            onClick={() => handleImageClick(index)}
          ></Image>
        </div>
      ))}
    </div>
  );
}

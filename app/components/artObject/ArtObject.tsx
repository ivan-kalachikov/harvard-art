import Image from 'next/image';
import styles from './artObject.module.scss';
import { ArtObject } from '@/types/object';
import Link from 'next/link';
import sortBy from 'lodash/sortBy';

export default function ArtObject({ object }: { object: ArtObject }) {
  const getPrevailingColor = () => {
    return sortBy(object?.colors, 'percent')?.[0]?.color || '#fff';
  };

  const mouseEnterHandler = () => {
    document.body.style.setProperty('--main-background', getPrevailingColor());
  };

  return (
    <li key={object.id}>
      <div className={styles.image}>
        {object.primaryimageurl && (
          <Link href={`/${object.id}`}>
            <Image
              fill
              src={object.primaryimageurl}
              alt={object.title}
              sizes='(300px)'
              onMouseEnter={mouseEnterHandler}
            ></Image>
            <div className='image-count'>{object.imagecount}</div>
          </Link>
        )}
      </div>
      {object.description !== undefined ? (
        <>
          <Link href={`/${object.id}`}>
            <strong>{object.title}</strong>
          </Link>
          <p>{object.description}</p>
        </>
      ) : (
        ''
      )}
    </li>
  );
}

import Image from 'next/image';
import styles from './artObject.module.scss';
import { ArtObject } from '@/types/object';
import Link from 'next/link';

export default function ArtObject({
  object,
  className,
}: {
  object: ArtObject;
  className?: string;
}) {
  return (
    <div key={object.id} className={`${styles.artObject} ${className}`}>
      <div className={styles.image}>
        {object.primaryimageurl && (
          <Link href={`/${object.id}`}>
            <Image
              fill
              src={object.primaryimageurl}
              alt={object.title}
              sizes='(300px)'
            ></Image>
            <div className={styles.imageCount}>{object.imagecount}</div>
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
    </div>
  );
}

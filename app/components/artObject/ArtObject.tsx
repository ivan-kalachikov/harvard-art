import Image from 'next/image';
import styles from './artObject.module.scss';
import { ArtObject } from '@/types/object';
import Link from 'next/link';

export default function ArtObject({ object }: { object: ArtObject }) {
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
            ></Image>
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

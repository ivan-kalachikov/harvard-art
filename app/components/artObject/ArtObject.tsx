import Image from 'next/image';
import styles from './artObject.module.scss';
import { ArtObject } from '@/types/object';

export default function ArtObject({ object }: { object: ArtObject }) {
  return (
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
}

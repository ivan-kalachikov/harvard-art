import Image from 'next/image';
import styles from './artObject.module.scss';

export type TArtObject = {
  id: number;
  title: string;
  description: string | null;
  primaryimageurl: string | null;
};

export default function ArtObject({ object }: { object: TArtObject }) {
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

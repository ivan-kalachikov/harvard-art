import Image from 'next/image';
import {
  isImageFitCover,
  isImageSlide,
  useLightboxProps,
  Slide,
  SlideImage,
  RenderSlideProps,
} from 'yet-another-react-lightbox';

export default function LightboxSlide({
  rect,
  slide,
}: RenderSlideProps<Slide>) {
  const { imageFit } = useLightboxProps().carousel;
  const slideImage = slide as SlideImage;
  const cover = isImageFitCover(slideImage, imageFit);

  if (!isImageSlide(slide)) return undefined;
  const slideWidth = slide.width || 1;
  const slideHeight = slide.height || 1;
  const width = !cover
    ? Math.round(Math.min(rect.width, (rect.height / slideHeight) * slideWidth))
    : rect.width;

  const height = !cover
    ? Math.round(Math.min(rect.height, (rect.width / slideWidth) * slideHeight))
    : rect.height;

  return (
    <div style={{ position: 'relative', width, height }}>
      <Image
        fill
        alt=''
        src={slideImage.src}
        loading='eager'
        draggable={false}
        style={{ objectFit: cover ? 'cover' : 'contain' }}
        sizes={`${Math.ceil((width / window.innerWidth) * 100)}vw`}
      />
    </div>
  );
}

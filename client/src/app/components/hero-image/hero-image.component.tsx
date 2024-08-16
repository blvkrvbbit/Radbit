'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

type Props = {
  images: {
    id: number;
    url: string;
    adId: number;
    hero: boolean;
  }[];
  title: string;
};

const HeroImage = ({ images, title }: Props) => {
  const [heroImage, setHeroImage] = useState<any>(null);

  useEffect(() => {
    const image = images.filter((image: any) => {
      if (image.hero) {
        return image;
      }
    })[0];

    setHeroImage(image);
  }, [images]);

  // If hero image select it else return a default of first index.
  if (heroImage) {
    return (
      <Image
        src={heroImage.url}
        width={20}
        height={20}
        className='h-[8rem] w-40'
        alt={title}
        unoptimized
      />
    );
  } else {
    return (
      <Image
        src={images[0].url}
        width={20}
        height={20}
        className='h-[8rem] w-40'
        alt={'Swap me out'}
        unoptimized
      />
    );
  }
};

export default HeroImage;

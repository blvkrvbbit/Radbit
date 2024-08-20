'use client';
import { adjustImage } from '@/app/utils/adjust-image.utils';
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
  className?: string;
};

const HeroImage = ({ images, title, className }: Props) => {
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
        src={adjustImage(500, 500, heroImage.url)}
        layout='fill'
        alt={title}
      />
    );
  } else {
    return (
      <Image
        src={adjustImage(400, 400, images[0].url)}
        layout='fill'
        alt={title}
      />
    );
  }
};

export default HeroImage;

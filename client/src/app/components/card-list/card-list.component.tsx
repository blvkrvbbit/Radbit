'use client';

import Ad from '@/app/types/ad.type';
import Link from 'next/link';
import HeroImage from '../hero-image/hero-image.component';
import RenderHTML from '../render-html/render-html';
import Card from '../card-component.tsx/card.component';

type Props = {
  ads: Ad[];
};
const CardList = ({ ads }: Props) => {
  return (
    <div className='grid grid-cols-12 gap-4'>
      {ads &&
        ads.map((ad: Ad) => {
          return <Card key={ad.id} ad={ad} />;
        })}
    </div>
  );
};

export default CardList;

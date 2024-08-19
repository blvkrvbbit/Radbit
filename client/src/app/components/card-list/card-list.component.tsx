'use client';

import Ad from '@/app/types/ad.type';
import Card, { CustomCard } from '../card/card.component';

type Props = {
  ads: Ad[] | [];
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

type CustomProps = {
  ads: any;
};

// TODO: Come up with a better card name
export const CustomCardList = ({ ads }: CustomProps) => {
  return (
    <div className='relative grid grid-cols-12 gap-4'>
      {ads &&
        ads.map((ad: Ad) => {
          return <CustomCard key={ad.id} ad={ad} />;
        })}
    </div>
  );
};

export default CardList;

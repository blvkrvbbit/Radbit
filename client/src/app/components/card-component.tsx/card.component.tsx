import Ad from '@/app/types/ad.type';
import Link from 'next/link';
import HeroImage from '../hero-image/hero-image.component';
import RenderHTML from '../render-html/render-html';

type Props = {
  ad: Ad;
};

const Card = ({ ad }: Props) => {
  return (
    <Link
      href={`/ads/${ad.id}`}
      className='border p-4 flex gap-4 col-span-12 md:col-span-6  xl:col-span-4'
    >
      <HeroImage images={ad.images} title={ad.title} />
      <div className='w-full'>
        <div className='flex justify-between items-center'>
          <h3>{ad.title.slice(0, 20)}...</h3>
          <div className='text-green-600 font-bold text-lg'>${ad.price}</div>
        </div>
        <RenderHTML
          className='mt-4 md:hidden'
          content={ad.description.slice(0, 40)}
        />
        <RenderHTML
          className='mt-4 lg:'
          content={ad.description.slice(0, 100)}
        />
      </div>
    </Link>
  );
};

export default Card;

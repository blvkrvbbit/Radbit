import Ad from '@/app/types/ad.type';
import Link from 'next/link';
import HeroImage from '../hero-image/hero-image.component';
import RenderHTML from '../render-html/render-html';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useRouter } from 'next/navigation';
import { MouseEvent } from 'react';
import { useSession } from 'next-auth/react';
type Props = {
  ad: Ad;
};

const Card = ({ ad }: Props) => {
  return (
    <Link
      href={`/ads/${ad.id}`}
      className='shadow-lg border p-4 flex gap-4 col-span-12 md:col-span-6  xl:col-span-4'
    >
      <div className='relative w-[8rem] h-[6rem]'>
        {ad.images.length > 0 && (
          <HeroImage images={ad.images} title={ad.title} />
        )}
      </div>
      <div className='w-full'>
        <div className='flex flex-wrap justify-between items-center'>
          <h3>{ad.title.slice(0, 20)}...</h3>
          <div className='text-green-600 font-bold text-lg'>${ad.price}</div>
        </div>
        <RenderHTML
          className='mt-4 md:hidden'
          content={ad.description.slice(0, 40) + '...'}
        />
        <RenderHTML
          className='mt-4 hidden lg:block'
          content={ad.description.slice(0, 60) + '...'}
        />
      </div>
    </Link>
  );
};

// TODO: Come up with a better card name
// TODO: Fix delete, so it updates on front end without manual refresh
// TODO: Delete image from cloudinary when deleted.

type UserAdCardProps = {
  ad: Ad;
};
export const UserAdsCard = ({ ad }: UserAdCardProps) => {
  const router = useRouter();
  const handleDelete = async (e: any) => {
    e.preventDefault();

    const resp = await fetch(`/api/ads/${ad.id}`, {
      method: 'DELETE',
    });
    const data = await resp.json();
    router.refresh();
  };
  return (
    <Link
      href={`/ads/${ad.id}`}
      className='shadow-lg border p-4 flex gap-4 col-span-12 md:col-span-6 relative'
    >
      <button
        className='absolute right-3 bottom-4 z-10'
        onClick={handleDelete}
        id={`${ad.id}`}
        type='button'
      >
        <Icon
          id={`${ad.id}`}
          className='text-gray-500/20 hover:text-red-500'
          fontSize={20}
          icon='mdi:trash'
        />
      </button>
      <div className='relative w-[8rem] h-[6rem]'>
        {ad.images.length > 0 && (
          <HeroImage images={ad.images} title={ad.title} />
        )}
      </div>
      <div className='w-full'>
        <div className='flex justify-between items-center'>
          <h3>{ad.title.slice(0, 20)}...</h3>
          <div className='text-green-600 font-bold text-lg'>${ad.price}</div>
        </div>
        <RenderHTML
          className='mt-4 md:hidden'
          content={ad.description.slice(0, 40) + '...'}
        />
        <RenderHTML
          className='mt-4 lg:'
          content={ad.description.slice(0, 60) + '...'}
        />
      </div>
    </Link>
  );
};

export default Card;

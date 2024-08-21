'use client';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

import HeroImage from '@/app/components/hero-image/hero-image.component';
import Image from 'next/image';
import ImageView from '@/app/components/image-view/image-view.component';
import RenderHTML from '@/app/components/render-html/render-html';
import Ad from '@/app/types/ad.type';
import { useState } from 'react';
import './ad.styles.css';
import { Icon } from '@iconify/react/dist/iconify.js';
import timeSince from '@/app/utils/time-since';
import { adjustImage } from '@/app/utils/adjust-image.utils';
import { formatMoneyToString } from '@/app/utils/money';

type Props = {
  ad: Ad;
};

const ViewAd = ({ ad }: Props) => {
  const [viewMore, setViewMore] = useState(false);
  const toggleViewMore = () => {
    setViewMore(!viewMore);
  };

  return (
    <div
      className={twMerge(
        // Base styles
        'container grid grid-cols-12 mt-8 gap-8 pb-8'
      )}
    >
      <div
        className={twMerge(
          // Base style
          'col-span-12',
          // Large screen size
          'lg:col-span-8 '
        )}
      >
        <Title ad={ad} />
        {ad.images.length > 0 && <ImageContainer ad={ad} />}

        {/* TODO add ability to toggle overflow */}

        <Description ad={ad} />
      </div>

      <UserInformation ad={ad} />
      <div className='col-span-12'>
        {/* TODO: Prepoluate with ads with similar categories/sub categories */}
        <h2 className='mb-4 font-bold'>Ads you might like:</h2>
        <div
          className={twMerge(
            'col-span-12 space-y-4 ',
            'md:space-y-0 md:grid md:grid-cols-4 lg:grid-cols-6 md:gap-4'
          )}
        >
          <div className='bg-gray-500/20 h-20 flex items-center justify-center'>
            placeholder
          </div>
          <div className='bg-gray-500/20 h-20 flex items-center justify-center'>
            placeholder
          </div>
          <div className='bg-gray-500/20 h-20 flex items-center justify-center'>
            placeholder
          </div>
        </div>
      </div>
    </div>
  );
};

// TODO: Restyle the User Information component. Look for design inspiration.
export const UserInformation = ({ ad }: Props) => {
  return (
    <div
      className={twMerge(
        'shadow-md col-span-12 p-4 border h-[12rem]',
        // Medium Screen
        'md:col-span-6',
        // Large Screen
        'lg:col-span-3 lg:col-start-10'
      )}
    >
      <div className='user'>
        <div className='flex items-center gap-4 mb-6'>
          <Icon
            className='text-gray-500/70'
            fontSize={28}
            icon='mdi:location'
          />
          <div>
            <div className='posted-date text-gray-400'>
              Posted {timeSince(ad.createdDate)} ago
            </div>
            <div className='text-md city font-semibold tracking-wide'>
              {ad.user.city}, {ad.user.provinceState}
            </div>
          </div>
        </div>
        <div className='text-center text-sm mb-4 font-medium tracking-wide'>
          Owner: {ad.user.name}
        </div>
        <div className='flex justify-center'>
          <button
            className={twMerge(
              'w-[10rem] border border-primary text-primary rounded-full py-3  font-bold',
              'hover:bg-primary hover:text-white transition-colors ease-in-out delay-100'
            )}
          >
            Message
          </button>
        </div>
      </div>
    </div>
  );
};

export const Title = ({ ad }: Props) => {
  return (
    <div className='mx-auto'>
      <div className='flex justify-between mb-4 items-center'>
        <h1 className='font-bold tracking-normal my-4 text-xl'>{ad.title}</h1>
        <p className='font-bold text-2xl text-green-600'>
          ${formatMoneyToString(ad.price)}
        </p>
      </div>
      <hr className='mb-4' />
    </div>
  );
};

export const ImageContainer = ({ ad }: Props) => {
  return (
    <>
      <div className='grid grid-cols-12 gap-2'>
        <div
          className={twMerge(
            'relative border col-span-12 md:col-span-10 h-[15rem]',
            // Medium screen size
            'md:h-[20rem] ',
            // Large screen size
            'lg:col-span-10 lg:h-[25rem]',
            // Extra Large screen size
            'xl:col-span-10'
          )}
        >
          <HeroImage
            images={ad.images}
            title={ad.title}
            className='w-full h-[15rem] mx-auto'
          />
        </div>
        <div
          className={twMerge(
            'col-span-12  h-[8rem] flex ',
            // Medium screen size
            'md:flex-col md:h-auto md:col-span-2 gap-2'
          )}
        >
          {ad.images
            .filter((image: any) => {
              if (!image.hero) {
                return image;
              }
            })
            .slice(0, 2)
            .map((image: any, id: number) => {
              return (
                <div
                  key={id}
                  className={twMerge(
                    'relative border h-[8rem] w-1/3',
                    'md:w-full md:h-[6.666rem]',
                    'lg:h-[8.3333rem]'
                  )}
                >
                  <Image
                    src={adjustImage(400, 800, image.url)}
                    layout='fill'
                    alt={ad.title}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export const Description = ({ ad }: Props) => {
  const [viewMore, setViewMore] = useState(false);

  const handleToggle = () => setViewMore(!viewMore);

  return (
    <div className='mx-auto my-4 border p-4 rounded-md'>
      <h2 className='font-bold text-lg mb-2'>Description</h2>
      <hr />
      <div className='relative mt-4'>
        {ad.description.length > 400 ? (
          <>
            {viewMore ? (
              <RenderHTML content={`${ad.description}`} />
            ) : (
              <>
                <RenderHTML content={`${ad.description.slice(0, 400)}`} />
                <div
                  onClick={handleToggle}
                  className={twMerge(
                    'bg-white cursor-pointer opacity-90 w-full h-20 ',
                    'left-0 absolute bottom-0',
                    'flex items-center justify-center'
                  )}
                >
                  View More
                </div>
              </>
            )}
          </>
        ) : (
          <RenderHTML content={ad.description} />
        )}
      </div>
    </div>
  );
};

export default ViewAd;

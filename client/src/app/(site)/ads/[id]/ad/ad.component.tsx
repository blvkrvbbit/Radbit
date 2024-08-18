'use client';

import HeroImage from '@/app/components/hero-image/hero-image.component';
import ImageView from '@/app/components/image-view/image-view.component';
import RenderHTML from '@/app/components/render-html/render-html';
import Ad from '@/app/types/ad.type';
import { useState } from 'react';
import './ad.styles.css';
import { Icon } from '@iconify/react/dist/iconify.js';
import timeSince from '@/app/utils/time-since';

type Props = {
  ad: Ad;
};

const ViewAd = ({ ad }: Props) => {
  const [viewMore, setViewMore] = useState(false);
  const toggleViewMore = () => {
    setViewMore(!viewMore);
  };
  return (
    <div className='container mt-8 grid grid-cols-12 gap-8 pb-8'>
      <div className='col-span-12 lg:col-span-8'>
        <Title ad={ad} />
        <ImageContainer ad={ad} />

        {/* TODO add ability to toggle overflow */}

        <Description ad={ad} />
      </div>
      <div className='col-span-12 lg:col-span-4 p-4 border h-[12rem]'>
        <div className='user'>
          <div className='flex items-center gap-4 mb-4'>
            <Icon
              className='text-gray-500/70'
              fontSize={28}
              icon='mdi:location'
            />
            <div>
              <div className='posted-date text-gray-400'>
                Posted {timeSince(ad.createdDate)} ago
              </div>
              <div className='city font-semibold tracking-wide'>
                {ad.user.city}, {ad.user.provinceState}
              </div>
            </div>
          </div>
          <div className='text-center mb-4'>Contact {ad.user.name}</div>
          <button className='w-full bg-primary py-3 text-white font-bold'>
            Message
          </button>
        </div>
      </div>
      {/* <div className='border col-span-12 p-3'>
        <div className='owner'>Owner {ad.user.name.split(' ')[0]}</div>
        <div className='listing flex gap-2 items-center'>
          <Icon icon='formkit:list' /> {ad.user.Ad.length} listing
        </div>

        <button className='w-full bg-primary mt-4 rounded text-white py-2'>
          Message
        </button>
      </div> */}
    </div>
  );
};

export const Title = ({ ad }: Props) => {
  return (
    <div className='mx-auto'>
      <div className='flex justify-between mb-4 items-center'>
        <h1 className='font-bold my-4'>{ad.title}</h1>
        <p className='font-bold text-2xl text-green-600'>${ad.price}</p>
      </div>
    </div>
  );
};

export const ImageContainer = ({ ad }: Props) => {
  return (
    <>
      {/* <div className='lg:grid lg:grid-cols-8 gap-2'>
        <div className='col-span-2'>
          <HeroImage
            images={ad.images}
            title={ad.title}
            className='w-full h-[18rem] mx-auto'
          />
        </div>
        <div className='col-span-2 flex flex-row lg:flex-col gap-2'>
          {ad.images
            .filter((image: any) => {
              if (!image.hero) {
                return image;
              }
            })
            .slice(0, 2)
            .map((image: any, id: number) => {
              return (
                <div className='border p-2'>
                  <img
                    key={id}
                    className='w-[10rem] h-[8rem]  mx-auto mb-2 col-span-3'
                    src={image.url}
                    alt=''
                  />
                </div>
              );
            })}
        </div>
      </div> */}

      {/* <div className='lg:hidden bg-gray-100'>
        <HeroImage images={ad.images} title={ad.title} className='w-full' />
        <ImageView images={ad.images} />
      </div> */}
      {/* <div className='bg-gray-200 max-w-[50rem] pl-4 mx-auto lg:grid lg:grid-cols-4'>
        <HeroImage
          images={ad.images}
          title={ad.title}
          className='w-full h-[34rem] py-4 mx-auto col-span-3'
        />
        <div className='flex flex-col gap-4 py-4 '>
            {ad.images
              .filter((image: any) => {
                if (!image.hero) {
                  return image;
                }
              })
              .slice(0, 2)
              .map((image: any, id: number) => {
                return (
                  <img
                    key={id}
                    className='w-[10rem] h-[10rem] mx-auto col-span-3'
                    src={image.url}
                    alt=''
                  />
                );
              })}
          </div>
      </div> */}
    </>
  );
};

export const Description = ({ ad }: Props) => {
  const [viewMore, setViewMore] = useState(false);

  const handleToggle = () => setViewMore(!viewMore);

  return (
    <div className='mx-auto my-4 '>
      <h2 className='font-bold text-lg mb-2'>Description</h2>
      <div className='relative'>
        {ad.description.length > 400 ? (
          <>
            {viewMore ? (
              <RenderHTML content={`${ad.description}`} />
            ) : (
              <>
                <RenderHTML content={`${ad.description.slice(0, 400)}`} />
                <div
                  onClick={handleToggle}
                  className='bg-white cursor-pointer opacity-90 flex items-center justify-center  w-full left-0 absolute h-20 bottom-0'
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

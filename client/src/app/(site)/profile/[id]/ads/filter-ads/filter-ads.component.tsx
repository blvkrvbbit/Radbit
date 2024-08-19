'use client';

import { CustomCardList } from '@/app/components/card-list/card-list.component';
import Ad from '@/app/types/ad.type';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useState, MouseEvent } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  ads: Ad[];
};

/**
 * TODO: Create a reusable pagination for places without much data incoming
 * FIXME: Fix the type error, and replace any with correct typing.
 */
const FilterAds = ({ ads }: Props) => {
  const { data: session } = useSession();

  const router = useRouter();
  const [filteredAds, setFilteredAds] = useState(ads);
  const [pages, setPages] = useState<any>([]);
  const [page, setPage] = useState<number>(0);
  // TODO: Add more filters not just by titles
  const pageLimit = 6;

  useEffect(() => {
    // If ads was updated by delete, creation which triggered a router refresh
    // updated filtered ads with new information
    setFilteredAds(ads);
  }, [ads]);

  useEffect(() => {
    let adsArr: any = [];
    let position = 0;
    for (let i = 0; i < filteredAds.length; i++) {
      if (i % pageLimit === 0) {
        // Create a new array if max is reached or if no array present
        adsArr.push([]);
      }

      if (i > 1 && i % pageLimit === 0) {
        position++;
      }
      adsArr[position].push(filteredAds[i]);
    }
    setPages(adsArr);
  }, [filteredAds]);

  useEffect(() => {
    if (page > 0 && page + 1 > pages.length) {
      setPage(page - 1);
    }
  }, [ads, page, pages]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const filtered = ads.filter((ad: Ad) => {
      if (ad.title.toLowerCase().includes(value.toLowerCase())) {
        return ad;
      }
    });

    setFilteredAds(filtered);
    if (value === '') {
      setFilteredAds(ads);
    }
  };

  const incrementPage = () => {
    if (page < pages.length - 1) {
      setPage(page + 1);
    }
  };

  const decrementPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  return (
    <>
      <div className='flex justify-between items-start'>
        <h1 className='text-2xl'>My Ads</h1>
        <div className='flex justify-end mb-4'>
          <input
            onChange={handleChange}
            className='border p-2 shadow-lg'
            name='filter'
            type='text'
            placeholder='Search'
          />
        </div>
      </div>
      {/* TODO: Add Pagination */}
      {ads.length > 0 && (
        <div className='flex justify-end mb-4 gap-2 items-center'>
          <div className='mr-[1rem] text-gray-400'>
            Page {`${page + 1} of ${pages.length}`}
          </div>
          <button
            className=' border-primary border-[0.05rem] px-4 py-1'
            onClick={decrementPage}
          >
            <Icon className='text-primary' icon='mdi:chevron-left' />
          </button>
          <button
            className='border-primary border-[0.05rem] px-4 py-1'
            onClick={incrementPage}
          >
            <Icon className='text-primary' icon='mdi:chevron-right' />
          </button>
        </div>
      )}
      {ads.length === 0 ? (
        <div
          className={twMerge(
            'flex flex-col justify-center items-center',
            'w-full  border  h-[11.5rem] text-2xl shadow-lg'
          )}
        >
          <div>No Ads Posted.</div>
          <Link href='/ads/create'>
            <button className=' border border-primary text-primary  text-base mt-8 px-4 py-2 rounded-full'>
              Create Ad
            </button>
          </Link>
        </div>
      ) : (
        <CustomCardList ads={pages[page]} />
      )}
    </>
  );
};

export default FilterAds;

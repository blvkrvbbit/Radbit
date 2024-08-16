import Image from 'next/image';
import Link from 'next/link';
import HeroImage from '../components/hero-image/hero-image.component';

import formatCategoryUrl from '../utils/format-categories';
import CategoryNav from '../components/category-nav/category-nav.component';
import Ad from '../types/ad.type';

// TODO: fix Redirect to ads page

const HomePage = async () => {
  const response = await fetch(`${process.env.NEXT_URL}/api/ads`, {
    cache: 'no-store',
  });
  const ads = await response.json();

  return (
    <main>
      <div className='container mt-8'>
        <CategoryNav />
        <div className='latest'>
          <h1 className='mb-4 text-3xl'>Latest Listings</h1>

          <div className='grid grid-cols-12 gap-4'>
            {ads &&
              ads.map((ad: Ad, key: number) => {
                return (
                  <Link
                    href={`/ads/${ad.id}`}
                    className='col-span-12 lg:col-span-4 border p-4 flex gap-4'
                    key={key}
                  >
                    <HeroImage images={ad.images} title={ad.title} />
                    <div>
                      <div className='flex justify-between w-full items-center'>
                        <h3>{ad.title.slice(0, 20)}...</h3>
                        <div className='text-green-600 font-bold text-lg'>
                          ${ad.price}
                        </div>
                      </div>
                      <p className='mt-4'>{ad.description.slice(0, 40)}...</p>
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;

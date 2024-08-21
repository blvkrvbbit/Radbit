import Link from 'next/link';

import { twMerge } from 'tailwind-merge';
import Navigation from './navigation/navigation.component';

const CategoryNav = async () => {
  const response = await fetch(`${process.env.NEXT_URL}/api/ads/category`);
  const categories = await response.json();

  return (
    <div className='border-b shadow-sm py-8 md:py-12'>
      <div className='container'>
        <h1 className='mb-4 font-bold tracking-wide text-4xl'>
          Free Classified Ads
        </h1>
        <div className='flex gap-4  flex-wrap'>
          <Navigation categories={categories} />
        </div>
      </div>
      {/* <Nav categories={categories} /> */}
    </div>
  );
};

export default CategoryNav;

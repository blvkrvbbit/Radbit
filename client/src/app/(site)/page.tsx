import CategoryNav from '../components/category-nav/category-nav.component';

import CardList from '../components/card-list/card-list.component';
// TODO: fix Redirect to ads page
import Image from 'next/image';
import CategoryGrid from '../components/category-grid/category-grid.component';

const HomePage = async () => {
  const response = await fetch(`${process.env.NEXT_URL}/api/ads`, {
    cache: 'no-store',
  });
  const ads = await response.json();

  return (
    <main>
      <CategoryNav />
      <div className='container mt-8'>
        {/* TODO: Create pagination that utilizes prisma */}
        <div className='latest pb-4'>
          <h1 className='mb-4 text-xl border-b border-primary pb-2 inline-block'>
            Latest Listings
          </h1>

          <CardList ads={ads.slice(0, 6)} />
        </div>
        <div className='bg-gray-200/40 border-primary border text-center py-8 mt-8 mb-12'>
          <h2 className='text-2xl text-black mb-4 uppercase font-bold'>
            Welcome to R<span className='text-primary'>ad</span>bit
          </h2>
          <p className='text-black'>Let&apos;s help you get started</p>

          <div className='flex justify-center gap-2 mt-4'>
            <button className='border-primary border text-primary rounded-full w-[10rem] mt-4 px-4 py-2'>
              Register
            </button>
            <button className='bg-primary text-white rounded-full w-[10rem] mt-4 px-4 py-2'>
              Login
            </button>
          </div>
        </div>

        <CategoryGrid />
      </div>
    </main>
  );
};

const CategoryGridItems = [
  {
    name: 'Buy & Sell',
    imageURL:
      'https://res.cloudinary.com/rvbbit-cloud/image/upload/v1724192485/buy-and-sell-bg_jy3om4.jpg',
  },
  {
    name: 'Cars & Vehicles',
    imageURL:
      'https://res.cloudinary.com/rvbbit-cloud/image/upload/v1724192258/car-and-vehicles-bg_ysjqhp.jpg',
  },
  {
    name: 'Real Estate',
    imageURL:
      'https://res.cloudinary.com/rvbbit-cloud/image/upload/v1724191968/real-estate-bg_tjm9av.jpg',
  },
  {
    name: 'Jobs',
    imageURL:
      'https://res.cloudinary.com/rvbbit-cloud/image/upload/v1724192956/jobs-bg_ydikio.jpg',
  },
  {
    name: 'Services',
    imageURL:
      'https://res.cloudinary.com/rvbbit-cloud/image/upload/v1724193176/services-bg_eu6wov.jpg',
  },
  {
    name: 'Pets',
    imageURL:
      'https://res.cloudinary.com/rvbbit-cloud/image/upload/v1724193271/pets-bg_zd3tgx.jpg',
  },
];
export default HomePage;

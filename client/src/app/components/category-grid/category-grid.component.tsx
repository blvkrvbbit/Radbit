import Image from 'next/image';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

type CategoryItem = {
  name: string;
  imageURL: string;
  link: string;
};

/* 
  TODO: Make this programmatically 
  Attach to categories in database with an image url
  then loop through printing out each category
*/

const CategoryGrid = () => {
  const categoryGridItems = [
    {
      name: 'Buy & Sell',
      imageURL:
        'https://res.cloudinary.com/rvbbit-cloud/image/upload/v1724192485/buy-and-sell-bg_jy3om4.jpg',
      link: '/ads/category/buy-sell',
    },
    {
      name: 'Cars & Vehicles',
      imageURL:
        'https://res.cloudinary.com/rvbbit-cloud/image/upload/v1724192258/car-and-vehicles-bg_ysjqhp.jpg',
      link: '/ads/category/cars-vehicles',
    },
    {
      name: 'Real Estate',
      imageURL:
        'https://res.cloudinary.com/rvbbit-cloud/image/upload/v1724191968/real-estate-bg_tjm9av.jpg',
      link: '/ads/category/real-estate',
    },
    {
      name: 'Jobs',
      imageURL:
        'https://res.cloudinary.com/rvbbit-cloud/image/upload/v1724192956/jobs-bg_ydikio.jpg',
      link: '/ads/category/jobs',
    },
    {
      name: 'Services',
      imageURL:
        'https://res.cloudinary.com/rvbbit-cloud/image/upload/v1724193176/services-bg_eu6wov.jpg',
      link: '/ads/category/services',
    },
    {
      name: 'Pets',
      imageURL:
        'https://res.cloudinary.com/rvbbit-cloud/image/upload/v1724193271/pets-bg_zd3tgx.jpg',
      link: '/ads/category/pets',
    },
  ];

  return (
    <div>
      <h3 className='mb-4 font-semibold text-lg'>Popular Categories</h3>
      <div className='hidden  md:grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {categoryGridItems.map((item: CategoryItem) => (
          <Link
            href={item.link}
            className='w-full relative  h-[15rem]  flex justify-center items-center'
          >
            <div className='z-10 text-white bg-black/40 w-[80%] text-center p-4 text-[2rem]'>
              {item.name}
            </div>

            <Image
              alt='An image of a person sitting in a mercedes'
              src={item.imageURL}
              className='rounded-md shadow-lg'
              layout='fill'
            />
          </Link>
        ))}
      </div>
      <div
        className={twMerge(
          'flex snap-x snap-mandatory gap-8 h-[20rem] no-scrollbar w-full mx:auto overflow-scroll',
          'md:hidden'
        )}
      >
        {categoryGridItems.map((item: CategoryItem) => (
          <Link
            href={item.link}
            className='w-full relative  h-[15rem]   justify-center items-center snap-start shrink-0  m-2  grid place-items-center'
          >
            <div className='z-10 text-white bg-black/40 w-[20rem] text-center p-4 text-[2rem]'>
              {item.name}
            </div>

            <Image
              alt='An image of a person sitting in a mercedes'
              src={item.imageURL}
              className='rounded-md shadow-lg'
              layout='fill'
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;

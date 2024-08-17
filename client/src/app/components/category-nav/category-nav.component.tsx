import formatCategoryUrl from '@/app/utils/format-categories';
import Link from 'next/link';

const CategoryNav = async () => {
  const categoryResponse = await fetch(
    `${process.env.NEXT_URL}/api/ads/category`
  );
  // Todo map over categories and include the ads listed under
  const categories = await categoryResponse.json();
  return (
    <div>
      <h1 className='text-3xl mb-4'>Free Classified Ads</h1>
      <div className='flex gap-4 mb-12 flex-wrap'>
        <Link
          className='hover:bg-gray-400/20 px-3 py-1 rounded-full'
          href={`/`}
        >
          Latest Listings
        </Link>
        {categories &&
          categories.map((category: any, id: any) => {
            return (
              <Link
                href={`/ads/category/${formatCategoryUrl(
                  category.name
                ).toLowerCase()}`}
                className='hover:bg-gray-400/20 px-3 py-1 rounded-full'
                key={id}
              >
                {category.name}
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default CategoryNav;

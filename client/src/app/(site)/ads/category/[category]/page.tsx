import CategoryNav from '@/app/components/category-nav/category-nav.component';
import HeroImage from '@/app/components/hero-image/hero-image.component';
import Ad from '@/app/types/ad.type';
import formatCategoryUrl, {
  formatCategory,
} from '@/app/utils/format-categories';
import Link from 'next/link';

const CategoryPage = async ({ params }: { params: { category: string } }) => {
  const categoryResponse = await fetch(
    `${process.env.NEXT_URL}/api/ads/category/${params.category}`,
    {
      cache: 'no-store',
    }
  );
  // Todo map over categories and include the ads listed under
  const categories = await categoryResponse.json();

  return (
    <div className='container mt-8'>
      <CategoryNav />
      <div>
        <h1 className='mb-4 text-3xl'>{formatCategory(params.category)}</h1>
        <div className='grid grid-cols-12 gap-4'>
          {categories.ads &&
            categories.ads.map((ad: Ad, key: number) => {
              return (
                <Link
                  href={`/ads/${ad.id}`}
                  className='col-span-4 border p-4 flex gap-4'
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
          {/* {ads &&
            ads.map((ad: Ad, key: number) => {
              return (
                <Link
                  href={`/ads/${ad.id}`}
                  className='col-span-4 border p-4 flex gap-4'
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
            })} */}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;

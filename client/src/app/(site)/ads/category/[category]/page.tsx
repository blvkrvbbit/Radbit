import CardList from '@/app/components/card-list/card-list.component';
import CategoryNav from '@/app/components/category-nav/category-nav.component';
import HeroImage from '@/app/components/hero-image/hero-image.component';
import RenderHTML from '@/app/components/render-html/render-html';
import Ad from '@/app/types/ad.type';
import { formatCategory } from '@/app/utils/format-categories';
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
    <main>
      <CategoryNav />
      <div className='container mt-8'>
        <div>
          <h1 className='mb-4 text-3xl'>{formatCategory(params.category)}</h1>
          <CardList ads={categories.ads} />
        </div>
      </div>
    </main>
  );
};

export default CategoryPage;

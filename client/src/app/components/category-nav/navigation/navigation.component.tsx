'use client';
import formatCategoryUrl from '@/app/utils/format-categories';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { usePathname } from 'next/navigation';

type Props = {
  categories: {
    id: number;
    name: string;
  }[];
};

const Navigation = ({ categories }: Props) => {
  const pathname = usePathname();
  return (
    <div className='flex gap-4 flex-wrap'>
      <Link className='hover:bg-gray-400/20 px-3 py-1 rounded-full' href={`/`}>
        Latest Listings
      </Link>
      {categories &&
        categories.map((category: any, id: any) => {
          return (
            <Link
              href={`/ads/category/${formatCategoryUrl(
                category.name
              ).toLowerCase()}`}
              className={twMerge('hover:bg-gray-400/20 px-3 py-1 rounded-full')}
              key={id}
            >
              {category.name}
            </Link>
          );
        })}
    </div>
  );
};

export default Navigation;

import CategoryNav from '../components/category-nav/category-nav.component';

import CardList from '../components/card-list/card-list.component';
// TODO: fix Redirect to ads page

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
      </div>
    </main>
  );
};

export default HomePage;

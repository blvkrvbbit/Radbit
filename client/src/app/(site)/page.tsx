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
      <div className='container mt-8'>
        <CategoryNav />
        <div className='latest'>
          <h1 className='mb-4 text-3xl'>Latest Listings</h1>
          <CardList ads={ads.slice(0, 6)} />
        </div>
      </div>
    </main>
  );
};

export default HomePage;

import Protected from '@/app/components/protected/protected.component';
import AdForm from '../form/ad-form.component';
import { useSession } from 'next-auth/react';

const CreateAdPage = async () => {
  const response = await fetch(`${process.env.NEXT_URL}/api/ads/category`);
  const categories = await response.json();
  console.log(categories);
  return (
    <Protected>
      <div className='container'>
        <AdForm categories={categories} />
      </div>
    </Protected>
  );
};

export default CreateAdPage;

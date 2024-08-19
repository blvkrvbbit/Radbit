import Protected from '@/app/components/protected/protected.component';
import ProfileLayout from '../profile-layout/profile-layout.component';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../../../lib/auth-options';
import CardList, {
  CustomCardList,
} from '@/app/components/card-list/card-list.component';
import FilterAds from './filter-ads/filter-ads.component';

const MyAdsPage = async () => {
  const session = await getServerSession(authOptions);
  const response = await fetch(
    `${process.env.NEXT_URL}/api/ads/user/${session?.user.id}`,
    {
      cache: 'no-store',
    }
  );
  const ads = await response.json();

  return (
    <Protected>
      <ProfileLayout>
        <FilterAds ads={ads} />
      </ProfileLayout>
    </Protected>
  );
};

export default MyAdsPage;

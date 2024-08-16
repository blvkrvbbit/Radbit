import Protected from '@/app/components/protected/protected.component';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { authOptions } from '../../../../../lib/auth-options';
import ProfileLayout from './profile-layout/profile-layout.component';

const ProfilePage = async () => {
  const session = await getServerSession(authOptions);
  return (
    <Protected>
      <ProfileLayout>
        <h1 className='text-2xl'>Welcome, {session?.user.name}</h1>
      </ProfileLayout>
    </Protected>
  );
};

export default ProfilePage;

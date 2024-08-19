import Protected from '@/app/components/protected/protected.component';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { authOptions } from '../../../../../../lib/auth-options';
import ProfileLayout from '../profile-layout/profile-layout.component';
import EditProfileForm from './edit-profile-form/edit-profile-form.component';

const EditProfilePage = async () => {
  const session = await getServerSession(authOptions);
  const response = await fetch(
    `${process.env.NEXT_URL}/api/user/${session?.user.id}`
  );
  const data = await response.json();

  return (
    <Protected>
      <ProfileLayout>
        <div className='max-w-[500px] mx-auto'>
          <h1 className='text-2xl'>Edit Profile</h1>
          <EditProfileForm user={data} />
        </div>
      </ProfileLayout>
    </Protected>
  );
};

export default EditProfilePage;

import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../../../lib/auth-options';
import Protected from '@/app/components/protected/protected.component';
import ProfileLayout from '../profile-layout/profile-layout.component';

const MessagePage = async () => {
  const session = await getServerSession(authOptions);
  return (
    <Protected>
      <ProfileLayout>
        <h1 className='text-2xl'>Messages</h1>
      </ProfileLayout>
    </Protected>
  );
};

export default MessagePage;

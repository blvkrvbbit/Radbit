'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const ProfileLayout = ({ children }: Props) => {
  const { data: session } = useSession();
  return (
    <div className='container grid grid-cols-12 mt-8 gap-8'>
      <div className='col-span-12 h-[9rem] lg:col-start-3 lg:col-span-2 p-4 flex flex-col space-y-4 border'>
        <Link href={`/profile/${session?.user.id}/`}>Home</Link>
        <Link href={`/profile/${session?.user.id}/edit-profile`}>
          Edit Profile
        </Link>
        <Link href={`/profile/${session?.user.id}/ads`}>My Ads</Link>
      </div>
      <div className='col-span-12 lg:col-span-5'>{children}</div>
    </div>
  );
};

export default ProfileLayout;

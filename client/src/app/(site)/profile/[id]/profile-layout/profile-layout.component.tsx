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
    <div className='container grid grid-cols-12   mt-12 gap-8'>
      <div className='hidden md:flex p-4 col-span-2  flex-col h-[15rem] space-y-4 border'>
        <Link href={`/profile/${session?.user.id}/`}>Home</Link>
        <Link href={`/profile/${session?.user.id}/edit-profile`}>
          Edit Profile
        </Link>
        <Link href={`/profile/${session?.user.id}/ads`}>My Ads</Link>
      </div>
      <div className='col-span-12 md:col-span-10'>{children}</div>
    </div>
  );
};

export default ProfileLayout;

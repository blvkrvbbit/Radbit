'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { ReactNode } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
type Props = {
  children: ReactNode;
};

const ProfileLayout = ({ children }: Props) => {
  const { data: session } = useSession();
  return (
    <div className='container grid grid-cols-12   mt-12 gap-8'>
      <div className='hidden shadow-lg md:flex p-4 col-span-2  flex-col h-[15rem] space-y-4 border'>
        <Link
          className='flex items-center space-x-4'
          href={`/profile/${session?.user.id}/`}
        >
          <Icon icon='ph:house-fill' fontSize={20} />
          <div>Home</div>
        </Link>
        <Link
          className='flex items-center space-x-4'
          href={`/profile/${session?.user.id}/edit-profile`}
        >
          <Icon icon='ph:user-fill' fontSize={20} />
          <div>Edit Profile</div>
        </Link>
        <Link
          className='flex items-center space-x-4'
          href={`/profile/${session?.user.id}/ads`}
        >
          <Icon icon='ph:list-magnifying-glass-fill' />
          <div>My Ads</div>
        </Link>
        <Link
          className='flex items-center space-x-4'
          href={`/profile/${session?.user.id}/messages`}
        >
          <Icon icon='ph:messenger-logo-fill' />
          <div>Messages</div>
        </Link>
      </div>
      <div className='col-span-12 md:col-span-10'>{children}</div>
    </div>
  );
};

export default ProfileLayout;

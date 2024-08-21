'use client';
import { Icon } from '@iconify/react/dist/iconify.js';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

const Navbar = () => {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const handleLogOut = () => {
    signOut();
    setMenuOpen(!menuOpen);
  };
  const toggleMenu = () => setMenuOpen(!menuOpen);
  return (
    <>
      <header className='h-16 border-b shadow-sm flex items-center relative py-4'>
        <div className='container flex items-center justify-between'>
          <Link href='/' className='brand text-2xl'>
            R<span className='font-bold text-primary'>ad</span>bit
          </Link>
          <div className='flex gap-4 items-center'>
            {session ? (
              <div className='md:relative flex items-center gap-4'>
                <div
                  onClick={toggleMenu}
                  className='bg-gray-200 cursor-pointer p-2.5 w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold'
                >
                  {session.user.name.slice(0, 1)}
                </div>
                {menuOpen && (
                  <div
                    className={twMerge(
                      'absolute max-w-[100%-32px] text-right rounded left-4 right-4 mx-auto bg-white z-10 border top-20',
                      'md:w-[200px] md:left-[-55px]  md:top-[3.3rem]',
                      'lg:text-sm'
                    )}
                  >
                    <Link
                      onClick={toggleMenu}
                      className='block hover:bg-gray-200/80 p-2 py-3  px-4'
                      href={`/profile/${session.user.id}`}
                    >
                      Profile
                    </Link>
                    <Link
                      onClick={toggleMenu}
                      className='flex items-center justify-end gap-4 hover:bg-gray-200/80 p-2 py-3  px-4'
                      href={`/profile/${session.user.id}/ads`}
                    >
                      My Ads
                    </Link>
                    <Link
                      onClick={toggleMenu}
                      className='flex items-center justify-end gap-4 hover:bg-gray-200/80 p-2 py-3  px-4'
                      href={`/profile/${session.user.id}/messages`}
                    >
                      Messages
                    </Link>
                    <div
                      className='flex items-center justify-end gap-2  hover:bg-gray-200/80 p-2 py-3  px-4 cursor-pointer'
                      onClick={handleLogOut}
                    >
                      <Icon
                        className='text-primary'
                        fontSize={18}
                        icon='uis:signout'
                      />{' '}
                      Sign Out
                    </div>
                  </div>
                )}
                <Link
                  onClick={() => {
                    menuOpen ? toggleMenu() : null;
                  }}
                  className='border border-primary text-primary rounded-full hover:bg-primary hover:text-white px-4 py-2'
                  href='/ads/create'
                >
                  Post Ad
                </Link>
              </div>
            ) : (
              <>
                <Link href='/auth/register'>Register</Link>
                <Link
                  className='border border-primary text-primary rounded-full hover:bg-primary hover:text-white px-4 py-2'
                  href='/auth/login'
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
        {/* <div className='container flex items-center justify-between'>
          <Link href='/' className='brand font-bold text-2xl'>
            Radbit
          </Link>
          <div className='flex gap-4 items-center'>
            {session ? (
              <>
                <div
                  onClick={toggleMenu}
                  className='bg-gray-200 cursor-pointer p-2.5 rounded-full text-sm font-bold'
                >
                  JM
                </div>
                {menuOpen && (
                  <div className='absolute space-y-2 border p-3 w-[8rem] top-[4.5rem] rounded  bg-white'>
                    <Link
                      onClick={toggleMenu}
                      className='block'
                      href={`/profile/${session.user.id}`}
                    >
                      My Profile
                    </Link>
                    <Link
                      onClick={toggleMenu}
                      className='block'
                      href={`/profile/${session.user.id}/ads`}
                    >
                      My Ads
                    </Link>
                    <div className='cursor-pointer ' onClick={handleLogOut}>
                      Sign Out
                    </div>
                  </div>
                )}
              </>
            ) : (
              <Link href='/auth/register'>Register</Link>
            )}
            <Link
              onClick={() => {
                menuOpen ? toggleMenu() : null;
              }}
              className='border border-primary text-primary rounded-full hover:bg-primary hover:text-white px-4 py-2'
              href='/ads/create'
            >
              Post Ad
            </Link>
          </div>
        </div> */}
      </header>
    </>
  );
};

export default Navbar;

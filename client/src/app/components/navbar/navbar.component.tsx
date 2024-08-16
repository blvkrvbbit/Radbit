'use client';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';

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
      <header className='h-16 border-b flex items-center relative'>
        <div className='container flex items-center justify-between'>
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
                  <div className='absolute space-y-2 border p-3 w-[8rem] top-[4.5rem] rounded'>
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
              // <div
              //   className='hover:bg-gray-400/10 py-2 pl-4 cursor-pointer'
              //   onClick={handleLogOut}
              // >
              //   Sign out
              // </div>
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
        </div>
      </header>
    </>
  );
};

export default Navbar;

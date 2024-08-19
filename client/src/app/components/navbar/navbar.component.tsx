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
      <header className='h-16 border-b shadow-sm flex items-center relative py-4'>
        <div className='container flex items-center justify-between'>
          <Link href='/' className='brand text-2xl'>
            R<span className='font-bold text-primary'>ad</span>bit
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
                    <Link
                      onClick={toggleMenu}
                      className='block'
                      href={`/profile/${session.user.id}/messages`}
                    >
                      Messages
                    </Link>
                    <div className='cursor-pointer ' onClick={handleLogOut}>
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
              </>
            ) : (
              <>
                <Link href='/auth/register'>Register</Link>
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

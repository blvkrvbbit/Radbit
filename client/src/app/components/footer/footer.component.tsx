import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

// TODO: Finish building out footer and clearing up white space
// Find dribble shots, or something for inspiration.
const Footer = () => {
  return (
    <footer className='mt-auto py-4 bg-gray-200/40 text-black border-t'>
      <div className='container'>
        <div
          className={twMerge(
            'grid grid-cols-1 gap-8',
            'md:grid-cols-4',
            'lg:grid-cols-5'
          )}
        >
          <div>
            <h3 className='uppercase font-semibold mb-4'>Radbit</h3>
            <ul className='space-y-4'>
              <li>
                <Link href='/about'>About</Link>
              </li>
              <li>
                <Link href='/join-us'>Join Us</Link>
              </li>
              <li>
                <Link href='/advertise-on-radbit'>Advertise With Us</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className='uppercase font-semibold mb-4'>Explore</h3>
            <ul className='space-y-4'>
              <li>
                <Link href='/ads/category/buy-sell'>Buy & Sell</Link>
              </li>
              <li>
                <Link href='/ads/category/cars-vehicles'>Cars & Vehicles</Link>
              </li>
              <li>
                <Link href='/ads/category/real-estate'>Real Estate</Link>
              </li>
              <li>
                <Link href='/ads/category/jobs'>Jobs</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className='uppercase font-semibold mb-4'>Support</h3>
            <ul className='space-y-4'>
              <li>
                <Link href='/help'>Help</Link>
              </li>
            </ul>
          </div>
        </div>
        {/* <div className='mb-4'>
          <div className='inline-block pb-2 font-bold'>Categories</div>
          <div className='flex space-x-4 md:space-x-8'>
            <div className='flex flex-col mt-4 space-y-2'>
              <Link href='/'>Latest Listings</Link>
              <Link href='/ads/category/buy-sell'>Buy & Sell</Link>
              <Link href='/ads/category/cars-vehicles'>Cars & Vehicles</Link>
              <Link href='/ads/category/real-estate'>Real Estate</Link>
            </div>
            <div className='flex flex-col mt-4 space-y-2'>
              <Link href='/ads/category/jobs'>Jobs</Link>
              <Link href='/ads/category/services'>Servies</Link>
              <Link href='/ads/category/pets'>Pets</Link>
              <Link href='/ads/category/community'>Community</Link>
            </div>
            <div className='flex flex-col mt-4 space-y-2'>
              <Link href='/vacation-rentals'>Vacation Rentals</Link>
            </div>
          </div>
        </div> */}
        <small className='text-white'>&copy; Radbit 2024</small>
      </div>
    </footer>
  );
};

export default Footer;

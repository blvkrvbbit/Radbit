import Link from 'next/link';

// TODO: Finish building out footer and clearing up white space
// Find dribble shots, or something for inspiration.
const Footer = () => {
  return (
    <footer className='mt-auto py-4 text-black'>
      <div className='container'>
        <div className='mb-4'>
          <div className='inline-block pb-2 font-bold'>Categories</div>
          <div className='flex space-x-4 md:space-x-8'>
            <div className='flex flex-col mt-4 space-y-2'>
              <Link href='/'>Latest Listings</Link>
              <Link href='/buy-sell'>Buy & Sell</Link>
              <Link href='/cars-vehicles'>Cars & Vehicles</Link>
              <Link href='/real-estate'>Real Estate</Link>
            </div>
            <div className='flex flex-col mt-4 space-y-2'>
              <Link href='/jobs'>Jobs</Link>
              <Link href='/services'>Servies</Link>
              <Link href='/pets'>Pets</Link>
              <Link href='/community'>Community</Link>
            </div>
            <div className='flex flex-col mt-4 space-y-2'>
              <Link href='/vacation-rentals'>Vacation Rentals</Link>
            </div>
          </div>
        </div>
        <small className='text-white'>&copy; Radbit 2024</small>
      </div>
    </footer>
  );
};

export default Footer;

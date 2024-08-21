import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import Navbar from '../components/navbar/navbar.component';
import SessionWrapper from '../components/session-wrapper/session-wrapper.component';
import Link from 'next/link';
import Footer from '../components/footer/footer.component';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title:
    'Radbit - Free Classified Ads for Homes, Vehicles, Rentals & More in Canada & the US',
  description:
    'Post and browse free classified ads on Radbit. Find homes, vehicles, apartments for rent, electronics, and more across Canada and the US. Simple, easy, and completely free!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <html className='h-full' lang='en'>
        <body className={`h-full ${inter.className}`}>
          <div className='flex flex-col h-full'>
            <Navbar />
            <div className='mb-12'>{children}</div>
            <Footer />
          </div>
        </body>
      </html>
    </SessionWrapper>
  );
}

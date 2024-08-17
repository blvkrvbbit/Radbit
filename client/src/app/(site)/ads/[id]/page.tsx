import HeroImage from '@/app/components/hero-image/hero-image.component';
import ImageView from '@/app/components/image-view/image-view.component';
import Image from 'next/image';
import RenderHTML from '@/app/components/render-html/render-html';

const AdPage = async ({ params }: { params: { id: number } }) => {
  const response = await fetch(`${process.env.NEXT_URL}/api/ads/${params.id}`, {
    cache: 'no-store',
  });
  const ad = await response.json();

  return (
    <div className='container mt-8'>
      <div className='max-w-[50rem] mx-auto'>
        <h1 className='font-bold my-4'>{ad.title}</h1>
        <div className='flex justify-between mb-4 items-center'>
          <p>{ad.user.city}</p>
          <p className='font-bold text-2xl text-green-600'>${ad.price}</p>
        </div>
      </div>
      {/* Mobile View */}
      <div className='lg:hidden bg-gray-100'>
        <HeroImage images={ad.images} title={ad.title} className='w-full' />
        <ImageView images={ad.images} />
      </div>
      <div className='hidden bg-gray-200 max-w-[50rem] pl-4 mx-auto lg:grid lg:grid-cols-4'>
        <HeroImage
          images={ad.images}
          title={ad.title}
          className='w-full h-[34rem] py-4 mx-auto col-span-3'
        />

        <div className='flex flex-col gap-4 py-4 '>
          {ad.images
            .filter((image: any) => {
              if (!image.hero) {
                console.log(image);
                return image;
              }
            })
            .slice(0, 2)
            .map((image: any, id: number) => {
              return (
                <img
                  key={id}
                  className='w-[10rem] h-[10rem] mx-auto col-span-3'
                  src={image.url}
                  alt=''
                />
              );
            })}
        </div>
      </div>
      <div className='max-w-[50rem] mx-auto my-4 '>
        <h2 className='font-bold text-lg mb-2'>Description</h2>
        <RenderHTML content={ad.description} />
      </div>
    </div>
  );
};

export default AdPage;

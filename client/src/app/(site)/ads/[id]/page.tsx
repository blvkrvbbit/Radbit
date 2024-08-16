import Image from 'next/image';

const AdPage = async ({ params }: { params: { id: number } }) => {
  const response = await fetch(`${process.env.NEXT_URL}/api/ads/${params.id}`, {
    cache: 'no-store',
  });
  const ad = await response.json();

  return (
    <div className='container mt-8'>
      <div className='max-w-[50rem] mx-auto'>
        <h1 className='font-bold my-4'>{ad.title}</h1>
        <div className='flex justify-between mb-4'>
          <p>{ad.user.city}</p>
          <p>${ad.price}</p>
        </div>
      </div>
      {/* 
      
        TODO: 
        Create ability to have a hero image
        check image length to determine if portrait or if landscape
      */}
      <div className='lg:hidden bg-gray-100'>
        <Image
          src={ad.images[0].url}
          // width={20}
          // height={20}
          alt={`image of the ${ad.title}`}
          className='mx-auto'
          width={0}
          height={0}
          sizes='100vw'
          style={{ width: 'auto', height: '20rem' }}
        />
        <div className='grid grid-cols-3 mt-2 gap-4'>
          {ad.images.map((image, id) => (
            <Image
              src={image.url}
              key={id}
              alt={`image of the ${ad.title}`}
              width={0}
              height={0}
              sizes='100vw'
              style={{ width: '100%', height: '10rem' }}
            />
          ))}
        </div>
      </div>
      <div className='hidden bg-gray-200 max-w-[50rem] pl-4 mx-auto lg:grid lg:grid-cols-4'>
        <img
          className='w-full h-[34rem] py-4 mx-auto col-span-3'
          src={ad.images[1].url}
          alt=''
        />
        <div className='flex flex-col gap-4 py-4 '>
          <img
            className='w-[10rem] h-[10rem] mx-auto col-span-3'
            src={ad.images[0].url}
            alt=''
          />
          <img
            className='w-[10rem] h-[10rem] mx-auto col-span-3'
            src={ad.images[1].url}
            alt=''
          />
          <img
            className='w-[10rem] h-[10rem] mx-auto col-span-3'
            src={ad.images[2].url}
            alt=''
          />
        </div>
      </div>
      <div className='max-w-[50rem] mx-auto my-4 '>
        <h2 className='font-bold text-lg mb-2'>Description</h2>
        <p>{ad.description}</p>
      </div>
    </div>
  );
};

export default AdPage;

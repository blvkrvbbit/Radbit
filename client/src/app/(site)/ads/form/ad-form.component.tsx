'use client';
import { Controller, useForm } from 'react-hook-form';
import adFormSchema from './ad-form.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import PreviewImage from './preview-image/preview-image.component';
import { Icon } from '@iconify/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Tiptap from '@/app/components/tiptap/tiptap';
type Props = {
  editing?: boolean;
  categories: {
    id: number;
    name: string;
  }[];
};

const AdForm = ({ editing, categories }: Props) => {
  const { data: session } = useSession();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    control,
    formState: { errors },
  } = useForm<z.infer<typeof adFormSchema>>({
    resolver: zodResolver(adFormSchema),
    defaultValues: {},
  });

  const images = watch('image');
  const [previewImageUrls, setPreviewImageUrls] = useState<any>([]);
  const [heroIndex, setHeroIndex] = useState<number | null>(null);

  const onSubmit = async (values: z.infer<typeof adFormSchema>) => {
    const formData = new FormData();
    let submitValues: any = {
      title: values.title,
      price: values.price,
      description: values.description,
      category: values.category,
      images: [],
    };

    let uploadedImageData = null;

    if (values.image.length > 0) {
      for (let i = 0; i < values.image.length; i++) {
        formData.append('files', values.image[i]);
      }
      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      uploadedImageData = await uploadResponse.json();
      if (heroIndex) {
        uploadedImageData[heroIndex].hero = true;
      }
      submitValues = {
        ...submitValues,
        images: uploadedImageData,
      };
    }

    const response = await fetch('/api/ads', {
      method: 'POST',
      body: JSON.stringify({ ...submitValues }),
    });

    if (response.status === 200) {
      router.push(`/profile/${session?.user.id}`);
      router.refresh();
    }
    const data = await response.json();
  };

  const handleHeroSelect = (e: any) => {
    setHeroIndex(e.target.id);
  };
  useEffect(() => {
    let imageUrlsToSet = [];
    if (images) {
      for (let i = 0; i < images.length; i++) {
        imageUrlsToSet.push(URL.createObjectURL(images[i]));
      }
    }
    setPreviewImageUrls(imageUrlsToSet);
  }, [images]);

  return (
    <form
      className='w-full lg:max-w-[800px] mx-auto flex flex-col gap-4 mt-[2rem] pb-8'
      action=''
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className='text-2xl font-medium'>
        {!editing ? 'Create Ad' : 'Edit Ad'}
      </h1>
      <div>
        <select className='border w-full p-2' {...register('category')}>
          <option value=''>Select Category</option>
          {categories.map((c) => {
            return (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <input
          placeholder='Enter a title'
          className='border w-full p-2'
          type='text'
          {...register('title')}
        />
      </div>
      <div>
        <input
          className='border w-full p-2'
          placeholder='Enter price'
          type='number'
          step='0.01'
          {...register('price')}
        />
      </div>
      <div>
        <Controller
          render={({ field }) => (
            <Tiptap description={field.value} onChange={field.onChange} />
          )}
          control={control}
          name='description'
          defaultValue=''
        />
      </div>
      <div className='grid grid-cols-3 gap-4'>
        {previewImageUrls.map((image: string, id: number) => {
          return (
            <div
              className='relative cursor-pointer'
              onClick={handleHeroSelect}
              id={`${id}`}
              key={id}
            >
              <PreviewImage id={`${id}`} key={id} src={image} />
              {heroIndex == id && (
                <div className='absolute flex justify-end top-0 z-10 w-full bg-[#02020A]/60 h-full'>
                  <Icon
                    icon='line-md:star-alt-filled'
                    fontSize={24}
                    className='absolute top-0 z-10 m-2 text-[#0EB1D2]'
                  />
                  <p className='h-full w-full flex items-center justify-center text-white font-bold tracking-wide'>
                    Hero Image
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div>
        <input type='file' {...register('image')} multiple />
      </div>
      <div className='w-full lg:w-1/3 mx-auto mt-4'>
        <button className='bg-primary w-full py-4 text-white mt-2 rounded-full'>
          Create Ad
        </button>
      </div>
    </form>
  );
};

export default AdForm;

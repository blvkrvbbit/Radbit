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
import { twMerge } from 'tailwind-merge';
type Props = {
  editing?: boolean;
  categories: {
    id: number;
    name: string;
    subCategories: {
      id: number;
      name: string;
    };
  }[];
};

const AdForm = ({ editing, categories }: Props) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [subCategories, setSubCategories] = useState<any>(null);
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

  const category = watch('category');

  useEffect(() => {
    // Update sub categories based on watch category
    console.log(category);
    // if (category) {
    //   setSubCategories(categories[Number(category) - 1].subCategories);
    // } else {
    //   setSubCategories(null);
    // }
  }, [category, setSubCategories, categories]);
  console.log(errors);
  const images = watch('image');
  const [previewImageUrls, setPreviewImageUrls] = useState<any>([]);
  const [heroIndex, setHeroIndex] = useState<number | null>(null);
  const [collapseRealEstate, setCollapseRealEstate] = useState<boolean>(false);
  const toggleCollapse = (
    field: boolean,
    formToCollapse: (field: boolean) => void
  ) => {
    formToCollapse(!field);
  };

  const onSubmit = async (values: z.infer<typeof adFormSchema>) => {
    const formData = new FormData();
    let submitValues: any = {
      title: values.title,
      price: values.price,
      description: values.description,
      category: values.category,
      subCategory: values.subCategory,
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
      className={twMerge(
        'w-full  mx-auto  gap-4 mt-[2rem] pb-8 grid grid-cols-12',
        'lg:max-w-[800px]',
        'xl:max-w-[700px]'
      )}
      action=''
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className='text-2xl font-medium col-span-12'>
        {!editing ? 'Create Ad' : 'Edit Ad'}
      </h1>
      <hr className='col-span-12' />
      <div className='col-span-12 md:col-span-6'>
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
      {subCategories && (
        <div className='col-span-12 md:col-span-6'>
          <select className='border w-full p-2' {...register('subCategory')}>
            <option value=''>Select Sub Category</option>
            {subCategories.map((c: { id: number; name: string }) => {
              return (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              );
            })}
          </select>
        </div>
      )}

      <div className='col-span-12'>
        <input
          placeholder='Enter a title'
          className='border w-full p-2'
          type='text'
          {...register('title')}
        />
      </div>
      {/* {category && categories[Number(category) - 1].name === 'Real Estate' && (
        <div className='col-span-12'>
          <div className='flex justify-between items-center mb-4'>
            <h3>Real Estate Fields</h3>
            <button
              onClick={() =>
                toggleCollapse(collapseRealEstate, setCollapseRealEstate)
              }
              type='button'
            >
              {collapseRealEstate ? 'Open' : 'Collapse'}
            </button>
          </div>
          <div
            className={twMerge(
              'grid grid-cols-12 gap-4',
              collapseRealEstate ? 'hidden' : ''
            )}
          >
            <div className='col-span-12 md:col-span-6'>
              <select className='border w-full p-2'>
                <option value=''>Select building type</option>
                <option value='apartment'>Apartment</option>
                <option value='house'>House</option>
              </select>
            </div>
            <div className='col-span-12 md:col-span-6'>
              <input
                placeholder='How many rooms?'
                className='border w-full p-2'
                type='text'
              />
            </div>
            <label className='block col-span-12' htmlFor=''>
              Utilities
            </label>
            <div className='col-span-12 md:col-span-4'>
              <select className='border w-full p-2'>
                <option value=''>Power included?</option>
                <option value='true'>yes</option>
                <option value='no'>no</option>
              </select>
            </div>
            <div className='col-span-12 md:col-span-4'>
              <select className='border w-full p-2'>
                <option value=''>Hydro included?</option>
                <option value='yes'>yes</option>
                <option value='no'>no</option>
              </select>
            </div>
            <div className='col-span-12 md:col-span-4'>
              <select className='border w-full p-2'>
                <option value=''>Heat included?</option>
                <option value='yes'>yes</option>
                <option value='no'>no</option>
              </select>
            </div>
            <div className='col-span-12 md:col-span-4'>
              <select className='border w-full p-2'>
                <option value=''>Wifi included?</option>
                <option value='yes'>yes</option>
                <option value='no'>no</option>
              </select>
            </div>
          </div>
          <hr className='mt-4' />
        </div>
      )} */}
      <div className='col-span-12'>
        <input
          className='border w-full p-2'
          placeholder='Enter price'
          type='number'
          step='0.01'
          {...register('price')}
        />
      </div>
      <div className='col-span-12'>
        <Controller
          render={({ field }) => (
            <Tiptap description={field.value} onChange={field.onChange} />
          )}
          control={control}
          name='description'
          defaultValue=''
        />
      </div>
      <div className='grid grid-cols-3 gap-4 col-span-12'>
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
      <div className='col-span-12'>
        <input type='file' {...register('image')} multiple />
      </div>
      <div className='w-full lg:w-1/3 mx-auto mt-4 col-span-12'>
        <button className='bg-primary w-full py-4 text-white mt-2 rounded-full'>
          Create Ad
        </button>
      </div>
    </form>
  );
};

export default AdForm;

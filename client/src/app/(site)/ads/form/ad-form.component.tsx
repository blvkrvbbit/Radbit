'use client';
import { Controller, useForm, UseFormRegister } from 'react-hook-form';
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
import Ad from '@/app/types/ad.type';
import FormField from '@/app/components/form-field/form-field.component';
import DeleteImageButton from './delete-image-button/delete-image-button.component';

type Props = {
  editing?: boolean;
  ad?: Ad;
  categories: {
    id: number;
    name: string;
    subCategories: {
      id: number;
      name: string;
    };
  }[];
};

// TODO: Push in default data if editing.
const AdForm = ({ editing, ad, categories }: Props) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [subCategories, setSubCategories] = useState<any>(null);
  const defaultValues = ad
    ? {
        title: ad.title,
        category: ad.categories,
        price: ad.price,
        description: ad.description,
        images: ad.images,
      }
    : {
        title: '',
        category: '',
        price: null,
        subCategory: '',
        description: '',
        images: [],
      };
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm<z.infer<typeof adFormSchema>>({
    resolver: zodResolver(adFormSchema),
    defaultValues: {
      title: ad && ad.title ? ad.title : '',
      category: ad && ad.categories[0] ? String(ad.categories[0].id) : '',
      price: ad && ad.price ? ad.price : 0,
      subCategory: '',
      description: ad && ad.description ? ad.description : '',
      images: ad && ad.images ? ad.images : [],
    },
  });

  const category = watch('category');
  const images = watch('image');
  const [defaultImages, setDefaultImages] = useState<any>([]);
  const [previewImageUrls, setPreviewImageUrls] = useState<any>([]);
  const [heroIndex, setHeroIndex] = useState<number | null>(null);
  console.log(defaultImages);
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

    // Post to upload, and api ads for creation if not editing.
    if (!editing) {
      // CREATING:
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
        router.push(`/profile/${session?.user.id}/ads`);
        router.refresh();
      }
      const data = await response.json();
    } else {
      let uploadedImageData = [];
      let allImages: any = [...defaultImages];
      // EDITING:
      if (values.image.length > 0) {
        for (let i = 0; i < values.image.length; i++) {
          formData.append('files', values.image[i]);
        }
        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        uploadedImageData = await uploadResponse.json();
      }
      if (allImages.length > 0 || uploadedImageData.length > 0) {
        allImages = [...defaultImages, ...uploadedImageData];
      }

      allImages = allImages.map((img: any, i: number) => {
        if (heroIndex == i) {
          return {
            ...img,
            hero: true,
          };
        } else {
          return {
            ...img,
            hero: false,
          };
        }
      });
      // TODO: Add in image editing, and swapping of hero image.
      submitValues = {
        ...submitValues,
        images: [
          allImages.slice(0, defaultImages.length), // default images
          allImages.slice(defaultImages.length, allImages.length), // new images
        ],
      };

      const response = await fetch(`/api/ads/${ad?.id}`, {
        method: 'PUT',
        body: JSON.stringify({ ...submitValues }),
      });

      if (response.status === 200) {
        router.push(`/profile/${session?.user.id}/ads`);
        router.refresh();
      }
    }
  };

  const handleHeroSelect = (e: any) => {
    setHeroIndex(e.target.id);
  };

  useEffect(() => {
    if (ad && ad.images.length > 0) {
      setDefaultImages(ad.images);
    }
  }, [ad]);

  useEffect(() => {
    let imageUrlsToSet = [];
    if (defaultImages) {
      for (let i = 0; i < defaultImages.length; i++) {
        imageUrlsToSet.push(defaultImages[i].url);
      }
    }
    if (images) {
      for (let i = 0; i < images.length; i++) {
        imageUrlsToSet.push(URL.createObjectURL(images[i]));
      }
    }

    setPreviewImageUrls(imageUrlsToSet);
  }, [images, defaultImages]);

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

      <div className='col-span-12'>
        <input
          placeholder='Enter a title'
          className='border w-full p-2'
          type='text'
          {...register('title')}
        />
      </div>
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
              {/* TODO: If default images display hero image*/}
              <PreviewImage id={`${id}`} key={id} src={image} />
              {editing && (
                <DeleteImageButton
                  defaultImages={defaultImages}
                  id={id}
                  setDefaultImages={setDefaultImages}
                  router={router}
                />
              )}

              {heroIndex == id && (
                <div
                  className={twMerge(
                    'absolute flex justify-end top-0 z-10 w-full bg-[#02020A]/60 h-full'
                  )}
                >
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
        <button
          className='bg-primary w-full flex justify-center items-center gap-2 py-4 text-white mt-2 rounded-full'
          disabled={isSubmitting}
        >
          {submitButtonText(editing!, isSubmitting)}
        </button>
      </div>
    </form>
  );
};

const submitButtonText = (editing: boolean, isSubmitting: boolean) => {
  if (!editing && !isSubmitting) {
    return 'Create Ad';
  }

  if (editing && !isSubmitting) {
    return 'Edit Ad';
  }

  if (editing && isSubmitting) {
    return (
      <>
        Editing ad
        <Icon
          fontSize={20}
          className='text-white'
          icon='line-md:loading-alt-loop'
        />
      </>
    );
  }

  if (!editing && isSubmitting) {
    return (
      <>
        Creating ad
        <Icon icon='line-md:loading-alt-loop' />
      </>
    );
  }
};

export default AdForm;

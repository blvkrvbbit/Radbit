'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';
import editProfileFormSchema from './edit-profile-form.schema';
import { User } from '@/app/types/user.type';
import { useEffect, useState } from 'react';
import { provinces, states } from '@/app/utils/provinceState';
type Props = {
  user: User;
};

const EditProfileForm = ({ user }: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm<z.infer<typeof editProfileFormSchema>>({
    resolver: zodResolver(editProfileFormSchema),
    defaultValues: {
      name: user.name || '',
      email: user.email || '',
      password: '',
      country: user.country || '',
      provinceState: user.provinceState || '',
      city: user.city || '',
    },
  });
  const selectedCountry = watch('country');

  const onSubmit = async (values: z.infer<typeof editProfileFormSchema>) => {
    const response = await fetch(`/api/user/${user.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        ...values,
      }),
    });
    const data = await response.json();
  };
  return (
    <form
      className=' flex flex-col gap-4 mt-4'
      action=''
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <input
          className='border w-full p-2'
          type='text'
          placeholder='Full name'
          {...register('name')}
        />
        {errors.name?.message ? <p>{errors.name?.message}</p> : null}
      </div>
      <div>
        <input
          className='border w-full p-2'
          type='text'
          placeholder='Email'
          {...register('email')}
        />
        {errors.email?.message ? <p>{errors.email?.message}</p> : null}
      </div>
      <div>
        <input
          className='border w-full p-2'
          type='password'
          placeholder='Password'
          {...register('password')}
        />
        {errors.password?.message ? <p>{errors.password?.message}</p> : null}
      </div>
      <div>
        <select className='border w-full p-2' {...register('country')}>
          <option value=''></option>

          <option value='Canada'>Canada</option>
          <option value='US'>US</option>
        </select>

        {errors.country?.message ? <p>{errors.country?.message}</p> : null}
      </div>
      {/* TODO depending on country selected display prov or state */}
      <div>
        <select className='border w-full p-2' {...register('provinceState')}>
          <option value=''></option>
          {selectedCountry === 'Canada' &&
            Object.entries(provinces).map(([key, value], i) => {
              return (
                <option key={i} value={key}>
                  {value}
                </option>
              );
            })}
          {selectedCountry === 'US' &&
            Object.entries(states).map(([key, value], i) => {
              return (
                <option key={i} value={key}>
                  {value}
                </option>
              );
            })}
          {/* <option value='Canada'>Canada</option>
          <option value='US'>US</option> */}
        </select>

        {errors.provinceState?.message ? (
          <p>{errors.provinceState?.message}</p>
        ) : null}
      </div>
      <div>
        <input
          className='border w-full p-2'
          type='text'
          placeholder='City'
          {...register('city')}
        />
        {errors.city?.message ? <p>{errors.city?.message}</p> : null}
      </div>
      <button className='bg-[#222222] text-white py-4'>Edit Profile</button>
    </form>
  );
};

export default EditProfileForm;

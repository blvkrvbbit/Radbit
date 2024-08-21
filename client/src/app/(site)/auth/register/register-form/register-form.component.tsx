'use client';
import registerFormSchema from './register-form.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof registerFormSchema>) => {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        ...values,
      }),
    });
    if (response.status === 200) {
      // TODO: Redirect to profile after successful register
    } else {
      // Handle Server Error on client to display to user.
    }
  };

  return (
    <form
      className='border shadow-lg  p-8 rounded-md max-w-[398px] mx-auto flex flex-col gap-4 mt-[4rem]'
      action=''
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className='text-2xl'>Register</h1>
      <hr />
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
      <p>
        Already have an account?{' '}
        <Link className='text-primary underline' href='/auth/login'>
          Login
        </Link>
      </p>
      <button className='bg-primary rounded-full text-white py-4'>
        Register
      </button>
    </form>
  );
};

export default RegisterForm;

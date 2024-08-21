'use client';
import { signIn, useSession } from 'next-auth/react';
import loginFormSchema from './login-form.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
  const { data: session } = useSession();

  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
    const response = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (!response?.error) {
      // Figure out a way to properly handle route changing
      router.refresh();
      // router.push(`/profile/`);
    }
  };

  return (
    <form
      className='border shadow-lg  p-8 rounded-md max-w-[398px] mx-auto flex flex-col gap-4 mt-[4rem]'
      action=''
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className='text-2xl'>Login</h1>
      <hr />
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
        Don&apos;t have an account?{' '}
        <Link className='text-primary underline' href='/auth/register'>
          Register
        </Link>
      </p>
      <button className='bg-primary rounded-full text-white py-4'>Login</button>
    </form>
  );
};

export default LoginForm;

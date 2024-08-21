'use client';
import { signIn, useSession } from 'next-auth/react';
import registerFormSchema from './register-form.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react/dist/iconify.js';

const RegisterForm = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });
  console.log(session?.user);

  const onSubmit = async (values: z.infer<typeof registerFormSchema>) => {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        ...values,
      }),
    });
    if (response.status === 200) {
      const response = await signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: false,
      });
      router.push(`/profile/${session?.user.id}/ads`);
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
      <button
        className='bg-primary rounded-full text-white py-3 flex justify-center items-center'
        disabled={isSubmitting}
      >
        {submitButtonText(isSubmitSuccessful, isSubmitting)}
      </button>
    </form>
  );
};

const submitButtonText = (
  isSubmitSuccessfull: boolean,
  isSubmitting: boolean
) => {
  if (isSubmitSuccessfull) {
    return <>Registered</>;
  }
  if (!isSubmitting) {
    return 'Register';
  }

  if (isSubmitting) {
    return (
      <>
        Registering
        <Icon
          fontSize={28}
          className='text-white'
          icon='line-md:loading-alt-loop'
        />
      </>
    );
  }
};

export default RegisterForm;

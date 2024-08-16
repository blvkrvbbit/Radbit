import { ReactNode } from 'react';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../../../../lib/auth-options';
type Props = {
  children: ReactNode;
};

const Protected = async ({ children }: Props) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/login');
  } else {
    return <>{children}</>;
  }
};

export default Protected;

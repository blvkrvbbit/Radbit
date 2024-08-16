import { getServerSession } from 'next-auth';
import LoginForm from './login-form/login-form.component';
import { authOptions } from '../../../../../lib/auth-options';
import { redirect } from 'next/navigation';

const LoginPage = async () => {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect(`/profile/${session.user.id}`);
  } else {
    return (
      <div>
        <LoginForm />
      </div>
    );
  }
};

export default LoginPage;

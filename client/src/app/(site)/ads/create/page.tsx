import Protected from '@/app/components/protected/protected.component';
import AdForm from '../form/ad-form.component';

const CreateAdPage = () => {
  return (
    <Protected>
      <div className='container'>
        <AdForm />
      </div>
    </Protected>
  );
};

export default CreateAdPage;

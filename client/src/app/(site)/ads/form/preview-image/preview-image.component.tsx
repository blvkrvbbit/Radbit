import Image from 'next/image';
import './preview-image.styles.css';
type Props = {
  src: string;
  id: string;
};

const PreviewImage = ({ src, id }: Props) => {
  return (
    <div className='relative cursor-pointer'>
      <Image
        src={src}
        id={id}
        width={0}
        height={0}
        sizes='100vw'
        style={{ width: '100%', height: '13rem' }}
        alt={'Preview image'}
      />
    </div>
  );
};

export default PreviewImage;

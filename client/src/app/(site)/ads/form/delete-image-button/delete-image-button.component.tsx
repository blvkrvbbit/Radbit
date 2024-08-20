'use client';

import { Icon } from '@iconify/react/dist/iconify.js';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

type Props = {
  defaultImages: any;
  id: number;
  router: AppRouterInstance;
  setDefaultImages: (updatedImages: []) => void;
};

const DeleteImageButton = ({
  defaultImages,
  id,
  router,
  setDefaultImages,
}: Props) => {
  return (
    <button
      className='absolute top-0 z-20 bg-white'
      onClick={async (e: any) => {
        e.stopPropagation();
        const response = await fetch(`/api/image/${defaultImages[id].id}`, {
          method: 'DELETE',
        });
        router.refresh();
        const updatedImages = defaultImages.filter(
          (defImage: any, defId: number) => id !== defId
        );

        setDefaultImages(updatedImages);
      }}
      type='button'
    >
      <Icon
        icon='ph:trash-fill'
        fontSize={24}
        className='absolute top-0 z-10 m-2 text-red-500'
      />
    </button>
  );
};

export default DeleteImageButton;

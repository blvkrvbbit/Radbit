'use client';
import { Icon } from '@iconify/react/dist/iconify.js';
import Image from 'next/image';
import { useEffect, useState } from 'react';

type Props = {
  images: any;
};

const ImageView = ({ images }: Props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const toggleModal = (e: any) => {
    setModalOpen(!modalOpen);
    // setImageId(e.target.id);
  };
  // TODO: Fix db to accept a title on images, so you can populate alt tag.
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }
  }, [modalOpen]);

  const toggleSwitchImage = (e: any) => {
    setSelectedImage(e.target.id);
  };
  return (
    <>
      {/* Mobile View */}

      <div className='grid grid-cols-3 mt-2 gap-4'>
        {/* Home not modal */}
        {images
          .filter((image: any) => {
            if (!image.hero) {
              return image;
            }
          })
          .map((image: any, id: number) => {
            return (
              <Image
                src={image.url}
                key={id}
                id={`${id}`}
                alt={''}
                width={0}
                height={0}
                className='cursor-pointer'
                sizes='100vw'
                style={{ width: '100%', height: '7rem' }}
                onClick={(e: any) => {
                  toggleModal(modalOpen);
                  toggleSwitchImage(e);
                }}
              />
            );
          })}
        {/* Modal */}
        <div
          className={`${
            modalOpen ? '' : 'hidden'
          } image-view fixed top-0 bg-black/90 h-full w-full  left-0`}
        >
          <div className='container'>
            <div className='flex justify-end pt-4'>
              <button onClick={toggleModal}>
                <Icon
                  icon='zondicons:close-solid'
                  fontSize={24}
                  className='text-white'
                />
              </button>
            </div>
            <div className='image-carousel w-[calc(100%)] mx-auto mt-[4rem]'>
              <Image
                src={images[selectedImage].url}
                alt={''}
                width={0}
                height={0}
                sizes='100vw'
                className='w-full h-[14.2rem] cursor-pointer'
              />
              <div className='grid grid-cols-3 mt-2 gap-4'>
                {images.map((image: any, id: number) => {
                  if (selectedImage != id) {
                    return (
                      <div key={id} id={`${id}`} onClick={toggleSwitchImage}>
                        <Image
                          id={`${id}`}
                          src={image.url}
                          alt={''}
                          width={0}
                          height={0}
                          sizes='100vw'
                          className='cursor-pointer'
                          style={{ width: '100%', height: '7rem' }}
                        />
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const MobileImageView = () => {};
const TabletImageView = () => {};
const DesktopImageView = () => {};
export default ImageView;

export const imageUpload = async (photo: any) => {
  const imageToUpload = new FormData();
  imageToUpload.append('file', photo);
  imageToUpload.append('upload_preset', process.env.CLOUDINARY_UPLOAD_PRESET!);
  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env
      .CLOUDINARY_CLOUD_NAME!}/image/upload`,
    {
      method: 'POST',
      body: imageToUpload,
    }
  );
  return await response.json();
};

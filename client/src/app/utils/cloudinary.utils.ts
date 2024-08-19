import cloudinary from 'cloudinary';

export async function deleteImageFromUrl(url: string) {
  console.log(url);

  try {
    const urlParts = url?.split('/');

    const uploadIndex = urlParts.indexOf('upload');

    const publicIdWithExtension =
      uploadIndex !== -1 ? urlParts.slice(uploadIndex + 2).join('/') : null;

    const publicIdWithoutExtension = publicIdWithExtension
      ?.split('.')
      .slice(0, -1)
      .join('.');

    const sanitizedPublicId = publicIdWithoutExtension?.replace(
      /[^a-zA-Z0-9_./-]/g,
      '_'
    );

    if (!sanitizedPublicId) {
      console.error('Invalid Cloudinary URL. Public ID not found.');
      return null;
    }
    cloudinary.v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const result = await cloudinary.v2.uploader.destroy(sanitizedPublicId);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

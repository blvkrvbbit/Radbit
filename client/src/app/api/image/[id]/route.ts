import { NextResponse } from 'next/server';
import db from '@/app/db/db';
import { deleteImageFromUrl } from '@/app/utils/cloudinary.utils';

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    // TODO: Delete image from cloudinary
    const image = await db.image.findUnique({
      where: {
        id: Number(params.id),
      },
    });
    if (image) {
      await deleteImageFromUrl(image?.url);
    }

    await db.image.delete({
      where: {
        id: Number(params.id),
      },
    });
    return NextResponse.json({
      message: 'Successfully deleted Image',
    });
  } catch (err: any) {
    console.log(err);
    return NextResponse.json({
      error: err.message,
    });
  }
}

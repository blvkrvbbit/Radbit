import db from '@/app/db/db';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../../lib/auth-options';
import { deleteImageFromUrl } from '@/app/utils/cloudinary.utils';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const ad = await db.ad.findMany({
      where: {
        id: Number(params.id),
      },
      include: {
        images: true,
        categories: true,
        user: {
          select: {
            name: true,
            email: true,
            country: true,
            provinceState: true,
            city: true,
            Ad: true,
          },
        },
      },
    });

    return NextResponse.json(ad[0]);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      {
        status: 500,
      }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  // TODO: Add ability to add new images if found

  const {
    title,
    price,
    description,
    images,
    uploadedImages,
    heroIndex,
    category,
  } = await req.json();

  const session = await getServerSession(authOptions);

  console.log('Image info', images, heroIndex);
  try {
    // Add all the new uploaded images
    if (images.length > 1) {
      const imagesToCreate = images[1].map((image: any) => ({
        adId: Number(params.id),
        url: image.url,
        hero: image.hero,
      }));

      await db.image.createMany({
        data: imagesToCreate,
      });
    }

    const ad = await db.ad.findUnique({
      where: {
        id: Number(params.id),
      },
      include: {
        categories: true,
      },
    });
    console.log(ad);
    console.log(category);

    if (ad?.userId == session?.user.id) {
      if (images) {
        for (let i = 0; i < images[0].length; i++) {
          await db.image.update({
            where: {
              id: Number(images[0][i].id),
            },
            data: {
              url: images[0][i].url,
              hero: images[0][i].hero,
            },
          });
        }
      }
      await db.ad.update({
        where: {
          id: Number(params.id),
        },
        data: {
          title,
          price,
          description,
          categories: {
            disconnect: [{ id: ad!.categories[0].id }],
            connect: {
              id: Number(category),
            },
          },
        },
      });
      return NextResponse.json(
        {
          message: 'Successfully updated ad',
        },
        {
          status: 200,
        }
      );
    }
    return NextResponse.json(
      {
        message: 'Unauthorized',
      },
      {
        status: 401,
      }
    );
  } catch (err: any) {
    console.log(err);
    return NextResponse.json(
      {
        message: err.message,
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  try {
    const ad = await db.ad.findUnique({
      where: {
        id: Number(params.id),
      },
      include: {
        images: true,
      },
    });

    console.log(ad?.userId, session?.user.id);
    if (ad?.userId === Number(session?.user.id)) {
      if (ad.images.length > 0) {
        for (let image of ad.images) {
          deleteImageFromUrl(image.url);
        }
      }

      const deleted = await db.ad.delete({
        where: {
          id: Number(params.id),
        },
      });

      return NextResponse.json({
        message: 'Successfully deleted the ad',
      });
    }
    return NextResponse.json(
      {
        message: 'Unauthorized',
      },
      {
        status: 401,
      }
    );
  } catch (err: any) {
    return NextResponse.json({
      error: err.message,
    });
  }
}

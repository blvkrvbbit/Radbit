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

export async function PUT(req: Request,
  { params }: { params: { id: string } }
) {
  const { title, price, description, images, category } = await req.json();

  const session = await getServerSession(authOptions);
  const ad = await db.ad.findUnique({
    where: {
      id: Number(params.id)
    }
  });
  console.log(ad?.userId, session?.user.id);
  try {
    const ad = await db.ad.findUnique({
      where: {
        id: Number(params.id)
      }
    });

    if (ad?.userId == session?.user.id) {
      const updatedAd = await db.ad.update({
        where: {
          id: Number(params.id)
        },
        data: {
          title,
          price,
          description,
        }
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

import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../../../../lib/auth-options';
import db from '@/app/db/db';

export async function GET(req: Request) {
  try {
    const ads = await db.ad.findMany({
      include: {
        images: true,
        user: {
          select: {
            name: true,
            email: true,
            country: true,
            provinceState: true,
            city: true,
          },
        },
      },
    });

    return NextResponse.json(ads);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const { title, price, description, images, category } = await req.json();

  try {
    const ad = await db.ad.create({
      data: {
        title,
        price,
        description,
        userId: Number(session!.user.id),
        categories: {
          connect: {
            id: Number(category),
          },
        },
      },
    });

    if (images.length > 0) {
      const imagesToCreate = images.map((image: any) => ({
        adId: ad.id,
        url: image.url,
        hero: image.hero,
      }));

      await db.image.createMany({
        data: imagesToCreate,
      });
    }
    return NextResponse.json(
      { success: 'Successfully created ad' },
      {
        status: 200,
      }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      {
        status: 500,
      }
    );
  }
}

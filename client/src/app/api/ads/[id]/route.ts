import db from '@/app/db/db';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../../lib/auth-options';

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
    });
    console.log(ad?.userId, session?.user.id);
    if (ad?.userId === Number(session?.user.id)) {
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

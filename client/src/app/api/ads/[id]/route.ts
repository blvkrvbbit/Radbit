import db from '@/app/db/db';
import { NextResponse } from 'next/server';

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

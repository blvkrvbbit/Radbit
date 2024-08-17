import db from '@/app/db/db';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const ads = await db.ad.findMany({
      where: {
        userId: Number(params.userId),
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
          },
        },
      },
    });
    return NextResponse.json(ads);
  } catch (err: any) {
    return NextResponse.json({ message: err.message });
  }
}

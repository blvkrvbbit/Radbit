import db from '@/app/db/db';
import { formatCategory } from '@/app/utils/format-categories';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { category: string } }
) {
  try {
    const categories = await db.category.findMany({
      where: {
        name: formatCategory(params.category),
      },
      include: {
        ads: {
          select: {
            id: true,
            title: true,
            price: true,
            description: true,
            createdDate: true,
            user: {
              select: {
                name: true,
                country: true,
                provinceState: true,
                city: true,
              },
            },
            images: true,
          },
        },
      },
    });

    return NextResponse.json(categories[0]);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      {
        status: 500,
      }
    );
  }
}

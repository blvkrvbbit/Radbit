import db from '@/app/db/db';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const categories = await db.category.findMany({
    include: {
      subCategories: true,
    },
  });

  return NextResponse.json(categories);
}

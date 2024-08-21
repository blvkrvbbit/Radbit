import db from '@/app/db/db';
import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await db.user.findUnique({
      where: {
        id: Number(params.id),
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: false,
        country: true,
        provinceState: true,
        city: true,
      },
    });

    return NextResponse.json(user);
  } catch (err: any) {
    return NextResponse.json({ message: err.message });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { name, email, password, country, provinceState, city } =
    await req.json();
  let hashedPassword;
  let dataToUpdate: {
    name: string;
    email: string;
    country: string;
    provinceState: string;
    city: string;
    password?: string;
  } = {
    name,
    email,
    country,
    provinceState,
    city,
  };

  if (password) {
    hashedPassword = await hash(password, 10);
    dataToUpdate = {
      ...dataToUpdate,
      password: hashedPassword,
    };
  }

  const updatedUser = await db.user.update({
    where: {
      id: Number(params.id),
    },
    data: dataToUpdate,
  });

  return NextResponse.json({ message: 'Hit' });
}

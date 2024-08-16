import { NextResponse } from 'next/server';
import db from '@/app/db/db';
import { hash } from 'bcrypt';

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    const hashedPassword = await hash(password, 10);

    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ success: 'User created successfully' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}

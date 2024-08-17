import { imageUpload } from '@/app/utils/image-upload';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const formData = await req.formData();
  try {
    const files = formData.getAll('files');

    let uploadedDataArr = [];
    let uploadedData = null;
    for (let i = 0; i < files.length; i++) {
      uploadedData = await imageUpload(files[i]);
      uploadedDataArr.push(uploadedData);
    }

    return NextResponse.json(uploadedDataArr);
  } catch (err: any) {
    return NextResponse.json({ err: 'Something went wrong' }, { status: 200 });
  }
}

import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

// Define types for Cloudinary response
interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
  asset_id?: string;
  [key: string]: string | number | boolean | null | undefined;
}

// Define type for error
interface CloudinaryError extends Error {
  message: string;
}

export async function POST(req: Request) {
  const data = await req.formData();
  const file = data.get('file') as File;

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  try {
    const uploadPromise = new Promise<CloudinaryUploadResult>(
      (resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            resource_type: 'image',
            folder: 'wearzy/wardrobe',
            transformation: [
              { effect: 'background_removal' },
              { fetch_format: 'png' },
            ],
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result as CloudinaryUploadResult);
            }
          },
        );

        stream.end(buffer);
      },
    );

    const result = await uploadPromise;

    console.log('Uploaded URL:', result.secure_url);

    return NextResponse.json({ url: result.secure_url });
  } catch (err) {
    console.error('Upload failed:', err);
    const error = err as CloudinaryError;
    return NextResponse.json(
      { error: error.message || 'Upload failed' },
      { status: 500 },
    );
  }
}

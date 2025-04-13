import { client } from "../client";
import { NextRequest, NextResponse } from 'next/server';
import { IncomingForm, File as FormidableFile, Files } from 'formidable';
import path from 'path';
import { Readable } from 'stream';

const ALLOWED_BUCKETS = ['products', 'variants', 'size-charts', 'brands'] as const;
type BucketName = typeof ALLOWED_BUCKETS[number];

export const config = {
  api: {
    bodyParser: false,
  },
};

interface FormData {
  fields: Record<string, any>;
  files: FormidableFile | FormidableFile[];
}

const parseForm = async (req: NextRequest): Promise<FormData> => {
  const form = new IncomingForm({ multiples: true, keepExtensions: true });
  
  // Convert NextRequest to a format formidable can understand
  const chunks: Uint8Array[] = [];
  const reader = req.body?.getReader();
  
  if (!reader) {
    throw new Error('No request body found');
  }

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
  }

  const body = Buffer.concat(chunks);
  const stream = Readable.from(body);

  // Create a mock request object that formidable expects
  const mockReq = {
    ...req,
    headers: Object.fromEntries(req.headers),
    on: (event: string, callback: (data: any) => void) => {
      if (event === 'data') {
        stream.on('data', callback);
      } else if (event === 'end') {
        stream.on('end', callback);
      }
      return mockReq;
    },
    pause: () => {
      stream.pause();
      return mockReq;
    },
    resume: () => {
      stream.resume();
      return mockReq;
    }
  };

  return new Promise((resolve, reject) => {
    form.parse(mockReq as any, (err: Error | null, fields: Record<string, any>, files: Files) => {
      if (err) reject(err);
      else resolve({ fields, files: files.files as FormidableFile | FormidableFile[] });
    });
  });   
};

export const POST = async (request: NextRequest) => {
  try {
    const { files } = await parseForm(request);
    const uploadFiles = Array.isArray(files) ? files : [files];
    const bucket = 'products';

    console.log('Received files:', uploadFiles.map(f => ({
      filename: f.originalFilename,
      filepath: f.filepath,
      mimetype: f.mimetype,
      size: f.size
    })));

    const uploadPromises = uploadFiles.map(async (file: FormidableFile) => {
      try {
        const objectName = path.basename(file.filepath);
        const metaData = {
          'Content-Type': file.mimetype || 'application/octet-stream'
        };

        console.log('Uploading to MinIO:', {
          bucket,
          objectName,
          filepath: file.filepath,
          metaData
        });

        await client.fPutObject(bucket, objectName, file.filepath, metaData);
        
        // Generate the full URL for the uploaded image
        const imageUrl = `/${objectName}`;
        
        console.log('Upload successful:', {
          objectName,
          imageUrl
        });

        return { 
          file: objectName, 
          url: imageUrl,
          success: true 
        };
      } catch (err) {
        console.error(`Failed to upload file ${file.filepath}:`, err);
        return { 
          file: path.basename(file.filepath), 
          success: false, 
          error: err instanceof Error ? err.message : 'Upload failed' 
        };
      }
    });

    const results = await Promise.all(uploadPromises);
    console.log('All uploads completed:', results);

    return NextResponse.json({ 
      success: results.every(r => r.success), 
      results 
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Upload failed' 
    });
  }
};

export const GET = async (request: Request) => {
    const { searchParams } = new URL(request.url);
    const names = searchParams.getAll("name");
    const bucket = searchParams.get("bucket") as BucketName;

    if (!names.length) {
        return new Response("Name is required", { status: 400 });
    }

    if (!bucket || !ALLOWED_BUCKETS.includes(bucket)) {
        return new Response("Invalid or missing bucket name", { status: 400 });
    }

    try {
        const urls = await Promise.all(
            names.map(name => client.presignedPutObject(bucket, name, 60 * 5))
        );

        return new Response(JSON.stringify({ urls }), { 
            headers: { "Content-Type": "application/json" } 
        });
    } catch (error) {
        return new Response("Failed to generate presigned URLs", { status: 500 });
    }
}


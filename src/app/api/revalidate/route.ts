import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET || 'lumix-secret-revalidate-token-2026';

export async function POST(request: NextRequest) {
  try {
    const secret = request.headers.get('x-revalidate-secret');

    if (secret !== REVALIDATE_SECRET) {
      return NextResponse.json(
        { success: false, message: 'Invalid revalidation secret token' },
        { status: 401 },
      );
    }

    const body = await request.json().catch(() => ({}));
    const { path, tag } = body;

    if (!path && !tag) {
      return NextResponse.json(
        { success: false, message: 'Either path or tag is required' },
        { status: 400 },
      );
    }

    if (path) {
      revalidatePath(path);
      // Also refresh products catalog if a specific product was updated
      if (path.startsWith('/products/')) {
        revalidatePath('/products');
        revalidatePath('/');
      }
    }

    if (tag) {
      revalidateTag(tag);
    }

    return NextResponse.json({
      success: true,
      revalidated: true,
      path: path || null,
      tag: tag || null,
      timestamp: Date.now(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message || 'Error executing revalidation' },
      { status: 500 },
    );
  }
}

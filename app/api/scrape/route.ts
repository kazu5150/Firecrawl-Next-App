import { NextRequest, NextResponse } from 'next/server';
import FirecrawlApp from '@mendable/firecrawl-js';
import { handleApiError } from '@/lib/errors';

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    const apiKey = process.env.FIRECRAWL_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'FIRECRAWL_API_KEY is not configured' }, { status: 500 });
    }

    const app = new FirecrawlApp({ apiKey });

    const scrapeResponse = await app.scrapeUrl(url, {
      formats: ['markdown', 'html'],
    });

    return NextResponse.json({ success: true, data: scrapeResponse });
  } catch (error) {
    console.error('Scrape error:', error);
    const errorInfo = handleApiError(error);
    return NextResponse.json(
      { error: errorInfo.message, details: errorInfo.details },
      { status: errorInfo.statusCode }
    );
  }
}
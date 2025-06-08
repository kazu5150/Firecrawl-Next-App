import { NextRequest, NextResponse } from 'next/server';
import FirecrawlApp from '@mendable/firecrawl-js';
import { handleApiError } from '@/lib/errors';

export async function POST(request: NextRequest) {
  try {
    const { url, options } = await request.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    const apiKey = process.env.FIRECRAWL_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'FIRECRAWL_API_KEY is not configured' }, { status: 500 });
    }

    const app = new FirecrawlApp({ apiKey });

    const crawlResponse = await app.crawlUrl(url, {
      limit: options?.limit || 10,
      scrapeOptions: {
        formats: ['markdown', 'html'],
      },
    });

    return NextResponse.json({ success: true, data: crawlResponse });
  } catch (error) {
    console.error('Crawl error:', error);
    const errorInfo = handleApiError(error);
    return NextResponse.json(
      { error: errorInfo.message, details: errorInfo.details },
      { status: errorInfo.statusCode }
    );
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const jobId = searchParams.get('jobId');

  if (!jobId) {
    return NextResponse.json({ error: 'Job ID is required' }, { status: 400 });
  }

  try {
    const apiKey = process.env.FIRECRAWL_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'FIRECRAWL_API_KEY is not configured' }, { status: 500 });
    }

    const app = new FirecrawlApp({ apiKey });
    const status = await app.checkCrawlStatus(jobId);

    return NextResponse.json(status);
  } catch (error) {
    console.error('Status check error:', error);
    const errorInfo = handleApiError(error);
    return NextResponse.json(
      { error: errorInfo.message, details: errorInfo.details },
      { status: errorInfo.statusCode }
    );
  }
}
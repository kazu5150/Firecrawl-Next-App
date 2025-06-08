# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Firecrawl web scraping application built with Next.js 15 and TypeScript. It provides a user interface for scraping single pages or crawling multiple pages from websites using the Firecrawl API.

## Development Commands

```bash
npm run dev    # Start development server on http://localhost:3000
npm run build  # Create production build
npm start      # Run production server
npm run lint   # Run ESLint checks
```

## Environment Configuration

**Required**: Create `.env.local` with:
```
FIRECRAWL_API_KEY=your_firecrawl_api_key_here
```

Get your API key from [Firecrawl](https://www.firecrawl.dev/).

## Architecture

### API Routes
- **`/api/scrape`** - Single page scraping
  - POST: `{ url: string }`
  - Returns scraped content with metadata
  
- **`/api/crawl`** - Multi-page crawling
  - POST: `{ url: string, options?: { limit?: number } }`
  - GET: `?jobId={id}` for status checks
  - Default limit: 10 pages

### Key Components
- **`app/page.tsx`** - Main UI with mode toggle (scrape/crawl), URL input, and results display
- **`lib/errors.ts`** - Centralized error handling with specific messages for API key, rate limit, and timeout errors
- **`lib/export.ts`** - Export utilities for JSON, Markdown, and CSV formats
- **`components/LoadingSpinner.tsx`** - Loading state indicator

### Error Handling Pattern
All API routes use the `handleApiError` utility which provides user-friendly messages for:
- Missing/invalid API keys (401)
- Rate limiting (429)
- Timeouts (408)
- General errors (500)

## Key Dependencies
- `@mendable/firecrawl-js` - Firecrawl SDK for web scraping
- `next` - React framework with App Router
- `tailwindcss` - Utility-first CSS framework

## Export Functionality
The app supports three export formats:
1. **JSON** - Full structured data
2. **Markdown** - Human-readable format with metadata
3. **CSV** - Tabular format with URL, title, description, and content preview
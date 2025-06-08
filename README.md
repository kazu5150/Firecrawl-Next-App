# Firecrawl Web Scraper

A powerful web scraping application built with Next.js and Firecrawl that allows you to scrape single pages or crawl entire websites.

## Features

- **Single Page Scraping**: Extract content from individual web pages
- **Website Crawling**: Crawl multiple pages from a website
- **Multiple Export Formats**: Export results as JSON, Markdown, or CSV
- **Dark Mode Support**: Comfortable viewing in any lighting condition
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Loading States**: Visual feedback during scraping operations

## Prerequisites

Before running this application, you'll need:

1. Node.js (v18 or higher)
2. A Firecrawl API key from [Firecrawl](https://www.firecrawl.dev/)

## Getting Started

1. Clone the repository:
```bash
git clone [your-repo-url]
cd firecrawl-app
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory and add your Firecrawl API key:
```
FIRECRAWL_API_KEY=your_firecrawl_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Scraping a Single Page

1. Select "Scrape (Single Page)" mode
2. Enter the URL you want to scrape
3. Click "Start Scraping"
4. View the results and export in your preferred format

### Crawling Multiple Pages

1. Select "Crawl (Multiple Pages)" mode
2. Enter the starting URL for the crawl
3. Click "Start Crawling"
4. The app will crawl up to 10 pages by default
5. Export all results in your preferred format

## API Endpoints

- `POST /api/scrape` - Scrape a single URL
- `POST /api/crawl` - Start crawling from a URL
- `GET /api/crawl?jobId={id}` - Check crawl job status

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Firecrawl** - Web scraping engine

## Project Structure

```
firecrawl-app/
├── app/
│   ├── api/
│   │   ├── crawl/
│   │   │   └── route.ts
│   │   └── scrape/
│   │       └── route.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   └── LoadingSpinner.tsx
├── lib/
│   ├── errors.ts
│   └── export.ts
└── .env.local
```

## Error Handling

The application handles various error scenarios:
- Invalid or missing API keys
- Rate limiting
- Timeout errors
- Network failures

## Contributing

Feel free to submit issues and pull requests.

## License

MIT

'use client';

import { useState } from 'react';
import { exportToJSON, exportToMarkdown, exportToCSV } from '@/lib/export';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function Home() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');
  const [mode, setMode] = useState<'scrape' | 'crawl'>('scrape');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch(`/api/${mode}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to process URL');
      }

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">Firecrawl Web Scraper</h1>
      
      <div className="mb-8 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="mb-4 flex gap-4 justify-center">
          <button
            onClick={() => setMode('scrape')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              mode === 'scrape'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Scrape (Single Page)
          </button>
          <button
            onClick={() => setMode('crawl')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              mode === 'crawl'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Crawl (Multiple Pages)
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="url" className="block text-sm font-medium mb-2">
              Enter URL to {mode === 'scrape' ? 'scrape' : 'crawl'}:
            </label>
            <input
              id="url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Processing...' : `Start ${mode === 'scrape' ? 'Scraping' : 'Crawling'}`}
          </button>
        </form>

        {error && (
          <div className="mt-4 p-4 bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-700 rounded-lg text-red-700 dark:text-red-300">
            {error}
          </div>
        )}
        
        {loading && (
          <div className="mt-8 flex justify-center">
            <LoadingSpinner />
          </div>
        )}
      </div>

      {result && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Results</h2>
            <div className="flex gap-2">
              <button
                onClick={() => exportToJSON(mode === 'scrape' ? result.data : result.data.data)}
                className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
              >
                Export JSON
              </button>
              <button
                onClick={() => exportToMarkdown(mode === 'scrape' ? result.data : result.data.data)}
                className="px-3 py-1 text-sm bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
              >
                Export Markdown
              </button>
              <button
                onClick={() => exportToCSV(mode === 'scrape' ? result.data : result.data.data)}
                className="px-3 py-1 text-sm bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
              >
                Export CSV
              </button>
            </div>
          </div>
          
          {result.data && (
            <div className="space-y-4">
              {mode === 'scrape' ? (
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">{result.data.metadata?.title || 'Untitled'}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {result.data.metadata?.description || 'No description available'}
                  </p>
                  <details className="mt-4">
                    <summary className="cursor-pointer text-blue-500 hover:underline">
                      View content
                    </summary>
                    <pre className="mt-2 p-4 bg-gray-100 dark:bg-gray-900 rounded overflow-x-auto text-sm">
                      {result.data.markdown || result.data.content || 'No content available'}
                    </pre>
                  </details>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Status: {result.data.status || 'Processing'}
                  </p>
                  {result.data.data && result.data.data.map((page: any, index: number) => (
                    <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <h3 className="font-semibold mb-2">
                        {page.metadata?.title || `Page ${index + 1}`}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {page.metadata?.sourceURL || page.url}
                      </p>
                      <details className="mt-2">
                        <summary className="cursor-pointer text-blue-500 hover:underline">
                          View content
                        </summary>
                        <pre className="mt-2 p-4 bg-gray-100 dark:bg-gray-900 rounded overflow-x-auto text-sm">
                          {page.markdown || page.content || 'No content available'}
                        </pre>
                      </details>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </main>
  );
}

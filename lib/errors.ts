export class FirecrawlError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public details?: any
  ) {
    super(message);
    this.name = 'FirecrawlError';
  }
}

export function handleApiError(error: unknown): {
  message: string;
  statusCode: number;
  details?: any;
} {
  if (error instanceof FirecrawlError) {
    return {
      message: error.message,
      statusCode: error.statusCode,
      details: error.details,
    };
  }

  if (error instanceof Error) {
    if (error.message.includes('API key')) {
      return {
        message: 'Invalid or missing API key',
        statusCode: 401,
      };
    }

    if (error.message.includes('rate limit')) {
      return {
        message: 'Rate limit exceeded. Please try again later.',
        statusCode: 429,
      };
    }

    if (error.message.includes('timeout')) {
      return {
        message: 'Request timed out. The page might be too large or slow to load.',
        statusCode: 408,
      };
    }

    return {
      message: error.message,
      statusCode: 500,
    };
  }

  return {
    message: 'An unexpected error occurred',
    statusCode: 500,
  };
}
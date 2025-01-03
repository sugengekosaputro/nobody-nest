export function generateMeta(data: any): any | null {
  if (Array.isArray(data)) {
    return {
      page: {
        current: 1,
        total: 4, // Example, you can make this dynamic based on your pagination logic
      },
      record: {
        current: 10,
        total: 300, // Example, you can make this dynamic
      },
      link: {
        first: 'http://example.com/first',
        next: 'http://example.com/next',
        prev: null,
        last: 'http://example.com/last',
        current: 'http://example.com/current',
      },
    };
  }
  return null;
}